import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiExternalLink, FiMail } from "react-icons/fi";
import avatarImg from "../../Assets/avatar.png";
import resumeData from "../../data/resume.json";
import styles from "./Home.module.css";

const scholarUrl = "https://scholar.google.com/citations?view_op=list_works&hl=en&user=kUignlYAAAAJ";

const researchSummary = [
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
    status: "Accepted",
    venue: "IEEE BECITHCON 2026",
    question: "How small can a diagnostic model become without giving up accuracy?",
    title: "PulmoLiteNet: Lightweight Lung Cancer Histopathology Classification",
    signal: "PulmoLiteNet reached 99.8% test accuracy on LC25000 with an approximately 0.49 MB memory footprint.",
  },
  {
    status: "Published",
    venue: "IEEE QPAN 2025",
    question: "Where did the focus on dependable healthcare AI begin?",
    title: "Transfer Learning Based Multiclass Brain Tumor Classification Using MRI Data",
    signal: "The undergraduate thesis reached approximately 99.50% accuracy and established the first step in this research trajectory.",
    link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=kUignlYAAAAJ&citation_for_view=kUignlYAAAAJ:u5HHmVD_uO8C",
    linkLabel: "View the publication",
  },
];

const practiceWork = [
  {
    title: "RFP Intelligence Platform",
    copy: "An end-to-end platform that turns 100–500 page government tenders into compliant, 14-section proposals — SAM.gov discovery, non-vector page indexing, and agentic drafting kept under human review at each step.",
    evidence: "Government RFPs · PageIndex retrieval · weeks → minutes",
    link: "/project/rfp-platform",
    linkLabel: "RFP Platform case study",
  },
  {
    title: "Human review before automation",
    copy: "Note2Action turns unstructured CRM notes into one suggested action and due date for more than 600 account managers while retaining human review, SSO, and per-user data boundaries.",
    evidence: "600+ users · human-reviewed output · operational privacy",
    link: "/project/note2action",
    linkLabel: "Note2Action case study",
  },
  {
    title: "Architecture as an experimental constraint",
    copy: "AgentFlow and enterprise RAG systems expose the practical variables that laboratory prototypes often omit: retrieval quality, tool failures, deployment isolation, observability, and cost.",
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
                I&rsquo;m an AI Engineer at ByteMethod AI, a Dexian company, building evaluation-driven LLM and agentic systems. Alongside that, I research how learning systems stay reliable when data, users, and conditions keep shifting.
              </p>
              <p className={styles.heroStatus}>Preparing for Fall 2027 PhD applications</p>

              <div className={styles.heroActions}>
                <Link className={styles.primaryAction} to="/research">
                  Research Page <FiArrowRight aria-hidden="true" />
                </Link>
                <Link className={styles.secondaryAction} to="/project">
                  View Projects <FiArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>

            <aside className={styles.heroProfile} aria-label="Academic profile summary">
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
                  <dt className={styles.profileLabel}>Education</dt>
                  <dd className={styles.profileValue}>B.Sc. CSE, RUET, 2024</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section id="publications" className={`${styles.section} ${styles.sectionPublications}`} aria-labelledby="publications-heading">
        <div className={styles.inner}>
          <header className={styles.sectionIntro}>
            <div>
              <h2 id="publications-heading" className={styles.sectionHeading}>Publications</h2>
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

      <section className={`${styles.section} ${styles.sectionTrajectory}`} aria-labelledby="trajectory-heading">
        <div className={styles.inner}>
          <header className={styles.sectionIntro}>
            <div>
              <h2 id="trajectory-heading" className={styles.sectionHeading}>Research Direction</h2>
              <p className={styles.sectionLead}>
                A short, honest account of the questions that have shaped my work &mdash; and the ones I want to spend the next years on.
              </p>
            </div>
          </header>

          <div className={styles.article}>
            <article className={styles.chapter}>
              <div className={styles.chapterMeta}>
                <span className={styles.chapterIndex}>01</span>
                <p className={styles.chapterLabel}>Where it began</p>
                <p className={styles.chapterEra}>Undergraduate thesis · IEEE QPAIN 2025</p>
              </div>
              <div className={styles.chapterBody}>
                <p>
                  My research began with my undergraduate thesis at RUET, supervised by Assistant Professor Farjana Parvin. It was my first serious piece of work, and it was demanding in the best way. I learned how to run a proper literature review, how to turn a vague interest into a precise question, and how to keep interrogating the <strong>what</strong>, the <strong>why</strong>, and the <strong>how</strong> behind a contribution.
                </p>
                <p>
                  The thesis was published at IEEE QPAIN 2025 &mdash; but not on the first attempt. My first submission was rejected. It stung, yet I came away more enlightened than discouraged; that rejection taught me more than an easy acceptance ever could have.
                </p>
              </div>
            </article>

            <article className={styles.chapter}>
              <div className={styles.chapterMeta}>
                <span className={styles.chapterIndex}>02</span>
                <p className={styles.chapterLabel}>Harder questions</p>
                <p className={styles.chapterEra}>Efficiency · Federated robustness</p>
              </div>
              <div className={styles.chapterBody}>
                <p>
                  Several projects followed. In <strong>PulmoLiteNet</strong>, I chased a stubborn, narrow question: how small can a diagnostic model become before accuracy gives way? The result was a lightweight lung-histopathology classifier that held <strong>99.8%</strong> accuracy within roughly a <strong>0.49&nbsp;MB</strong> footprint &mdash; small enough for edge and microcontroller deployment.
                </p>
                <p>
                  But the questions that genuinely reshaped my thinking came from federated learning for aircraft-engine prognostics. The research questions were sharp: how should a federated model cope with heterogeneous, non-IID data, and how can it stay trustworthy in the presence of attackers and malicious clients? That project changed how I judge my own results.
                </p>
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

            <article className={styles.chapter}>
              <div className={styles.chapterMeta}>
                <span className={styles.chapterIndex}>04</span>
                <p className={styles.chapterLabel}>Where I&rsquo;m heading</p>
                <p className={styles.chapterEra}>LLM evaluation · Prompt optimization</p>
              </div>
              <div className={styles.chapterBody}>
                <p>
                  Most recently I have been building MCP servers and enterprise systems on top of LLMs and generative AI. The difficulties that keep returning are the ones I now care about most: <strong>evaluation</strong>, <strong>reliability</strong>, and above all <strong>consistency</strong>.
                </p>
                <p>
                  That pull led me to prompt optimization, which is the part of my work I enjoy most right now. Over the next chapter of my life, I want to build my research squarely around these questions &mdash; how to make generative systems dependable, and how to prove that they are.
                </p>
                <div className={styles.chapterLinks}>
                  <a className={styles.paperLink} href="https://arxiv.org/abs/2608.04045" target="_blank" rel="noreferrer">
                    Read the federated-learning preprint <FiExternalLink aria-hidden="true" />
                  </a>
                  <Link className={styles.inlineLink} to="/research/dspy-rag-optimization">
                    View the preliminary DSPy study <FiArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          </div>

          <Link className={styles.researchArchiveLink} to="/research">
            Explore the experiments and studies <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionPractice}`} aria-labelledby="practice-heading">
        <div className={styles.inner}>
          <header className={styles.sectionIntro}>
            <div>
              <h2 id="practice-heading" className={styles.sectionHeading}>Production Work</h2>
              <p className={styles.sectionLead}>
                Industry systems are not presented as substitutes for research. They show where evaluation assumptions meet users, privacy boundaries, infrastructure failures, and operational cost.
              </p>
            </div>
          </header>

          <div className={styles.practiceGrid}>
            {practiceWork.map((item, index) => (
              <article className={styles.practiceItem} key={item.title}>
                <span className={styles.practiceIndex}>{String(index + 1).padStart(2, "0")}</span>
                <h3 className={styles.practiceTitle}>{item.title}</h3>
                <p className={styles.practiceCopy}>{item.copy}</p>
                <p className={styles.practiceEvidence}>{item.evidence}</p>
                <Link className={styles.inlineLink} to={item.link}>
                  {item.linkLabel} <FiArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="closing-heading">
        <div className={styles.inner}>
          <div className={styles.closingGrid}>
            <div className={styles.closingStatement}>
              <p className={styles.closingEyebrow}>Research direction · Fall 2027</p>
              <h2 id="closing-heading" className={styles.closingHeading}>
                Seeking a PhD environment where reliability is part of the research question.
              </h2>
            </div>
            <div className={styles.closingDetails}>
              <p className={styles.closingCopy}>
                For Fall 2027, I am interested in groups working on trustworthy machine learning, robust and personalized federated learning, efficient healthcare AI, and rigorous evaluation of LLM systems. I am also open to research collaboration before the application cycle.
              </p>
              <div className={styles.closingActions}>
                <a className={styles.primaryAction} href={`mailto:${resumeData.links.email}`}>
                  Discuss research <FiMail aria-hidden="true" />
                </a>
                <a className={styles.secondaryAction} href={scholarUrl} target="_blank" rel="noreferrer">
                  Google Scholar <FiExternalLink aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.closingEndcap}>
            <p className={styles.closingIdentity}>
              <strong>Chinmoy Mitra</strong>
              <span>AI/ML Application Developer · Dhaka, Bangladesh</span>
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