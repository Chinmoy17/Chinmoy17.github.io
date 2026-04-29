import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import {
  FiSearch,
  FiFileText,
  FiHome,
  FiEdit3,
  FiMonitor,
  FiMessageCircle,
  FiBarChart2,
  FiChevronDown,
  FiArrowRight,
  FiTarget,
} from "react-icons/fi";
import ProjectTemplate from "../../ProjectTemplate";
import data from "./data";
import styles from "./RFPPlatform.module.css";

// Diagram components
import SystemArchitectureDiagram from "./diagrams/SystemArchitectureDiagram";
import DataFlowDiagram from "./diagrams/DataFlowDiagram";
import MultiModelFleet from "./diagrams/MultiModelFleet";
import DatabaseSchema from "./diagrams/DatabaseSchema";

const MODULE_ICONS = {
  search: FiSearch,
  "file-text": FiFileText,
  building: FiHome,
  edit: FiEdit3,
  monitor: FiMonitor,
  "message-circle": FiMessageCircle,
  "bar-chart": FiBarChart2,
};

const CATEGORY_CLASS = {
  ai: styles.categoryAi,
  architecture: styles.categoryArchitecture,
  infra: styles.categoryInfra,
  scraping: styles.categoryScraping,
  security: styles.categorySecurity,
};

/**
 * RFPPlatformProject
 * Dedicated case study component for the RFP Platform project.
 * Professional layout emphasizing system design, architecture, and engineering decisions.
 */
