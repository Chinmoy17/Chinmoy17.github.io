/**
 * DSPy RAG Optimization Study
 * A collaborative study on prompt optimization in production RAG systems
 * Industry-grade technical case study format
 */
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { Container } from "react-bootstrap";
import Particle from "../../../Particle";
import styles from "./DSPy.module.css";

// Table of Contents sections
const sections = [
  { id: "overview", title: "Overview", number: "1" },
  { id: "the-problem", title: "The Problem", number: "2" },
  { id: "our-approach", title: "Our Approach", number: "3" },
  { id: "architecture", title: "Architecture", number: "4" },
  { id: "two-paths", title: "Two Paths", number: "5" },
  { id: "results", title: "Results", number: "6" },
  { id: "takeaways", title: "Takeaways", number: "7" },
  { id: "whats-next", title: "What's Next", number: "8" },
];

const DSPyOptimization = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [lightbox, setLightbox] = useState({ open: false, src: "", caption: "" });

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const openLightbox = (src, caption) => {
    setLightbox({ open: true, src, caption });
  };

  const closeLightbox = () => {
    setLightbox({ open: false, src: "", caption: "" });
  };

  // Close lightbox on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    if (lightbox.open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightbox.open]);

  return (
    <Container fluid className="project-section">
      <Particle />

      <div className={styles.pageWrapper}>
        {/* Left Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            <Link to="/research" className={styles.backLink}>
              ← Back to Research
            </Link>

            {/* Table of Contents */}
            <nav className={styles.tocNav}>
              <div className={styles.tocTitle}>Contents</div>
              <ul className={styles.tocList}>
                {sections.map(({ id, title, number }) => (
                  <li key={id}>
                    <button
                      className={`${styles.tocItem} ${activeSection === id ? styles.tocItemActive : ""}`}
                      onClick={() => scrollToSection(id)}
                    >
                      <span className={styles.tocNumber}>{number}</span>
                      <span className={styles.tocText}>{title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Sidebar Metadata */}
            <div className={styles.sidebarMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Authors</span>
                <div className={styles.authorList}>
                  <span className={styles.metaValue}>Chinmoy Mitra</span>
                  <a
                    href="https://notmeher.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.authorLink}
                  >
                    Mehedi Hasan Nipu ↗
                  </a>
                </div>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Organization</span>
                <span className={styles.metaValue}>Bytemethod AI (A Dexian Company)</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Supervisor</span>
                <a
                  href="https://www.linkedin.com/in/bushra-chowdhury-972604149/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.authorLink}
                >
                  Dr. Bushra Chowdhury ↗
                </a>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Domain</span>
                <span className={styles.metaValue}>Legal RAG</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Status</span>
                <span className={styles.metaValue}>Production</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Year</span>
                <span className={styles.metaValue}>2026</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
          {/* Hero Header */}
          <header className={styles.heroHeader}>
            <div className={styles.heroBadge}>Case Study</div>
            <h1 className={styles.heroTitle}>
              Taming Trial-and-Error in Production RAG Systems
            </h1>
            <p className={styles.heroSubtitle}>
              A parallel experiment comparing DSPy's automatic prompt optimization strategies—revealing that
              <span className={styles.heroHighlight}> initial constraints shape whether you optimize for accuracy or efficiency</span>
            </p>
            <div className={styles.heroAuthors}>
              <div className={styles.authorChip}>
                <span className={styles.authorAvatar}>CM</span>
                <span>Chinmoy Mitra</span>
              </div>
              <span className={styles.authorDivider}>&</span>
              <a
                href="https://notmeher.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.authorChip}
              >
                <span className={styles.authorAvatar}>MN</span>
                <span>Mehedi Hasan Nipu</span>
              </a>
            </div>
            <div className={styles.heroTags}>
              <span className={styles.heroTag}>DSPy 2.5+</span>
              <span className={styles.heroTag}>RAGAS v0.4</span>
              <span className={styles.heroTag}>LangChain</span>
              <span className={styles.heroTag}>Azure OpenAI GPT-4o</span>
              <span className={styles.heroTag}>FAISS</span>
            </div>

            {/* Collaborator CTA */}
            <div className={styles.collaboratorCta}>
              <span className={styles.collaboratorText}>
                This study was conducted in collaboration with <strong>Mehedi Hasan Nipu</strong>
              </span>
              <a
                href="https://notmeher.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.collaboratorButton}
              >
                Visit Nipu's Portfolio →
              </a>
            </div>
          </header>

          {/* Quick Stats */}
          <div className={styles.quickStats}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>38%</span>
              <span className={styles.statLabel}>Cost Reduction</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>3.2×</span>
              <span className={styles.statLabel}>Faster Response</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>+9.6%</span>
              <span className={styles.statLabel}>Accuracy Gain</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>2</span>
              <span className={styles.statLabel}>Approaches Tested</span>
            </div>
          </div>

          {/* Overview Section */}
          <section id="overview" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>1</span>
              Overview
            </h2>

            <p className={styles.leadParagraph}>
              Building RAG systems for enterprise clients—legal compliance, medical documentation,
              business intelligence—typically means weeks of prompt tweaking. DSPy, from Stanford NLP,
              promises to automate this. We put it to the test.
            </p>

            <p className={styles.paragraph}>
              This case study documents a parallel experiment: two engineers, same corpus, same evaluation
              framework, but deliberately different starting conditions. The goal was to understand not just
              <em> if</em> DSPy works, but <em>how</em> the optimization behaves across different initial setups.
            </p>

            <div className={styles.tldrBox}>
              <div className={styles.tldrHeader}>
                <span className={styles.tldrIcon}>⚡</span>
                <span className={styles.tldrTitle}>TL;DR</span>
              </div>
              <ul className={styles.tldrList}>
                <li>DSPy delivers measurable improvements—but the <strong>type</strong> of improvement depends on your starting point</li>
                <li>A naive, constrained prompt led to <strong>efficiency gains</strong> (38% cost reduction, 3.2× latency improvement)</li>
                <li>A rich, detailed prompt led to <strong>accuracy gains</strong> (5-7% improvement across RAGAS metrics)</li>
                <li>Both approaches produced production-deployable systems</li>
              </ul>
            </div>
          </section>

          {/* The Problem Section */}
          <section id="the-problem" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>2</span>
              The Problem
            </h2>

            <p className={styles.paragraph}>
              Every RAG project we've built follows the same frustrating pattern: craft a prompt,
              test it, observe failures, tweak, repeat. The cycle continues until the deadline arrives
              or the client signs off—whichever comes first.
            </p>

            {/* Problem Visualization */}
            <div className={styles.problemFlow}>
              <div className={styles.problemStep}>
                <div className={styles.problemIcon}>📝</div>
                <div className={styles.problemLabel}>Write Prompt</div>
              </div>
              <div className={styles.flowArrow}>→</div>
              <div className={styles.problemStep}>
                <div className={styles.problemIcon}>🧪</div>
                <div className={styles.problemLabel}>Test Queries</div>
              </div>
              <div className={styles.flowArrow}>→</div>
              <div className={styles.problemStep}>
                <div className={styles.problemIcon}>❌</div>
                <div className={styles.problemLabel}>Find Failures</div>
              </div>
              <div className={styles.flowArrow}>→</div>
              <div className={styles.problemStep}>
                <div className={styles.problemIcon}>🔧</div>
                <div className={styles.problemLabel}>Tweak Prompt</div>
              </div>
              <div className={styles.flowArrowLoop}>↩️ Repeat for weeks</div>
            </div>

            <div className={styles.painPoints}>
              <div className={styles.painPoint}>
                <div className={styles.painPointHeader}>
                  <span className={styles.painPointIcon}>💸</span>
                  <h4>Resource Drain</h4>
                </div>
                <p>Weeks of engineering time spent on subjective prompt iterations</p>
              </div>
              <div className={styles.painPoint}>
                <div className={styles.painPointHeader}>
                  <span className={styles.painPointIcon}>🎯</span>
                  <h4>No Clear Target</h4>
                </div>
                <p>Clients don't know what "good" looks like until they see the final product</p>
              </div>
              <div className={styles.painPoint}>
                <div className={styles.painPointHeader}>
                  <span className={styles.painPointIcon}>📊</span>
                  <h4>Missing Metrics</h4>
                </div>
                <p>Without ground truth, teams iterate blindly with no measurable progress</p>
              </div>
              <div className={styles.painPoint}>
                <div className={styles.painPointHeader}>
                  <span className={styles.painPointIcon}>🐌</span>
                  <h4>Slow Delivery</h4>
                </div>
                <p>Trial-and-error delays deployments and frustrates stakeholders</p>
              </div>
            </div>

            <div className={styles.questionBox}>
              <p>
                <strong>The question we wanted to answer:</strong> Can DSPy's automatic prompt
                optimization replace this manual cycle? And if so—does it matter how we start?
              </p>
            </div>
          </section>

          {/* Our Approach Section */}
          <section id="our-approach" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>3</span>
              Our Approach
            </h2>

            <p className={styles.paragraph}>
              We designed a controlled experiment: same legal document corpus, same evaluation
              framework (RAGAS), same infrastructure—but deliberately different starting conditions.
            </p>

            {/* Experiment Design */}
            <div className={styles.experimentDesign}>
              <div className={styles.experimentShared}>
                <h4 className={styles.experimentHeader}>Shared Foundation</h4>
                <div className={styles.sharedItems}>
                  <div className={styles.sharedItem}>
                    <span className={styles.sharedIcon}>📄</span>
                    <div>
                      <strong>Document Corpus</strong>
                      <p>Model Inter-American Law on Access to Public Information (114 pages, ~139 chunks)</p>
                    </div>
                  </div>
                  <div className={styles.sharedItem}>
                    <span className={styles.sharedIcon}>🧠</span>
                    <div>
                      <strong>LLM Backend</strong>
                      <p>Azure OpenAI GPT-4o (generation) + text-embedding-3-large (3072-dim)</p>
                    </div>
                  </div>
                  <div className={styles.sharedItem}>
                    <span className={styles.sharedIcon}>📊</span>
                    <div>
                      <strong>Evaluation</strong>
                      <p>RAGAS v0.4 (Answer Accuracy, Context Relevance, Response Groundedness)</p>
                    </div>
                  </div>
                  <div className={styles.sharedItem}>
                    <span className={styles.sharedIcon}>🔍</span>
                    <div>
                      <strong>Retrieval</strong>
                      <p>FAISS IndexFlatL2 | Top-K=6 | Chunk: 1200 chars, 300 overlap</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.experimentVariables}>
                <h4 className={styles.experimentHeader}>Variables</h4>
                <div className={styles.variableGrid}>
                  <div className={styles.variableCard}>
                    <span className={styles.variableLabel}>Initial Prompt</span>
                    <span className={styles.variableDesc}>Naive vs. Rich</span>
                  </div>
                  <div className={styles.variableCard}>
                    <span className={styles.variableLabel}>Constraints</span>
                    <span className={styles.variableDesc}>Tight vs. Tolerant</span>
                  </div>
                  <div className={styles.variableCard}>
                    <span className={styles.variableLabel}>Sample Size</span>
                    <span className={styles.variableDesc}>12 vs. 50</span>
                  </div>
                  <div className={styles.variableCard}>
                    <span className={styles.variableLabel}>Optimization</span>
                    <span className={styles.variableDesc}>Different configs</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Architecture Section */}
          <section id="architecture" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>4</span>
              Architecture
            </h2>

            <p className={styles.paragraph}>
              Both experiments shared a common architecture—a full-stack RAG system with
              React frontend, FastAPI backend, and DSPy optimization layer.
            </p>

            {/* System Architecture Diagram */}
            <div className={styles.architectureDiagram}>
              <div className={styles.archTitle}>System Architecture</div>

              <div className={styles.archLayers}>
                {/* Frontend Layer */}
                <div className={styles.archLayer}>
                  <div className={styles.archLayerLabel}>Client Layer</div>
                  <div className={styles.archLayerContent}>
                    <div className={styles.archBox} data-type="frontend">
                      <span className={styles.archBoxIcon}>🖥️</span>
                      <span className={styles.archBoxTitle}>React Frontend</span>
                      <span className={styles.archBoxDetail}>Vite + Tailwind</span>
                    </div>
                  </div>
                </div>

                <div className={styles.archConnector}>
                  <div className={styles.archArrowDown}></div>
                  <span className={styles.archConnectorLabel}>REST API</span>
                </div>

                {/* API Layer */}
                <div className={styles.archLayer}>
                  <div className={styles.archLayerLabel}>API Layer</div>
                  <div className={styles.archLayerContent}>
                    <div className={styles.archBox} data-type="api">
                      <span className={styles.archBoxIcon}>⚡</span>
                      <span className={styles.archBoxTitle}>FastAPI</span>
                      <span className={styles.archBoxDetail}>Async REST Endpoints</span>
                    </div>
                  </div>
                </div>

                <div className={styles.archConnector}>
                  <div className={styles.archArrowDown}></div>
                </div>

                {/* Core Engine Layer */}
                <div className={styles.archLayer}>
                  <div className={styles.archLayerLabel}>Core Engine</div>
                  <div className={styles.archLayerContent}>
                    <div className={styles.archBoxGroup}>
                      <div className={styles.archBox} data-type="rag">
                        <span className={styles.archBoxIcon}>🔗</span>
                        <span className={styles.archBoxTitle}>LangChain RAG</span>
                        <span className={styles.archBoxDetail}>Baseline</span>
                      </div>
                      <div className={styles.archBox} data-type="dspy">
                        <span className={styles.archBoxIcon}>🧪</span>
                        <span className={styles.archBoxTitle}>DSPy RAG</span>
                        <span className={styles.archBoxDetail}>ChainOfThought</span>
                      </div>
                      <div className={styles.archBox} data-type="eval">
                        <span className={styles.archBoxIcon}>📊</span>
                        <span className={styles.archBoxTitle}>RAGAS</span>
                        <span className={styles.archBoxDetail}>Evaluation</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.archConnector}>
                  <div className={styles.archArrowDown}></div>
                </div>

                {/* Optimizer Layer */}
                <div className={styles.archLayer}>
                  <div className={styles.archLayerLabel}>Optimization Layer</div>
                  <div className={styles.archLayerContent}>
                    <div className={styles.archBoxGroup}>
                      <div className={styles.archBox} data-type="optimizer">
                        <span className={styles.archBoxIcon}>🚀</span>
                        <span className={styles.archBoxTitle}>BootstrapFewShot</span>
                        <span className={styles.archBoxDetail}>Few-shot demos</span>
                      </div>
                      <div className={styles.archBox} data-type="optimizer">
                        <span className={styles.archBoxIcon}>🎯</span>
                        <span className={styles.archBoxTitle}>MIPROv2</span>
                        <span className={styles.archBoxDetail}>Instruction opt.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.archConnector}>
                  <div className={styles.archArrowDown}></div>
                </div>

                {/* Data Layer */}
                <div className={styles.archLayer}>
                  <div className={styles.archLayerLabel}>Data Layer</div>
                  <div className={styles.archLayerContent}>
                    <div className={styles.archBoxGroup}>
                      <div className={styles.archBox} data-type="data">
                        <span className={styles.archBoxIcon}>🗄️</span>
                        <span className={styles.archBoxTitle}>FAISS</span>
                        <span className={styles.archBoxDetail}>139 chunks</span>
                      </div>
                      <div className={styles.archBox} data-type="data">
                        <span className={styles.archBoxIcon}>☁️</span>
                        <span className={styles.archBoxTitle}>Azure SQL</span>
                        <span className={styles.archBoxDetail}>Eval Cache</span>
                      </div>
                      <div className={styles.archBox} data-type="data">
                        <span className={styles.archBoxIcon}>🤖</span>
                        <span className={styles.archBoxTitle}>Azure OpenAI</span>
                        <span className={styles.archBoxDetail}>GPT-4 + Ada</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Flow Pipeline */}
            <h3 className={styles.subsectionTitle}>Query Processing Flow</h3>

            <div className={styles.dataFlowPipeline}>
              <div className={styles.flowStage}>
                <div className={styles.flowStageNumber}>1</div>
                <div className={styles.flowStageContent}>
                  <h4>Ingestion</h4>
                  <p>PDF → PyPDF2 → Recursive Chunking</p>
                  <span className={styles.flowStageDetail}>1200 chars, 300 overlap</span>
                </div>
              </div>
              <div className={styles.flowStageArrow}>→</div>

              <div className={styles.flowStage}>
                <div className={styles.flowStageNumber}>2</div>
                <div className={styles.flowStageContent}>
                  <h4>Embedding</h4>
                  <p>text-embedding-3-large</p>
                  <span className={styles.flowStageDetail}>3072 dimensions</span>
                </div>
              </div>
              <div className={styles.flowStageArrow}>→</div>

              <div className={styles.flowStage}>
                <div className={styles.flowStageNumber}>3</div>
                <div className={styles.flowStageContent}>
                  <h4>Retrieval</h4>
                  <p>FAISS Similarity Search</p>
                  <span className={styles.flowStageDetail}>Top-K (k=6)</span>
                </div>
              </div>
              <div className={styles.flowStageArrow}>→</div>

              <div className={styles.flowStage}>
                <div className={styles.flowStageNumber}>4</div>
                <div className={styles.flowStageContent}>
                  <h4>Generation</h4>
                  <p>DSPy ChainOfThought</p>
                  <span className={styles.flowStageDetail}>GPT-4o</span>
                </div>
              </div>
              <div className={styles.flowStageArrow}>→</div>

              <div className={styles.flowStage}>
                <div className={styles.flowStageNumber}>5</div>
                <div className={styles.flowStageContent}>
                  <h4>Evaluation</h4>
                  <p>RAGAS Metrics</p>
                  <span className={styles.flowStageDetail}>3 metrics</span>
                </div>
              </div>
            </div>

            {/* Optimization Pipeline */}
            <h3 className={styles.subsectionTitle}>DSPy Optimization Pipeline</h3>

            <div className={styles.optimizationFlow}>
              <div className={styles.optFlowRow}>
                <div className={styles.optFlowBox}>
                  <div className={styles.optFlowHeader}>Training Data</div>
                  <div className={styles.optFlowBody}>
                    <span>50 Q&A pairs</span>
                    <span className={styles.optFlowNote}>70/30 split</span>
                  </div>
                </div>
                <div className={styles.optFlowArrow}>→</div>
                <div className={styles.optFlowBox}>
                  <div className={styles.optFlowHeader}>DSPy Module</div>
                  <div className={styles.optFlowBody}>
                    <span>RAGModule</span>
                    <span className={styles.optFlowNote}>ChainOfThought</span>
                  </div>
                </div>
                <div className={styles.optFlowArrow}>→</div>
                <div className={styles.optFlowBox} data-highlight="true">
                  <div className={styles.optFlowHeader}>Optimizer</div>
                  <div className={styles.optFlowBody}>
                    <span>MIPROv2 / Bootstrap</span>
                    <span className={styles.optFlowNote}>Auto-tune</span>
                  </div>
                </div>
                <div className={styles.optFlowArrow}>→</div>
                <div className={styles.optFlowBox}>
                  <div className={styles.optFlowHeader}>Optimized Model</div>
                  <div className={styles.optFlowBody}>
                    <span>Production Ready</span>
                    <span className={styles.optFlowNote}>Cached in DB</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Two Paths Section */}
          <section id="two-paths" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>5</span>
              Two Paths, One Goal
            </h2>

            <p className={styles.paragraph}>
              We deliberately started with different configurations to understand how DSPy behaves
              across the spectrum of initial conditions. Same destination, different journeys.
            </p>

            <div className={styles.pathsComparison}>
              {/* Chinmoy's Path */}
              <div className={styles.pathCard}>
                <div className={styles.pathHeader}>
                  <div className={styles.pathAvatar}>CM</div>
                  <div className={styles.pathHeaderText}>
                    <h3>Chinmoy Mitra</h3>
                    <span className={styles.pathBadge}>Constrained Approach</span>
                  </div>
                </div>

                <div className={styles.pathPhilosophy}>
                  "Start minimal. Let DSPy explore broadly. See how much it can improve from near-zero."
                </div>

                <div className={styles.pathDetails}>
                  <div className={styles.pathDetailItem}>
                    <span className={styles.pathDetailLabel}>Initial Prompt</span>
                    <span className={styles.pathDetailValue}>One-liner, naive</span>
                  </div>
                  <div className={styles.pathDetailItem}>
                    <span className={styles.pathDetailLabel}>Test Samples</span>
                    <span className={styles.pathDetailValue}>50</span>
                  </div>
                  <div className={styles.pathDetailItem}>
                    <span className={styles.pathDetailLabel}>MIPRO Trials</span>
                    <span className={styles.pathDetailValue}>6</span>
                  </div>
                  <div className={styles.pathDetailItem}>
                    <span className={styles.pathDetailLabel}>Training Time</span>
                    <span className={styles.pathDetailValue}>~4 min</span>
                  </div>
                </div>

                <div className={styles.pathPrompt}>
                  <div className={styles.pathPromptLabel}>Starting Prompt:</div>
                  <code>"Answer questions based on provided context from domain-specific documents."</code>
                </div>

                <div className={styles.pathOutcome}>
                  <span className={styles.pathOutcomeIcon}>⚡</span>
                  <div>
                    <strong>Result: Efficiency Gains</strong>
                    <p>38% cost reduction, 3.2× faster, similar accuracy</p>
                  </div>
                </div>
              </div>

              {/* Nipu's Path */}
              <div className={styles.pathCard}>
                <div className={styles.pathHeader}>
                  <a
                    href="https://notmeher.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.pathAvatar}
                    style={{ textDecoration: 'none' }}
                  >MN</a>
                  <div className={styles.pathHeaderText}>
                    <h3>Mehedi Hasan Nipu</h3>
                    <span className={styles.pathBadge}>Rich Approach</span>
                  </div>
                </div>

                <div className={styles.pathPhilosophy}>
                  "Start with domain expertise. Guide DSPy toward specific improvements. Maximize accuracy."
                </div>

                <div className={styles.pathDetails}>
                  <div className={styles.pathDetailItem}>
                    <span className={styles.pathDetailLabel}>Initial Prompt</span>
                    <span className={styles.pathDetailValue}>Detailed, expert-level</span>
                  </div>
                  <div className={styles.pathDetailItem}>
                    <span className={styles.pathDetailLabel}>Test Samples</span>
                    <span className={styles.pathDetailValue}>50</span>
                  </div>
                  <div className={styles.pathDetailItem}>
                    <span className={styles.pathDetailLabel}>MIPRO Candidates</span>
                    <span className={styles.pathDetailValue}>10</span>
                  </div>
                  <div className={styles.pathDetailItem}>
                    <span className={styles.pathDetailLabel}>Training Time</span>
                    <span className={styles.pathDetailValue}>~20 min</span>
                  </div>
                </div>

                <div className={styles.pathPrompt}>
                  <div className={styles.pathPromptLabel}>Starting Prompt:</div>
                  <code>"You are an expert legal assistant specializing in Access to Information law. Base your answer ONLY on the provided context. Cite specific Articles..."</code>
                </div>

                <div className={styles.pathOutcome}>
                  <span className={styles.pathOutcomeIcon}>🎯</span>
                  <div>
                    <strong>Result: Accuracy Gains</strong>
                    <p>+5-7% across all RAGAS metrics, consistent improvement</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section id="results" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>6</span>
              Results
            </h2>

            <h3 className={styles.subsectionTitle}>Chinmoy's Results: Efficiency Through Constraints (50-Sample Benchmark)</h3>

            <div className={styles.resultsTable}>
              <div className={styles.tableHeader}>
                <span>System</span>
                <span>Accuracy</span>
                <span>Groundedness</span>
                <span>Tokens</span>
                <span>Cost</span>
                <span>Latency</span>
              </div>
              <div className={styles.tableRow}>
                <span className={styles.systemName}>LangChain Baseline</span>
                <span>64.6%</span>
                <span>70.8%</span>
                <span>48,748</span>
                <span>$0.256</span>
                <span>13.96s</span>
              </div>
              <div className={styles.tableRow}>
                <span className={styles.systemName}>DSPy Baseline</span>
                <span>66.7% <span className={styles.gain}>+3.2%</span></span>
                <span>64.6%</span>
                <span>30,517</span>
                <span>$0.158</span>
                <span>7.38s</span>
              </div>
              <div className={`${styles.tableRow} ${styles.tableRowHighlight}`}>
                <span className={styles.systemName}>DSPy Bootstrap ⭐</span>
                <span className={styles.bestValue}>70.8% <span className={styles.gain}>+9.6%</span></span>
                <span>56.3%</span>
                <span>30,512</span>
                <span>$0.158</span>
                <span className={styles.bestValue}>4.33s</span>
              </div>
              <div className={styles.tableRow}>
                <span className={styles.systemName}>DSPy MIPRO</span>
                <span>64.6%</span>
                <span>64.6%</span>
                <span className={styles.bestValue}>30,539</span>
                <span className={styles.bestValue}>$0.159</span>
                <span>6.37s</span>
              </div>
            </div>

            <div className={styles.insightCallout}>
              <span className={styles.insightIcon}>💡</span>
              <div>
                <strong>Key Observation:</strong> With tight constraints and a naive starting prompt,
                DSPy primarily optimized for <strong>efficiency</strong> rather than accuracy. The framework
                found ways to reduce token usage and latency while maintaining comparable accuracy.
              </div>
            </div>

            <h3 className={styles.subsectionTitle}>Nipu's Results: Accuracy Through Rich Prompts (50-Sample Benchmark)</h3>

            <div className={styles.resultsTable}>
              <div className={styles.tableHeader}>
                <span>System</span>
                <span>Accuracy</span>
                <span>Relevance</span>
                <span>Groundedness</span>
                <span>Avg Score</span>
              </div>
              <div className={styles.tableRow}>
                <span className={styles.systemName}>LangChain Baseline</span>
                <span>82-87%</span>
                <span>80-85%</span>
                <span>81-86%</span>
                <span>81-86%</span>
              </div>
              <div className={`${styles.tableRow} ${styles.tableRowHighlight}`}>
                <span className={styles.systemName}>DSPy Optimized ⭐</span>
                <span className={styles.bestValue}>87-92% <span className={styles.gain}>+5-7%</span></span>
                <span className={styles.bestValue}>85-90%</span>
                <span className={styles.bestValue}>86-91%</span>
                <span className={styles.bestValue}>86-91%</span>
              </div>
            </div>

            <h3 className={styles.subsectionTitle}>Prompt Evolution</h3>
            <p className={styles.paragraph}>
              One of the most instructive outputs was observing how MIPROv2 transformed the prompts:
            </p>

            <div className={styles.promptEvolution}>
              <div className={styles.promptBefore}>
                <div className={styles.promptLabel}>
                  <span className={styles.promptLabelIcon}>📝</span>
                  Before Optimization
                </div>
                <div className={styles.promptContent}>
                  "Answer questions based on provided context from domain-specific documents."
                </div>
              </div>

              <div className={styles.promptArrow}>
                <span>MIPROv2</span>
                <div className={styles.promptArrowIcon}>→</div>
              </div>

              <div className={styles.promptAfter}>
                <div className={styles.promptLabel}>
                  <span className={styles.promptLabelIcon}>✨</span>
                  After Optimization
                </div>
                <div className={styles.promptContent}>
                  "Using the information contained strictly within the provided context, answer the
                  given question in a clear and concise manner. <strong>Ensure your response follows
                  a step-by-step reasoning process</strong> to explain the logical foundation for your
                  conclusions. <strong>Do not include information or make assumptions that go beyond
                  the supplied context.</strong>"
                </div>
              </div>
            </div>

            <p className={styles.paragraph}>
              The optimized prompt explicitly requests step-by-step reasoning, emphasizes strict
              adherence to context, and prohibits assumptions—modifications that aligned well
              with the RAGAS metrics being optimized.
            </p>
          </section>

          {/* Takeaways Section */}
          <section id="takeaways" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>7</span>
              Key Takeaways
            </h2>

            <div className={styles.takeawaysGrid}>
              <div className={styles.takeawayCard}>
                <div className={styles.takeawayNumber}>01</div>
                <h4>Starting Point Determines Outcome Type</h4>
                <p>
                  A naive prompt led to efficiency gains; a rich prompt led to accuracy gains.
                  DSPy optimizes toward your metric, but the optimization landscape depends on where you start.
                </p>
              </div>

              <div className={styles.takeawayCard}>
                <div className={styles.takeawayNumber}>02</div>
                <h4>Trade-offs Are Real</h4>
                <p>
                  BootstrapFewShot improved accuracy but reduced groundedness.
                  MIPRO maintained balance but showed smaller gains. Choose optimizers based on your priority.
                </p>
              </div>

              <div className={styles.takeawayCard}>
                <div className={styles.takeawayNumber}>03</div>
                <h4>Efficiency Is a Valid Win</h4>
                <p>
                  38% cost reduction and 3.2× latency improvement are significant for production systems.
                  Even without accuracy gains, DSPy can deliver ROI through efficiency.
                </p>
              </div>

              <div className={styles.takeawayCard}>
                <div className={styles.takeawayNumber}>04</div>
                <h4>Sample Size Matters</h4>
                <p>
                  12 samples vs. 50 samples produced different optimization dynamics.
                  More data generally leads to better generalization, but even small datasets show improvement.
                </p>
              </div>
            </div>

            <div className={styles.recommendationsBox}>
              <h4>Production Recommendations</h4>
              <div className={styles.recommendationsList}>
                <div className={styles.recommendation}>
                  <span className={styles.recommendationIcon}>🚀</span>
                  <div>
                    <strong>Use MIPROv2 for high-traffic systems</strong>
                    <p>Zero additional token overhead at inference, scales infinitely, one-time training cost</p>
                  </div>
                </div>
                <div className={styles.recommendation}>
                  <span className={styles.recommendationIcon}>🔬</span>
                  <div>
                    <strong>Use BootstrapFewShot for research/low-traffic</strong>
                    <p>Higher accuracy potential, but adds 1500-2000 tokens per query</p>
                  </div>
                </div>
                <div className={styles.recommendation}>
                  <span className={styles.recommendationIcon}>📏</span>
                  <div>
                    <strong>Define metrics before optimization</strong>
                    <p>What you measure is what you improve—choose RAGAS metrics carefully</p>
                  </div>
                </div>
                <div className={styles.recommendation}>
                  <span className={styles.recommendationIcon}>💾</span>
                  <div>
                    <strong>Cache aggressively</strong>
                    <p>Both experiments used Azure SQL caching to avoid redundant LLM calls</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What's Next Section */}
          <section id="whats-next" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>8</span>
              What's Next
            </h2>

            <p className={styles.paragraph}>
              This experiment validated DSPy for our team's workflow. We're now rolling it out
              across new RAG projects, with a few areas we're exploring next:
            </p>

            <div className={styles.nextSteps}>
              <div className={styles.nextStep}>
                <div className={styles.nextStepIcon}>🔄</div>
                <div>
                  <h4>Cross-Domain Transfer</h4>
                  <p>Can optimized prompts from legal RAG transfer to medical or financial domains?</p>
                </div>
              </div>
              <div className={styles.nextStep}>
                <div className={styles.nextStepIcon}>⚖️</div>
                <div>
                  <h4>Multi-Objective Optimization</h4>
                  <p>Simultaneously optimize for accuracy, groundedness, and cost</p>
                </div>
              </div>
              <div className={styles.nextStep}>
                <div className={styles.nextStepIcon}>🔁</div>
                <div>
                  <h4>Continuous Re-Optimization</h4>
                  <p>Auto-trigger re-optimization when evaluation metrics drift below thresholds</p>
                </div>
              </div>
            </div>

            <div className={styles.finalThought}>
              <p>
                <strong>The bottom line:</strong> DSPy doesn't eliminate trial-and-error—it transforms it
                into a programmatic, reproducible process. The manual prompt tweaking cycle?
                It's been replaced with systematic, metric-driven optimization that clients can actually trust.
              </p>
            </div>
          </section>
        </main>
      </div>

      {/* Lightbox Modal */}
      {lightbox.open &&
        createPortal(
          <div className={styles.lightboxOverlay} onClick={closeLightbox}>
            <button className={styles.lightboxClose} onClick={closeLightbox}>
              ×
            </button>
            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              <img src={lightbox.src} alt={lightbox.caption} className={styles.lightboxImage} />
              {lightbox.caption && <p className={styles.lightboxCaption}>{lightbox.caption}</p>}
            </div>
          </div>,
          document.body
        )}
    </Container>
  );
};

export default DSPyOptimization;
