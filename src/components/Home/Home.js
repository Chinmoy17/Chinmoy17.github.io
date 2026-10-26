import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiExternalLink, FiMail } from "react-icons/fi";
import avatarImg from "../../Assets/avatar.png";
import resumeData from "../../data/resume.json";
import styles from "./Home.module.css";

const cashCompass = resumeData.projects.find((p) => p.id === "cashcompass");
const skillGroups = resumeData.skills.groups.filter((g) => g.name !== "Tools & Platforms");

const publicUrl = process.env.PUBLIC_URL || "";
const cvUrl = `${publicUrl}/assets/Chinmoy_Mitra_CV.pdf`;

const researchSummary = [
  {
    status: "Submitted",
    venue: "ACL ARR 2026 (October cycle)",
    question: "What does aggregate accuracy hide when a prompt is optimized?",
    title: "Beyond Aggregate Accuracy: Item-Level Transitions in Prompt Optimization",
    signal: "In five of nine configurations, churn was at least five times the net change; average validation gains of 7.9 points fell to 5.2 points on held-out tests.",
    link: `${publicUrl}/assets/research/papers/prom_paper.pdf`,
    linkLabel: "Read the paper",
  },
  {
    status: "Submitted",
    venue: "EAAI · Elsevier · arXiv 2026",
    question: "Can collaborative models remain useful when some clients are malicious?",
    title: "Robust and Personalized Federated Learning for Aircraft-Engine Prognostics",
    signal: "Combining personalization with robust aggregation reduced backdoor attack success from 94.9% to 2.8%.",
    link: "https://arxiv.org/abs/2608.04045",
    linkLabel: "Read the preprint",
  },
  {
    status: "Presented",
    venue: "IEEE iCONNECT 2026",
    question: "How do you stop a compromised AI agent from escalating its own privileges?",
    title: "Trust-Gated Capability Control: Breaking the Trust-Vulnerability Paradox in Multi-Agent LLM Systems",
    signal: "A five-layer trust stack maps composite trust into short-lived, revocable capability grants — automatically revoked on compromise.",
    link: `${publicUrl}/assets/research/papers/TGCC_PAPER.pdf`,
    linkLabel: "Read the paper",
  },
  {
    status: "Published",
    venue: "IEEE QPAIN 2025",
    question: "Where did the focus on dependable healthcare AI begin?",
    title: "Transfer Learning Based Multiclass Brain Tumor Classification Using MRI Data",
    signal: "The undergraduate thesis reached approximately 99.50% accuracy and established the first step in this research trajectory.",
    link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=kUignlYAAAAJ&citation_for_view=kUignlYAAAAJ:u5HHmVD_uO8C",
    linkLabel: "View the publication",
  },
];

const practiceWork = [
  {
    title: "Codeblocks: Security Analysis for Python and AI-Agent Code",
    copy: "An evidence-driven application-security platform. It parses a repository into a graph without running it, applies deterministic rules, and ties every finding to its call path, source evidence, and fix. Versioned project history, interactive code graph, and CWE/OWASP-classified reports, with no LLM in the analysis engine.",
    evidence: "Python + AI-agent analysis · Next.js + FastAPI · Azure App Service · Live",
    link: "/project/codeblocks",
    linkLabel: "Codeblocks case study",
    featured: true,
  },
  {
    title: "CashCompass: Agent Liquidity Forecasting",
    copy: "Mobile-money agents run out of cash or e-float on roughly 1 in 8 days in simulation. LightGBM quantile demand forecasts and stockout-risk scoring turn into a net top-up recommendation per agent, served through a live agent app.",
    evidence: "P10–P90 coverage 79.5% · stockout ROC-AUC 0.746 · Bangladesh Bank-calibrated synthetic data",
    link: cashCompass?.links?.demo,
    external: true,
    linkLabel: "Open the live app",
  },
  {
    title: "RFP Intelligence Platform",
    copy: "An end-to-end platform that turns 100–500 page government tenders into compliant, 14-section proposals — SAM.gov discovery, non-vector page indexing, and agentic drafting kept under human review at each step.",
    evidence: "Government RFPs · PageIndex retrieval · weeks → minutes",
    link: "/project/rfp-platform",
    linkLabel: "RFP Platform case study",
  },
  {
    title: "Note2Action",
    copy: "Note2Action turns unstructured CRM notes into one suggested action and due date for more than 600 account managers while retaining human review, SSO, and per-user data boundaries.",
    evidence: "600+ users · human-reviewed output · operational privacy",
    link: "/project/note2action",
    linkLabel: "Note2Action case study",
  },
  {
    title: "AgentFlow",
    copy: "A modular AI workflow orchestration platform: define an agent's capabilities and guardrails, deploy it in one click, and ground it with RAG. Built around retrieval quality, tool failures, deployment isolation, observability, and cost.",
    evidence: "RAG · agent tools · Azure deployment · failure handling",
    link: "/project/agentflow",
    linkLabel: "AgentFlow case study",
  },
];

