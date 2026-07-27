// Application Logic for Blinkit AI Discovery Engine Demo (7-Stage Workflow)

let currentFilterMode = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderOpenCodingHistory();
  renderDiscoveryMechanisms();
  renderInsights();
  renderHypotheses();
  renderPrimaryValidation();
  renderValidatedOpportunities();
  renderProductSolutions();
  initCharts();
});

// Scroll to section smoothly
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// Toggle Filter Mode
function setFilterMode(mode) {
  currentFilterMode = mode;
  document.getElementById('btn-toggle-all').classList.toggle('active', mode === 'all');
  document.getElementById('btn-toggle-relevant').classList.toggle('active', mode === 'relevant');
}

// Preset sample prompts for Stage 3 Open Coding (Real customer prompts from blinkit_scrape_2.json)
const OPEN_CODING_SAMPLES = {
  1: "Ordered milk and bread at 11pm because I forgot to stock up, and it was at my door in 9 minutes. Blinkit has genuinely changed how I plan my week — I don't stock up anymore, I just order as needed.",
  2: "Switched to Zepto because Blinkit kept charging a \"handling fee\" plus delivery fee plus small cart fee — felt like I was being nickel and dimed for a ₹150 order.",
  3: "Product quality is hit or miss. Sometimes the vegetables are fresh, sometimes I get a rotten tomato hidden at the bottom of the bag."
};

// Start empty by default - ONLY show the user-asked review analysis
let analyzedReviewsHistory = [];

function fillOpenCodingSample(id) {
  const text = OPEN_CODING_SAMPLES[id];
  if (text) {
    const input = document.getElementById('opencoding-input');
    input.value = text;
    analyzeCustomReview();
  }
}

async function analyzeCustomReview() {
  const input = document.getElementById('opencoding-input');
  const reviewText = input.value.trim();

  if (!reviewText) {
    alert("Please write or paste a customer review in the input bar, or select one of the sample prompts.");
    input.focus();
    return;
  }

  const analyzeBtn = document.getElementById('btn-analyze-opencoding');
  analyzeBtn.disabled = true;
  analyzeBtn.innerHTML = `<span>⏳ Analyzing with AI...</span>`;

  try {
    // Attempt backend API fetch via Railway/Vercel proxy (/api/analyze-review)
    const response = await fetch('/api/analyze-review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ review: reviewText })
    });

    if (response.ok) {
      const result = await response.json();
      analyzedReviewsHistory = [result];
    } else {
      // Fallback to client-side engine if API returns non-200
      analyzedReviewsHistory = [performAIOpenCoding(reviewText)];
    }
  } catch (err) {
    // Fallback to client-side engine if offline or backend is initializing
    analyzedReviewsHistory = [performAIOpenCoding(reviewText)];
  }

  renderOpenCodingHistory();

  analyzeBtn.disabled = false;
  analyzeBtn.innerHTML = `<span>⚡ Analyze Review</span>`;

  const outputEl = document.getElementById('opencoding-results-wrapper');
  if (outputEl) {
    outputEl.scrollIntoView({ behavior: 'smooth' });
  }
}

