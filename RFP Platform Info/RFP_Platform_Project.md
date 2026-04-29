# RFP Platform
## AI-Powered Government Contract Intelligence & Proposal Generation System

---

## Executive Summary

**RFP Platform** is a full-stack enterprise application that automates the end-to-end lifecycle of government Request for Proposal (RFP) management -- from opportunity discovery and document analysis to tailored proposal generation and executive presentation creation.

Built for **BDTI Consulting**, the platform replaces weeks of manual work with AI-driven pipelines that scrape government portals, extract requirements from complex RFP documents, build structured company profiles, generate compliant proposals, and produce executive-ready PowerPoint decks -- all through a single web interface.

### The Problem It Solves

Government contracting involves:
- Manually searching SAM.gov and 50+ state procurement portals for relevant opportunities
- Reading 100+ page RFP documents to extract requirements, deadlines, and evaluation criteria
- Matching company capabilities against RFP requirements
- Writing 30-50 page technical proposals from scratch for each bid
- Creating executive presentations for bid/no-bid decisions

This process typically takes **2-4 weeks per RFP** and requires specialized proposal writers. The RFP Platform reduces this to **hours**, with AI handling the heavy lifting while humans retain editorial control.

### Key Metrics
- **117 Python files**, **55 React/TypeScript files** across 7 major modules
- **30+ REST API endpoints** across 6 router modules
- **10+ database tables** with full relational integrity
- Processes RFP documents up to **500+ pages**
- Proposal generation cost: **$0.20-$0.50 per proposal** (Claude API)
- Deployed on **Azure App Service** with CI/CD via GitLab

---

## System Architecture

```
+---------------------------------------------------------------------+
|                         FRONTEND LAYER                               |
|  +---------------------------------------------------------------+  |
|  |   React 18 + TypeScript SPA (Vite Build)                      |  |
|  |   - RFP Listings & SAM.gov Search                             |  |
|  |   - Company Profiling Dashboard                               |  |
|  |   - Proposal Generator & Split-View Editor                    |  |
|  |   - Interactive Agent Conversation (SSE streaming)            |  |
|  |   - Cost Analytics Dashboard (Recharts)                       |  |
|  |   - Document Upload & Q&A Interface                           |  |
|  +---------------------------------------------------------------+  |
+---------------------------------------------------------------------+
                              | HTTPS / REST API
                              v
+---------------------------------------------------------------------+
|                    BACKEND LAYER (FastAPI + Uvicorn)                  |
|  +-------------+-------------+-------------+-----------+-----------+ |
|  | Auth Router | Profiling   | Proposal    | Conversa- | Cost &    | |
|  | /api/auth/* | Router      | Router      | tion      | Activity  | |
|  |             | /api/       | /api/       | Router    | Routers   | |
|  |             | profiling/* | proposals/* | /api/     | /api/     | |
|  |             |             |             | conver-   | costs/*   | |
|  |             |             |             | sations/* |           | |
|  +-------------+-------------+-------------+-----------+-----------+ |
|  +---------------------------------------------------------------+  |
|  |                    CORE SERVICES                               |  |
|  |  - RFP Analyzer (document indexing & section extraction)       |  |
|  |  - QA Service (PageIndex-style question answering)             |  |
|  |  - Upload Service (file processing & Azure Doc Intelligence)   |  |
|  |  - Profiling Agent (Claude Agent SDK - multimodal analysis)    |  |
|  |  - Proposal Generator (Claude Agent SDK - DOCX output)        |  |
|  |  - PPT Generator (Claude Agent SDK - PPTX output)             |  |
|  |  - Conversation Agent (multi-turn interactive Claude agent)    |  |
|  |  - SSE Event Bus (real-time progress streaming)                |  |
|  +---------------------------------------------------------------+  |
+---------------------------------------------------------------------+
                              |
                              v
+---------------------------------------------------------------------+
|                    AI & CLOUD SERVICES LAYER                         |
|  +--------------+-----------------+------------------+------------+  |
|  | Claude API   | Azure OpenAI    | Azure Document   | Firecrawl  |  |
|  | (Opus 4.6)   | (GPT-4.1)       | Intelligence     | + Apify    |  |
|  | Agent SDK    | QA & Routing    | PDF/DOCX Text    | Web        |  |
|  | Proposals,   | Embeddings      | Extraction       | Scraping   |  |
|  | Profiles,    |                 |                  |            |  |
|  | Presentations|                 |                  |            |  |
|  +--------------+-----------------+------------------+------------+  |
+---------------------------------------------------------------------+
                              |
                              v
+---------------------------------------------------------------------+
|                    DATA & STORAGE LAYER                               |
|  +------------------+--------------------+-------------------------+  |
|  | Azure SQL Server | Azure Blob Storage | Local Temp Storage      |  |
|  | (rfpscraper      | (RFP documents,    | (uploads, processing,   |  |
|  |  schema)         |  proposals, PPTs)  |  intermediate files)    |  |
|  | 10+ tables       |                    |                         |  |
|  +------------------+--------------------+-------------------------+  |
+---------------------------------------------------------------------+
                              |
                              v
+---------------------------------------------------------------------+
|                    DEPLOYMENT & CI/CD                                 |
|  Azure App Service (B1) | Azure Container Registry | GitLab CI/CD  |
|  Docker multi-stage      | Continuous Deployment    | Auto-build on |
|  (Node + Python)         | webhook (ACR -> App Svc) | push to main  |
+---------------------------------------------------------------------+
```

