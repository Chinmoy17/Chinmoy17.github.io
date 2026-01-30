/**
 * AgentFlow Project Data
 * Full case study content for the AgentFlow project.
 * This data was extracted from resume.json to enable dedicated component rendering.
 */

const agentFlowData = {
  id: "agentflow",
  slug: "agentflow",
  visibility: "private",
  category: "project",
  featured: true,
  title: "AgentFlow — Modular AI Workflow Orchestration Platform",
  stack: [
    "Azure OpenAI",
    "FastAPI",
    "React + TypeScript",
    "LangChain + FAISS",
    "DSPy (GEPA)",
    "Azure Container Apps",
    "Docker",
    "Serper API",
    "SSO/JWT",
  ],
  summary:
    "A modular AI workflow platform for internal teams: chat + web search, SharePoint RAG, email summarization, and self-service deployments to Azure Container Apps (SSO/private).",
  links: { demo: null, repo: null },

  // Case Study Content
  tldr: [
    "In the AI boom, demo turnaround time = competitive advantage. We built AgentFlow to ship POCs in minutes, not weeks.",
    "Prompt-to-app workflow: describe what you need, pick capabilities (RAG/Chat/Search), deploy to Azure Container Apps instantly.",
    "Sales teams close deals faster; engineering teams harden later. Win-win.",
  ],

  hero: {
    src: "/assets/projects/agentflow/Gemini_Generated_Image_3gx6fp3gx6fp3gx6.png",
    caption: "AgentFlow: Orchestrating AI agents through a unified Tool Gateway Service.",
  },

  atAGlance: {
    role: "Application Developer (AI/ML)",
    scope:
      "Designed and built core platform capabilities: orchestration services, RAG/search/summarization integrations, and self-service deployment workflow to provision isolated demo instances.",
    stack: "FastAPI • Azure OpenAI • DSPy (GEPA) • LangChain + FAISS • Azure Container Apps • React/TS",
  },

  intro: `In enterprise AI, the sales cycle moves fast—sometimes too fast. A prospect asks for a demo. Your team scrambles for weeks building a one-off POC. By the time it's ready, the client has moved on or a competitor has shipped first. The AI market is blooming, and velocity wins.

We needed a way to go from idea to live demo in minutes, not sprints. Enter AgentFlow: a platform where you describe what you want, select capabilities (chat, RAG, web search, summarization), and hit deploy. Within minutes, you have a shareable URL. Sales teams impress prospects and close deals faster. Engineering teams can harden and optimize the full product later—after the contract is signed.`,

  workflow: [
    "User selects capabilities (chat/search/RAG/email) and provides minimal configuration",
    "Backend orchestrates workflows (chat routing + tool calls) with standard request/response contracts",
    "RAG indexes enterprise documents (SharePoint ingestion → chunking → embeddings → FAISS)",
    "DSPy-optimized prompts produce consistent summaries and responses",
    "Self-service deploy provisions a new Azure Container App from a prebuilt base image (ACR)",
    "SSO/JWT gating ensures internal-only access; deployments can be expired/cleaned up",
  ],

  methods: [
    'Modular "Lego block" architecture: each capability (RAG, Search, Email) is a standalone service. Mix and match per deployment.',
    "Web search via Serper API; enterprise RAG via LangChain + FAISS (SharePoint ingestion, automatic chunking, citation-ready sources).",
    "DSPy + GEPA for prompt optimization: we iterate prompts using evaluation-driven rubrics (not vibes).",
    "Self-service deployment API: provisions Azure Container Apps from a prebuilt image (ACR), injects secrets, returns a live URL.",
    'MCP-inspired "tool rental" pattern: services register dynamically; the LLM discovers them at runtime (no brittle hardcoding).',
  ],

  results: [
    "Demo turnaround: minutes instead of weeks. Sales teams can respond to RFPs and prospect requests same-day.",
    "Deployment velocity: ~3-5 minutes from prompt to live URL. Document indexing: ~1000 docs in ~10 minutes.",
    "Consistent quality: DSPy optimization + evaluation loops reduced hallucinations and improved answer relevance.",
    "Scalable foundation: same platform powers knowledge assistants, email triage, competitive intelligence, and custom POCs.",
  ],

  constraints: ["Some work is internal/private; public code links may be unavailable."],

  sections: [
    {
      id: "how-it-works",
      title: "How it works",
      content: `We started with scattered Python scripts and one-off demo codebases. Every new client request meant copy-pasting old code and praying it worked. We needed a unified platform.

AgentFlow is layered: React for the frontend, FastAPI for orchestration, and a modular backend. The magic is in the "Lego block" design—RAG, Email, Web Search, and Chat are independent, composable modules. You pick what you need; the platform assembles the runtime.`,
      image: "/assets/projects/agentflow/Untitled diagram-2026-01-16-082542.png",
      caption: "The layered architecture: frontend, orchestration, and modular services.",
      bullets: [
        "Frontend: chat UI, document explorer, search viewer, deployment console",
        "Backend: chat/email/RAG/deploy APIs + orchestration services",
        "Core services: Azure OpenAI, DSPy (GEPA), LangChain + FAISS, Serper search",
        "Security: SSO/JWT gated access for internal use",
      ],
    },
    {
      id: "experience",
      title: "The Experience: From Chat to Deployment",
      steps: [
        {
          title: "1. The AI Agent Interface",
          text: "The journey starts in a familiar chat interface. Here, the user describes their intent. The agent (powered by Azure OpenAI) isn't just a chatbot; it's a router connected to our internal tool registry.",
          image: "/assets/projects/agentflow/Screenshot 2026-01-26 162743.png",
          caption: "The entry point: A clean, capability-aware chat interface.",
        },
        {
          title: "2. Defining Capabilities",
          text: "Based on the user's request, the agent suggests a set of capabilities—Chat, RAG, Web Search, or Email Summarization. This is the 'Lego block' concept in action.",
          image: "/assets/projects/agentflow/Screenshot 2026-01-26 162926.png",
          caption: "Capability selection: Mixing and matching modules.",
        },
        {
          title: "3. Configuration & Guardrails",
          text: "Once capabilities are chosen, the system generates a configuration form. This ensures we capture necessary constraints (like expiry date, investor ID, or access level) before provisioning.",
          image: "/assets/projects/agentflow/Screenshot 2026-01-26 162948.png",
          caption: "Dynamic configuration based on selected tools.",
        },
        {
          title: "4. Orchestration Plan",
          text: "The backend compiles a deployment plan. It maps the user's intent to specific Azure resources and container images.",
          image: "/assets/projects/agentflow/Screenshot 2026-01-26 163013.png",
        },
        {
          title: "5. One-Click Deployment",
          text: "With a single click, the deployment API triggers. It provisions a new Azure Container App, injects secrets, and sets up the networking.",
          image: "/assets/projects/agentflow/Screenshot 2026-01-26 163029.png",
          caption: "Provisioning in progress...",
        },
        {
          title: "6. Live Demo Instance",
          text: "Within minutes, a fully functional, isolated demo environment is live. The user gets a unique URL to share with stakeholders.",
          image: "/assets/projects/agentflow/Screenshot 2026-01-26 163236.png",
          caption: "Success: A dedicated URL for the new app.",
        },
        {
          title: "7. Document Ingestion (RAG)",
          text: "If RAG was selected, the instance includes a self-service document uploader. Files are processed, chunked, and indexed into FAISS instantly.",
          image: "/assets/projects/agentflow/Screenshot 2026-01-26 163258.png",
          caption: "Built-in document processing and vectorization.",
        },
      ],
    },
    {
      id: "tool-discovery",
      title: "Dynamic tool discovery",
      content: `Early versions had hardcoded function calls. Every new integration meant updating the orchestration layer. Fragile and slow.

We switched to a "tool rental" model inspired by MCP (Model Context Protocol). Services register themselves with schemas. At runtime, the LLM asks "what tools are available?" and discovers web search, RAG, email send, etc. This decouples the agent from the services and makes adding new capabilities trivial.`,
      bullets: [
        "Dynamic discovery: list tools at runtime (schemas + examples) to guide the LLM",
        "Unified execution: tool_name + arguments routed to the right service",
        "External tools: proxied endpoints + UI tool selection (safe integration surface)",
      ],
    },
    {
      id: "whats-next",
      title: "What's next: Tool Gateway Service",
      image: "/assets/projects/agentflow/Gemini_Generated_Image_c7prgrc7prgrc7pr.png",
      caption:
        "The vision: a centralized gateway where any internal tool or external API plugs in and becomes discoverable.",
      content: `Right now, AgentFlow works beautifully for our core use cases. But as we add more clients and more custom integrations, the tool registry is becoming a bottleneck.

The next evolution is a Tool Gateway Service: a unified layer that handles tool registration, auth/permissions, observability, rate limiting, and error handling. Think of it as an API gateway, but for AI agent tools. Any team can publish a tool (internal microservice or external API), and agents can discover and use it—no central coordination required.`,
      bullets: [
        "Standard contracts for tool schemas and execution results",
        "Safer routing (input validation + structured failures)",
        "Better scalability for adding new tools without UI/backend drift",
      ],
    },
  ],

  nextUpdates: [
    "Add redacted screenshots and an architecture diagram gallery",
    'Publish a concise "capability matrix" for chat/search/RAG/email/deploy',
    "Document Tool Gateway milestones and rollout plan",
  ],
};

export default agentFlowData;