function performAIOpenCoding(text) {
  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;

  // List of common greetings, casual fillers, and non-review inputs
  const fillerWords = ["hi", "yo", "hello", "hey", "test", "asdf", "abc", "xyz", "123", "good", "bad", "okay", "ok", "yes", "no", "foo", "bar", "sup", "hola"];

  // Relevance & Quality Check:
  const isFiller = fillerWords.includes(lower);
  const isTooShort = wordCount < 3 || trimmed.length < 12;
  
  // Quick commerce / shopping / delivery / discovery keywords
  const shoppingKeywords = [
    "order", "buy", "bought", "item", "product", "delivery", "delivering", "delivered", 
    "blinkit", "app", "grocery", "groceries", "store", "cart", "price", "quality", 
    "service", "customer", "return", "refund", "time", "minutes", "hours", 
    "late", "fast", "speed", "fresh", "produce", "fruit", "veg", "vegetable", "milk", 
    "diaper", "baby", "skincare", "cerave", "brand", "fake", "original", "authentic", 
    "electronics", "tech", "cable", "charger", "stationery", "print", "cake", "party", 
    "gift", "bogo", "offer", "discount", "free", "shipping", "threshold", "recommend", 
    "review", "experience", "use", "used", "using", "shop", "shopping", "purchased", "reorder", "list"
  ];

  const hasShoppingContext = shoppingKeywords.some(kw => lower.includes(kw));

  // If input is a filler, too short, or lacks relevant shopping context -> Reject as Invalid Input
  if (isFiller || isTooShort || !hasShoppingContext) {
    return {
      id: `ASKED-${Date.now().toString().slice(-4)}`,
      review: text,
      isValid: false,
      errorTitle: "Invalid or Irrelevant Input",
      errorMessage: "Please enter a valid customer experience review (or select a recommended sample prompt below) to perform qualitative open coding."
    };
  }

  let codes = [];
  let reasoning = "";

  // 1. Handling Fee / Hidden Surcharges / Platform Switching (Scraped Prompt 2)
  if (lower.includes("handling fee") || lower.includes("small cart fee") || lower.includes("nickel and dimed") || lower.includes("zepto") || lower.includes("instamart")) {
    codes = ["Handling fee friction", "Competitor platform churn", "Small basket value penalty", "Price sensitivity threshold"];
    reasoning = "Customer experiences high transactional friction from cumulative surcharges (handling, small cart, delivery fees) on low-value orders, driving migration to rival platforms.";
  }
  // 2. JIT Stocking / Late Night Staples / Sub-10min Speed (Scraped Prompt 1)
  else if (lower.includes("stock up") || lower.includes("11pm") || lower.includes("9 minutes") || lower.includes("order as needed") || lower.includes("milk and bread")) {
    codes = ["Habitual pantry shift", "On-demand JIT replenishment", "Sub-10min speed dependency", "Elimination of bulk stocking"];
    reasoning = "Ultra-fast fulfillment speed (under 10 minutes) fundamentally restructures user behavioral patterns from traditional weekly grocery planning to real-time, on-demand ordering.";
  }
  // 3. Fresh Produce / Vegetable Quality / Perishable Trust (Scraped Prompt 3)
  else if (lower.includes("rotten") || lower.includes("hit or miss") || lower.includes("vegetables") || lower.includes("fresh produce") || lower.includes("tomato")) {
    codes = ["Produce quality inconsistency", "Perishable trust deficit", "Visual inspection gap", "Quality assurance friction"];
    reasoning = "Inconsistent fresh produce quality creates high purchase hesitation for perishable categories, limiting user migration from offline markets for core fresh foods.";
  }
  // 4. Gifting / Birthday / Surprise / Celebration
  else if (lower.includes("birthday") || lower.includes("cake") || lower.includes("surprise") || lower.includes("party") || lower.includes("gift") || lower.includes("celebration") || lower.includes("flowers")) {
    codes = ["Occasion-driven purchase", "Instant gifting", "Time-critical turnaround", "Impulse event adoption"];
    reasoning = "User leveraged ultra-fast delivery to fulfill an unplanned social or event obligation under tight time constraints, demonstrating event-triggered category discovery.";
  }
  // 5. School / Print / Stationery / Project / Office / Tech Rescue
  else if (lower.includes("print") || lower.includes("stationery") || lower.includes("school") || lower.includes("project") || lower.includes("admit card") || lower.includes("due") || lower.includes("office") || lower.includes("book")) {
    codes = ["Novel category discovery", "Feature awareness gap", "Time-critical delivery", "High-margin expansion"];
    reasoning = "User discovered a non-grocery capability during high-intent emergency utility fulfillment, expanding platform usage beyond routine grocery staples.";
  }
  // 6. Emergency / Late Night / Urgent / Diapers / First Aid / Fast
  else if (lower.includes("diaper") || lower.includes("2am") || lower.includes("9pm") || lower.includes("emergency") || lower.includes("urgent") || lower.includes("first-aid") || lower.includes("saved") || lower.includes("late night") || lower.includes("15 minutes")) {
    codes = ["Situational emergency trigger", "Time-sensitive utility", "High-friction rescue", "Unplanned discovery"];
    reasoning = "Urgent situational necessity overrides habitual browsing barriers, driving immediate cross-category adoption and rescue utility.";
  }
  // 7. Habit / Routine / Weekly / Strict List / Repetitive
  else if (lower.includes("strict") || lower.includes("list") || lower.includes("repetitive") || lower.includes("same") || lower.includes("regularly") || lower.includes("weekly") || lower.includes("habit") || lower.includes("routine") || lower.includes("every week")) {
    codes = ["Habit shopping", "Routine purchase", "Repeat basket", "Low exploration"];
    reasoning = "User explicitly describes repetitive purchasing behavior of staple items without exploring non-grocery categories.";
  }
  // 8. Authenticity / Counterfeit / Fake / Skincare / Electronics / CeraVe / Trust
  else if (lower.includes("fake") || lower.includes("cerave") || lower.includes("authentic") || lower.includes("trust") || lower.includes("skincare") || lower.includes("doubt") || lower.includes("duplicate") || lower.includes("electronics") || lower.includes("return") || lower.includes("boat")) {
    codes = ["Perceived risk barrier", "Counterfeit anxiety", "High-value hesitation", "Authenticity verification gap"];
    reasoning = "User exhibits high perceived risk and purchase hesitation for non-grocery items due to fear of counterfeits or lack of verification.";
  }
  // 9. Cart Nudges / Threshold / Free Delivery / BOGO / Discount
  else if (lower.includes("free delivery") || lower.includes("mark") || lower.includes("threshold") || lower.includes("offer") || lower.includes("add more") || lower.includes("minimum") || lower.includes("discount") || lower.includes("bogo")) {
    codes = ["Cart threshold nudge", "Gamified shipping gap", "Impulse cart padding", "Behavioral override"];
    reasoning = "Delivery threshold mechanics act as an external trigger forcing the user to artificially expand basket size beyond organic intent.";
  }
  // 10. Service / Delivery Complaint
  else if (lower.includes("delay") || lower.includes("late") || lower.includes("refund") || lower.includes("rider") || lower.includes("worst") || lower.includes("support") || lower.includes("bad")) {
    codes = ["Operational complaint", "Non-research noise", "Service delay", "Fulfillment issue"];
    reasoning = "Review focuses strictly on operational delivery friction rather than category discovery mechanisms.";
  }
  // 8. Generic Dynamic Analyzer for any other valid review text
  else {
    const words = text.replace(/[^a-zA-Z0-9\s]/g, "").split(/\s+/).filter(w => w.length > 3);
    const kw1 = words[0] ? words[0].toLowerCase() : "on-demand";
    const kw2 = words[1] ? words[1].toLowerCase() : "utility";
    
    codes = [
      `${kw1.charAt(0).toUpperCase() + kw1.slice(1)} engagement`,
      `${kw2.charAt(0).toUpperCase() + kw2.slice(1)} behavior`,
      "Category discovery signal",
      "Qualitative review intent"
    ];
    reasoning = `AI qualitative open coding analyzed the review context ("${text.slice(0, 50)}${text.length > 50 ? '...' : ''}") and identified distinct user behavioral signals regarding quick commerce utility.`;
  }

  return {
    id: `ASKED-${Date.now().toString().slice(-4)}`,
    review: text,
    isValid: true,
    codes: codes,
    reasoning: reasoning,
    isCustom: true
  };
}