---

## Core Features

### 1. Government Opportunity Discovery

**SAM.gov Integration & Portal Scraping**
- Real-time search of SAM.gov federal opportunities with filters (agency, NAICS code, state, set-aside type, deadline)
- Automated scraping of state and local procurement portals (BidNet, BidPrime, state-specific sites)
- Selenium and Patchright (patched Playwright) for JavaScript-heavy portal navigation
- Session tracking: every scraping run is logged with parameters for reproducibility
- AI-generated opportunity summaries using Azure OpenAI for quick scanning
- Automatic document downloading with retry logic and fallback extraction methods

### 2. RFP Document Analysis & Indexing

**Azure Document Intelligence + LLM Pipeline**
- Upload RFP documents (PDF, DOCX, images) through drag-and-drop interface
- Azure AI Document Intelligence extracts text with layout preservation
- LLM-powered section indexing: automatically identifies document structure, generates section summaries
- PageIndex-style Q&A: ask natural language questions about any RFP document
  - Step 1: LLM reads section index to identify relevant sections
  - Step 2: Retrieves full text from those sections
  - Step 3: Generates grounded answer with source citations
- Supports documents up to 500+ pages with intelligent chunking

### 3. AI Company Profiling

**Claude Agent SDK - Multimodal Document Analysis**
- Upload company documents (proposals, case studies, capability statements, org charts, images)
- Claude Opus 4.6 with vision capability analyzes each document type-specifically:
  - **Images**: Extracts org charts, diagrams, certifications via vision analysis
  - **DOCX/PDF**: Extracts capabilities, past performance, key personnel
  - **PPTX**: Extracts service offerings, client logos, differentiators
- Synthesizes everything into a structured markdown profile:
  - Company overview & core competencies
  - Past performance & case studies
  - Key personnel & certifications
  - Differentiators & competitive advantages
  - RFP-matching keywords for automated proposal tailoring
- Profiles are editable through a Monaco Editor with live markdown preview

### 4. Automated Proposal Generation

**Claude Agent SDK - Tailored DOCX Output**
- Input: RFP document + Company profile + Optional brand assets
- Claude Opus 4.6 agent:
  1. Extracts all RFP requirements, evaluation criteria, and compliance items
  2. Maps company capabilities against each requirement
  3. Identifies capability gaps and suggests mitigation strategies
  4. Generates a complete 14-section proposal document:
     - Cover Page, Executive Summary, Technical Approach
     - Management Plan, Staffing, Past Performance
     - Quality Assurance, Risk Mitigation, Compliance Matrix
     - Cost/Pricing Framework, Value Proposition, Appendices
  5. Formats as professional DOCX via docx-js (Node.js)
