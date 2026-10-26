import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiExternalLink, FiShield } from "react-icons/fi";
import { Reveal } from "../../../utils/Reveal";
import data from "./data";
import styles from "./Codeblocks.module.css";

const publicUrl = process.env.PUBLIC_URL || "";

function ChapterHeader({ number, label, title, lead, id }) {
  return (
    <header className={styles.chapterHeader}>
      <p className={styles.kicker}>{number} / {label}</p>
      <h2 id={id} className={styles.chapterHeading}>{title}</h2>
      {lead && <p className={styles.chapterLead}>{lead}</p>}
    </header>
  );
}

function Codeblocks() {
  const navigate = useNavigate();
  const shot = (file) => `${publicUrl}/assets/projects/codeblocks/${file}`;
  const [heroShot, summaryShot, pathShot, historyShot, findingShot] = data.gallery;

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="cb-title">
        <div className={`max-w-container mx-auto px-6 md:px-8 ${styles.heroInner}`}>
          <div className={styles.topBar}>
            <button type="button" onClick={() => navigate("/project")} className={styles.backButton}>
              <FiArrowLeft aria-hidden="true" /> Projects
            </button>
            <span className={styles.status}>
              <span className={styles.statusDot} aria-hidden="true" /> Live · ByteMethod AI
            </span>
          </div>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>Application security · AI agents</p>
              <h1 id="cb-title" className={`font-newsreader ${styles.heroTitle}`}>Codeblocks</h1>
              <p className={`font-newsreader ${styles.heroStatement}`}>{data.tagline}</p>
              <p className={styles.heroSummary}>{data.summary}</p>
              <div className={styles.heroActions}>
                <a href={data.liveUrl} target="_blank" rel="noreferrer" className={styles.primaryButton}>
                  Open the live app <FiExternalLink aria-hidden="true" />
                </a>
                <a href="#problem" className={styles.textLink}>
                  Read the case study <FiArrowRight aria-hidden="true" />
                </a>
              </div>
            </div>

            <figure className={styles.heroFigure}>
              <img src={shot(heroShot.file)} alt={heroShot.alt} width="1440" height="900" />
              <figcaption>{heroShot.caption}</figcaption>
            </figure>
          </div>

          <dl className={styles.stats} aria-label="Project scale">
            {data.stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt className={styles.statLabel}>{stat.label}</dt>
                <dd className={styles.statValue}>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="problem" className={styles.chapter} aria-labelledby="problem-heading">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <Reveal>
            <ChapterHeader number="01" label="The problem" id="problem-heading" title={data.problem.title} lead={data.problem.lead} />
          </Reveal>
          <div className={styles.cardGrid}>
            {data.problem.points.map((point, i) => (
              <Reveal key={point.title} delay={i * 90}>
                <div className={styles.card}>
                  <span className={styles.cardIndex}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className={styles.cardTitle}>{point.title}</h3>
                  <p className={styles.cardBody}>{point.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="approach" className={`${styles.chapter} ${styles.chapterTint}`} aria-labelledby="approach-heading">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <Reveal>
            <ChapterHeader
              number="02"
              label="The approach"
              id="approach-heading"
              title="Source code becomes a graph, and findings become paths through it."
              lead="Codeblocks reads facts from the code rather than guessing. Every finding is the output of an explicit rule over the parsed structure, so the same repository produces the same result."
            />
          </Reveal>
          <ol className={styles.pipeline}>
            {data.pipeline.map((item, i) => (
              <Reveal key={item.step} delay={i * 60}>
                <li className={styles.pipelineStep}>
                  <span className={styles.pipelineNumber}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className={styles.pipelineTitle}>{item.step}</h3>
                  <p className={styles.pipelineBody}>{item.detail}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="product" className={styles.chapter} aria-labelledby="product-heading">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <Reveal>
            <ChapterHeader
              number="03"
              label="The product"
              id="product-heading"
              title="Four views of one analysis."
              lead="A project workspace keeps the summary, the graph, the written report, and the version history one click apart."
            />
          </Reveal>
          <div className={styles.viewList}>
            {data.views.map((view, i) => (
              <Reveal key={view.name} delay={i * 70}>
                <div className={styles.viewItem}>
                  <h3 className={styles.viewName}>{view.name}</h3>
                  <p className={styles.viewDetail}>{view.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className={styles.gallery}>
            <Reveal className={styles.galleryWide}>
              <figure className={styles.shot}>
                <img src={shot(summaryShot.file)} alt={summaryShot.alt} loading="lazy" />
                <figcaption>{summaryShot.caption}</figcaption>
              </figure>
            </Reveal>
            {[pathShot, historyShot].map((item) => (
              <Reveal key={item.file}>
                <figure className={`${styles.shot} ${styles.shotScene}`}>
                  <img src={shot(item.file)} alt={item.alt} loading="lazy" />
                  <figcaption>{item.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
            <Reveal className={styles.galleryWide}>
              <div className={styles.findingRow}>
                <figure className={`${styles.shot} ${styles.shotTall}`}>
                  <img src={shot(findingShot.file)} alt={findingShot.alt} loading="lazy" />
                  <figcaption>{findingShot.caption}</figcaption>
                </figure>
                <div>
                  <h3 className={styles.listHeading}>What a finding shows</h3>
                  {data.findingNotes.map((note) => (
                    <div key={note.title} className={styles.textBlock}>
                      <h4>{note.title}</h4>
                      <p>{note.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
          <p className={styles.note}>
            Screenshots come from the live product, using a small synthetic sample repository in guest preview. The graph and version
            workspaces are behind sign-in; the path and history images are the illustrative scenes from the product's landing page.
          </p>
        </div>
      </section>

      <section id="coverage" className={`${styles.chapter} ${styles.chapterTint}`} aria-labelledby="coverage-heading">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <Reveal>
            <ChapterHeader
              number="04"
              label="Security coverage"
              id="coverage-heading"
              title="Conventional application risks and LLM-workflow risks, in one pass."
              lead="Findings are potential risks to review, not confirmed exploits. Each one explains why it matters and points to the evidence."
            />
          </Reveal>
          <div className={styles.coverageGrid}>
            <Reveal>
              <div>
                <h3 className={styles.listHeading}>Application security</h3>
                <ul className={styles.checkList}>
                  {data.coverage.app.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div>
                <h3 className={styles.listHeading}>AI-agent analysis</h3>
                <ul className={styles.checkList}>
                  {data.coverage.agent.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <p className={styles.guardNote}>{data.coverage.guardNote}</p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div>
                <h3 className={styles.listHeading}>Every finding includes</h3>
                <ul className={styles.checkList}>
                  {data.coverage.findingAnatomy.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="architecture" className={styles.chapter} aria-labelledby="architecture-heading">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <Reveal>
            <ChapterHeader
              number="05"
              label="Architecture and privacy"
              id="architecture-heading"
              title="A plugin pipeline behind a Next.js workspace, built to keep as little as possible."
            />
          </Reveal>
          <div className={styles.twoCol}>
            <div>
              <h3 className={styles.listHeading}>Technical architecture</h3>
              {data.architecture.map((item, i) => (
                <Reveal key={item.title} delay={i * 60}>
                  <div className={styles.textBlock}>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div>
              <h3 className={styles.listHeading}>Projects and privacy</h3>
              {data.privacy.map((item, i) => (
                <Reveal key={item.title} delay={i * 60}>
                  <div className={styles.textBlock}>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <ul className={styles.stackList} aria-label="Technology stack">
            {data.stack.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section id="outcomes" className={`${styles.chapter} ${styles.chapterTint}`} aria-labelledby="outcomes-heading">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <Reveal>
            <ChapterHeader
              number="06"
              label="Outcomes"
              id="outcomes-heading"
              title="What the platform makes possible."
            />
          </Reveal>
          <ul className={styles.outcomes}>
            {data.outcomes.map((item, i) => (
              <Reveal key={item} delay={i * 50}>
                <li><FiShield aria-hidden="true" /> {item}</li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="cb-cta-heading">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <Reveal>
            <h2 id="cb-cta-heading" className={styles.ctaHeading}>Find the paths worth reviewing.</h2>
            <div className={styles.heroActions}>
              <a href={data.liveUrl} target="_blank" rel="noreferrer" className={styles.primaryButton}>
                Open the live app <FiExternalLink aria-hidden="true" />
              </a>
              <Link to="/project" className={styles.textLink}>
                <FiArrowLeft aria-hidden="true" /> All projects
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

export default Codeblocks;
