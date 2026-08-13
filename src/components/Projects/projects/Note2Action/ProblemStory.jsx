import React, { useEffect, useRef, useState } from "react";
import styles from "./Note2Action.module.css";

function ProblemStory({ steps }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean);
    if (!nodes.length) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const focusY = window.innerHeight * 0.46;
      let closest = 0;
      let distance = Infinity;
      nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        const stepDistance = Math.abs((rect.top + rect.bottom) / 2 - focusY);
        if (stepDistance < distance) {
          distance = stepDistance;
          closest = index;
        }
      });
      setActive((previous) => (previous === closest ? previous : closest));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [steps]);

  const current = steps[active];

  return (
    <div className={styles.problemGrid}>
      <aside className={styles.problemMetric} data-active={active} aria-live="polite">
        <div>
          <p className={styles.metricIndex}>
            Signal {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
          </p>
          <p key={current.value} className={styles.metricValue}>{current.value}</p>
        </div>
        <p className={styles.metricLabel}>{current.metricLabel}</p>
      </aside>

      <div>
        {steps.map((step, index) => (
          <article
            key={step.title}
            ref={(node) => { stepRefs.current[index] = node; }}
            data-index={index}
            className={`${styles.problemStep} ${index === active ? styles.problemStepActive : ""}`}
          >
            <p className="font-inter text-[0.68rem] text-on-surface-variant/50 uppercase tracking-[0.1em]">
              {String(index + 1).padStart(2, "0")} · {step.label}
            </p>
            <h3 className={styles.problemStepTitle}>{step.title}</h3>
            <p className={styles.problemStepBody}>{step.body}</p>
            <p className={styles.problemConsequence}>{step.consequence}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ProblemStory;
