import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Building Agentic AI Systems",
          "LLM/RAG Pipeline Engineer",
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
