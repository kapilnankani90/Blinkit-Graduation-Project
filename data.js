// Data store for Blinkit AI Discovery Engine Demo (7-Stage Methodology)

const FILTER_SUMMARY = {
  total_evaluated: 2266,
  relevant_count: 1038,
  irrelevant_count: 1228,
  primary_count: 14, // 7 Primary Survey entries + 7 candidate interviews
  secondary_count: 2252,
  sources: [
    { name: "Play Store Reviews (blinkit_reviews_2000.json)", total: 2000, relevant: 890, irrelevant: 1110, type: "Secondary" },
    { name: "Primary Survey Responses (Graduation Project.csv)", total: 7, relevant: 7, irrelevant: 0, type: "Primary" },
    { name: "Candidate In-Depth Interviews (Interviews.md)", total: 7, relevant: 7, irrelevant: 0, type: "Primary" },
    { name: "Community Scrape 2 (blinkit_scrape_2.json)", total: 130, relevant: 53, irrelevant: 77, type: "Secondary" },
    { name: "MouthShut Reviews (mouthshut_reviews.json)", total: 80, relevant: 50, irrelevant: 30, type: "Secondary" },
    { name: "Brand & Discussion Scrape 1 (blinkit_scrape_1.json)", total: 37, relevant: 28, irrelevant: 9, type: "Secondary" },
    { name: "Reddit Q&A Reviews (reddit_reviews.json)", total: 5, relevant: 3, irrelevant: 2, type: "Secondary" }
  ],
  theme_counts: [
    { id: 1, name: "Authenticity & Risk Perception", count: 143, share: "26.2%", color: "#ef4444", tags: ["Platform Trust", "No Return Policy", "Counterfeit Fear"] },
    { id: 2, name: "Habit-Driven Utility Shopping", count: 137, share: "25.1%", color: "#f59e0b", tags: ["Strict Reordering", "On-Demand", "Habit Loops"] },
    { id: 3, name: "Experiential Micro-Sampling & Trial", count: 115, share: "21.1%", color: "#3b82f6", tags: ["Micro-Testers", "Sample Gateways", "Low-Friction Trial"] },
    { id: 4, name: "Late-Night Emergency Urgency", count: 92, share: "16.9%", color: "#8b5cf6", tags: ["Panic Urgency", "Late-Night Needs", "Instant Solution"] },
    { id: 5, name: "Deals & Cart Threshold Nudges", count: 58, share: "10.6%", color: "#10b981", tags: ["Free Shipping", "Impulse Add-ons", "Gap Fillers"] }
  ],
  discovery_mechanisms: [
    { id: "m1", name: "Targeted Search & Direct Navigation", count: 143, icon: "🔍", description: "Active keyword intent queries typed into the search bar.", trigger: "High-intent specific product queries (e.g., 'CeraVe', 'kettle', 'boAt')." },
    { id: "m2", name: "Emergency Panic & Situational Urgency", count: 92, icon: "🚨", description: "Sudden, unplanned urgent necessities.", trigger: "Late-night baby diapers, phone chargers, first-aid, NEET admit card printouts." },
    { id: "m3", name: "Cart Threshold Nudges & Gap Fillers", count: 58, icon: "🏷️", description: "Cart threshold gaps, BOGO offers, and flash discounts.", trigger: "Adding ₹40-₹50 non-grocery fillers to unlock free delivery threshold." },
    { id: "m4", name: "Brand-Led PDP Seals & Authenticity Verification", count: 143, icon: "🛡️", description: "Platform trust badges and sealed unboxing guarantees.", trigger: "Viewing brand direct verification seals on product detail pages." },
    { id: "m5", name: "Trial Sampling & Experiential Discovery", count: 115, icon: "🧪", description: "Low-commitment micro-trials & sample add-ons.", trigger: "Receiving free mini samples packaged inside order fulfillment bags." },
    { id: "m6", name: "Seasonality & Environmental Triggers", count: 58, icon: "🎆", description: "Event-driven and holiday campaign hubs.", trigger: "Diwali sparklers/diyas, Rose Day bouquets, monsoon gear." }
  ]
};

