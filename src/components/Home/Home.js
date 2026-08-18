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

const researchArc = [
  {
    period: "2019-2025",
    domain: "Medical imaging · Scientific NLP",
    title: "I started by measuring accuracy.",
    body: "My early work asked whether machine-learning models could extract useful signals from complex datasets, from multiclass brain-tumor MRI classification to large-scale analysis of scientific retractions.",
    transition: "High benchmark performance was only part of the answer. Noisy labels, incomplete evidence, and deployment constraints began to matter.",
  },
  {
    period: "2025-2026",
    domain: "Efficient · Robust learning",
    title: "I began chasing reliability under constraints.",
    body: "PulmoLiteNet made efficiency part of the research objective. Federated aircraft-engine prognostics added non-IID clients, personalization, adversarial updates, and safety-specific evaluation.",
    transition: "A model could be accurate and still be too large, insufficiently personalized, or vulnerable under realistic operating conditions.",
  },
  {
    period: "Current",
    domain: "LLM evaluation · RAG · Agentic systems",
    title: "Now I am chasing dependable generative AI.",
    body: "My current direction asks how generative systems should be evaluated and controlled when quality has several dimensions: correctness, retrieval grounding, robustness, latency, cost, and human oversight.",
    questions: [
      "How can evaluation expose failures that aggregate benchmark scores hide?",
      "How should RAG and agentic systems balance quality, efficiency, and controllability?",
      "Where should human review remain part of the system rather than an afterthought?",
    ],
  },
];

const practiceWork = [
  {
    title: "Evaluation before optimization",
    copy: "DSPy experiments use controlled baselines and multi-metric comparisons to determine whether an intervention improves the actual bottleneck rather than a convenient proxy.",
    evidence: "Accuracy · latency · cost · starting conditions",
    link: "/research/dspy-rag-optimization",
    linkLabel: "DSPy study",
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
                I study how learning systems can remain reliable when data, users, and operating conditions change.
              </p>
              <p className={styles.heroCopy}>
                My work spans robust federated learning, efficient healthcare AI, LLM evaluation, and production AI systems. Across each setting, I focus on what accuracy alone leaves unanswered: robustness, efficiency, failure behavior, and evidence.
              </p>
              <p className={styles.heroStatus}>Preparing for Fall 2027 PhD applications</p>

              <div className={styles.heroActions}>
                <a className={styles.primaryAction} href="#publications">
                  View publications <FiArrowRight aria-hidden="true" />
                </a>
                <Link className={styles.secondaryAction} to="/research">
                  Research archive <FiArrowRight aria-hidden="true" />
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
                  <dd className={styles.profileValue}>AI/ML Application Developer, Dexian</dd>
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
              <h2 id="publications-heading" className={styles.sectionHeading}>Research Summary</h2>
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
              <h2 id="trajectory-heading" className={styles.sectionHeading}>From accurate models to dependable GenAI.</h2>
            </div>
          </header>

          <div className={styles.researchArcList}>
            {researchArc.map((item, index) => (
              <article className={styles.researchArcItem} key={item.title}>
                <div className={styles.researchArcMeta}>
                  <span className={styles.researchArcIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item.period}</p>
                  <p>{item.domain}</p>
                </div>
                <div className={styles.researchArcContent}>
                  <h3 className={styles.researchArcTitle}>{item.title}</h3>
                  <p className={styles.researchArcBody}>{item.body}</p>
                  {item.transition && (
                    <p className={styles.researchArcTransition}><strong>What changed:</strong> {item.transition}</p>
                  )}
                  {item.questions && (
                    <ul className={styles.researchArcQuestions}>
                      {item.questions.map((question) => <li key={question}>{question}</li>)}
                    </ul>
                  )}
                </div>
              </article>
            ))}
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
              <h2 id="practice-heading" className={styles.sectionHeading}>Production work as a pressure test.</h2>
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
            <div>
              <h2 id="closing-heading" className={styles.closingHeading}>
                Seeking a PhD environment where reliability is part of the research question.
              </h2>
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
        </div>
      </section>
    </main>
  );
}

export default Home;