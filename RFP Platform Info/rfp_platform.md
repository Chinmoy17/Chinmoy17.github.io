# RFP Intelligence Platform

**An enterprise AI-powered government procurement system that automates the full lifecycle — from opportunity discovery on SAM.gov to AI-generated proposal documents, company profiling via SharePoint, and real-time cost analytics.**

Built as a production-grade SaaS platform deployed on Azure, this system replaces weeks of manual RFP analysis and proposal writing with an intelligent pipeline that reads, understands, and responds to federal solicitations.

---

## Architecture Overview

```
                         ┌──────────────────────────────────────────────────────┐
                         │              Azure App Service (Container)           │
                         │  ┌─────────────┐    ┌──────────────────────────┐     │
   Browser ──────────────┤  │   React SPA │    │     FastAPI Backend      │     │
                         │  │  (Vite/TS)  │───▶│   7 Routers · 80+ APIs  │     │
                         │  └─────────────┘    └──────────┬───────────────┘     │
                         └────────────────────────────────┼────────────────────┘
                                                          │
                     ┌────────────────────────────────────┼────────────────────────────┐
                     │                                    │                            │
              ┌──────▼──────┐   ┌─────────▼─────────┐   ┌▼──────────────────┐   ┌─────▼──────────┐
              │  Azure SQL  │   │  Azure Blob Store  │   │  AI Model Fleet   │   │  External APIs  │
              │   15+ tables│   │  Proposals/Profiles│   │  Claude · GPT-4.1 │   │  SAM.gov · Graph│
              │   pyodbc    │   │  RFP Docs · PPTXs  │   │  Doc Intelligence │   │  Firecrawl      │
              └─────────────┘   └────────────────────┘   └───────────────────┘   └────────────────┘
```

---

## System Design

### Multi-Model AI Architecture

The platform orchestrates four distinct AI services, each chosen for its strengths:

| Model | Provider | Role | Why This Model |
|-------|----------|------|----------------|
| **Claude Opus 4.6** | Anthropic (Agent SDK) | Full proposal generation, company profiling | Strongest reasoning for 50+ page document synthesis |
| **Claude Sonnet 4.6** | Anthropic (Direct API) | Conversation agent, annotation, vision OCR | Fast enough for interactive chat, strong at structured extraction |
| **GPT-4.1** | Azure OpenAI | RFP analysis, Q&A, section improvement | Excellent structured JSON extraction, cost-effective for high-volume |
| **Document Intelligence** | Azure AI | PDF/DOCX text extraction (prebuilt-layout) | Layout-aware extraction preserving tables and structure |

This isn't a single-LLM wrapper — each model handles the task it's best at, with prompt injection defenses (18 compiled regex patterns on input, 6 on output) applied at every boundary.

### Data Flow: Opportunity to Proposal

```
SAM.gov Search (Selenium/NAICS)
    │
    ▼
Firecrawl Description Enrichment ──▶ AI Summary Generation
    │
    ▼
Document Download + Azure Blob Storage
    │
    ▼
Azure Document Intelligence (OCR + Layout)
    │
    ▼
GPT-4.1 Structured Analysis ──▶ Section Index (PageIndex Pattern)
    │                                    │
    ▼                                    ▼
Company Profile (SharePoint Sync) ◀── Q&A System (Grounded Retrieval)
    │
    ▼
Claude Opus: Proposal Generation (DOCX)
    │
    ├──▶ Claude Sonnet: Annotation Pipeline (Parallel Batches)
    ├──▶ Claude Sonnet: Interactive Conversation Agent
    ├──▶ GPT-4.1: Section-Level AI Editing
    └──▶ PowerPoint Deck Generation
```

### Key Engineering Decisions

**PageIndex over Vector Search.** Instead of embedding documents into a vector store for retrieval, the system builds a hierarchical section index from extracted text. The LLM reads the index to identify relevant sections by number, retrieves only those sections, then generates grounded answers. This eliminates embedding drift, provides deterministic retrieval, and cuts token usage by 60-80% compared to RAG with large chunk overlap.

**Parallel Annotation with Semaphore Control.** The annotation pipeline splits proposal paragraphs into batches of 80 and runs all batches concurrently via `asyncio.gather()` with a semaphore capped at 3 simultaneous API calls. A 200-paragraph proposal completes annotation in near-single-batch wall-clock time rather than 3x sequential latency.

