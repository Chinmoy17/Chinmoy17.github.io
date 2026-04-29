/**
 * RFP Platform Project Data
 * Full case study content for the RFP Platform project.
 * Built for ByteMethod AI / Dexian — government proposal automation.
 */

const rfpPlatformData = {
  // ---- Identity ----
  id: "rfp-platform",
  slug: "rfp-platform",
  visibility: "private",
  category: "project",
  featured: true,
  title: "RFP Platform — End-to-End Government Proposal Automation",
  tagline: "From SAM.gov scrape to 14-section proposal in under 7 minutes.",
  tier: "Enterprise",

  stack: [
    "FastAPI",
    "Python 3.12",
    "Claude Agent SDK",
    "GPT-4.1",
    "Azure Document Intelligence",
    "React 18 + TypeScript",
    "Vite 5",
    "Azure SQL",
    "Azure Blob Storage",
    "Docker",
    "Azure App Service",
    "GitLab CI/CD",
  ],

  summary:
    "AI-powered enterprise platform automating the full government RFP lifecycle: SAM.gov scraping, document analysis, company profiling, 14-section proposal generation, and PowerPoint creation. 117 Python files, 55 React/TS files, 30+ endpoints.",

  links: { demo: null, repo: null },

  // ---- Hero Stats ----
  stats: [
    { value: "117", label: "Python Files" },
    { value: "55", label: "React/TS Files" },
    { value: "30+", label: "REST Endpoints" },
    { value: "15+", label: "Database Tables" },
    { value: "3–7 min", label: "Proposal Generation" },
    { value: "80%", label: "Token Savings vs RAG" },
  ],

  // ---- At a Glance ----
  atAGlance: {
    role: "Application Developer (AI/ML)",
    supervisor: {
      name: "Dr. Bushra Chowdhury",
      linkedin: "https://www.linkedin.com/in/bushra-chowdhury-972604149/",
    },
    company: "ByteMethod AI / Dexian",
    scope:
      "Sole developer — full-stack design and implementation of the entire platform: backend API, AI pipelines, React frontend, database schema, CI/CD, and Azure deployment.",
    stack:
      "FastAPI · Python 3.12 · Claude Agent SDK · GPT-4.1 · Azure Doc Intelligence · React 18/TS · Azure SQL · Docker · Azure App Service",
  },

  // ---- TL;DR ----
  tldr: [
    "Automates end-to-end government RFP lifecycle: opportunity discovery → document analysis → company profiling → proposal generation → PowerPoint creation.",
    "Sole developer on 117 Python files, 55 React/TS files, 30+ API endpoints, 15+ database tables — deployed on Azure with GitLab CI/CD.",
    "PageIndex QA over vector RAG achieves 80% token savings while maintaining answer quality — structured section retrieval instead of embedding search.",
    "Multi-model AI fleet: Claude Opus for complex reasoning, Sonnet for fast tasks, GPT-4.1 for structured JSON, Azure Doc Intelligence for OCR.",
  ],

  // ---- Problem ----
  problem: {
    scenario:
      "A company finds a government RFP on SAM.gov. The team reads 200+ pages, extracts requirements, builds compliance matrices, writes 14 proposal sections, and creates executive decks. This takes 2–4 weeks per proposal with specialized proposal writers.",
    painPoints: [
      "Manually searching SAM.gov and 50+ state procurement portals for relevant opportunities",
      "Reading 100–500 page RFP documents to extract requirements, deadlines, and evaluation criteria",
      "Matching company capabilities against RFP requirements for bid/no-bid decisions",
      "Writing 30–50 page technical proposals from scratch for each bid",
      "Creating executive presentations for stakeholder review",
      "No cost visibility into the AI operations powering the process",
    ],
  },

  // ---- 7 Core Modules ----
  modules: [
    {
      id: "opportunity-discovery",
      name: "Opportunity Discovery",
      description:
        "Scrapes SAM.gov and state procurement portals using dual browser automation. Extracts structured opportunity data, filters by NAICS codes, and enriches with AI-generated summaries.",
      techDetail:
        "Selenium for JS-heavy pages, Patchright (patched Playwright) for stealth scraping. Firecrawl + Apify for description enrichment. Background pipeline with exponential backoff.",
      icon: "search",
    },
    {
      id: "rfp-analysis",
      name: "RFP Document Analysis",
      description:
        "Ingests multi-format RFP documents (PDF, DOCX, scanned images). Extracts text with layout preservation, builds section indexes, and powers targeted Q&A.",
      techDetail:
        "Azure Document Intelligence for OCR/layout extraction. PageIndex QA pattern: LLM reads section index, requests specific pages — 80% fewer tokens than vector RAG.",
      icon: "file-text",
    },
    {
      id: "company-profiling",
      name: "Company Profiling",
      description:
        "Analyzes company documents (proposals, case studies, capability statements, org charts) to build structured profiles. Claude Opus with vision capability handles multimodal inputs.",
      techDetail:
        "Claude Agent SDK with multimodal analysis. SharePoint integration via Microsoft Graph API with delta sync and webhook notifications. Profile output: structured markdown.",
      icon: "building",
    },
    {
      id: "proposal-generation",
      name: "Proposal Generation",
      description:
        "Generates compliant 14-section government proposals. Claude Agent SDK agents read RFP analysis + company profile, write sections iteratively with self-review, output professional DOCX.",
      techDetail:
        "Claude Agent SDK (agents read/write files, self-correct). SSE Event Bus for real-time streaming during 3–7 min generation. docx-js for DOCX formatting. $0.20–$0.50 per proposal.",
      icon: "edit",
    },
    {
      id: "ppt-generation",
      name: "Presentation Generation",
      description:
        "Creates executive-summary PowerPoint decks from proposals. 12 bold color palettes, multiple slide layouts (two-column, icon+text, grid, half-bleed image).",
      techDetail:
        "Claude Agent SDK for content structuring → python-pptx for PPTX rendering. Data visualizations, timelines, and comparison slides. Extracts images from source DOCX.",
      icon: "monitor",
    },
    {
      id: "conversation-agent",
      name: "Conversation Agent",
      description:
        "Multi-turn chat interface for exploring RFPs. Agent provides automated analysis (summary, classification, deliverables assessment) and interactive Q&A with structured block rendering.",
      techDetail:
        "Claude Sonnet via Agent SDK. Intent detection with keyword fast-path + LLM fallback. 10 rich block types (thinking, cards, checklists, gaps, progress). SSE streaming. 6-hour context cache.",
      icon: "message-circle",
    },
    {
      id: "cost-analytics",
      name: "Cost Analytics",
      description:
        "Tracks token usage, model costs, and processing metrics across all AI operations. Fire-and-forget logging ensures zero impact on the critical path.",
      techDetail:
        "Background thread cost logging (daemon, non-blocking). Recharts dashboard with date range filters. Per-user cost attribution. Doc Intelligence free-tier gauge. Operational metrics collection.",
      icon: "bar-chart",
    },
  ],

  // ---- Engineering Decisions ----
  engineeringDecisions: [
    {
      question: "Why Claude Agent SDK over simple API calls?",
      answer:
        "Agents can read and write files during proposal generation — they iteratively draft, self-review, and revise sections. Simple API calls would require orchestrating this loop manually. The Agent SDK handles tool use, file I/O, and multi-turn reasoning natively.",
      tradeoff:
        "Slower per-call latency, but dramatically better output quality for long-form writing. Mitigated with SSE streaming for real-time progress.",
      category: "ai",
    },
    {
      question: "Why PageIndex QA over vector RAG?",
      answer:
        "Government RFPs have structured sections (Section L, Section M, etc.). Vector RAG loses section context and retrieves fragments. PageIndex sends the model a compact section index (table of contents with page numbers) and lets it request specific pages — preserving document structure and citation accuracy.",
      tradeoff:
        "80% token savings vs full-document context. Slight risk of missing cross-references between distant sections, but deterministic retrieval eliminates embedding drift.",
      category: "ai",
    },
    {
      question: "Why SSE Event Bus for real-time streaming?",
      answer:
        "Proposal generation takes 3–7 minutes. Without streaming, users stare at a spinner. The SSE Event Bus pushes section-by-section progress, token counts, and cost estimates in real-time. Each client gets its own asyncio.Queue with thread-safe publishing.",
      tradeoff:
        "More complex than polling — requires connection management and reconnection logic. But the UX improvement is substantial for long-running operations.",
      category: "architecture",
    },
    {
      question: "Why multi-stage Docker build?",
      answer:
        "Frontend (React/TS/Vite) and backend (FastAPI/Python) live in one repo. Stage 1 builds the frontend with node:20-alpine, Stage 2 creates the Python runtime with Chromium, Node.js (for DOCX generation), and ODBC drivers. Final image: ~400MB vs ~1.2GB single-stage.",
      tradeoff:
        "Build complexity and ~4 min CI time. Worth it for lean deploy images and clear separation of concerns.",
      category: "infra",
    },
    {
      question: "Why dual browser automation?",
      answer:
        "SAM.gov and state portals have varying levels of bot detection. Selenium handles JS rendering for standard pages. Patchright (patched Playwright/Chromium) handles stealth scraping for Cloudflare-protected pages. Both engines in one Docker image.",
      tradeoff:
        "Extra ~150MB in Docker image for two browser engines. Justified by significantly higher scraping reliability across 50+ portals.",
      category: "scraping",
    },
    {
      question: "Why fire-and-forget cost logging?",
      answer:
        "Every AI API call logs token counts and estimated cost to the database. But logging must never block the critical path. Daemon background threads write to cost_events — if the thread fails, it prints and swallows the error. Analytics data is eventually consistent.",
      tradeoff:
        "Possible log loss on process crash. Acceptable for analytics data. Startup reconciliation handles any gaps.",
      category: "architecture",
    },
    {
      question: "Why 18 input/output sanitization patterns?",
      answer:
        "AI-generated proposals go into Word docs and PowerPoints. Unsanitized output can break XML in DOCX/PPTX files. We strip control characters, normalize Unicode, escape XML entities, and detect prompt injection attempts. Outputs are filtered for system prompt leakage.",
      tradeoff:
        "Slight processing overhead per generation. But one broken PowerPoint costs hours of debugging. Failsafe imports ensure sanitizer failures never break the pipeline.",
      category: "security",
    },
    {
      question: "Why a multi-model fleet instead of one LLM?",
      answer:
        "Each model excels at different tasks. Claude Opus: complex reasoning and long-form writing. Sonnet: fast classification and extraction. GPT-4.1: reliable structured JSON output. Azure Doc Intelligence: layout-aware OCR. Using the right model per task optimizes both cost and quality.",
      tradeoff:
        "More API keys, more failure modes, more testing surface. But 40% cost reduction vs using Opus for everything, with better results per task.",
      category: "ai",
    },
  ],

  // ---- Architecture Layers (for diagram) ----
  architectureLayers: [
    {
      name: "Frontend",
      color: "#3B82F6",
      items: [
        "React 18 + TypeScript",
        "Vite 5",
        "Monaco Editor",
        "Recharts",
        "Tailwind CSS 4",
      ],
    },
    {
      name: "API Layer",
      color: "#10B981",
      items: [
        "FastAPI + Uvicorn",
        "30+ REST Endpoints",
        "SSE Event Bus",
        "Session Auth",
        "Input Sanitization",
      ],
    },
    {
      name: "AI Services",
      color: "#8B5CF6",
      items: [
        "Claude Opus 4.6 (Agent SDK)",
        "Claude Sonnet 4.6",
        "GPT-4.1 (Azure OpenAI)",
        "Azure Doc Intelligence",
        "LangChain",
      ],
    },
    {
      name: "Data & Storage",
      color: "#F59E0B",
      items: [
        "Azure SQL (15+ tables)",
        "Azure Blob Storage",
        "Azure App Service",
        "Container Registry",
        "GitLab CI/CD",
      ],
    },
  ],

  // ---- Multi-Model Fleet ----
  modelFleet: [
    {
      model: "Claude Opus 4.6",
      provider: "Anthropic",
      role: "Proposal writing, company profiling, presentation generation",
      strength: "Long-form reasoning",
      color: "#D97706",
    },
    {
      model: "Claude Sonnet 4.6",
      provider: "Anthropic",
      role: "Conversation agent, annotation pipeline, vision OCR",
      strength: "Speed + structured extraction",
      color: "#F59E0B",
    },
    {
      model: "GPT-4.1",
      provider: "Azure OpenAI",
      role: "RFP analysis, Q&A routing, section-level editing",
      strength: "Reliable JSON output",
      color: "#10B981",
    },
    {
      model: "Azure Doc Intelligence",
      provider: "Microsoft",
      role: "PDF/DOCX text extraction with layout preservation",
      strength: "Layout-aware OCR",
      color: "#3B82F6",
    },
  ],

  // ---- Data Flow Pipeline ----
  dataFlow: [
    {
      stage: "Discover",
      label: "SAM.gov Scraping",
      detail: "Dual browser automation extracts federal & state opportunities",
    },
    {
      stage: "Ingest",
      label: "Document Analysis",
      detail: "Azure Doc Intelligence + PageIndex QA for structured extraction",
    },
    {
      stage: "Profile",
      label: "Company Profiling",
      detail: "Multimodal analysis of capability docs via Claude Agent SDK",
    },
    {
      stage: "Generate",
      label: "Proposal Writing",
      detail: "14-section DOCX generation with SSE streaming progress",
    },
    {
      stage: "Present",
      label: "PPT Creation",
      detail: "Executive PowerPoint decks with branded layouts",
    },
  ],

  // ---- Database Schema ----
  dbSchema: {
    tableCount: "15+",
    tables: [
      {
        name: "sam_gov_opportunities",
        fields: "solicitation_number, agency, NAICS, deadline, AI summary",
        domain: "discovery",
        color: "#3B82F6",
      },
      {
        name: "rfp_document_index",
        fields: "section_title, page_range, summary, full_text",
        domain: "analysis",
        color: "#8B5CF6",
      },
      {
        name: "company_profiles",
        fields: "capabilities, past_performance, key_personnel, differentiators",
        domain: "profiling",
        color: "#6366F1",
      },
      {
        name: "proposals",
        fields: "14 sections, DOCX blob path, annotation status, PPTX path",
        domain: "generation",
        color: "#10B981",
      },
      {
        name: "cost_events",
        fields: "service, model, operation, tokens_in/out, cost_usd, user",
        domain: "analytics",
        color: "#F59E0B",
      },
      {
        name: "conversations",
        fields: "message_history, context_cache, intent_log, attachments",
        domain: "interaction",
        color: "#EC4899",
      },
    ],
    relationships: [
      { from: "sam_gov_opportunities", to: "rfp_document_index", label: "1 : N" },
      { from: "rfp_document_index", to: "proposals", label: "1 : 1" },
      { from: "company_profiles", to: "proposals", label: "N : 1" },
      { from: "proposals", to: "cost_events", label: "1 : N" },
      { from: "proposals", to: "conversations", label: "1 : N" },
    ],
  },

  // ---- Tech Stack Grid ----
  techStack: {
    frontend: [
      "React 18 + TypeScript",
      "Vite 5",
      "Tailwind CSS 4",
      "Monaco Editor",
      "Recharts",
      "React Quill",
      "Lucide React",
    ],
    backend: [
      "FastAPI 0.135",
      "Python 3.12",
      "Pydantic v2",
      "SSE (sse-starlette)",
      "python-docx / docx-js",
      "python-pptx",
      "pdfplumber / PyMuPDF",
    ],
    ai: [
      "Claude Opus 4.6 (Agent SDK)",
      "Claude Sonnet 4.6",
      "GPT-4.1 (Azure OpenAI)",
      "Azure Document Intelligence",
      "LangChain + LangGraph",
      "Firecrawl + Apify",
    ],
    infrastructure: [
      "Azure App Service (B1)",
      "Azure SQL Database",
      "Azure Blob Storage",
      "Azure Container Registry",
      "GitLab CI/CD",
      "Docker (multi-stage)",
    ],
  },

  // ---- Results ----
  results: [
    {
      metric: "3–7 min",
      description: "Proposal generation time — previously 2–4 weeks of manual work per RFP",
    },
    {
      metric: "80%",
      description: "Token savings using PageIndex QA over full-document vector RAG",
    },
    {
      metric: "40%",
      description: "Cost reduction through multi-model fleet vs single premium model",
    },
    {
      metric: "$0.20–$0.50",
      description: "Per-proposal AI cost for complete 14-section document generation",
    },
    {
      metric: "500+ pages",
      description: "Maximum RFP document size processed with intelligent chunking",
    },
    {
      metric: "1 engineer",
      description:
        "Solo delivery: 117 Python files, 55 React/TS files, full Azure deployment",
    },
  ],

  // ---- Constraints ----
  constraints: [
    "Private enterprise project for ByteMethod AI / Dexian. No source code, screenshots, or real documents can be shared.",
    "All visuals on this page are architecture diagrams and system design illustrations created for this portfolio.",
  ],

  // ---- Roadmap ----
  nextUpdates: [
    "Evaluation-driven prompt iteration with automated quality scoring test sets",
    "Multi-tenant support with isolated environments per client organization",
    "RAG hybrid: combine PageIndex QA with targeted vector retrieval for cross-reference detection",
    "Proposal versioning and diff view in the Monaco Editor",
    "Expanded portal coverage: additional state and local procurement sites",
  ],
};

export default rfpPlatformData;
