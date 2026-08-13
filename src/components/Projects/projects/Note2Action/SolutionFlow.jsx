import React, { useEffect, useRef, useState } from "react";
import {
  FiArrowRight,
  FiBarChart2,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiCpu,
  FiDatabase,
  FiFileText,
  FiGrid,
  FiMail,
  FiServer,
} from "react-icons/fi";
import { SiMicrosoftteams } from "react-icons/si";
import styles from "./Note2Action.module.css";

function DashboardPreview() {
  return (
    <div className={styles.dashboardPreview} aria-hidden="true">
      <div className={styles.previewTopbar}>
        <span className={styles.previewBrand}>Note2Action</span>
        <span className={styles.previewIdentity}>KL</span>
      </div>
      <div className={styles.dashboardBody}>
        <div className={styles.dashboardSummary}>
          <span><strong>18</strong> recent notes</span>
          <span><strong>7</strong> clients</span>
        </div>
        <div className={styles.dashboardChart}>
          {[44, 72, 58, 86, 64, 92, 76].map((height, index) => (
            <i key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
        <div className={styles.dashboardAction}>
          <FiCheck />
          <span>Confirm revised SOW</span>
          <time>18 Aug</time>
        </div>
      </div>
    </div>
  );
}

function TeamsPreview() {
  return (
    <div className={styles.teamsPreview} aria-hidden="true">
      <div className={styles.teamsBar}>
        <SiMicrosoftteams />
        <span>Microsoft Teams</span>
        <span className={styles.teamsPresence} />
      </div>
      <div className={styles.teamsBody}>
        <div className={styles.teamsAvatar}>GC</div>
        <div className={styles.teamsConversation}>
          <p className={styles.teamsSender}>GoldenCompass <span>10:42</span></p>
          <div className={styles.adaptiveCard}>
            <p className={styles.adaptiveEyebrow}>NEXT ACTION · ACME CORP</p>
            <strong>Confirm the revised SOW and Q3 start date.</strong>
            <div className={styles.adaptiveMeta}>
              <span><FiCalendar /> Due 18 Aug</span>
              <span><FiMail /> Email client</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SurfacePreview({ surface }) {
  const isTeams = surface.title === "Teams bot";
  return (
    <article className={`${styles.surfaceCard} ${isTeams ? styles.surfaceCardTeams : ""}`}>
      <div className={styles.surfaceVisual}>
        {isTeams ? <TeamsPreview /> : <DashboardPreview />}
      </div>
      <div className={styles.surfaceCaption}>
        <span className={styles.surfaceIcon}>{isTeams ? <SiMicrosoftteams /> : <FiBarChart2 />}</span>
        <div>
          <h3>{surface.title}</h3>
          <p>{surface.copy}</p>
        </div>
      </div>
    </article>
  );
}

function IngestPreview() {
  return (
    <div className={`${styles.stageVisual} ${styles.ingestPreview}`} aria-hidden="true">
      <div className={styles.pipelineNode}>
        <FiDatabase />
        <strong>CRM view</strong>
        <span>7-day client notes</span>
      </div>
      <div className={styles.pipelineArrow}>
        <span>filtered by AM</span>
        <FiArrowRight />
      </div>
      <div className={`${styles.pipelineNode} ${styles.pipelineNodeAccent}`}>
        <FiServer />
        <strong>Data service</strong>
        <span>notes + metadata</span>
      </div>
      <div className={styles.fallbackNode}>
        <FiFileText />
        <span><strong>CSV fallback</strong> if the database is unavailable</span>
      </div>
    </div>
  );
}

function CleanPreview() {
  return (
    <div className={`${styles.stageVisual} ${styles.cleanPreview}`} aria-hidden="true">
      <div className={styles.cleanPane}>
        <span className={styles.stageEyebrow}>RAW CRM COMMENT</span>
        <code>&lt;p&gt;Met Sarah at Acme.&lt;br/&gt;SOW is approved...&lt;/p&gt;</code>
        <span className={styles.noiseTag}>HTML · nulls · split names</span>
      </div>
      <FiArrowRight className={styles.cleanArrow} />
      <div className={`${styles.cleanPane} ${styles.cleanPaneStructured}`}>
        <span className={styles.stageEyebrow}>NORMALIZED CONTEXT</span>
        <dl>
          <div><dt>Client</dt><dd>Sarah Chen · Acme</dd></div>
          <div><dt>Note</dt><dd>SOW approved; confirm start date</dd></div>
          <div><dt>Date</dt><dd>13 Aug 2026</dd></div>
        </dl>
      </div>
    </div>
  );
}

function ReasonPreview() {
  return (
    <div className={`${styles.stageVisual} ${styles.reasonPreview}`} aria-hidden="true">
      <div className={styles.reasonInput}>
        <FiFileText />
        <span>Clean note</span>
      </div>
      <FiArrowRight className={styles.reasonArrow} />
      <div className={styles.reasonModel}>
        <FiCpu />
        <strong>Azure OpenAI</strong>
        <span>temperature 0.3</span>
      </div>
      <FiArrowRight className={styles.reasonArrow} />
      <div className={styles.reasonOutput}>
        <span><small>Suggested Action</small><strong>Confirm SOW start date</strong></span>
        <span><small>Due Date</small><strong>18 Aug</strong></span>
      </div>
    </div>
  );
}

function StagePreview({ stage, surfaces }) {
  if (stage === "Ingest") return <IngestPreview />;
  if (stage === "Clean") return <CleanPreview />;
  if (stage === "Reason") return <ReasonPreview />;
  return (
    <div className={styles.surfaceSplit}>
      {surfaces.map((surface) => (
        <SurfacePreview key={surface.title} surface={surface} />
      ))}
    </div>
  );
}

function SolutionDeck({ steps, surfaces, active, onSelect }) {
  const pointerStart = useRef(null);

  const startDrag = (event) => {
    pointerStart.current = event.clientX;
    if (event.currentTarget.setPointerCapture) {
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch (error) {
      }
    }
  };

  const endDrag = (event) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) < 45) return;
    onSelect(active + (distance < 0 ? 1 : -1));
  };

  return (
    <div className={styles.solutionDeck}>
      <div className={styles.solutionDeckToolbar}>
        <span><FiGrid /> Scroll, drag, or use arrow keys</span>
        <div className={styles.solutionDeckNav}>
          <button type="button" onClick={() => onSelect(active - 1)} disabled={active === 0} aria-label="Previous response stage">
            <FiChevronLeft />
          </button>
          <div className={styles.solutionDeckDots} aria-label="Response stage position">
            {steps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                aria-label={`Open ${step.title}`}
                aria-current={index === active ? "step" : undefined}
                onClick={() => onSelect(index)}
              />
            ))}
          </div>
          <button type="button" onClick={() => onSelect(active + 1)} disabled={active === steps.length - 1} aria-label="Next response stage">
            <FiChevronRight />
          </button>
        </div>
      </div>

      <div
        className={styles.solutionDeckStage}
        onPointerDown={startDrag}
        onPointerUp={endDrag}
        onPointerCancel={() => { pointerStart.current = null; }}
      >
        {steps.map((step, index) => {
          const delta = index - active;
          const distance = Math.min(Math.abs(delta), 3);
          const side = delta < 0 ? -1 : 1;
          const isActive = delta === 0;
          const transform = isActive
            ? "translate3d(0, 0, 0) rotate(0deg) scale(1)"
            : `translate3d(${side * distance * 26}px, ${distance * 14}px, 0) rotate(${side * distance * 0.7}deg) scale(${1 - distance * 0.035})`;

          return (
            <article
              key={step.title}
              className={`${styles.solutionDeckCard} ${isActive ? styles.solutionDeckCardActive : ""}`}
              aria-hidden={!isActive}
              style={{
                zIndex: 10 - distance,
                opacity: isActive ? 1 : Math.max(0, 0.82 - distance * 0.2),
                transform,
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <header className={styles.solutionDeckCardHeader}>
                <span>{String(index + 1).padStart(2, "0")} · {step.title}</span>
                <span>{step.signal}</span>
              </header>
              <p className={styles.solutionDetailText}>{step.detail}</p>
              <StagePreview stage={step.title} surfaces={surfaces} />
            </article>
          );
        })}
      </div>
    </div>
  );
}

function SolutionFlow({ steps, surfaces }) {
  const [active, setActive] = useState(0);
  const flowRef = useRef(null);
  const tabRefs = useRef([]);
  const activeRef = useRef(0);
  const wheelLockRef = useRef(false);
  const wheelTimerRef = useRef(null);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const flow = flowRef.current;
    if (!flow) return undefined;

    const updateFromScroll = () => {
      if (wheelLockRef.current) return;
      const rect = flow.getBoundingClientRect();
      const stickyTop = 72;
      const runway = Math.max(flow.offsetHeight - window.innerHeight + stickyTop, 1);
      const progress = Math.min(Math.max((stickyTop - rect.top) / runway, 0), 1);
      const next = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setActive((previous) => (previous === next ? previous : next));
    };

    const onWheel = (event) => {
      const rect = flow.getBoundingClientRect();
      const stickyTop = 72;
      const pinned = rect.top <= stickyTop + 2 && rect.bottom >= window.innerHeight - 2;
      const mouseNotch = event.deltaMode !== 0 || Math.abs(event.deltaY) >= 40;
      if (!pinned || !mouseNotch) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const currentIndex = activeRef.current;
      const next = Math.max(0, Math.min(steps.length - 1, currentIndex + direction));

      // At either end, release normal page scrolling into the adjacent section.
      if (next === currentIndex) return;

      event.preventDefault();
      if (wheelLockRef.current) return;

      wheelLockRef.current = true;
      activeRef.current = next;
      setActive(next);

      const flowTop = rect.top + window.scrollY;
      const runway = Math.max(flow.offsetHeight - window.innerHeight + stickyTop, 1);
      const targetProgress = next === 0 ? 0 : (next + 0.08) / steps.length;
      window.scrollTo({
        top: flowTop - stickyTop + runway * targetProgress,
        behavior: "smooth",
      });

      window.clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = window.setTimeout(() => {
        wheelLockRef.current = false;
        updateFromScroll();
      }, 460);
    };

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
      window.removeEventListener("wheel", onWheel);
      window.clearTimeout(wheelTimerRef.current);
    };
  }, [steps.length]);

  const moveTo = (index) => {
    const next = Math.max(0, Math.min(steps.length - 1, index));
    if (next === activeRef.current) return;
    activeRef.current = next;
    setActive(next);
    tabRefs.current[next]?.focus();

    const flow = flowRef.current;
    if (flow && window.innerWidth >= 768) {
      wheelLockRef.current = true;
      const rect = flow.getBoundingClientRect();
      const stickyTop = 72;
      const runway = Math.max(flow.offsetHeight - window.innerHeight + stickyTop, 1);
      const progress = next === 0 ? 0 : (next + 0.08) / steps.length;
      window.scrollTo({
        top: rect.top + window.scrollY - stickyTop + runway * progress,
        behavior: "smooth",
      });
      window.clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 460);
    }
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      moveTo((active + 1) % steps.length);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      moveTo((active - 1 + steps.length) % steps.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      moveTo(steps.length - 1);
    }
  };

  return (
    <div ref={flowRef} className={styles.solutionScrollFlow}>
      <div className={styles.solutionSticky}>
        <div className={styles.solutionTrack} role="tablist" aria-label="Note2Action processing stages" onKeyDown={onKeyDown}>
          {steps.map((step, index) => (
            <button
              key={step.title}
              ref={(node) => { tabRefs.current[index] = node; }}
              id={`solution-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls="solution-detail"
              tabIndex={index === active ? 0 : -1}
              className={`${styles.solutionStep} ${index === active ? styles.solutionStepActive : ""}`}
              onClick={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <span className={styles.solutionDot}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.solutionStepTitle}>{step.title}</span>
              <span className={styles.solutionStepCopy}>{step.short}</span>
            </button>
          ))}
        </div>

        <div
          id="solution-detail"
          className={styles.solutionDetail}
          role="tabpanel"
          aria-labelledby={`solution-tab-${active}`}
          aria-live="polite"
        >
          <SolutionDeck steps={steps} surfaces={surfaces} active={active} onSelect={moveTo} />
        </div>
      </div>
    </div>
  );
}

export default SolutionFlow;