**Hybrid PDF Pipeline.** Text-layer pages go through `pdfplumber`. Pages yielding fewer than 20 characters are flagged as scanned/image pages, rendered to PNG at 200 DPI via PyMuPDF, and sent to Claude's vision API for OCR. Results merge back at the correct page index — no manual intervention for mixed-content PDFs.

**Session Cookies over JWT.** The auth system uses Starlette's `SessionMiddleware` with signed cookies (24-hour TTL) rather than JWT. SSO tokens are shared via a database table with HMAC hashing and one-time consumption — no network dependency on the partner auth system during validation.

**Blob-First Storage.** After successful upload to Azure Blob, local proposal directories are deleted via `shutil.rmtree()`. All subsequent operations download from Blob to a temp directory on demand. This keeps the container filesystem under 500MB regardless of proposal volume.

**Fire-and-Forget Cost Logging.** Every AI API call spawns a daemon background thread to write to the `cost_events` table. The main request path is never blocked by cost tracking — if the logging thread fails, it prints and swallows the error.

---

## Backend Architecture

### FastAPI Application

Single-process FastAPI server running under Uvicorn, serving both the API and the Vite-built React SPA in production.

**Router Modules:**

| Router | Prefix | Responsibilities |
|--------|--------|-----------------|
| Authentication | `/auth` | SSO callback, manual login, session management |
| Proposals | `/api/proposals` | Upload, generate, annotate, edit, download, PPT generation |
| Conversation | `/api/conversation` | AI agent pipeline with multi-turn context |
| Profiling | `/api/profiling` | SharePoint company profile management |
| SharePoint | `/api/sharepoint` | Graph API integration, webhook notifications, sync |
| Costs | `/api/costs` | AI spend analytics, operational metrics, Doc Intelligence usage |
| Activity | `/api/activity` | User action audit trail |

Plus inline routes in the main module for SAM.gov operations (search, fetch, enrichment), RFP analysis triggers, Q&A endpoints, file uploads, download management, and search sessions.

### Background Services (Started on Boot)

1. **Operational Metrics Collector** — Daily cron (2 AM) collecting Azure SQL DTU utilization and Blob storage metrics
2. **SharePoint Profile Scheduler** — APScheduler cron syncing company profiles from SharePoint document libraries
3. **Microsoft Graph Webhooks** — Subscription to SharePoint drive change notifications for real-time file-upload sync

### Database Design (Azure SQL, 15+ Tables)

**Core domain tables:**
- `sam_gov_opportunities` — SAM.gov raw data with NAICS codes, state filters, AI-generated summaries
- `rfp_listings` — Processing pipeline state per RFP
- `downloaded_files` — File metadata with Blob storage paths
- `background_jobs` — Persisted job state (survives server restarts, auto-cancels stale jobs after 30 min)
- `proposals` — Proposal metadata linking to 6+ Blob artifacts (DOCX, annotated DOCX, provenance JSON, PPTX, diagrams)
- `company_profiles` — Profile metadata pointing to consolidated markdown files in Blob

**Q&A system tables:**
- `document_indexes` + `document_sections` — PageIndex hierarchical section storage
- `qa_conversations` + `qa_messages` — Multi-turn Q&A with chat history
- `upload_projects` + `uploaded_files` — User-uploaded document management

**Operational tables:**
- `cost_events` — Per-call AI cost tracking (tokens, USD, model, operation type)
- `operational_metrics` — Daily Azure resource utilization snapshots
- `doc_intelligence_usage` — Free tier consumption monitoring (500 pages/month)
- `activity_logs` — Full user action audit trail
- `search_sessions` — Named SAM.gov search configurations

**Auth tables (shared with partner system):**
- `bmdd_users` — User accounts with bcrypt password hashing
- `bmdd_sso_tokens` — One-time SSO tokens with HMAC hashing and expiration

### Azure Blob Storage Hierarchy

```
proposals/{rfp_name}/
    proposal.docx                  # Generated proposal
    proposal_annotated.docx        # AI-annotated with yellow highlights
    annotation_provenance.json     # Per-paragraph source tracing
    proposal.pptx                  # Generated presentation deck
    rfp_input/{files}              # Original uploaded RFP documents

profiles/{profile_name}/
    profile.md                     # Consolidated company profile

downloads/{solicitation_number}/
    {files}                        # Downloaded SAM.gov documents

upload_projects/{upload_id}/
    {files}                        # User-uploaded documents
```

---

## AI Pipeline Deep Dive

### Conversation Agent (Claude Sonnet 4.6 via Agent SDK)

