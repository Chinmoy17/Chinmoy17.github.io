/**
 * Codeblocks case-study content.
 * Screenshots live in /public/assets/projects/codeblocks/. Captions state what each image is.
 */

const publicUrl = process.env.PUBLIC_URL || "";
const img = (name) => `${publicUrl}/assets/projects/codeblocks/${name}`;

const codeblocksData = {
  id: "codeblocks",
  slug: "codeblocks",
  title: "Codeblocks: Evidence-Driven Security Analysis for Python and AI-Agent Code",
  tagline: "Follow the code behind every security finding.",
  summary:
    "A web-based security analysis platform that turns Python and AI-agent source into an explorable security model, connecting each finding to its call path, source evidence, and remediation, without running the uploaded application.",
  liveUrl: "https://codeblocks-g8bvbjcgewa4cnhq.eastus-01.azurewebsites.net",

  stats: [
    { value: "4", label: "Workspace views" },
    { value: "3", label: "Graph views" },
    { value: "0", label: "Lines of uploaded code executed" },
    { value: "0", label: "LLM calls in the analysis engine" },
  ],

  problem: {
    title: "A warning on its own is hard to act on.",
    lead: "Most scanners hand back a list of flagged lines. The developer still has to work out whether that line is reachable, who can call it, and what to change. Codeblocks starts from the opposite end: the structure of the application.",
    points: [
      {
        title: "Isolated warnings",
        body: "A finding without context forces developers to interpret a line of code on its own, away from the application that gives it meaning.",
      },
      {
        title: "Unclear reachability",
        body: "A dangerous operation matters differently when an unauthenticated route can reach it. That relationship lives in the call structure, not in the flagged line.",
      },
      {
        title: "Reviews that don't persist",
        body: "A fix branch, a release, and an earlier review are usually separate artifacts. Without versioned snapshots, it is hard to see what changed between reviews.",
      },
    ],
  },

  pipeline: [
    { step: "Upload", detail: "A repository ZIP is assigned to a project with a version label. Branch and commit can be recorded alongside it." },
    { step: "Parse", detail: "Python source is read into abstract syntax trees. The application is never imported or executed." },
    { step: "Resolve", detail: "Relationships between modules and functions are resolved into a graph of imports, calls, classes, and ownership." },
    { step: "Evaluate", detail: "Deterministic rules inspect those facts for security-relevant patterns, with no model in the loop." },
    { step: "Report", detail: "Findings carry source locations, evidence, code excerpts, CWE and OWASP classifications, and a probable fix." },
    { step: "Preserve", detail: "Each analysis is saved as a versioned snapshot, so earlier reviews stay open to inspection." },
  ],

  views: [
    {
      name: "Overview",
      detail: "Findings and severity distribution, application entry points, call-resolution coverage, code size, and analysis status.",
    },
    {
      name: "Graph",
      detail: "An interactive canvas with Imports, Calls, and Structure views. Select a finding to trace its path through callers, helpers, and file or class ownership.",
    },
    {
      name: "Report",
      detail: "Detailed findings with locations, descriptions, evidence, code excerpts, security classifications, and remediation guidance with before-and-after code.",
    },
    {
      name: "Versions",
      detail: "A history of saved analyses with labels, branches, commits, upload information, finding counts, and links back to each version's graph and report.",
    },
  ],

  gallery: [
    {
      file: "landing-hero.png",
      alt: "Codeblocks landing page with a sample finding showing model output reaching a shell command",
      caption: "Landing page. The sample finding shows a reachable path from a POST route to a shell command.",
    },
    {
      file: "analysis-preview.png",
      alt: "Codeblocks analysis summary showing findings, risky paths, call coverage, and lines of code",
      caption: "Analysis summary for a sample repository: severity distribution, risky paths, call coverage, and code size.",
    },
    {
      file: "risk-path.png",
      alt: "Illustrated path from an untrusted user message through a length-only guard to the model prompt",
      caption: "Path view (illustrative scene from the product): an untrusted input, the guard it passes through, and the point where it reaches the model.",
    },
    {
      file: "version-history.png",
      alt: "Illustrated version history showing saved uploads with branch names and commits",
      caption: "Version history (illustrative scene from the product): saved uploads with branch and commit metadata.",
    },
    {
      file: "finding-detail.png",
      alt: "Expanded Codeblocks finding with evidence, code excerpt, CWE and OWASP tags, and a probable fix",
      caption: "An expanded command-execution finding from a sample repository.",
    },
  ],

  findingNotes: [
    { title: "Reachability evidence", body: "The shell call is reachable without authentication from a named route, with its file and line." },
    { title: "Classification", body: "CWE and OWASP categories plus a confidence level, so triage does not start from zero." },
    { title: "Source excerpt", body: "The code at the flagged location, shown next to the explanation." },
    { title: "Probable fix", body: "Ordered remediation steps, with before-and-after code where it applies." },
  ],

  coverage: {
    app: [
      "Hard-coded credentials",
      "Token verification settings",
      "Missing authentication",
      "Command execution",
      "Dynamic code evaluation",
      "Unsafe deserialization",
      "Permissive CORS configuration",
      "Development-server settings",
    ],
    agent: [
      "Prompt-injection exposure",
      "Input-guard behavior",
      "Model-output paths reaching dangerous operations",
      "Agent-tool capabilities",
      "System-prompt characteristics",
    ],
    guardNote:
      "Supported input guards can be evaluated against fixed probe prompts through a bounded interpreter. The check is repeatable and makes no live model API calls.",
    findingAnatomy: [
      "Severity and confidence",
      "File and line references",
      "Relevant code snippets",
      "CWE and OWASP classification",
      "Probable fix with before-and-after code",
    ],
  },

  architecture: [
    {
      title: "Frontend",
      body: "Next.js, React, and TypeScript with shared design tokens and CSS Modules. The repository graph is drawn on HTML Canvas with a force-directed layout. GSAP ScrollTrigger and Three.js drive the landing page's scroll-linked explanations and version-history scenes.",
    },
    {
      title: "Analysis backend",
      body: "Python and FastAPI. The pipeline is split into plugins for repository discovery, parsing, graph construction, call resolution, rule evaluation, AI-agent surface analysis, and finding aggregation.",
    },
    {
      title: "Storage",
      body: "Analysis artifacts are structured JSON records behind a storage abstraction. Graph data, findings, summaries, and version metadata are stored separately, which supports saved projects and reopening earlier analyses.",
    },
    {
      title: "Deployment",
      body: "Containerized with Docker. One image runs the Next.js interface and the FastAPI service together on Azure App Service, with browser API requests forwarded through the web application to the backend.",
    },
  ],

  privacy: [
    {
      title: "Transient inputs",
      body: "Uploaded archives and extracted source are removed after analysis. Saved artifacts hold the graph, findings, metadata, and relevant evidence excerpts, not a copy of the repository.",
    },
    {
      title: "Defensive archive handling",
      body: "Extraction guards against unsafe paths, symbolic links, oversized files, and excessive expansion.",
    },
    {
      title: "Access control",
      body: "Single sign-on through the ByteMethod Demo Dashboard (SQL Server-backed user directory, single-use token exchange), plus account sign-in, signed session cookies, access-key authentication, and administrative deletion permissions.",
    },
    {
      title: "Guest preview",
      body: "A signed-out visitor can analyse one repository and see full finding and risky-path counts plus the three highest-priority findings. The backend enforces the limits through restricted payloads, ownership cookies, private storage, and quota controls. Signing in unlocks the complete saved analysis without another upload.",
    },
  ],

  outcomes: [
    "Turns source code into an explorable security model.",
    "Connects potential vulnerabilities to concrete call paths and source evidence.",
    "Analyses Python applications and AI-agent workflows without running their code.",
    "Produces deterministic results without live LLM calls.",
    "Preserves review context across versions, branches, and commits.",
    "Makes technical findings approachable through interactive visualization and clear remediation.",
  ],

  stack: [
    "Python",
    "FastAPI",
    "Next.js",
    "React",
    "TypeScript",
    "HTML Canvas",
    "Three.js",
    "GSAP",
    "Docker",
    "Azure App Service",
  ],
};

export default codeblocksData;