- Split-view proposal editor: side-by-side DOCX preview + section-level AI editing
- Users can select any section and prompt AI to improve, expand, or rewrite it
- Cost: $0.20-$0.50 per complete proposal

### 5. Executive Presentation Generation

**Claude Agent SDK - PPTX Output**
- Generates polished PowerPoint presentations from proposal documents
- 12 pre-designed bold color palettes
- Multiple slide layouts: two-column, icon+text, grid, half-bleed image
- Data visualization: callout stats, comparisons, timelines
- Extracts and embeds images from source DOCX into slides
- Professional visual polish: icons in circles, italic accents, branded footers

### 6. Interactive Multi-Turn Conversation Agent

**Real-Time Streaming via SSE**
- Users can have extended conversations with an AI agent about any RFP
- Agent has access to: RFP document content, company profile, web search results
- Structured message blocks rendered in UI:
  - **ThinkingBlock**: Shows agent's reasoning process
  - **ChecklistBlock**: Compliance checklist items
  - **ActionsBlock**: Recommended next steps
  - **ProgressBlock**: Real-time task progress
  - **GapsBlock**: Identified capability gaps
  - **AttachmentsBlock**: Referenced documents
- Server-Sent Events (SSE) bridge between synchronous background threads and async FastAPI endpoints
- In-memory event bus with per-connection asyncio.Queue for thread safety

### 7. Cost Tracking & Analytics Dashboard

**Granular API Cost Attribution**
- Every AI operation logged: Claude API, Azure OpenAI, Azure Document Intelligence, Firecrawl
- Per-user cost breakdown and platform-wide analytics
- Operation-type categorization: analyze, profile_generate, proposal_generate, qa, conversation
- Interactive Recharts dashboard with date range filters
- Supports cost forecasting and budget monitoring

---

## Technology Stack

### Backend
| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | FastAPI 0.135 + Uvicorn | Async REST API server |
| **Language** | Python 3.12 | Backend logic |
| **AI - Primary** | Claude Opus 4.6 (Anthropic) | Proposal generation, profiling, presentations |
| **AI - Secondary** | Azure OpenAI GPT-4.1 | QA routing, document summarization |
| **Agent Framework** | Claude Agent SDK | Tool-augmented AI agents with Read/Write/Bash access |
| **LLM Chains** | LangChain + LangGraph | Orchestration and workflow chaining |
| **Document AI** | Azure Document Intelligence | PDF/DOCX text extraction with layout |
| **Web Scraping** | Selenium, Patchright (Playwright), Firecrawl, Apify | Government portal automation |
| **Database** | Azure SQL Server (pyodbc) | Relational data storage |
| **Blob Storage** | Azure Blob Storage | Document and file storage |
| **Document Gen** | python-docx, docx-js (Node.js), python-pptx | DOCX and PPTX generation |
| **PDF Processing** | pdfplumber, PyMuPDF | PDF parsing and rendering |
| **Data Validation** | Pydantic v2 | Request/response models |
| **Real-Time** | SSE (sse-starlette) | Live progress streaming |
| **Auth** | Session cookies (24h TTL) | User authentication |

### Frontend
| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | React 18 + TypeScript | UI components |
| **Build Tool** | Vite 5 | Fast dev server + production builds |
| **Routing** | React Router v7 | Client-side navigation |
| **Code Editor** | Monaco Editor | Profile and proposal editing |
| **Rich Text** | React Quill | WYSIWYG editing |
| **Markdown** | react-markdown + remark-gfm | Markdown rendering with tables |
| **Charts** | Recharts | Cost analytics visualization |
| **HTTP Client** | Axios | API communication |
| **Icons** | Lucide React | UI iconography |
| **Notifications** | react-hot-toast | Toast messages |
| **Document** | docx (npm), turndown | DOCX generation, HTML-to-Markdown |