function RFPPlatformProject() {
  const [expandedModules, setExpandedModules] = useState({});
  const [expandedDecisions, setExpandedDecisions] = useState({});

  const toggleModule = (id) =>
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleDecision = (idx) =>
    setExpandedDecisions((prev) => ({ ...prev, [idx]: !prev[idx] }));

  const toc = [
    { id: "overview", title: "Overview" },
    { id: "problem", title: "The Problem" },
    { id: "architecture", title: "System Architecture" },
    { id: "pipeline", title: "Data Pipeline" },
    { id: "modules", title: "Core Modules" },
    { id: "model-fleet", title: "AI Model Fleet" },
    { id: "decisions", title: "Engineering Decisions" },
    { id: "database", title: "Database Design" },
    { id: "tech-stack", title: "Tech Stack" },
    { id: "results", title: "Results" },
    { id: "next", title: "What's Next" },
  ];

  const heroSection = (
    <header className={styles.hero}>
      <div className={styles.heroTop}>
        <h1 className={styles.heroTitle}>{data.title}</h1>
        <div className={styles.heroBadges}>
          <Badge className={styles.heroBadgePrivate}>Private / Enterprise</Badge>
          <Badge className={styles.heroBadgeType}>Government RFP</Badge>
          <Badge className={styles.heroBadgeType}>Full-Stack AI Platform</Badge>
          <Badge className={styles.heroBadgeType}>Sole Developer</Badge>
        </div>
      </div>
      <div className={styles.heroHook}>
        <p className={styles.heroTagline}>
          <span className={styles.heroHighlight}>{data.tagline}</span>
        </p>
        <p className={styles.heroSubtext}>
          Built for ByteMethod AI / Dexian. {data.stats[0].value} Python files,{" "}
          {data.stats[1].value} React/TS files, {data.stats[2].value} endpoints,{" "}
          {data.stats[3].value} tables — one engineer, zero shortcuts.
        </p>
      </div>
      <div className={styles.heroStats}>
        {data.stats.map((stat, i) => (
          <div key={i} className={styles.heroStat}>
            <span className={styles.heroStatValue}>{stat.value}</span>
            <span className={styles.heroStatLabel}>{stat.label}</span>
          </div>
        ))}
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
        {/* ===== OVERVIEW / TL;DR ===== */}
        <section id="overview" className={styles.scopeSection}>
          <div className={styles.scope}>
            <div className={styles.scopeHeader}>
              <FiTarget size={20} style={{ color: "var(--imp-text-color)" }} />
              <h2 className={styles.scopeTitle}>Project Scope</h2>
            </div>
            <ul className={styles.scopeList}>
              {data.tldr.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ===== THE PROBLEM ===== */}
        <section id="problem" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <FiFileText size={22} className={styles.sectionIcon} />
            The Problem
          </h2>
          <div className={styles.problemCard}>
            <div className={styles.problemScenario}>
              <h3>The Scenario</h3>
              <p>{data.problem.scenario}</p>
            </div>
            <div className={styles.problemPain}>
              <h3>Pain Points</h3>
              <ul>
                {data.problem.painPoints.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.problemBottom}>
            <p className={styles.problemQuote}>
              "This process takes <strong>2–4 weeks per RFP</strong> with
              specialized proposal writers. We reduced it to{" "}
              <strong>hours</strong>."
            </p>
          </div>
        </section>

        {/* ===== SYSTEM ARCHITECTURE ===== */}
        <section id="architecture" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <FiMonitor size={22} className={styles.sectionIcon} />
            System Architecture
          </h2>
          <p className={styles.diagramDescription}>
            Four-layer architecture: React SPA communicates with FastAPI over
            REST + SSE. The API layer orchestrates AI services (Claude, GPT-4.1,
            Azure Doc Intelligence) and persists data to Azure SQL and Blob
            Storage.
          </p>
          <div className={styles.diagramContainer}>
            <SystemArchitectureDiagram />
            <p className={styles.diagramCaption}>
              Layered architecture with clear separation of concerns
            </p>
          </div>
        </section>

        {/* ===== DATA PIPELINE ===== */}
        <section id="pipeline" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <FiArrowRight size={22} className={styles.sectionIcon} />
            Data Pipeline
          </h2>
          <p className={styles.diagramDescription}>
            End-to-end flow from opportunity discovery to executive
            presentations. Each stage is powered by purpose-selected AI models
            and feeds structured data to the next.
          </p>
          <div className={styles.diagramContainer}>
            <DataFlowDiagram stages={data.dataFlow} />
            <p className={styles.diagramCaption}>
              Five-stage pipeline: Discover → Ingest → Profile → Generate →
              Present
            </p>
          </div>
        </section>

        {/* ===== CORE MODULES ===== */}
        <section id="modules" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <FiSearch size={22} className={styles.sectionIcon} />
            Core Modules
          </h2>
          <div className={styles.moduleGrid}>
            {data.modules.map((mod) => {
              const Icon = MODULE_ICONS[mod.icon] || FiSearch;
              const isExpanded = expandedModules[mod.id];
              return (
                <div
                  key={mod.id}
                  className={`${styles.moduleCard} ${
                    isExpanded ? styles.moduleCardExpanded : ""
                  }`}
                  onClick={() => toggleModule(mod.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleModule(mod.id);
                    }
                  }}
                >
                  <div className={styles.moduleCardHeader}>
                    <Icon size={20} className={styles.moduleIcon} />
                    <h4 className={styles.moduleName}>{mod.name}</h4>
                  </div>
                  <p className={styles.moduleDescription}>{mod.description}</p>
                  {isExpanded && (
                    <div className={styles.moduleTechDetail}>
                      {mod.techDetail}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== AI MODEL FLEET ===== */}
        <section id="model-fleet" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <FiBarChart2 size={22} className={styles.sectionIcon} />
            AI Model Fleet
          </h2>
          <p className={styles.fleetIntro}>
            Four AI models, each selected for its strengths. The platform routes
            tasks to the optimal model based on capability, latency, and
            cost — not a single-LLM wrapper.
          </p>
          <MultiModelFleet models={data.modelFleet} styles={styles} />
        </section>

        {/* ===== ENGINEERING DECISIONS ===== */}
        <section id="decisions" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <FiEdit3 size={22} className={styles.sectionIcon} />
            Engineering Decisions
          </h2>
          <div className={styles.decisionsGrid}>
            {data.engineeringDecisions.map((d, i) => {
              const isExpanded = expandedDecisions[i];
              return (
                <div
                  key={i}
                  className={`${styles.decisionCard} ${
                    isExpanded ? styles.decisionCardExpanded : ""
                  }`}
                >
                  <button
                    className={styles.decisionHeader}
                    onClick={() => toggleDecision(i)}
                    aria-expanded={isExpanded}
                  >
                    <span
                      className={`${styles.decisionCategoryBadge} ${
                        CATEGORY_CLASS[d.category] || ""
                      }`}
                    >
                      {d.category}
                    </span>
                    <span className={styles.decisionQuestion}>
                      {d.question}
                    </span>
                    <FiChevronDown
                      size={18}
                      className={`${styles.decisionChevron} ${
                        isExpanded ? styles.decisionChevronOpen : ""
                      }`}
                    />
                  </button>
                  {isExpanded && (
                    <div className={styles.decisionBody}>
                      <p className={styles.decisionAnswer}>{d.answer}</p>
                      <div className={styles.decisionTradeoff}>
                        <span className={styles.decisionTradeoffLabel}>
                          Trade-off:
                        </span>
                        {d.tradeoff}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== DATABASE DESIGN ===== */}
        <section id="database" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <FiFileText size={22} className={styles.sectionIcon} />
            Database Design
          </h2>
          <p className={styles.diagramDescription}>
            Azure SQL with {data.dbSchema.tableCount} tables across discovery,
            analysis, generation, and analytics domains. Background jobs persist
            to SQL with automatic stale-job cleanup (30-minute timeout).
          </p>
          <div className={styles.diagramContainer}>
            <DatabaseSchema schema={data.dbSchema} />
            <p className={styles.diagramCaption}>
              Key tables and relationships (simplified)
            </p>
          </div>
        </section>

        {/* ===== TECH STACK ===== */}
        <section id="tech-stack" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <FiMonitor size={22} className={styles.sectionIcon} />
            Tech Stack
          </h2>
          <div className={styles.techStackGrid}>
            {Object.entries(data.techStack).map(([category, items]) => (
              <div key={category} className={styles.techStackColumn}>
                <h4 className={styles.techStackColumnTitle}>{category}</h4>
                {items.map((item, i) => (
                  <div key={i} className={styles.techStackItem}>
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ===== RESULTS ===== */}
        <section id="results" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <FiBarChart2 size={22} className={styles.sectionIcon} />
            Results & Impact
          </h2>
          <div className={styles.resultsGrid}>
            {data.results.map((r, i) => (
              <div key={i} className={styles.resultCard}>
                <span className={styles.resultMetric}>{r.metric}</span>
                <p className={styles.resultDescription}>{r.description}</p>
              </div>
            ))}
          </div>
          <div className={styles.constraints}>
            <ul className={styles.constraintsList}>
              {data.constraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ===== WHAT'S NEXT ===== */}
        <section id="next" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <FiArrowRight size={22} className={styles.sectionIcon} />
            What's Next
          </h2>
          <ul className={styles.nextList}>
            {data.nextUpdates.map((item, i) => (
              <li key={i} className={styles.nextItem}>
                <FiArrowRight
                  size={16}
                  className={styles.nextItemIcon}
                />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </ProjectTemplate>
  );
}

export default RFPPlatformProject;
