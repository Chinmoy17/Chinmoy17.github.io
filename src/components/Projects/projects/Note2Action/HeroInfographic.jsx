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

    </div>
  );
}

export default HeroInfographic;