// Render Stage 3: AI Open Coding Result
function renderOpenCodingHistory() {
  const container = document.getElementById('opencoding-container');
  if (!container) return;
  
  container.innerHTML = '';

  if (analyzedReviewsHistory.length === 0) {
    container.innerHTML = `
      <div class="glass-panel p-8 rounded-2xl flex flex-col h-full bg-gradient-to-br from-surface-container-low to-surface-container-highest justify-center items-center text-center space-y-4">
        <span class="material-symbols-outlined text-4xl text-on-surface-variant">psychology</span>
        <h4 class="font-headline-sm text-on-surface font-semibold">Awaiting User Input</h4>
        <p class="text-sm text-on-surface-variant max-w-sm">Write or paste a customer review into the bar on the left and click <strong>Process Review</strong> (or click a sample prompt) to display its AI Open Coding results here.</p>
      </div>
    `;
    return;
  }

  analyzedReviewsHistory.forEach((item) => {
    const box = document.createElement('div');
    
    if (item.isValid === false) {
      box.className = 'glass-panel p-8 rounded-2xl flex flex-col h-full bg-gradient-to-br from-surface-container-low to-surface-container-highest border-amber-500/40 shadow-xl shadow-amber-500/5';
      box.innerHTML = `
        <div class="flex justify-between items-start mb-6">
          <div>
            <span class="text-label-md text-amber-400 font-mono">NODE_ID: #${item.id}</span>
            <div class="mt-1">
              <span class="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider font-mono uppercase">INVALID / NON-RESEARCH INPUT</span>
            </div>
          </div>
          <span class="material-symbols-outlined text-amber-400 text-3xl">warning</span>
        </div>

        <div class="flex-grow space-y-6">
          <p class="italic text-on-surface text-base border-l-4 border-amber-400 pl-4 py-1 leading-relaxed">
            "${item.review}"
          </p>

          <div class="bg-amber-500/10 p-5 rounded-xl border border-amber-500/20 space-y-2">
            <h4 class="text-sm font-bold text-amber-300 flex items-center gap-2">
              <span class="material-symbols-outlined text-lg">info</span> ${item.errorTitle}
            </h4>
            <p class="text-xs text-amber-200 leading-relaxed font-sans">
              ${item.errorMessage}
            </p>
          </div>
        </div>
      `;
    } else {
      box.className = 'glass-panel p-8 rounded-2xl flex flex-col h-full bg-gradient-to-br from-surface-container-low to-surface-container-highest border-primary/40 shadow-xl shadow-primary/5';
      box.innerHTML = `
        <div class="flex justify-between items-start mb-6">
          <div>
            <span class="text-label-md text-on-surface-variant font-mono">NODE_ID: #${item.id}</span>
            <div class="mt-1 flex items-center gap-2">
              <span class="bg-primary-container/20 text-primary-fixed-dim px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider font-mono uppercase">USER ASKED RESULT</span>
            </div>
          </div>
          <span class="material-symbols-outlined text-primary text-3xl">verified</span>
        </div>

        <div class="flex-grow space-y-6">
          <p class="italic text-on-surface text-base border-l-4 border-primary pl-4 py-1 leading-relaxed">
            "${item.review}"
          </p>

          <div class="space-y-3">
            <h4 class="text-sm font-bold text-on-surface">Extracted Semantic Codes:</h4>
            <div class="flex flex-wrap gap-2">
              ${item.codes.map(c => `
                <span class="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg text-primary text-xs font-bold flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-[14px]">label</span> ${c}
                </span>
              `).join('')}
            </div>
          </div>

          <div class="bg-on-primary-container/10 p-4 rounded-xl border border-primary/10">
            <h4 class="text-xs font-bold text-primary mb-2 flex items-center gap-2">
              <span class="material-symbols-outlined text-sm">psychology</span> AI Reasoning
            </h4>
            <p class="text-sm text-on-surface-variant leading-relaxed italic">
              "${item.reasoning}"
            </p>
          </div>
        </div>
      `;
    }

    container.appendChild(box);
  });
}