// Stage 3: AI Open Coding Data
const OPEN_CODING_DATA = [
  {
    id: "CODE-101",
    review: "I have a very strict weekly grocery list consisting of 10-15 items max. I just order them repetitively mostly so I don't consider buying anything extra.",
    codes: ["Habit shopping", "Routine purchase", "Repeat basket", "Low exploration"],
    confidence: "96%",
    reasoning: "User explicitly states repetitive purchasing behavior of staple items without exploring non-grocery categories."
  },
  {
    id: "CODE-102",
    review: "I was thinking of buying CeraVe product from Blinkit... But can they sell fake beauty products? Should I buy CeraVe cream from Blinkit or not?",
    codes: ["Perceived risk barrier", "Counterfeit anxiety", "High-value hesitation", "Authenticity doubt"],
    confidence: "94%",
    reasoning: "User exhibits extreme purchase hesitation for high-margin skincare due to lack of trust/verification signals."
  },
  {
    id: "CODE-103",
    review: "Since 2 ice creams don't reach free delivery mark, I order one more and give it to the first construction worker I see.",
    codes: ["Cart threshold nudge", "Gamified shipping gap", "Impulse cart padding", "Behavioral override"],
    confidence: "98%",
    reasoning: "Free delivery threshold mechanics force user to artificially inflate basket size beyond organic demand."
  },
  {
    id: "CODE-104",
    review: "Ran out of diapers at 2am with a screaming baby and Blinkit saved the day... Being able to order first-aid and baby care immediately is essential.",
    codes: ["Emergency trigger", "Time-sensitive utility", "Unplanned discovery", "High-friction need"],
    confidence: "99%",
    reasoning: "Urgent situational necessity overrides habitual browsing barriers, driving immediate cross-category adoption."
  },
  {
    id: "CODE-105",
    review: "Ordered a boAt Airdopes Elite... When I raised the issue, delivery personnel insisted I accept damaged package. Refused both return and exchange.",
    codes: ["Strict return friction", "Electronics post-purchase risk", "Support refusal", "Category loss"],
    confidence: "95%",
    reasoning: "Lack of return/exchange guarantees on non-grocery items creates permanent category abandonment."
  }
];

// Stage 6: AI Insight Generation Data
const INSIGHT_GENERATION_DATA = [
  {
    id: "INS-1",
    theme: "Habit-Driven Utility Shopping",
    observation: "Habit-driven shoppers rarely encounter non-grocery categories during routine repeat purchases.",
    evidence: "137 mentions of strict list adherence, auto-pilot reordering, and deliberate avoidance of homepage banners.",
    explanation: "Habitual shoppers navigate the app with single-minded utility focus, bypassing traditional top-of-funnel merchandising and homepage banner ads.",
    opportunity: "Introducing contextual discovery moments within habitual reorder journeys may increase cross-category exploration without breaking routine efficiency."
  },
  {
    id: "INS-2",
    theme: "Authenticity & Risk Perception",
    observation: "High-margin categories (skincare, electronics) suffer severe conversion drop-off due to perceived risk asymmetry.",
    evidence: "143 mentions highlighting fear of fake items (CeraVe), open-box tampering, and strict 'No Return' policies.",
    explanation: "Users view grocery staples as low-risk consumables but perceive non-groceries as high-risk assets requiring verification and return assurances.",
    opportunity: "Providing explicit authenticity verifications and unboxing protection at product touchpoints can bridge the perceived risk gap for non-groceries."
  },
  {
    id: "INS-3",
    theme: "Experiential Micro-Sampling & Trial",
    observation: "Quality skepticism and browsing hesitation block first-time non-grocery trials.",
    evidence: "115 mentions requesting ₹1 trial samples + physical micro-testers before full-size commitment.",
    explanation: "Low-commitment physical samples eliminate quality doubt for high-friction categories like skincare and produce.",
    opportunity: "Deliver automated free mini sample add-ons with qualifying orders to trigger post-trial repeat adoption."
  }
];