### Infrastructure & DevOps
| Category | Technology | Purpose |
|----------|-----------|---------|
| **Cloud** | Microsoft Azure | Hosting, AI services, database, storage |
| **Compute** | Azure App Service (B1 tier) | Application hosting |
| **Database** | Azure SQL Database | Managed SQL Server |
| **Container Registry** | Azure Container Registry | Docker image storage |
| **CI/CD** | GitLab CI/CD | Automated build and deploy on push to main |
| **Containerization** | Docker (multi-stage build) | Node.js frontend build + Python runtime |
| **Monitoring** | Azure App Service logs, custom cost tracking | Observability |

---

## Database Schema

The application uses **Azure SQL Server** with a dedicated `rfpscraper` schema containing 10+ tables:

**Core Data:**
- `rfp_listings` - Scraped RFP opportunities (solicitation number, agency, dates, status)
- `sam_gov_opportunities` - SAM.gov federal opportunities with AI-generated summaries
- `downloaded_files` - RFP attachments with Azure Blob Storage paths
- `download_attempts` - Audit trail for every download attempt (success/failure/method)
- `scraping_sessions` - Portal scraping runs with parameters and results

**AI Processing:**
- `rfp_document_index` - Section indexes generated by LLM analysis
- `rfp_sections` - Extracted section text content for Q&A retrieval
- `profiling_jobs` - Company profile generation job tracking
- `proposals` - Generated proposal documents and metadata

**Operations:**
- `cost_events` - Granular API cost tracking (service, operation, user, cost_usd)
- `activity_logs` - User action audit trail with JSON details
- `conversations` - Multi-turn conversation history with message JSON

---

## Key Engineering Decisions

### 1. Claude Agent SDK over Simple API Calls
Instead of using basic LLM chat completions for document generation, the platform uses the **Claude Agent SDK** which gives the AI agent access to file system tools (Read, Write, Glob, Grep, Bash). This allows the agent to:
- Read uploaded documents directly
- Write output files in structured formats
- Navigate complex multi-file inputs
- Self-correct by reading its own output

### 2. SSE Event Bus for Real-Time Updates
Long-running AI operations (proposal generation: 3-7 minutes, profiling: 3-5 minutes) use a custom **Server-Sent Events event bus** that bridges synchronous background threads to async FastAPI endpoints. Each client connection gets its own `asyncio.Queue`, and thread-safe publishing ensures no events are dropped.

### 3. Multi-Stage Docker Build
The Dockerfile uses a **two-stage build**: Stage 1 builds the React frontend with Node.js, Stage 2 creates the Python runtime with system dependencies (Chromium for scraping, ODBC drivers for SQL Server, Node.js for DOCX generation). This keeps the final image lean while supporting the complex dependency chain.

### 4. PageIndex QA Architecture
Rather than embedding entire documents into vector stores, the platform uses a **section-index approach**: the LLM first reads a compact section summary index to identify relevant sections, then retrieves full text only for those sections. This reduces token usage by 80-90% compared to full-document retrieval while maintaining answer quality.

### 5. Dual Browser Automation
The platform uses **both Selenium (Chrome) and Patchright (patched Playwright/Chromium)** for web scraping. Selenium handles traditional server-rendered portals, while Patchright handles JavaScript-heavy SPAs with anti-bot detection. This dual approach maximizes portal coverage.

### 6. Cost Transparency by Design
Every AI API call is wrapped with cost logging middleware that records: operation type, model used, input/output tokens, calculated cost in USD, user email, and timestamp. This enables real-time budget monitoring and per-user cost attribution -- critical for enterprise deployment.

### 7. Input/Output Sanitization Layer
All user text passing through LLM prompts is sanitized against prompt injection patterns (instruction overrides, role hijacking, ChatML token injection, prompt extraction attempts). LLM outputs are sanitized to strip any system prompt leakage. Implemented as a shared module with failsafe imports so sanitizer failures never break the pipeline.