function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.inner}>
          <div className={styles.heroLayout}>
            <div className={styles.heroContent}>
              <h1 id="home-title" className={styles.heroTitle}>Chinmoy Mitra</h1>
              <p className={styles.heroStatement}>
                I&rsquo;m an AI Engineer at ByteMethod AI (a Dexian Company), building evaluation-driven LLM and agentic systems for enterprise workflows: RAG pipelines, agent orchestration, and the full-stack products around them.
              </p>

              <div className={styles.heroActions}>
                <Link className={styles.primaryAction} to="/project">
                  View Projects <FiArrowRight aria-hidden="true" />
                </Link>
                <a className={styles.secondaryAction} href={cvUrl} target="_blank" rel="noreferrer">
                  View CV <FiExternalLink aria-hidden="true" />
                </a>
              </div>
            </div>

            <aside className={styles.heroProfile} aria-label="Profile summary">
              <figure className={styles.portrait}>
                <img
                  className={styles.portraitImage}
                  src={avatarImg}
                  alt="Chinmoy Mitra"
                  width="1632"
                  height="2220"
                />
              </figure>

              <dl className={styles.profileFacts}>
                <div className={styles.profileFact}>
                  <dt className={styles.profileLabel}>Current</dt>
                  <dd className={styles.profileValue}>AI Engineer · ByteMethod AI (Dexian)</dd>
                </div>
                <div className={styles.profileFact}>
                  <dt className={styles.profileLabel}>Focus</dt>
                  <dd className={styles.profileValue}>LLM evaluation · Agentic systems · RAG</dd>
                </div>
                <div className={styles.profileFact}>
                  <dt className={styles.profileLabel}>Education</dt>
                  <dd className={styles.profileValue}>B.Sc. CSE, RUET, 2024</dd>
                </div>
                <div className={styles.profileFact}>
                  <dt className={styles.profileLabel}>Location</dt>
                  <dd className={styles.profileValue}>Dhaka, Bangladesh</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section id="work" className={`${styles.section} ${styles.sectionPractice}`} aria-labelledby="practice-heading">
        <div className={styles.inner}>
          <header className={styles.sectionIntro}>
            <div>
              <h2 id="practice-heading" className={styles.sectionHeading}>Selected Work</h2>
              <p className={styles.sectionLead}>
                Enterprise AI, agent orchestration, and fintech systems, each with the results, constraints, and trade-offs behind it.
              </p>
            </div>
          </header>

          <div className={styles.practiceGrid}>
            {practiceWork.map((item, index) => (
              <article className={`${styles.practiceItem} ${item.featured ? styles.practiceItemFeatured : ""}`} key={item.title}>
                <span className={styles.practiceIndex}>{String(index + 1).padStart(2, "0")}</span>
                <h3 className={styles.practiceTitle}>{item.title}</h3>
                <p className={styles.practiceCopy}>{item.copy}</p>
                <p className={styles.practiceEvidence}>{item.evidence}</p>
                {item.external ? (
                  <a className={styles.inlineLink} href={item.link} target="_blank" rel="noreferrer">
                    {item.linkLabel} <FiExternalLink aria-hidden="true" />
                  </a>
                ) : (
                  <Link className={styles.inlineLink} to={item.link}>
                    {item.linkLabel} <FiArrowRight aria-hidden="true" />
                  </Link>
                )}
              </article>
            ))}
          </div>

          <Link className={styles.researchArchiveLink} to="/project">
            See all projects and case studies <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section id="stack" className={`${styles.section} ${styles.sectionTrajectory}`} aria-labelledby="stack-heading">
        <div className={styles.inner}>
          <header className={styles.sectionIntro}>
            <div>
              <h2 id="stack-heading" className={styles.sectionHeading}>Technical Stack</h2>
            </div>
          </header>

          <dl className={styles.skillsGrid}>
            {skillGroups.map((group) => (
              <div className={styles.skillGroup} key={group.name}>
                <dt className={styles.skillGroupName}>{group.name}</dt>
                <dd className={styles.skillItems}>{group.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionPractice}`} aria-labelledby="trajectory-heading">
        <div className={styles.inner}>
          <header className={styles.sectionIntro}>
            <div>
              <h2 id="trajectory-heading" className={styles.sectionHeading}>How I Work</h2>
              <p className={styles.sectionLead}>
                The engineering principles behind the systems above: ship to real users, measure honestly, and build the tools that remove friction.
              </p>
            </div>
          </header>

          <div className={styles.article}>
            <article className={styles.chapter}>
              <div className={styles.chapterMeta}>
                <span className={styles.chapterIndex}>01</span>
                <p className={styles.chapterLabel}>Shipping to real users</p>
                <p className={styles.chapterEra}>Enterprise AI · Human-in-the-loop</p>
              </div>
              <div className={styles.chapterBody}>
                <p>
                  Most of my work sits where models meet users. <strong>Note2Action</strong> suggests one next action and due date for more than 600 account managers; the <strong>RFP platform</strong> turns 100&ndash;500 page tenders into compliant proposal drafts. Both keep a human in the loop and respect SSO and per-user data boundaries.
                </p>
                <p>
                  I translate ambiguous business needs into clear problem statements and measurable acceptance criteria, then document the result so another team can maintain it.
                </p>
              </div>
            </article>

            <article className={styles.chapter}>
              <div className={styles.chapterMeta}>
                <span className={styles.chapterIndex}>02</span>
                <p className={styles.chapterLabel}>Evaluation before rollout</p>
                <p className={styles.chapterEra}>Prompt optimization · LLM reliability</p>
              </div>
              <div className={styles.chapterBody}>
                <p>
                  LLM systems fail quietly, so I test them like software: test sets, rubrics, and regression checks before a prompt or agent change ships. In my own prompt-optimization study, average validation gains of 7.9 points shrank to 5.2 on held-out tests, which is why I never trust a single aggregate number.
                </p>
                <div className={styles.chapterLinks}>
                  <Link className={styles.inlineLink} to="/research/dspy-rag-optimization">
                    View the DSPy optimization study <FiArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>

            <blockquote className={styles.articlePull}>
              <p>The best part of being an engineer, to me, is getting to <span className={styles.pullAccent}>formalize the problems I run into</span> &mdash; and then build my way out of them.</p>
            </blockquote>

            <article className={styles.chapter}>
              <div className={styles.chapterMeta}>
                <span className={styles.chapterIndex}>03</span>
                <p className={styles.chapterLabel}>Building the tools</p>
                <p className={styles.chapterEra}>UI Craft · MCP server</p>
              </div>
              <div className={styles.chapterBody}>
                <p>
                  One of those problems was building good interfaces for the backends I work on. By <em>good</em> I don&rsquo;t mean decorative &mdash; I mean interfaces that use the psychological anchors which make people actually read what is in front of them, and which set one product apart from another.
                </p>
                <p>
                  That frustration became <strong>UI Craft</strong>: an MCP server that guides the language models I code with and learns my design choices project by project. It has proven useful enough that I am building this very portfolio with it.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="cv" className={`${styles.section} ${styles.sectionTrajectory}`} aria-labelledby="cv-heading">
        <div className={styles.inner}>
          <header className={styles.sectionIntro}>
            <div>
              <h2 id="cv-heading" className={styles.sectionHeading}>Curriculum Vitae</h2>
              <p className={styles.sectionLead}>
                Experience, projects, education, and publications in one document.
              </p>
            </div>
          </header>
          <a className={styles.primaryAction} href={cvUrl} target="_blank" rel="noreferrer">
            View CV <FiExternalLink aria-hidden="true" />
          </a>
        </div>
      </section>

      <section id="publications" className={`${styles.section} ${styles.sectionPublications}`} aria-labelledby="publications-heading">
        <div className={styles.inner}>
          <header className={styles.sectionIntro}>
            <div>
              <h2 id="publications-heading" className={styles.sectionHeading}>Research &amp; Publications</h2>
              <p className={styles.sectionLead}>
                Peer-reviewed and submitted work on LLM evaluation, multi-agent security, and robust federated learning.
              </p>
            </div>
          </header>

          <div className={styles.researchSummaryGrid}>
            {researchSummary.map((item) => (
              <article className={styles.researchTeaser} key={item.title}>
                <div className={styles.researchTeaserMeta}>
                  <span className={styles.researchTeaserStatus}>{item.status}</span>
                  <span>{item.venue}</span>
                </div>
                <div className={styles.researchTeaserContent}>
                  <h3 className={styles.researchTeaserTitle}>{item.title}</h3>
                  <ul className={styles.researchTeaserPoints}>
                    <li><span>Question:</span> {item.question}</li>
                    <li><span>Result:</span> {item.signal}</li>
                  </ul>
                  {item.link && (
                    <a className={styles.paperLink} href={item.link} target="_blank" rel="noreferrer">
                      {item.linkLabel} <FiExternalLink aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          <Link className={styles.researchArchiveLink} to="/research">
            Explore the full research archive <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="closing-heading">
        <div className={styles.inner}>
          <div className={styles.closingGrid}>
            <div className={styles.closingStatement}>
              <p className={styles.closingEyebrow}>Get in touch</p>
              <h2 id="closing-heading" className={styles.closingHeading}>
                Building dependable AI systems for real users.
              </h2>
            </div>
            <div className={styles.closingDetails}>
              <p className={styles.closingCopy}>
                I work on LLM and agentic systems, RAG pipelines, and ML products for enterprise and fintech use cases. If you are hiring for AI engineering work or want to talk through an architecture or evaluation problem, I would like to hear from you.
              </p>
              <div className={styles.closingActions}>
                <a className={styles.primaryAction} href={`mailto:${resumeData.links.email}`}>
                  Email me <FiMail aria-hidden="true" />
                </a>
                <a className={styles.secondaryAction} href={cvUrl} target="_blank" rel="noreferrer">
                  View CV <FiExternalLink aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.closingEndcap}>
            <p className={styles.closingIdentity}>
              <strong>Chinmoy Mitra</strong>
              <span>AI Engineer · Dhaka, Bangladesh</span>
            </p>
            <nav className={styles.closingLinks} aria-label="Portfolio links">
              <a href={resumeData.links.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={resumeData.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={`mailto:${resumeData.links.email}`}>Email</a>
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;