The most sophisticated component. A multi-step pipeline that runs in a background thread with polling-based message delivery.

**Automated analysis (runs on first open):**
1. **Thinking** — Extracts full RFP text (DOCX/PDF/TXT/MD), emits animated thinking block with word count
2. **Summary** — Structures a JSON card: title, agency, deadline, budget, scope, evaluation criteria
3. **Classification** — Confidence-scored alignment assessment with reasoning

**User-driven interactive steps (chosen from suggestion pills):**
- **Profile Search** — Queries SharePoint company profile for relevant past performance
- **Document Requirements** — Identifies all required submission documents with generation strategy (auto-generate / template-only / manual)
- **Deliverables Assessment** — Per-deliverable readiness scoring (ready / partial / gap with percentages)
- **Gap Analysis** — Surfaces gaps and partial items from deliverable context
- **Generation Strategies** — Context-aware action recommendations

**Intent Detection:** Keyword fast-path over ordered phrase lists, falling back to Claude semantic classification when no keyword matches. Six valid intents: `generate`, `deliverables`, `gaps`, `profile_search`, `document_requirements`, `chat`.

**Prompt Architecture:** All prompts live in a single `skill.md` file partitioned by HTML comment delimiters (`<!-- SECTION: key_name -->`). A parser builds a cached dict on first load — version-controlled prompt engineering without code deployments.

**Context Cache:** In-memory dict keyed by conversation ID with 6-hour TTL eviction. Stores extracted text, summary, classification, deliverables, past work, and document requirements across turns.

### Annotation Pipeline (Claude Sonnet 4.6, Direct API)

1. Extract all RFP source text from input files
2. Extract every paragraph from the generated proposal with positional indices
3. Split paragraphs into batches of 80
4. Run all batches through Claude concurrently (semaphore: 3 max)
5. Each batch returns `{paragraph_index, proposal_text, rfp_source}` matches
6. Merge results, apply yellow DOCX highlighting by splitting/reassembling OOXML runs
7. Save annotated DOCX + provenance JSON to Azure Blob

### RFP Analysis (GPT-4.1 via Azure OpenAI)

Extracts structured fields from solicitation documents: contract type, submission method, contract term, background/context, problem statement, scope of work, evaluation criteria, technical requirements, incumbent information. General metadata (title, agency, dates, POC) comes pre-filled from the SAM.gov API — the LLM focuses only on document-specific extraction.

Output formats: structured JSON, Excel (with formatted sheets), CSV, JSON download.

### Section-Level Editing (GPT-4.1)

Users can select any proposal section and provide editing instructions. The system:
1. Sanitizes user input through 18 compiled regex patterns (prompt injection defense)
2. Sends section content + instructions to GPT-4.1 with a hardened system prompt
3. Sanitizes LLM output through 6 patterns catching accidental system prompt leakage
4. Returns the improved section for inline preview and acceptance

---

## SAM.gov Integration

### Multi-Strategy Scraping

1. **Smart API Fetch** — Only calls the SAM.gov API if the requested date range extends beyond cached data. Supports force-refresh.
2. **Selenium Scraper** — Headless Chrome scraping SAM.gov search results by NAICS codes and state filters, with session tracking for saved searches.
3. **Firecrawl Enrichment** — After basic metadata scraping, Firecrawl fetches full opportunity descriptions from detail pages, chained with AI summary generation in a background pipeline.
4. **SLED Portal Agent** — Extensible agent for state/local/education procurement portals.
5. **Keyword Expansion Agent** — AI-powered search term broadening for comprehensive opportunity discovery.

### Enrichment Pipeline

A background chain runs per-opportunity after scraping:
```
Firecrawl scrape ──▶ DB update ──▶ AI summary generation
```
Progress tracked in-memory with per-batch error detail (last 10 errors retained). 24-hour TTL eviction prevents unbounded memory growth.

---

## SharePoint Integration

Full bidirectional SharePoint integration via Microsoft Graph API for enterprise company profile management.

**OAuth2 Client Credentials Flow** — Token cached with 60-second expiry buffer. Supports file listing (paginated), download, upload (simple PUT ≤4MB, resumable upload session >4MB in 10MB chunks), folder management, and deletion.

**Delta Sync** — Uses `sp_etag` from SharePoint item metadata for change detection. Only downloads files that have actually changed since last sync.

**Real-Time Webhooks** — Registers a Microsoft Graph change notification subscription. When files are uploaded to SharePoint, Graph sends a webhook notification triggering immediate incremental sync — no polling delay.

