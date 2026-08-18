import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiExternalLink, FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import avatarImg from "../../Assets/avatar.png";
import resumeData from "../../data/resume.json";
import styles from "./Home.module.css";

const scholarUrl = "https://scholar.google.com/citations?view_op=list_works&hl=en&user=kUignlYAAAAJ";

const researchQuestions = [
  {
    question: "How can collaborative models remain useful when clients are heterogeneous or adversarial?",
    body: "I study personalization, robust aggregation, and failure-specific evaluation in federated learning rather than treating clean test accuracy as a sufficient safety claim.",
    evidence: "Aircraft-engine prognostics · C-MAPSS · Robust federated learning",
  },
  {
    question: "How much diagnostic performance can be retained under edge-scale memory and compute limits?",
    body: "My healthcare AI work examines the relationship between architecture size, diagnostic accuracy, and practical deployment on constrained hardware.",
    evidence: "PulmoLiteNet · MRI classification · Efficient deep learning",
  },
  {
    question: "How should generative systems be evaluated when several kinds of quality matter at once?",
    body: "I compare accuracy, latency, cost, robustness, and human oversight in LLM and RAG systems, then carry those measurements into production workflows.",
    evidence: "DSPy optimization · RAG evaluation · Human-reviewed AI",
  },
];

const researchTrajectory = [
  {
    period: "2019-2025",
    domain: "Medical imaging",
    title: "Accuracy was the starting point.",
    question: "Can transfer learning distinguish multiple brain-tumor classes from MRI data with limited training resources?",
    body: "My undergraduate thesis used ResNet50-based transfer learning and ensemble methods for multiclass MRI classification. The work reached approximately 99.50% accuracy and was published at IEEE QPAN 2025.",
    lesson: "The result established my foundation in experimental design, medical imaging, and reporting model performance with a defined data boundary.",
    link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=kUignlYAAAAJ&citation_for_view=kUignlYAAAAJ:u5HHmVD_uO8C",
    linkLabel: "View publication",
    external: true,
  },
  {
    period: "2025",
    domain: "Scientific NLP",
    title: "Noisy evidence changed the question.",
    question: "What can structured and textual evidence reveal about why scientific papers are retracted?",
    body: "I analyzed 35,215 retraction records, engineered 22 reason features, and combined exploratory analysis, clustering, and classification to identify recurring patterns across a difficult multi-label domain.",
    lesson: "A 64.5% best classification accuracy made the limitation visible: ambiguous labels and incomplete records are part of the research problem, not preprocessing details to hide.",
    link: "/research/paper-retraction-analysis",
    linkLabel: "Read the study",
  },
  {
    period: "2026",
    domain: "Efficient healthcare AI",
    title: "Efficiency became part of correctness.",
    question: "Can a clinically useful vision model fit within the memory budget of commodity edge hardware?",
    body: "PulmoLiteNet redesigns an AlexNet-derived backbone for three-class lung histopathology classification. It attained 99.8% test accuracy on LC25000 with an approximately 0.49 MB memory footprint.",
    lesson: "The accepted IEEE BECITHCON 2026 paper treats model size and deployability as first-class evaluation criteria alongside predictive performance.",
  },
  {
    period: "2025-2026",
    domain: "LLM evaluation",
    title: "Generative systems required a wider scorecard.",
    question: "How do automatic prompt optimizers change accuracy, latency, and cost under different starting constraints?",
    body: "A controlled DSPy study compared optimization strategies in production RAG settings. The experiments measured a 38% cost reduction, a 3.2x latency improvement, and a 9.6% accuracy gain in different configurations.",
    lesson: "Optimization is conditional: the best method depends on the initial bottleneck and the metric the system is required to improve.",
    link: "/research/dspy-rag-optimization",
    linkLabel: "Examine the experiments",
  },
  {
    period: "2026",
    domain: "Robust federated learning",
    title: "Reliability now includes hostile conditions.",
    question: "Can federated prognostics remain personalized and robust when operators differ and some clients submit poisoned updates?",
    body: "On C-MAPSS aircraft-engine telemetry, shared-representation personalization closed approximately 70% of the local-to-centralized RMSE gap. A backdoor reached 94.9% attack success against standard averaging, while personalization with robust aggregation reduced it to 2.8%.",
    lesson: "Clean accuracy alone cannot certify safety. Robustness requires explicit attack evaluation and a measured trade-off between update selection and collaborative representation learning.",
    link: "https://arxiv.org/abs/2608.04045",
    linkLabel: "Read the arXiv preprint",
    external: true,
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

function EvidenceLink({ item }) {
  if (!item.link) return null;

  if (item.external) {
    return (
      <a className={styles.inlineLink} href={item.link} target="_blank" rel="noreferrer">
        {item.linkLabel} <FiExternalLink aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link className={styles.inlineLink} to={item.link}>
      {item.linkLabel} <FiArrowRight aria-hidden="true" />
    </Link>
  );
}

function Home() {
  const publications = resumeData.publications || [];

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.inner}>
          <div className={styles.heroLayout}>
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>Research portfolio · Machine learning and AI systems</p>
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
                <figcaption className={styles.portraitCaption}>Dhaka, Bangladesh</figcaption>
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
                <div className={styles.profileFact}>
                  <dt className={styles.profileLabel}>Research record</dt>
                  <dd className={styles.profileValue}>Published · accepted · submitted</dd>
                </div>
              </dl>

              <nav className={styles.profileLinks} aria-label="External academic and professional links">
                <a href={scholarUrl} target="_blank" rel="noreferrer">Scholar</a>
                <a href={resumeData.links.github} target="_blank" rel="noreferrer"><FaGithub aria-hidden="true" /> GitHub</a>
                <a href={resumeData.links.linkedin} target="_blank" rel="noreferrer"><FaLinkedinIn aria-hidden="true" /> LinkedIn</a>
              </nav>
            </aside>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionQuestions}`} aria-labelledby="questions-heading">
        <div className={styles.inner}>
          <header className={styles.sectionIntro}>
            <p className={styles.sectionNumber}>01 · Active questions</p>
            <div>
              <h2 id="questions-heading" className={styles.sectionHeading}>The questions connecting the work.</h2>
              <p className={styles.sectionLead}>
                The application domains differ, but the research concern is consistent: dependable models require evaluation that reflects the conditions in which they will actually operate.
              </p>
            </div>
          </header>

          <div className={styles.agendaList}>
            {researchQuestions.map((item, index) => (
              <article className={styles.agendaItem} key={item.question}>
                <span className={styles.agendaIndex}>{String(index + 1).padStart(2, "0")}</span>
                <h3 className={styles.agendaQuestion}>{item.question}</h3>
                <div className={styles.agendaBody}>
                  <p>{item.body}</p>
                  <p className={styles.agendaEvidence}>{item.evidence}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="publications" className={`${styles.section} ${styles.sectionPublications}`} aria-labelledby="publications-heading">
        <div className={styles.inner}>
          <header className={styles.sectionIntro}>
            <p className={styles.sectionNumber}>02 · Publication record</p>
            <div>
              <h2 id="publications-heading" className={styles.sectionHeading}>Published, accepted, and under review.</h2>
              <p className={styles.sectionLead}>
                Status labels are explicit so a reviewer can distinguish completed publication, conference acceptance, and submitted manuscript work at a glance.
              </p>
            </div>
          </header>

          <div className={styles.publicationList}>
            {publications.map((publication) => (
              <article className={styles.publication} key={publication.title}>
                <div className={styles.publicationMeta}>
                  <span className={styles.publicationStatus} data-status={publication.status.toLowerCase()}>{publication.status}</span>
                  <span className={styles.publicationYear}>{publication.year}</span>
                </div>

                <div className={styles.publicationContent}>
                  <h3 className={styles.publicationTitle}>{publication.title}</h3>
                  <p className={styles.publicationVenue}>{publication.venue}</p>
                  {publication.authors && (
                    <p className={styles.publicationAuthors}>{publication.authors.join(", ")}</p>
                  )}
                  <p className={styles.publicationSummary}>{publication.summary}</p>

                  {publication.metrics && (
                    <ul className={styles.metricList}>
                      {publication.metrics.map((metric) => <li key={metric}>{metric}</li>)}
                    </ul>
                  )}

                  <div className={styles.publicationLinks}>
                    {publication.link ? (
                      <a className={styles.paperLink} href={publication.link} target="_blank" rel="noreferrer">
                        {publication.status === "Submitted" ? "Read arXiv preprint" : "View publication"} <FiExternalLink aria-hidden="true" />
                      </a>
                    ) : (
                      <span className={styles.pendingLink}>Public paper link forthcoming</span>
                    )}
                    {publication.pdfLink && (
                      <a className={styles.paperLink} href={publication.pdfLink} target="_blank" rel="noreferrer">
                        PDF <FiExternalLink aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionTrajectory}`} aria-labelledby="trajectory-heading">
        <div className={styles.inner}>
          <header className={styles.sectionIntro}>
            <p className={styles.sectionNumber}>03 · Research throughline</p>
            <div>
              <h2 id="trajectory-heading" className={styles.sectionHeading}>The question kept getting harder.</h2>
              <p className={styles.sectionLead}>
                I began by asking whether a model could be accurate. Each project added a condition that a useful system also has to satisfy: noisy evidence, limited memory, multiple objectives, heterogeneous clients, and adversarial behavior.
              </p>
            </div>
          </header>

          <div className={styles.trajectoryList}>
            {researchTrajectory.map((item, index) => (
              <article className={styles.trajectoryItem} key={item.title}>
                <span className={styles.trajectoryIndex}>{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.trajectoryMeta}>
                  <p className={styles.trajectoryPeriod}>{item.period}</p>
                  <p className={styles.trajectoryDomain}>{item.domain}</p>
                </div>
                <div className={styles.trajectoryContent}>
                  <h3 className={styles.trajectoryTitle}>{item.title}</h3>
                  <p className={styles.trajectoryQuestion}>{item.question}</p>
                  <p className={styles.trajectoryBody}>{item.body}</p>
                  <p className={styles.trajectoryLesson}>{item.lesson}</p>
                  <EvidenceLink item={item} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionPractice}`} aria-labelledby="practice-heading">
        <div className={styles.inner}>
          <header className={styles.sectionIntro}>
            <p className={styles.sectionNumber}>04 · Research in practice</p>
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
            <p className={styles.closingEyebrow}>05 · Current direction</p>
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