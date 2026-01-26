import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Application Developer (AI/ML) @ Dexian",
          "Agentic AI & RAG Systems",
          "Full-Stack (FastAPI + React)",
          "IEEE Author • Research-to-Production",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