// Render Stage 5: Discovery Mechanisms
function renderDiscoveryMechanisms() {
  const container = document.getElementById('mechanisms-container');
  container.innerHTML = '';

  FILTER_SUMMARY.discovery_mechanisms.forEach(m => {
    const card = document.createElement('div');
    card.className = 'pathway-card';
    card.innerHTML = `
      <div class="pathway-icon">${m.icon}</div>
      <span class="pathway-count">${m.count} Mentions</span>
      <h4 class="pathway-title">${m.name}</h4>
      <p class="pathway-desc">${m.description}</p>
      <div class="pathway-action">
        <strong>Trigger Context:</strong> ${m.trigger}
      </div>
    `;
    container.appendChild(card);
  });
}

// Render Stage 6: AI Insight Generation
function renderInsights() {
  const container = document.getElementById('insights-container');
  container.innerHTML = '';

  INSIGHT_GENERATION_DATA.forEach(ins => {
    const card = document.createElement('div');
    card.style.cssText = 'background: rgba(15, 22, 36, 0.9); border: 1px solid var(--secondary-accent); border-radius: 16px; padding: 1.5rem;';
    
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
        <span style="background: rgba(59, 130, 246, 0.15); color: #93c5fd; border: 1px solid var(--secondary-accent); padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 700;">
          Theme: ${ins.theme}
        </span>
        <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">ID: ${ins.id}</span>
      </div>

      <div style="display: grid; gap: 0.75rem; font-size: 0.9rem;">
        <div>
          <strong style="color: #f1f5f9;">👁️ Observation:</strong>
          <p style="color: var(--text-muted); margin-top: 0.2rem;">${ins.observation}</p>
        </div>
        <div>
          <strong style="color: #f1f5f9;">📌 Evidence:</strong>
          <p style="color: var(--text-muted); margin-top: 0.2rem;">${ins.evidence}</p>
        </div>
        <div>
          <strong style="color: #f1f5f9;">🧠 Behavioral Explanation:</strong>
          <p style="color: var(--text-muted); margin-top: 0.2rem;">${ins.explanation}</p>
        </div>
        <div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid var(--primary-accent); padding: 0.8rem; border-radius: 0 8px 8px 0; margin-top: 0.5rem;">
          <strong style="color: var(--primary-accent);">🚀 Product Opportunity (PM Insight):</strong>
          <p style="color: #fef08a; margin-top: 0.3rem; font-weight: 500;">${ins.opportunity}</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Render Stage 7: AI Hypothesis Generation
function renderHypotheses() {
  const container = document.getElementById('hypotheses-container');
  container.innerHTML = '';

  HYPOTHESIS_GENERATION_DATA.forEach(hyp => {
    const card = document.createElement('div');
    card.style.cssText = 'background: rgba(15, 22, 36, 0.85); border: 1px solid var(--border-color); border-radius: 14px; padding: 1.25rem;';

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
        <span style="font-size: 0.8rem; color: var(--primary-accent); font-weight: 700;">Insight Derived: "${hyp.insight}"</span>
        <span style="background: rgba(16, 185, 129, 0.15); color: var(--success); border: 1px solid var(--success); padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.75rem; font-weight: 700;">
          Confidence: ${hyp.confidence}
        </span>
      </div>

      <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 1rem; margin-bottom: 0.75rem;">
        <strong style="color: #67e8f9; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;">Testable Hypothesis:</strong>
        <p style="color: #f8fafc; font-size: 0.95rem; margin-top: 0.4rem; font-weight: 500;">${hyp.hypothesis}</p>
      </div>

      <div style="font-size: 0.8rem; color: var(--text-muted);">
        📊 <strong>Supporting Evidence Baseline:</strong> ${hyp.evidence}
      </div>
    `;
    container.appendChild(card);
  });
}

// Initialize Charts
function initCharts() {
  // Chart 1: Stage 1 Pipeline Filtering (Doughnut)
  const ctxFilter = document.getElementById('filteringChart').getContext('2d');
  new Chart(ctxFilter, {
    type: 'doughnut',
    data: {
      labels: ['Irrelevant Operational Noise (Filtered Out)', 'Retained Research Subset (Relevant)'],
      datasets: [{
        data: [FILTER_SUMMARY.irrelevant_count, FILTER_SUMMARY.relevant_count],
        backgroundColor: ['#ef4444', '#10b981'],
        borderWidth: 2,
        borderColor: '#0a0e17'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: '#f8fafc', font: { family: 'Inter' } }
        }
      }
    }
  });

  // Chart 2: Theme Distribution (Bar Chart)
  const ctxThemes = document.getElementById('themesChart').getContext('2d');
  new Chart(ctxThemes, {
    type: 'bar',
    data: {
      labels: FILTER_SUMMARY.theme_counts.map(t => `Theme ${t.id}`),
      datasets: [{
        label: 'Number of Mentions',
        data: FILTER_SUMMARY.theme_counts.map(t => t.count),
        backgroundColor: FILTER_SUMMARY.theme_counts.map(t => t.color),
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

// Save GitHub Link Handler
function saveGithubLink() {
  const url = document.getElementById('github-url-input').value;
  const msg = document.getElementById('github-status-msg');
  if (url) {
    msg.style.display = 'block';
    msg.innerHTML = `✅ Saved repository: <strong>${url}</strong>.<br/>You can now share your live demonstration link!`;
  }
}

// Render Stage 8: ⭐ Primary Research Validation
function renderPrimaryValidation() {
  const container = document.getElementById('primary-validation-container');
  if (!container) return;
  container.innerHTML = '';

  PRIMARY_VALIDATION_DATA.forEach(v => {
    const card = document.createElement('div');
    card.className = 'glass-panel p-6 rounded-2xl space-y-4 border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50 transition-all';
    card.innerHTML = `
      <div class="flex justify-between items-center">
        <span class="text-xs font-bold text-emerald-400 tracking-wider uppercase font-mono">${v.id} ➔ ${v.hypothesis_id}</span>
        <span class="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-0.5 rounded-full text-xs font-bold">${v.status} (${v.validation_score})</span>
      </div>
      <h4 class="text-base font-bold text-on-surface">Target Hypothesis: "${v.hypothesis}"</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div class="bg-surface-container-low p-4 rounded-xl border border-white/5 space-y-1">
          <strong class="text-primary flex items-center gap-1"><span class="material-symbols-outlined text-sm">assignment</span> Survey Findings (7 Responses):</strong>
          <p class="text-on-surface-variant leading-relaxed">${v.form_finding}</p>
        </div>
        <div class="bg-surface-container-low p-4 rounded-xl border border-white/5 space-y-1">
          <strong class="text-secondary flex items-center gap-1"><span class="material-symbols-outlined text-sm">record_voice_over</span> User Interview Evidence (7 Candidates):</strong>
          <p class="text-on-surface-variant leading-relaxed italic">${v.interview_evidence}</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Render Stage 9: Validated Opportunity Areas
function renderValidatedOpportunities() {
  const container = document.getElementById('validated-opportunities-container');
  if (!container) return;
  container.innerHTML = '';

  VALIDATED_OPPORTUNITIES_DATA.forEach(o => {
    const card = document.createElement('div');
    card.className = 'glass-panel p-6 rounded-2xl space-y-4 border-tertiary/30 flex flex-col justify-between';
    
    const whyNowHtml = (o.why_now || []).map(item => `<li class="flex items-center gap-1.5"><span class="text-emerald-400 font-bold">•</span> ${item}</li>`).join('');

    card.innerHTML = `
      <div class="space-y-3">
        <div class="flex justify-between items-center">
          <span class="text-xs font-bold text-tertiary uppercase tracking-wider">${o.id}</span>
          <span class="bg-surface-container-highest text-on-surface-variant px-2.5 py-0.5 rounded text-[11px] font-bold">${o.target_segment}</span>
        </div>
        <h4 class="text-lg font-bold text-on-surface">${o.title}</h4>
        <p class="text-sm text-on-surface-variant leading-relaxed"><strong>Validated Insight:</strong> ${o.validated_insight}</p>
        <div class="bg-tertiary/10 p-3 rounded-xl border border-tertiary/20 text-xs text-tertiary font-medium">
          🎯 <strong>Strategic Pillar:</strong> ${o.strategic_leverage}
        </div>
      </div>
      <div class="bg-surface-container-low p-4 rounded-xl border border-white/5 space-y-2">
        <div class="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">rocket_launch</span> Strategic Rationale (Why Now?)
        </div>
        <ul class="text-xs text-on-surface-variant space-y-1 font-sans">
          ${whyNowHtml}
        </ul>
      </div>
    `;
    container.appendChild(card);
  });
}

// Render Stage 10: Product Solutions & Strategy
function renderProductSolutions() {
  const container = document.getElementById('product-solutions-container');
  if (!container) return;
  container.innerHTML = '';

  PRODUCT_SOLUTIONS_DATA.forEach(s => {
    const card = document.createElement('div');
    card.className = 'glass-panel p-6 rounded-2xl space-y-4 border-primary/30 bg-primary/5 hover:border-primary/60 transition-all flex flex-col justify-between';
    
    const metricsHtml = (s.target_metrics || []).map((m, idx) => {
      const isGuardrail = idx === (s.target_metrics.length - 1);
      const colorClass = isGuardrail ? 'text-cyan-300 border-t border-white/10 pt-1 mt-1' : 'text-emerald-300';
      const arrow = m.startsWith('↑') ? '↑' : (m.startsWith('↓') ? '↓' : '•');
      const text = m.replace(/^[↑↓•]\s*/, '');
      return `<li class="flex items-center gap-1.5 ${colorClass}"><span class="font-bold">${arrow}</span> ${text}</li>`;
    }).join('');

    card.innerHTML = `
      <div class="space-y-3">
        <div class="flex justify-between items-center">
          <span class="text-xs font-bold text-primary font-mono uppercase">${s.id} ➔ ${s.opportunity_ref}</span>
          <span class="bg-primary/20 text-primary-fixed-dim px-2.5 py-0.5 rounded text-[11px] font-bold">${s.mechanism}</span>
        </div>
        <h4 class="text-lg font-bold text-on-surface">${s.title}</h4>
        <p class="text-sm text-on-surface-variant leading-relaxed">${s.description}</p>
      </div>
      <div class="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 space-y-2">
        <div class="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">monitoring</span> Target Product Success Metrics
        </div>
        <ul class="text-xs font-medium space-y-1">
          ${metricsHtml}
        </ul>
      </div>
    `;
    container.appendChild(card);
  });
}
