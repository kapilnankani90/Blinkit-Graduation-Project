# Edge Case Analysis & Mitigation Strategies

This document identifies potential edge cases across the ingestion, preprocessing, AI analysis, storage, and consumption layers of the **AI-Powered Discovery Engine**, detailing the corresponding mitigation strategies.

---

## 1. Data Ingestion & Preprocessing Edge Cases

### 1.1 Malformed, Corrupted, or Empty Payloads
* **Scenario:** The user-provided URL or API returns empty data, corrupt bytes, or a malformed JSON payload.
* **Impact:** Pipeline crashes, silent failures, or corrupted database entries.
* **Mitigation:**
  * Strict schema validation (using Pydantic models) at the ingestion gateway.
  * Drop invalid messages to a Dead Letter Queue (DLQ) in Redis.
  * Raise alerts on repeated schema validation failures.

### 1.2 Rate Limit Exhaustion from Source APIs
* **Scenario:** Reaching API limits on user-provided platforms or external feeds.
* **Impact:** Missing feedback records, gaps in analytics.
* **Mitigation:**
  * Implement adaptive backoff and jitter retry mechanisms in Celery tasks.
  * Pause/resume ingestion dynamically based on HTTP header rate limits (e.g., `Retry-After`).

### 1.3 Mixed-Language / Multilingual Feedback (e.g., Hinglish)
* **Scenario:** Users write reviews using mixed languages (e.g., "delivery bahut late tha, direct call bhi nahi kiya").
* **Impact:** Standard English-only sentiment and embedding models fail to capture context, yielding poor semantic search.
* **Mitigation:**
  * Use a multilingual embedding model variant or ensure the LLM analyzer prompt explicitly handles mixed languages (e.g., "Translate Hinglish slang to standard terms before analyzing").

### 1.4 PII Redaction Failures
* **Scenario:** Redactor strips critical product or category information (false positive, e.g., redacting "Apple" as a name instead of fruit) or fails to strip sensitive user data (false negative, e.g., leakage of phone numbers formatted in unexpected ways).
* **Impact:** Privacy violation or loss of contextual discovery data.
* **Mitigation:**
  * Context-aware PII detection (using Microsoft Presidio with customized regex patterns for Indian phone/address formats).
  * Maintain a whitelist of common product/category words that must never be redacted (e.g., "Blinkit", "Apple", "Kiwi", "Staples").

---

## 2. Embedding Generation (BGE-Small) Edge Cases

### 2.1 Inputs Exceeding Token Limits
* **Scenario:** A user submits a very long blog post, forum thread, or lengthy customer support transcript exceeding BGE-Small’s 512-token context window.
* **Impact:** Text truncation, leading to loss of context in the latter parts of the review.
* **Mitigation:**
  * Split long texts using recursive text splitters (chunk size of 400 tokens with 50-token overlap).
  * Generate embeddings for individual chunks, and average the embeddings or link child chunks to the main parent feedback record.

### 2.2 Short, Low-Context Inputs (e.g., "Nice", "OK", "👍")
* **Scenario:** Users leave high-volume, single-word or emoji-only feedback.
* **Impact:** Flooding vector database with high-similarity noises that clutter semantic search results.
* **Mitigation:**
  * Pre-filter reviews below a minimum token length threshold (e.g., < 3 words) before passing them to the AI Processing Layer, unless they contain high-weight emoji signals (e.g., 😡).

---

## 3. LLM Analyzer & Insight Extraction Edge Cases

### 3.1 Rate Limiting (HTTP 429) on Google AI Studio / Groq
* **Scenario:** Running large-batch historical feedback processing triggers rate limits on free-tier APIs.
* **Impact:** System delays and failed analysis tasks.
* **Mitigation:**
  * Implement concurrency limits on LLM tasks inside Celery.
  * Use token-rate bucket limiters to throttle requests dynamically.
  * Graceful fallback: If Gemini 1.5 Pro limits are hit, route less complex tagging tasks to Gemini 1.5 Flash or Groq Llama 3.1.

### 3.2 Hallucinations & Out-of-Scope Classification
* **Scenario:** LLM infers a category or barrier that is not mentioned or supported by the text (e.g., tagging "needs staples" as a purchase barrier instead of a product category).
* **Impact:** Inaccurate dashboards and misleading recommendations for Product Managers.
* **Mitigation:**
  * Strictly enforce structured outputs using JSON Schema (via Gemini's `responseSchema` or Pydantic validation).
  * Use few-shot prompt examples that explicitly list valid categories and detail how to map barriers.

### 3.3 Malformed JSON Response from LLMs
* **Scenario:** The LLM responds with plain text or truncates the JSON block due to token limits.
* **Impact:** Failure to write structured data to PostgreSQL.
* **Mitigation:**
  * Implement a fallback parser that uses regex to extract JSON blocks.
  * Automatically retry the request with a lower temperature if JSON parsing fails.

---

## 4. Storage & State Synchronization Edge Cases

### 4.1 Out-of-Sync Storage (Database vs. MinIO)
* **Scenario:** A transaction fails *after* raw JSON is saved in MinIO but *before* metadata is written to PostgreSQL.
* **Impact:** Orphaned files in MinIO and inconsistent dashboard counts.
* **Mitigation:**
  * Write data to PostgreSQL first; only write to MinIO within a transactional try-except-finally block.
  * Run nightly reconciliation scripts to audit PostgreSQL and MinIO files, clearing out unreferenced artifacts.

### 4.2 Database Connection Pool Exhaustion
* **Scenario:** Spikes in traffic or parallel ingestion tasks overwhelm the PostgreSQL pool.
* **Impact:** Timeout errors for both dashboard users and the ingestion pipeline.
* **Mitigation:**
  * Implement connection pooling using `SQLAlchemy` or `pgbouncer`.
  * Set a strict timeout on ingestion database writes.

---

## 5. Analytics & Dashboard Edge Cases

### 5.1 Cold Start for Categories
* **Scenario:** A new product category is launched (e.g., "Gourmet Cheese"), but there is no historical review data or user segment profiles available.
* **Impact:** Empty dashboard sections.
* **Mitigation:**
  * Implement a default "Unclassified / New Categories" bin in the UI to capture new terms and prompt admins for mapping updates.

### 5.2 Sparse Activity Classification
* **Scenario:** A user is classified as "Habit-Driven" based on a single recurring order, but then changes behavior immediately.
* **Impact:** Distorted segmentation metrics.
* **Mitigation:**
  * Establish a minimum threshold of behavioral telemetry (e.g., at least 3 orders over 2 weeks) before assigning segment classifications.
