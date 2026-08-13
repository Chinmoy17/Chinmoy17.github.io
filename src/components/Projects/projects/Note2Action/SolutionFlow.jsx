import React, { useRef, useState } from "react";
import styles from "./Note2Action.module.css";

function SolutionFlow({ steps, surfaces }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const current = steps[active];

  const moveTo = (index) => {
    const next = Math.max(0, Math.min(steps.length - 1, index));
    setActive(next);
    tabRefs.current[next]?.focus();
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
    <div>
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
        key={current.title}
        id="solution-detail"
        className={styles.solutionDetail}
        role="tabpanel"
        aria-labelledby={`solution-tab-${active}`}
        aria-live="polite"
      >
        <div>
          <p className="font-inter text-[0.65rem] text-white/40 uppercase tracking-[0.1em]">{current.signal}</p>
          <p className={styles.solutionDetailText}>{current.detail}</p>
        </div>
        <div className={styles.surfaceSplit}>
          {surfaces.map((surface) => (
            <div key={surface.title} className={styles.surfaceChip}>
              <span className="block text-white font-medium mb-1">{surface.title}</span>
              <span>{surface.copy}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SolutionFlow;
