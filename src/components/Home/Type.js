import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Full Stack + AI/ML Integrations",
          "GenAI Apps That Save Time & Resources",
          "RAG Pipelines & Agentic Workflows",
          "Research → Production, Fast",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
