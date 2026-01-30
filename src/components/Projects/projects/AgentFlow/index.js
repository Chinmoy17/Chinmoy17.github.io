import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Badge } from "react-bootstrap";
import ProjectTemplate from "../../ProjectTemplate";
import data from "./data";
import styles from "./AgentFlow.module.css";

/**
 * AgentFlow Project - Dedicated Component
 * A blog-style case study for the AgentFlow AI workflow platform.
 */
function AgentFlowProject() {
  const [lightbox, setLightbox] = useState(null);
  const [zoom, setZoom] = useState(1);

  const openLightbox = (payload) => {
    setZoom(1);
    setLightbox(payload);
  };
  const closeLightbox = () => setLightbox(null);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 4));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const resetZoom = () => setZoom(1);

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  };

  useEffect(() => {
    if (!lightbox) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox]);

  const zoomProps = (src, alt, caption) => ({
    role: "button",
    tabIndex: 0,
    onClick: () => openLightbox({ src, alt, caption }),
    onKeyDown: (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox({ src, alt, caption });
      }
    },
  });

  // Build table of contents
  const toc = [
    { id: "hook", title: "Overview" },
    { id: "problem", title: "The Problem" },
    { id: "solution", title: "The Solution" },
    { id: "workflow", title: "How It Works" },
    { id: "experience", title: "The Experience" },
    { id: "architecture", title: "Architecture" },
    { id: "outcomes", title: "Results" },
    { id: "next", title: "What's Next" },
  ];

  const heroImageSrc = "/assets/projects/agentflow/Gemini_Generated_Image_c7prgrc7prgrc7pr.png";
  const heroImageAlt = "AgentFlow 3D Concept - Tool Gateway Service";
  const heroImageCaption = "AgentFlow: A unified gateway where AI agents discover and orchestrate tools dynamically";

  // Custom Hero Section
  const heroSection = (
    <header className={styles.hero}>
      {/* Title and badges */}
      <div className={styles.heroTop}>
        <h1 className={styles.heroTitle}>{data.title}</h1>
        <div className={styles.heroBadges}>
          <Badge className={styles.heroBadgePrivate}>Private / SSO</Badge>
          <Badge className={styles.heroBadgeType}>Enterprise AI</Badge>
          <Badge className={styles.heroBadgeType}>Internal Tool</Badge>
        </div>
      </div>

      {/* Hook / Tagline */}
      <div className={styles.heroHook}>
        <p className={styles.heroTagline}>
          <span className={styles.heroHighlight}>Ship AI demos in minutes, not weeks.</span>{" "}
          A modular platform that lets teams build, configure, and deploy AI-powered apps instantly.
        </p>
      </div>

      {/* Hero Image - 3D Conceptual */}
      <div className={styles.heroImageWrapper}>
        <img
          src={heroImageSrc}
          alt={heroImageAlt}
          className={styles.heroImage}
          loading="lazy"
          {...zoomProps(heroImageSrc, heroImageAlt, heroImageCaption)}
        />
        <div className={styles.heroImageCaption}>
          {heroImageCaption}
        </div>
      </div>

      {/* Quick Stats */}
      <div className={styles.heroStats}>
        <div className={styles.heroStat}>
          <span className={styles.heroStatValue}>3-5 min</span>
          <span className={styles.heroStatLabel}>Prompt to Live URL</span>
        </div>
        <div className={styles.heroStat}>
          <span className={styles.heroStatValue}>1000+ docs</span>
          <span className={styles.heroStatLabel}>Indexed in ~10 min</span>
        </div>
        <div className={styles.heroStat}>
          <span className={styles.heroStatValue}>Same-day</span>
          <span className={styles.heroStatLabel}>Demo Turnaround</span>
        </div>
      </div>
    </header>
  );

  return (
    <ProjectTemplate
      project={data}
      heroSection={heroSection}
      toc={toc}
      showAside={true}
      variant="immersive"
    >
      <div className={styles.content}>
        {/* Project Scope */}
        <section id="hook" className={styles.scopeSection}>
          <div className={styles.scope}>
            <div className={styles.scopeHeader}>
              <span className={styles.scopeIcon}>🎯</span>
              <h2 className={styles.scopeTitle}>Project Scope</h2>
            </div>
            <ul className={styles.scopeList}>
              {data.tldr.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* The Problem */}
        <section id="problem" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🔥</span>
            The Problem
          </h2>
          <div className={styles.problemCard}>
            <div className={styles.problemScenario}>
              <h3>The Scenario</h3>
              <p>
                A prospect asks for a demo. Your team scrambles for <strong>weeks</strong> building a one-off POC. 
                By the time it's ready, the client has moved on—or a competitor shipped first.
              </p>
            </div>
            <div className={styles.problemPain}>
              <h3>The Pain Points</h3>
              <ul>
                <li>Scattered Python scripts and copy-paste codebases</li>
                <li>Every client request = start from scratch</li>
                <li>No standard approach for chat, RAG, search, or email</li>
                <li>Weeks of engineering time for a simple demo</li>
              </ul>
            </div>
          </div>
          <div className={styles.problemBottom}>
            <p className={styles.problemQuote}>
              "In enterprise AI, <strong>velocity wins</strong>. The AI market is blooming, and demo turnaround time = competitive advantage."
            </p>
          </div>
        </section>

        {/* The Solution */}
        <section id="solution" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>✨</span>
            The Solution: AgentFlow
          </h2>
          <div className={styles.solutionIntro}>
            <p>
              We built AgentFlow: a platform where you <strong>describe what you want</strong>, select capabilities 
              (chat, RAG, web search, summarization), and hit deploy. Within minutes, you have a shareable URL.
            </p>
          </div>
          <div className={styles.solutionFeatures}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🧩</div>
              <h4>Modular "Lego Blocks"</h4>
              <p>RAG, Search, Email, Chat—each is a standalone service. Mix and match per deployment.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🚀</div>
              <h4>Instant Deploy</h4>
              <p>Self-service deployment API provisions Azure Container Apps from prebuilt images.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔍</div>
              <h4>Dynamic Discovery</h4>
              <p>MCP-inspired pattern: services register themselves, LLM discovers tools at runtime.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔒</div>
              <h4>Enterprise Ready</h4>
              <p>SSO/JWT gating, expiry controls, and isolated environments for each demo.</p>
            </div>
          </div>
        </section>

        {/* How It Works - Workflow */}
        <section id="workflow" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>⚙️</span>
            How It Works
          </h2>
          <div className={styles.workflowDiagram}>
            <img
              src="/assets/projects/agentflow/Untitled diagram-2026-01-16-082542.png"
              alt="AgentFlow Architecture Diagram"
              className={styles.workflowImage}
              loading="lazy"
              {...zoomProps(
                "/assets/projects/agentflow/Untitled diagram-2026-01-16-082542.png",
                "AgentFlow Architecture Diagram",
                "The layered architecture: frontend, orchestration, and modular services"
              )}
            />
            <p className={styles.workflowCaption}>
              The layered architecture: frontend, orchestration, and modular services
            </p>
          </div>
          <div className={styles.workflowSteps}>
            {data.workflow.map((step, i) => (
              <div key={i} className={styles.workflowStep}>
                <div className={styles.workflowStepNumber}>{i + 1}</div>
                <div className={styles.workflowStepText}>{step}</div>
              </div>
            ))}
          </div>
        </section>

        {/* The Experience - Screenshots */}
        <section id="experience" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🎯</span>
            The Experience: From Chat to Deployment
          </h2>
          <p className={styles.experienceIntro}>
            See how a user goes from describing their need to having a live, shareable demo environment.
          </p>
          <div className={styles.experienceSteps}>
            {data.sections
              .find((s) => s.id === "experience")
              ?.steps?.map((step, i) => (
                <div key={i} className={styles.expStep}>
                  <div className={styles.expStepContent}>
                    <h3 className={styles.expStepTitle}>
                      <span className={styles.expStepNumber}>{i + 1}</span>
                      {step.title}
                    </h3>
                    <p className={styles.expStepText}>{step.text}</p>
                  </div>
                  {step.image && (
                    <div className={styles.expStepImage}>
                      <img
                        src={step.image}
                        alt={step.title}
                        loading="lazy"
                        {...zoomProps(step.image, step.title, step.caption)}
                      />
                      {step.caption && <span className={styles.expStepCaption}>{step.caption}</span>}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </section>

        {/* Architecture / Technical Deep Dive */}
        <section id="architecture" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🏗️</span>
            Architecture & Approach
          </h2>
          <div className={styles.archGrid}>
            {data.methods.map((method, i) => (
              <div key={i} className={styles.archCard}>
                <p>{method}</p>
              </div>
            ))}
          </div>

          {/* Tool Discovery Section */}
          <div className={styles.toolDiscovery}>
            <h3>Dynamic Tool Discovery</h3>
            <p>
              Early versions had hardcoded function calls. Every new integration meant updating the orchestration layer. Fragile and slow.
            </p>
            <p>
              We switched to a <strong>"tool rental"</strong> model inspired by MCP (Model Context Protocol). 
              Services register themselves with schemas. At runtime, the LLM asks "what tools are available?" 
              and discovers web search, RAG, email send, etc.
            </p>
            <ul>
              <li>Dynamic discovery: list tools at runtime (schemas + examples) to guide the LLM</li>
              <li>Unified execution: tool_name + arguments routed to the right service</li>
              <li>External tools: proxied endpoints + UI tool selection (safe integration surface)</li>
            </ul>
          </div>
        </section>

        {/* Outcomes / Results */}
        <section id="outcomes" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>📈</span>
            Results & Impact
          </h2>
          <div className={styles.resultsGrid}>
            {data.results.map((result, i) => (
              <div key={i} className={styles.resultCard}>
                <div className={styles.resultIcon}>✓</div>
                <p>{result}</p>
              </div>
            ))}
          </div>
          {data.constraints && data.constraints.length > 0 && (
            <div className={styles.constraints}>
              <strong>Note:</strong> {data.constraints[0]}
            </div>
          )}
        </section>

        {/* What's Next */}
        <section id="next" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🔮</span>
            What's Next: Tool Gateway Service
          </h2>
          <div className={styles.nextContent}>
            <div className={styles.nextText}>
              <p>
                The next evolution is a <strong>Tool Gateway Service</strong>: a unified layer that handles 
                tool registration, auth/permissions, observability, rate limiting, and error handling.
              </p>
              <p>
                Think of it as an <strong>API gateway, but for AI agent tools</strong>. Any team can publish 
                a tool (internal microservice or external API), and agents can discover and use it—no 
                central coordination required.
              </p>
              <h4>Roadmap</h4>
              <ul>
                {data.nextUpdates.map((update, i) => (
                  <li key={i}>{update}</li>
                ))}
              </ul>
            </div>
            <div className={styles.nextImage}>
              <img
                src="/assets/projects/agentflow/Gemini_Generated_Image_3gx6fp3gx6fp3gx6.png"
                alt="Tool Gateway Service Vision"
                loading="lazy"
                {...zoomProps(
                  "/assets/projects/agentflow/Gemini_Generated_Image_3gx6fp3gx6fp3gx6.png",
                  "Tool Gateway Service Vision",
                  "The vision: a centralized gateway where any internal tool or external API plugs in and becomes discoverable."
                )}
              />
            </div>
          </div>
        </section>
      </div>

      {lightbox && createPortal(
        <div
          className={styles.lightboxOverlay}
          onMouseDown={closeLightbox}
          onWheel={handleWheel}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="Close image"
          >
            ×
          </button>

          {/* Zoom controls */}
          <div className={styles.lightboxControls} onMouseDown={(e) => e.stopPropagation()}>
            <button type="button" onClick={zoomOut} aria-label="Zoom out" disabled={zoom <= 0.5}>−</button>
            <button type="button" onClick={resetZoom} className={styles.zoomLevel}>{Math.round(zoom * 100)}%</button>
            <button type="button" onClick={zoomIn} aria-label="Zoom in" disabled={zoom >= 4}>+</button>
          </div>

          {/* Image container */}
          <div
            className={styles.lightboxDialog}
            onMouseDown={(e) => e.stopPropagation()}
            style={{ cursor: zoom > 1 ? 'grab' : 'default' }}
          >
            <img
              src={lightbox.src}
              alt={lightbox.alt || ""}
              className={styles.lightboxImage}
              style={{ transform: `scale(${zoom})` }}
              draggable={false}
            />
          </div>

          {/* Caption */}
          {lightbox.caption ? (
            <div className={styles.lightboxCaption} onMouseDown={(e) => e.stopPropagation()}>
              {lightbox.caption}
            </div>
          ) : null}
        </div>,
        document.body
      )}
    </ProjectTemplate>
  );
}

export default AgentFlowProject;
