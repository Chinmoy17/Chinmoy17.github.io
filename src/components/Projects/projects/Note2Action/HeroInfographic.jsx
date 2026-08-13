import React from "react";
import styles from "./Note2Action.module.css";

const noteSamples = [
  { meta: "Client visit", date: "Mon 09:40", delay: "0s" },
  { meta: "Stakeholder call", date: "Tue 14:15", delay: "-1.7s" },
  { meta: "Follow-up note", date: "Thu 11:05", delay: "-3.2s" },
];

function HeroInfographic() {
  return (
    <div className={styles.heroScene} aria-hidden="true">
      <div className={styles.sceneHalo} />

      <div className={styles.noteStack}>
        {noteSamples.map((note) => (
          <div key={note.meta} className={styles.noteCard} style={{ "--delay": note.delay }}>
            <div className={styles.noteMeta}>
              <span>{note.meta}</span>
              <span>{note.date}</span>
            </div>
            <div className={styles.noteLines}>
              <span className={styles.noteLine} />
              <span className={styles.noteLine} />
              <span className={styles.noteLine} />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.flowRail} />

      <div className={styles.engine}>
        <img src="/assets/note2action/notes.png" alt="" />
        <span className={styles.engineLabel}>Reason</span>
      </div>

      <div className={styles.actionCard}>
        <div className="flex items-center justify-between gap-4">
          <span className={styles.actionLabel}>Suggested action</span>
          <img className={styles.noteIcon} src="/assets/note2action/notes.png" alt="" />
        </div>
        <p className={styles.actionTitle}>Confirm the revised SOW and agree the Q3 start date.</p>
        <div className={styles.actionDue}>
          <span>Due date</span>
          <strong>18 Aug</strong>
        </div>
      </div>

      <div className={styles.tapCue}>
        <img src="/assets/note2action/double-tap.png" alt="" />
      </div>
    </div>
  );
}

export default HeroInfographic;