**Profile Consolidation** — All documents in a SharePoint profile folder are processed and consolidated into a single `profile.md` markdown file, stored in Azure Blob and used by the proposal generation agent as company context.

---

## Frontend Architecture

### Tech Stack

React 18 + TypeScript + Vite 5 + Tailwind CSS 4. No Redux — state managed with React local state plus a single `AuthContext` for session management.

### Pages

| Page | Description |
|------|-------------|
| **Landing Dashboard** | Animated stat counters (active proposals, company profiles, RFPs collected, documents uploaded), recent projects, quick-action cards |
| **SAM.gov Opportunities** | Filterable table with NAICS multi-select, state/agency/date filters, bulk download, AI analysis trigger |
| **RFP Listings** | Downloaded RFP management with status indicators and file previews |
| **Proposal Generator** | Card-based proposal list with 9+ action buttons per card: Chat, View, Edit, Download, RFP Files, Annotate, Generate PPT, More |
| **Proposal Editor** | Split-view side-by-side editor with AI-assisted section editing and real-time preview |
| **AI Conversation** | Multi-step agent pipeline with rich block rendering (thinking animations, summary cards, checklists, gap analysis, action pills) |
| **SharePoint Profiling** | Company profile management with sync status, file counts, and manual trigger |
| **Upload & Q&A** | Upload custom RFP documents and run multi-turn Q&A with PageIndex retrieval |
| **Cost Dashboard** | Recharts-powered analytics: cost breakdown by service/model/operation, daily trends, Doc Intelligence free-tier gauge, operational metrics |
| **Activity Logs** | Audit trail with category filters and user attribution |

### Conversation Block System

The AI conversation renders 10 specialized block types through a `RichBlockRenderer` dispatcher:

- **ThinkingBlock** — Animated step indicators during AI processing
- **CardBlock** — Key-value summary tables (RFP metadata)
- **ChecklistBlock** — Deliverables with readiness status badges (ready/partial/gap)
- **GapsBlock** — Prioritized gap item lists
- **PillBlock** — Classification badges with confidence scores
- **ProgressBlock** — Multi-phase generation progress tracking
- **ActionsBlock** — Primary/secondary action buttons (suggestion choices)
- **ChoiceBlock** — Confirmation dialogs
- **AttachmentsBlock** — File attachment display with download links

### UI/UX Design

- **Dark/light mode** with CSS custom properties, persisted in localStorage
- **Collapsible sidebar** with tooltip hints in collapsed state and mobile drawer
- **Driver.js spotlight walkthrough** — Step-by-step onboarding tour highlighting each feature
- **Responsive grid layouts** — 4-column → 2-column → 1-column at breakpoints
- **Glassmorphism header** with backdrop-filter blur

---

## Infrastructure & Deployment

### Containerization

Two-stage Docker build:

1. **Frontend stage** (`node:20-alpine`) — `npm ci` + Vite production build
2. **Production stage** (`python:3.12-slim`) — Chromium for Selenium, Node.js 20 for DOCX processing, ODBC Driver 18 for SQL Server, Google Chrome, Patchright browser automation, non-root user execution

### CI/CD Pipeline (GitLab CI)

```
Push to main ──▶ Docker build ──▶ Tag (commit SHA + latest) ──▶ Push to ACR ──▶ Azure CD webhook
```

Azure App Service configured with continuous deployment from ACR `latest` tag — zero-downtime rolling updates.

### Azure Service Map

| Service | Purpose |
|---------|---------|
| **App Service** | Container hosting (Linux, Docker) |
| **Container Registry** | Image repository with CI/CD integration |
| **SQL Database** | Primary data store (15+ tables, Basic tier) |
| **Blob Storage** | Document and artifact storage |
| **OpenAI Service** | GPT-4.1 deployment for analysis and editing |
| **Document Intelligence** | Layout-aware text extraction |

---

## Cost & Operational Monitoring

### AI Cost Tracking

Every AI API call is logged to `cost_events` with:
- Operation type, service, model
- Input/output token counts
- Calculated USD cost (configurable pricing constants with env-var overrides)
- User attribution

**Pricing tracked:**
- Claude Opus/Sonnet: Per-million-token rates (input/output)
- Claude Agent SDK: Direct `cost_usd` from SDK response
- GPT-4.1: $0.002/1K input, $0.008/1K output
- Document Intelligence: Per-page with free-tier monitoring (500 pages/month)

