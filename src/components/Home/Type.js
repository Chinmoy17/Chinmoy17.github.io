import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Research → Production, Fast",
          "LLMs + Evaluation-Driven Development",
          "RAG Pipelines & Agentic Workflows",
          "Seeking PhD Opportunities",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
