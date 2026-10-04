import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowDown,
  FiArrowLeft,
  FiArrowRight,
  FiGithub,
  FiPackage,
  FiTerminal,
} from "react-icons/fi";
import { Reveal } from "../../../utils/Reveal";
import AnimatedStatValue from "../Note2Action/AnimatedStatValue";
import data from "./data";
import styles from "./UICraftMCP.module.css";

function ChapterHeader({ number, label, title, lead, id }) {
  return (
    <div className={`${styles.chapterHeader} ${styles.chapterHeaderStacked}`}>
      <p className={styles.chapterKicker}>{number} · {label}</p>
      <div>
        <h2 id={id} className={styles.chapterHeading}>{title}</h2>
        {lead && <p className={styles.chapterLead}>{lead}</p>}
      </div>
    </div>
  );
}

function UICraftMCPProject() {
  const navigate = useNavigate();

  const scrollToProblem = (event) => {
    event.preventDefault();
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("problem")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="uic-title">
        <div className={`max-w-container mx-auto px-6 md:px-8 ${styles.heroInner}`}>
          <div className="flex items-center justify-between gap-4 pt-5">
            <button
              type="button"
              onClick={() => navigate("/project")}
              className="inline-flex min-h-[44px] items-center gap-2 font-inter text-[0.72rem] text-white/60 hover:text-white transition-colors uppercase tracking-[0.1em]"
            >
              <FiArrowLeft aria-hidden="true" />
              Projects
            </button>
            <span className={styles.heroStatus}>
              <FiPackage aria-hidden="true" />
              Open Source · npm
            </span>
          </div>

          <div className={styles.heroCopy}>
            <h1 id="uic-title" className={`font-newsreader ${styles.heroTitle}`}>UI Craft</h1>
            <p className={`font-newsreader mt-6 ${styles.heroStatement}`}>
              {data.tagline}
            </p>
            <p className="font-inter text-[0.95rem] text-white/58 leading-relaxed max-w-xl mt-5">
              {data.summary}
            </p>
          </div>

          <div className={styles.heroStats} aria-label="Project scale">
            {data.stats.map((stat) => (
              <div key={stat.label} className={styles.heroStat}>
                <AnimatedStatValue value={stat.value} className={styles.heroStatValue} />
                <span className={styles.heroStatLabel}>{stat.label}</span>
              </div>
            ))}
          </div>

          <a href="#problem" className={styles.scrollCue} aria-label="Scroll to the problem section" onClick={scrollToProblem}>
            <span>Scroll down</span>
            <span className={styles.scrollCueIcon}><FiArrowDown aria-hidden="true" /></span>
          </a>
        </div>
      </section>

      <nav className="max-w-container mx-auto px-6 md:px-8" aria-label="UI Craft case study chapters">
        <div className={styles.chapterNav}>
          {data.chapters.map((chapter, index) => (
            <a key={chapter.id} href={`#${chapter.id}`} className={styles.chapterLink}>
              <span className={styles.chapterNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span>{chapter.label}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* ===== 01 PROBLEM ===== */}
      <section id="problem" className={styles.chapter} aria-labelledby="problem-heading">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <Reveal>
            <ChapterHeader
              number="01"
              label="The Context Tax"
              id="problem-heading"
              title="Design knowledge that lives in a skill.md evaporates exactly when you need it."
              lead="Every full-stack dev has been here: build a great backend, slap a UI on top, and hope it looks good. It never does. Most teams respond by writing the good taste down somewhere — a style guide, a notes file, a running list of 'make it feel more like X.' None of that actually changes how the agent thinks mid-session, because it was never built to be consulted at the moment of a decision — only to be pasted in after the fact, if anyone remembers. By the time that happens, the hero section is already shipped."
            />
          </Reveal>
          <div className={styles.painGrid}>
            {data.painPoints.map((point, i) => (
              <Reveal key={point.title} delay={i * 100}>
                <div className={styles.painCard}>
                  <span className={styles.painIndex}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className={styles.painTitle}>{point.title}</h3>
                  <p className={styles.painBody}>{point.body}</p>
                  <p className={styles.painImpact}>{point.impact}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 02 SOLUTION ===== */}
      <section id="solution" className={`${styles.chapter} ${styles.chapterDark} ${styles.solutionChapter}`} aria-labelledby="solution-heading">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <Reveal>
            <ChapterHeader
              number="02"
              label="The Approach"
              id="solution-heading"
              title="A tool the agent calls, not context it carries."
              lead={data.solutionIntro}
            />
          </Reveal>

          <Reveal delay={100}>
            <div className={styles.exampleCard}>
              <div className={styles.exampleRequest}>
                <span>You say</span>
                <p>&ldquo;{data.exampleRequest}&rdquo;</p>
              </div>
              <div className={styles.exampleOutput}>
                {data.exampleOutputSections.map((row) => (
                  <div key={row.label} className={styles.exampleRow}>
                    <span className={styles.exampleRowLabel}>{row.label}</span>
                    <p className={styles.exampleRowValue}>{row.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className={styles.solutionSteps}>
            {data.solutionSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <div>
                  <div className={styles.solutionStepNum}>{i + 1}</div>
                  <h3 className={styles.solutionStepTitle}>{step.title}</h3>
                  <p className={styles.solutionStepShort}>{step.short}</p>
                  <p className={styles.solutionStepDetail}>{step.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <div className={styles.principleGrid}>
              {data.engineeringChoices.map((choice) => (
                <div key={choice.title}>
                  <h3 className={styles.principleTitle}>{choice.title}</h3>
                  <p className={styles.principleBody}>{choice.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 03 ARCHITECTURE ===== */}
      <section id="architecture" className={`${styles.chapter} ${styles.chapterTint} ${styles.architectureChapter}`} aria-labelledby="architecture-heading">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <Reveal>
            <ChapterHeader
              number="03"
              label="Architecture"
              id="architecture-heading"
              title="Seven tools, five knowledge domains, one local-first store."
              lead="Every call is a narrow, well-typed request. The agent discovers the tools itself — no slash commands, no memorized syntax."
            />
          </Reveal>

          <div className={styles.toolGrid}>
            {data.tools.map((tool) => (
              <Reveal key={tool.name}>
                <div className={styles.toolCard}>
                  <h3 className={styles.toolName}><code>{tool.name}</code></h3>
                  <p className={styles.toolPurpose}>{tool.purpose}</p>
                  <p className={styles.toolExample}>{tool.example}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className={styles.kbRow}>
              {data.kbDomains.map((domain) => (
                <div key={domain.name}>
                  <span className={styles.kbName}>{domain.name}</span>
                  <p className={styles.kbDetail}>{domain.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className={styles.storageCard}>
              <div>
                <p className="font-inter text-[0.65rem] uppercase tracking-[0.1em] text-white/50 mb-3">.vscode/ui-assistant/</p>
                <pre className={styles.storageTree}>{data.storageTree.join("\n")}</pre>
              </div>
              <p className={styles.storageNote}>{data.storageNote}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 04 IMPACT + RATIONALE ===== */}
      <section id="impact" className={`${styles.chapter} ${styles.impactChapter}`} aria-labelledby="impact-heading">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <Reveal>
            <ChapterHeader
              number="04"
              label="Impact + Rationale"
              id="impact-heading"
              title="What shipped, what's next, and why it's built this way."
              lead="No invented adoption numbers — the metrics describe what's in the npm package today; the rationale explains the trade-offs behind it."
            />
          </Reveal>

          <div className={styles.impactRationaleGrid}>
            <Reveal>
              <aside aria-label="UI Craft impact signals">
                <p className={styles.impactColumnLabel}>The shipped shape</p>
                {data.impactMetrics.map((metric) => (
                  <div key={metric.label} className={styles.impactMetric}>
                    <span className={styles.impactMetricValue}>{metric.value}</span>
                    <div>
                      <h3>{metric.label}</h3>
                      <p>{metric.copy}</p>
                    </div>
                  </div>
                ))}

                <div className={styles.roadmapRow}>
                  <div>
                    <p className={styles.roadmapLabel}>
                      <span className={styles.roadmapDot} style={{ background: "#6a58d1" }} />
                      Shipped (v0.4.7)
                    </p>
                    <ul className={styles.roadmapList}>
                      {data.roadmapShipped.slice(0, 5).map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className={styles.roadmapLabel}>
                      <span className={styles.roadmapDot} style={{ background: "rgba(28,28,25,0.3)" }} />
                      Next up
                    </p>
                    <ul className={styles.roadmapList}>
                      {data.roadmapNext.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </aside>
            </Reveal>

            <Reveal delay={100}>
              <div>
                <p className={styles.impactColumnLabel}>Design decisions</p>
                {data.rationale.map((item, index) => (
                  <details key={item.question} className={styles.rationaleItem} open={index === 0}>
                    <summary>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{item.question}</strong>
                    </summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="contact-heading">
        <div className="relative z-10 max-w-container mx-auto px-6 md:px-8">
          <Reveal>
            <p className="font-inter text-[0.68rem] text-[#a398f5] uppercase tracking-[0.12em] mb-5">
              Building agent-facing tools too?
            </p>
            <h2 id="contact-heading" className={styles.ctaHeading}>
              Give your coding agent a design brief, not a prompt.
            </h2>
            <div className={styles.ctaActions}>
              <a href={data.links.npm} target="_blank" rel="noreferrer" className={styles.ctaPrimary}>
                <FiTerminal aria-hidden="true" />
                npx -y @chinmoy_mitra/ui-craft
                <FiArrowRight aria-hidden="true" />
              </a>
              <a href={data.links.repo} target="_blank" rel="noreferrer" className={styles.ctaSecondary}>
                <FiGithub aria-hidden="true" />
                View on GitHub
              </a>
              <Link to="/project" className={styles.ctaSecondary}>
                <FiArrowLeft aria-hidden="true" />
                Explore all projects
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

export default UICraftMCPProject;
