import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiMessageCircle } from "react-icons/fi";
import { Reveal } from "../../../utils/Reveal";
import HeroInfographic from "./HeroInfographic";
import ProblemStory from "./ProblemStory";
import SolutionFlow from "./SolutionFlow";
import SystemStage from "./SystemCube/SystemStage";
import data from "./data";
import styles from "./Note2Action.module.css";

function ChapterHeader({ number, label, title, lead, dark = false, id }) {
  return (
    <div className={styles.chapterHeader}>
      <p className={styles.chapterKicker}>{number} · {label}</p>
      <div>
        <h2 id={id} className={styles.chapterHeading}>{title}</h2>
        {lead && <p className={styles.chapterLead}>{lead}</p>}
      </div>
    </div>
  );
}

function Note2ActionProject() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="n2a-title">
        <HeroInfographic />
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
            <span className="font-inter text-[0.65rem] text-white/40 uppercase tracking-[0.1em]">
              Production system · Private / SSO
            </span>
          </div>

          <div className={styles.heroCopy}>
            <p className="font-inter text-[0.7rem] text-[#83d8d2] uppercase tracking-[0.12em] mb-5">
              AI-assisted account management
            </p>
            <h1 id="n2a-title" className={`font-newsreader ${styles.heroTitle}`}>Note2Action</h1>
            <p className={`font-newsreader mt-6 ${styles.heroStatement}`}>
              Every client note should end with a next step.
            </p>
            <p className="font-inter text-[0.95rem] text-white/58 leading-relaxed max-w-xl mt-5">
              A constrained AI pipeline turns recent CRM notes into one Suggested Action and Due Date, then delivers the result through a focused web dashboard and Microsoft Teams.
            </p>
          </div>

          <div className={styles.heroStats} aria-label="Project scale">
            {data.stats.map((stat) => (
              <div key={stat.label} className={styles.heroStat}>
                <span className={styles.heroStatValue}>{stat.value}</span>
                <span className={styles.heroStatLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <nav className="max-w-container mx-auto px-6 md:px-8" aria-label="Note2Action case study chapters">
        <div className={styles.chapterNav}>
          {data.chapters.map((chapter, index) => (
            <a key={chapter.id} href={`#${chapter.id}`} className={styles.chapterLink}>
              <span className={styles.chapterNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span>{chapter.label}</span>
            </a>
          ))}
        </div>
      </nav>

      <section id="problem" className={styles.chapter} aria-labelledby="problem-heading">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <Reveal>
            <ChapterHeader
              number="01"
              label="The operational gap"
              id="problem-heading"
              title="The company had the context. Account managers still had to find the action."
              lead="Client history was captured faithfully, but the decision layer was missing: what should happen next, and when?"
            />
          </Reveal>
          <ProblemStory steps={data.problemStory} />
        </div>
      </section>

      <section id="solution" className={`${styles.chapter} ${styles.chapterDark}`} aria-labelledby="solution-heading">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <Reveal>
            <ChapterHeader
              number="02"
              label="The response"
              id="solution-heading"
              title="One narrow AI contract, carried through four deliberate stages."
              lead="The system does not try to automate account management. It cleans the note, proposes one reviewable action, and places it inside the existing workflow."
              dark
            />
          </Reveal>
          <Reveal delay={100}>
            <SolutionFlow steps={data.solutionSteps} surfaces={data.solutionSurfaces} />
          </Reveal>
        </div>
      </section>

      <section id="architecture" className={styles.chapter} aria-labelledby="architecture-heading">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <Reveal>
            <ChapterHeader
              number="03"
              label="Architecture"
              id="architecture-heading"
              title="Six domains, one system you can turn over in your hands."
              lead="Rotate the model to inspect each ownership boundary. The web app and bot stay independent while one stateless backend owns retrieval, reasoning and resilience."
            />
          </Reveal>
          <SystemStage faces={data.systemFaces} />
        </div>
      </section>

      <section id="impact" className={`${styles.chapter} ${styles.chapterTint}`} aria-labelledby="impact-heading">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <Reveal>
            <ChapterHeader
              number="04"
              label="Impact"
              id="impact-heading"
              title="The outcome is operational clarity, not another AI summary."
              lead="No unverified ROI or adoption figures: these are the concrete changes the shipped design makes to the workflow."
            />
          </Reveal>

          <div className={styles.impactRows}>
            {data.impactStory.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <div className={styles.impactRow}>
                  <p className={styles.impactBefore}>{item.before}</p>
                  <span className={styles.impactArrow} aria-hidden="true">→</span>
                  <div>
                    <h3 className={styles.impactAfterTitle}>{item.title}</h3>
                    <p className={styles.impactAfterCopy}>{item.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="contact-heading">
        <img className={styles.ctaIcon} src="/assets/note2action/double-tap.png" alt="" />
        <div className="relative z-10 max-w-container mx-auto px-6 md:px-8">
          <Reveal>
            <p className="font-inter text-[0.68rem] text-[#83d8d2] uppercase tracking-[0.12em] mb-5">
              Have a workflow like this?
            </p>
            <h2 id="contact-heading" className={styles.ctaHeading}>
              Turn operational noise into the next clear action.
            </h2>
            <p className={styles.ctaCopy}>
              I design production AI systems around the decision a team actually needs, the tools they already use, and the failure modes that appear after the demo.
            </p>
            <div className={styles.ctaActions}>
              <Link to="/contact" className={styles.ctaPrimary}>
                <FiMessageCircle aria-hidden="true" />
                Start a conversation
                <FiArrowRight aria-hidden="true" />
              </Link>
              <Link to="/project" className={styles.ctaSecondary}>
                <FiArrowLeft aria-hidden="true" />
                All projects
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

export default Note2ActionProject;