### Operational Metrics

Daily automated collection of:
- Azure SQL DTU utilization (average and peak)
- SQL storage consumption (MB)
- Blob storage volume (GB) and object count
- Estimated daily cost (SQL + Blob)

### Dashboard Views

- Total spend with service/model/operation breakdown
- Daily cost trend charts (Recharts)
- Per-user cost attribution (admin view)
- Document Intelligence free-tier gauge
- Azure infrastructure utilization over time

---

## Security

- **Input sanitization**: 18 compiled regex patterns neutralizing prompt injection (instruction override, role hijacking, ChatML token injection, prompt extraction attempts)
- **Output sanitization**: 6 patterns catching accidental system prompt leakage in LLM responses
- **SSO tokens**: HMAC-hashed, one-time consumption, time-bounded expiration
- **Password storage**: bcrypt hashing
- **Session security**: Signed cookies with 24-hour TTL, SameSite=Lax
- **Non-root container**: Application runs as `appuser` (UID 1000)
- **Role-based access**: Admin/super_admin gates on cost and operational data
- **Credential isolation**: All secrets via environment variables, never in code

---

## Scale & Performance Characteristics

- **Concurrent annotation**: 3-way parallel API calls reduce annotation time from O(n) to O(n/3)
- **Background job persistence**: SQL-backed jobs survive server restarts with automatic stale job cleanup (30-min timeout, 5-min check interval)
- **Delta sync**: SharePoint integration only transfers changed files via etag comparison
- **Smart API caching**: SAM.gov fetches skip API calls when date ranges are already cached
- **Blob-first storage**: Container filesystem stays under 500MB regardless of proposal volume
- **TTL caches**: File-count cache (120s), context cache (6h), enrichment jobs (24h) — bounded memory with automatic eviction
- **Streaming responses**: Large file downloads served via `StreamingResponse` with blob chunk generators

---

## Technical Decisions & Trade-offs

| Decision | Alternative Considered | Rationale |
|----------|----------------------|-----------|
| PageIndex QA over vector RAG | Embedding + cosine similarity | Deterministic retrieval, no embedding drift, 60-80% token savings |
| Session cookies over JWT | JWT with refresh tokens | Simpler revocation, no token size bloat, shared DB with partner system |
| Multi-model fleet over single LLM | All-Claude or all-GPT | Each model excels at its task; cost-optimized routing |
| SQL job persistence over Redis | In-memory dict, Redis queue | Eliminates Redis dependency, jobs survive restarts, simple CRUD |
| Selenium + Firecrawl over API-only | SAM.gov API exclusively | API has rate limits and missing fields; Selenium captures full search results |
| skill.md prompt files over DB prompts | Database-stored prompts, prompt management UI | Version control, code review for prompt changes, zero-latency reads |
| Fire-and-forget cost logging over sync | Synchronous DB writes per API call | Zero added latency on AI requests; cost data is eventually consistent |
| Blob-first with local cleanup over persistent local storage | Keep files on container disk | Container disk is ephemeral and size-limited; Blob is durable and scalable |

---

## What I Built

This platform is the product of end-to-end engineering across the full stack:

- **Designed the multi-model AI architecture** — choosing the right model for each task based on capability, latency, and cost trade-offs
- **Built the conversation agent pipeline** from scratch using Claude's Agent SDK with multi-step automated analysis and interactive user-driven exploration
- **Engineered the annotation system** with parallel batch processing and OOXML-level document manipulation for inline highlighting
- **Implemented the hybrid PDF pipeline** combining text extraction with vision OCR for mixed-content documents
- **Designed the PageIndex QA pattern** as a lightweight alternative to vector RAG, achieving better accuracy with lower token usage
- **Built the SharePoint integration** with delta sync, webhook-driven real-time updates, and resumable large-file uploads
- **Architected the cost tracking system** with fire-and-forget logging, configurable pricing, and operational metrics collection
- **Designed the database schema** (15+ tables) with background job persistence, stale job detection, and TTL-based cleanup
- **Built the full React frontend** with 10 pages, rich conversation block rendering, dark/light theming, and responsive layouts
- **Set up the CI/CD pipeline** with Docker multi-stage builds, GitLab CI, and Azure continuous deployment
- **Implemented security hardening** including LLM input/output sanitization, SSO token security, and role-based access control

The system processes real federal RFPs daily, generating production-quality proposals that have been used in actual government contract submissions.
