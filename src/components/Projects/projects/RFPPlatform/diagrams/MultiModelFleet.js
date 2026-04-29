import React from "react";

/**
 * MultiModelFleet
 * Shows 4 AI models in a 2x2 grid with a central "Task Router" concept.
 * Pure CSS/HTML — no SVG needed.
 */
function MultiModelFleet({ models, styles }) {
  return (
    <div className={styles.fleetGrid}>
      {models.map((m) => (
        <div
          key={m.model}
          className={styles.fleetCard}
          style={{ borderLeftColor: m.color }}
        >
          <div className={styles.fleetCardHeader}>
            <span className={styles.fleetModelName}>{m.model}</span>
            <span
              className={styles.fleetProviderBadge}
              style={{
                backgroundColor: m.color + "18",
                color: m.color,
              }}
            >
              {m.provider}
            </span>
          </div>
          <p className={styles.fleetRole}>{m.role}</p>
          <div className={styles.fleetStrength}>
            <span
              className={styles.fleetStrengthDot}
              style={{ backgroundColor: m.color }}
            />
            {m.strength}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MultiModelFleet;