// Stage 7: AI Hypothesis Generation Data
const HYPOTHESIS_GENERATION_DATA = [
  {
    id: "HYP-1",
    insight: "Contextual discovery moments at cart review during staple reorders increase basket adoption.",
    hypothesis: "IF we introduce relevant non-grocery category recommendations at the cart review screen when a user reorders weekly staples, THEN cross-category basket adoption will significantly increase among habitual shoppers.",
    builtFrom: [
      "Theme 2: Habit-Driven Utility Shopping",
      "Discovery Channel 3: Cart Threshold Nudges",
      "Insight 1: Habitual Reorder Lock-in"
    ],
    evidence: "137 habit mentions + 58 cart threshold mentions.",
    confidence: "High"
  },
  {
    id: "HYP-2",
    insight: "Platform-backed authenticity verification bridges perceived risk in high-value non-groceries.",
    hypothesis: "IF we display a '100% Brand Authorized & Sealed Unboxing Guarantee' badge on beauty and electronics product pages, THEN conversion rate for first-time non-grocery buyers will improve markedly.",
    builtFrom: [
      "Theme 1: Authenticity & Risk Perception",
      "Discovery Channel 1: Targeted Search",
      "Insight 2: Authenticity & Risk Perception"
    ],
    evidence: "143 mentions of counterfeit fear (CeraVe/boAt) & strict return policy hesitation.",
    confidence: "High"
  },
  {
    id: "HYP-3",
    insight: "Low-commitment micro-samples and trial add-ons override browsing hesitation for high-doubt categories.",
    hypothesis: "IF we deliver co-branded free mini samples and micro-trial options with qualifying orders, THEN trial adoption rates for new non-grocery categories will significantly increase among skeptical shoppers.",
    builtFrom: [
      "Theme 3: Experiential Micro-Sampling & Trial",
      "Discovery Channel 5: Trial Sampling",
      "Insight 3: Experiential Micro-Sampling"
    ],
    evidence: "115 mentions requesting physical micro-samples and trial add-ons.",
    confidence: "Very High"
  }
];

// Stage 8: ⭐ Primary Research Validation Data (User Interviews + Google Form Results)
const PRIMARY_VALIDATION_DATA = [
  {
    id: "VAL-1",
    hypothesis_id: "HYP-1",
    hypothesis: "Contextual discovery moments at cart review during staple reorders increase basket adoption.",
    form_finding: "Survey respondents reorder the same staples (50-75% cart overlap) and open the app with pre-decided intent.",
    interview_evidence: "Interview 1 & 5 confirmed: 'I open Blinkit to purchase pre-decided items... suggest other categories on the cart review screen based on previous shopping journey.'",
    status: "VALIDATED",
    validation_score: "Strong Alignment"
  },
  {
    id: "VAL-2",
    hypothesis_id: "HYP-2",
    hypothesis: "Platform-backed authenticity verification bridges perceived risk in high-value non-groceries.",
    form_finding: "Survey respondents cite 'I don't trust unfamiliar products' or 'Uncertain authenticity' as the main barrier preventing non-grocery trials.",
    interview_evidence: "Interview 1 & 4 confirmed: 'My past experience has been good with Blinkit... I trust Blinkit rather than any brand who is selling inside it because of easy return policy.'",
    status: "VALIDATED",
    validation_score: "Strong Alignment"
  },
  {
    id: "VAL-3",
    hypothesis_id: "HYP-3",
    hypothesis: "Trial-inducing micro-samples and emergency shortcuts override browsing hesitation.",
    form_finding: "Survey respondents requested a dedicated hub ('Blinkit Binge') and ₹1/free sample add-ons when cart reaches threshold.",
    interview_evidence: "Interview 3 & 4 confirmed: 'If Blinkit can send me a free sample of a new category (like fruits/veg or skincare), I might give it a try next time.'",
    status: "VALIDATED",
    validation_score: "Strong Alignment"
  }
];

