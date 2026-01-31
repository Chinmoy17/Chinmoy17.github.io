import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Building Production AI Systems",
          "Agentic Workflows & RAG Pipelines",
          "LLM Evaluation & Prompt Engineering",
          "Full-Stack: FastAPI + React + Azure",
          "IEEE Published Researcher",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