### 8. GitLab CI/CD with Azure Continuous Deployment
On every push to `main`, GitLab CI builds the Docker image and pushes two tags to Azure Container Registry: `:latest` (triggers Azure's continuous deployment webhook) and `:<commit-sha>` (permanent record). Azure App Service automatically pulls the new `:latest` image and restarts.

---

## Security Measures

- **System Prompt Hardening**: All 13 LLM system prompts across 5 files hardened with anti-extraction preambles, role-locking, and injection resistance
- **Input Sanitization**: Regex-based pattern matching strips prompt injection attempts before text reaches LLM prompts (15+ injection pattern categories)
- **Output Sanitization**: LLM responses filtered for system prompt leakage fragments before reaching users
- **Session Authentication**: Cookie-based sessions with 24-hour TTL and protected route decorators
- **Non-Root Container**: Docker runs as `appuser` (UID 1000), not root
- **Health Checks**: Container health monitored via `/api/health` endpoint

---

## API Endpoints (30+)

**Authentication:** Login, logout, session management
**Profiling:** Create/upload/run/status/list/get/update/delete company profiles (9 endpoints)
**Proposals:** Upload/run/status/download/list proposals + PPT generation (8 endpoints)
**Conversations:** Create/get/message/stream conversations (4 endpoints)
**Costs:** Summary/personal/by-user/events cost analytics (4 endpoints)
**RFP Listings:** SAM.gov search/fetch/filter, state portals, document download (8+ endpoints)
**Uploads & QA:** Create project/upload files/index/ask questions (4 endpoints)

---

## Frontend Pages

| Page | Description |
|------|-------------|
| **RFP Listings** | Browse and filter SAM.gov opportunities with agency/state/NAICS filters |
| **Profiling Dashboard** | Upload company documents, generate AI profiles, edit with Monaco Editor |
| **Proposal Generator** | Select RFP + profile, generate tailored proposals, track generation progress |
| **Proposal Editor** | Split-view: DOCX section preview (left) + AI-powered section editing (right) |
| **Agent Conversation** | Multi-turn chat with structured blocks (thinking, checklists, progress, gaps) |
| **Upload & QA** | Upload custom documents, index them, ask questions with cited answers |
| **Cost Dashboard** | Interactive charts showing API costs by service, user, operation, and time |
| **Activity Logs** | Audit trail of all user actions across the platform |

---

## Project Stats

| Metric | Value |
|--------|-------|
| **Total Python Files** | 117 |
| **Total React/TS Files** | 55 |
| **SQL Migration Scripts** | 10 |
| **API Endpoints** | 30+ |
| **Database Tables** | 10+ |
| **LLM System Prompts** | 13 (all security-hardened) |
| **AI Models Used** | Claude Opus 4.6, GPT-4.1, Azure Document Intelligence |
| **Dependencies** | 60+ Python packages, 20+ npm packages |
| **Docker Image** | Multi-stage (Node 20 Alpine + Python 3.12 Slim) |
| **Deployment** | Azure App Service B1 + Azure SQL + Azure Blob Storage |
| **CI/CD** | GitLab CI -> ACR -> Azure Continuous Deployment |

---

## What Makes This Project Interesting

1. **End-to-End AI Pipeline**: Not just a chatbot -- it's a complete document intelligence system that takes raw government PDFs and produces polished, compliant proposal documents and presentations
2. **Multi-Agent Architecture**: Different Claude Agent SDK agents specialized for profiling (multimodal vision), proposal writing (document generation), and presentation creation (PPTX layout)
3. **Real-World Enterprise Deployment**: Production system used by a consulting firm, with cost tracking, user authentication, activity logging, and CI/CD
4. **Government Domain Complexity**: Handles the unique challenges of government contracting -- compliance matrices, evaluation criteria mapping, NAICS code filtering, set-aside requirements
5. **Human-in-the-Loop Design**: AI generates first drafts, but every output is editable -- profiles through Monaco Editor, proposals through section-level AI refinement, all with live preview
6. **Cost-Conscious AI**: Every API call tracked to the cent, with per-user attribution and real-time dashboards -- essential for enterprise AI adoption
7. **Browser Automation at Scale**: Dual-engine scraping (Selenium + Patchright) across 50+ government portals with session tracking and retry logic