// Stage 9: Validated Opportunity Areas (STRATEGIC DIRECTION)
const VALIDATED_OPPORTUNITIES_DATA = [
  {
    id: "OPP-1",
    title: "1. Checkout as a Discovery Surface",
    target_segment: "Habit-Driven & Need-Based Shoppers",
    validated_insight: "Habitual shoppers bypass top-of-funnel carousels and homepage banners; cross-category discovery must shift to high-intent transaction touchpoints.",
    strategic_leverage: "Intercepting existing high-frequency staple checkout flows where basket building naturally occurs.",
    why_now: [
      "High-frequency repeat traffic (50–75% staple cart overlap)",
      "Existing checkout intent (zero acquisition cost)",
      "High basket expansion & AOV upside",
      "Capitalizes on natural threshold gaps"
    ]
  },
  {
    id: "OPP-2",
    title: "2. Platform-Backed Risk Reduction",
    target_segment: "Risk-Averse Non-Grocery Buyers",
    validated_insight: "Conversion in high-margin non-grocery categories is constrained by perceived product authenticity risk and return asymmetry.",
    strategic_leverage: "Leveraging baseline Blinkit platform trust to neutralize category-level purchase hesitation.",
    why_now: [
      "Strategic expansion into high-margin beauty & tech",
      "Leverages high baseline Blinkit delivery & service trust",
      "Removes psychological barriers preventing high-ticket orders",
      "Protects long-term customer retention"
    ]
  },
  {
    id: "OPP-3",
    title: "3. Low-Friction Trial & Demand Activation",
    target_segment: "Produce & Skincare Skeptics",
    validated_insight: "Quality skepticism and browsing hesitation are best overcome through low-friction physical trial and high-urgency situational activation.",
    strategic_leverage: "Lowering the barrier to category entry through experiential sampling and instant urgency pathways.",
    why_now: [
      "Strong user demand for risk-free category trial",
      "Brand partners motivated to co-fund sample distribution",
      "Zero incremental logistics cost via existing delivery network",
      "Unlocks multi-category customer Lifetime Value (LTV)"
    ]
  }
];

// Stage 10: Product Solutions & Strategy (TACTICAL EXECUTION)
const PRODUCT_SOLUTIONS_DATA = [
  {
    id: "SOL-1",
    title: "Build Smart Cart Threshold Fillers",
    opportunity_ref: "OPP-1",
    mechanism: "Checkout UI Component",
    description: "Algorithmic cart nudging system that detects ₹30–₹70 gaps to free delivery and recommends 1-tap add-on items (lip balms, batteries, cables) on the cart review screen.",
    target_metrics: [
      "↑ Basket Adoption Rate",
      "↑ Average Order Value (AOV)",
      "↑ New Category First-Trial Rate",
      "↓ No Increase in Checkout Abandonment (Guardrail)"
    ]
  },
  {
    id: "SOL-2",
    title: "Implement Category Trust Badges & Unboxing Guarantees",
    opportunity_ref: "OPP-2",
    mechanism: "PDP Verification Badges",
    description: "Prominent '100% Brand Direct Authorized' trust seals, 24-hr instant replacement badges, and sealed unboxing guarantees rendered directly on Product Detail Pages (PDPs).",
    target_metrics: [
      "↑ PDP Conversion Rate (Beauty & Tech)",
      "↑ Brand Direct Trust Perception Index",
      "↓ High-Value Cart Drop-off Rate",
      "↓ No Spike in Unjustified Return Claims (Guardrail)"
    ]
  },
  {
    id: "SOL-3",
    title: "Launch 1-Tap Emergency Shortcuts & Sample Add-on Gateway",
    opportunity_ref: "OPP-3",
    mechanism: "Homepage & Fulfillment Flow",
    description: "Dynamic late-night home screen banner (11 PM - 4 AM) for urgent essentials + automated ₹1 sample packaging in dispatch bags for qualifying cart thresholds.",
    target_metrics: [
      "↑ Late-Night Emergency Order Completion",
      "↑ Post-Trial Repeat Adoption Rate",
      "↑ Discovery Hub Click-Through Rate (CTR)",
      "↓ Zero Late-Night Fulfillment SLA Breach (Guardrail)"
    ]
  }
];
