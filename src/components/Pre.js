import React from "react";

function Pre({ load }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#f9f9f7",
        zIndex: 99999,
        opacity: load ? 1 : 0,
        pointerEvents: load ? "all" : "none",
        transition: "opacity 0.5s ease",
      }}
    />
  );
}

export default Pre;
