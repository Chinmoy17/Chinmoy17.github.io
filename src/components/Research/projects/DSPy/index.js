import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Reveal } from "../../../utils/Reveal";
import ByteMethodLogo from "./logoofbmai-removebg-preview.png";

const toc = [
  { id: "overview",     label: "Overview"     },
  { id: "problem",      label: "The Problem"  },
  { id: "approach",     label: "Our Approach" },
  { id: "architecture", label: "Architecture" },
  { id: "two-paths",    label: "Two Paths"    },
  { id: "results",      label: "Results"      },
  { id: "takeaways",    label: "Takeaways"    },
  { id: "next",         label: "What's Next"  },
];

function DSPyOptimization() {
  const navigate = useNavigate();

  return (
    <main className="max-w-container mx-auto px-8 pt-24 pb-16">

      {/* ===== TOP NAV ===== */}
      <div className="flex items-center justify-between mb-16">
        <button
          type="button"
          onClick={() => navigate("/research")}
          className="flex items-center gap-2 font-inter text-[0.8rem] text-on-surface-variant hover:text-ink transition-colors uppercase tracking-[0.1em]"
        >
          <FiArrowLeft className="text-base" />
          Back to Research
        </button>
        <Link
          to="/research"
          className="font-inter text-[0.8rem] text-on-surface-variant border-b border-surface-variant pb-px hover:text-ink hover:border-ink transition-colors no-underline uppercase tracking-[0.1em]"
        >
          All Research
        </Link>
      </div>

      {/* ===== HERO ===== */}
      <section className="mb-16">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {["Case Study", "DSPy", "Legal RAG", "ByteMethod AI"].map((tag, i) => (
              <React.Fragment key={tag}>
                {i > 0 && <span className="text-on-surface-variant/40 text-xs">·</span>}
                <span className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
                  {tag}
                </span>
              </React.Fragment>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-newsreader text-h1 text-ink mb-4">
            Taming Trial-and-Error in Production RAG
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <div className="h-[1px] w-16 bg-ink mb-6" />
          <p className="font-newsreader text-[1.5rem] italic text-ink/80 max-w-2xl leading-relaxed">
            A parallel experiment comparing DSPy's automatic prompt optimization — revealing that
            initial constraints shape whether you optimize for accuracy or efficiency.
          </p>
        </Reveal>

        {/* Authors + org */}
        <Reveal delay={260}>
          <div className="flex flex-wrap items-center gap-5 mt-8 mb-6">
            <a href="https://bytemethod.ai/" target="_blank" rel="noopener noreferrer">
              <img
                src={ByteMethodLogo}
                alt="ByteMethod AI"
                className="h-7 opacity-75 hover:opacity-100 transition-opacity"
              />
            </a>
            <span className="font-inter text-[0.72rem] text-on-surface-variant/40 uppercase tracking-widest">
              A Dexian Company
            </span>
            <div className="h-4 w-px bg-surface-variant" />
            <span className="font-inter text-[0.78rem] text-on-surface-variant">
              Chinmoy Mitra &amp;{" "}
              <a
                href="https://notmeher.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:underline underline-offset-2"
              >
                Mehedi Hasan Nipu ↗
              </a>
            </span>
            <div className="h-4 w-px bg-surface-variant" />
            <span className="font-inter text-[0.78rem] text-on-surface-variant">
              Supervised by{" "}
              <a
                href="https://www.linkedin.com/in/bushra-chowdhury-972604149/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:underline underline-offset-2"
              >
                Dr. Bushra Chowdhury ↗
              </a>
            </span>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={300}>
          <div className="flex flex-wrap gap-x-12 gap-y-6 mt-10 pt-8 border-t border-surface-variant mb-10">
            {[
              { value: "38%",   label: "Cost Reduction"    },
              { value: "3.2×",  label: "Faster Response"   },
              { value: "+9.6%", label: "Accuracy Gain"     },
              { value: "4",     label: "Systems Compared"  },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-newsreader text-[2.25rem] text-ink leading-none mb-1">{s.value}</p>
                <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Stack line */}
        <Reveal delay={350}>
          <p className="font-inter text-[0.78rem] text-on-surface-variant/60 mb-10">
            DSPy 2.5+ · LangChain · RAGAS v0.4 · Azure OpenAI GPT-4o · FAISS · FastAPI · React 18 · Azure SQL
          </p>
        </Reveal>

        {/* Inline TOC */}
        <Reveal delay={400}>
          <div className="border-t border-b border-surface-variant py-5">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {toc.map((item, i) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-baseline gap-2 no-underline group"
                >
                  <span className="font-newsreader text-[0.8rem] text-on-surface-variant/30 group-hover:text-on-surface-variant/60 transition-colors select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-inter text-[0.8rem] text-on-surface-variant group-hover:text-ink transition-colors">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== OVERVIEW ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
          Overview
        </span>
      </div>
      <section id="overview" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-6">The Setup</h2>
        </Reveal>
        <div className="space-y-4 mb-8">
          {[
            "At ByteMethod AI, we build RAG systems for enterprise clients — legal compliance, medical documentation, business intelligence. Every project follows the same frustrating cycle: craft a prompt, test it, observe failures, tweak, repeat.",
            "DSPy, from Stanford NLP, promises to automate this. We put it to the test with a controlled experiment: same legal document corpus, same evaluation framework (RAGAS), but deliberately different starting conditions.",
            "This case study, conducted under the supervision of Dr. Bushra Chowdhury, documents two engineers starting from opposite ends of the prompt quality spectrum to understand how DSPy behaves differently across each.",
            "The finding: DSPy works — but what it improves depends heavily on where you start.",
          ].map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <p className="font-inter text-body-md text-on-surface-variant leading-relaxed pl-5 border-l border-surface-variant">
                {item}
              </p>
            </Reveal>
          ))}
        </div>

        {/* TL;DR */}
        <Reveal delay={300}>
          <div className="border border-surface-variant p-6 mt-6">
            <p className="font-inter text-[0.7rem] uppercase tracking-widest text-on-surface-variant/50 mb-4">
              TL;DR
            </p>
            <ul className="space-y-2.5">
              {[
                "DSPy delivers measurable improvements — but the type of improvement depends on your starting point",
                "A naive, constrained prompt led to efficiency gains (38% cost reduction, 3.2× latency improvement)",
                "A rich, detailed prompt led to accuracy gains (+5–7% across all RAGAS metrics)",
                "Both approaches produced production-deployable systems",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 font-inter text-[0.85rem] text-on-surface-variant leading-relaxed">
                  <span className="shrink-0 font-newsreader text-[0.8rem] text-on-surface-variant/30 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
          The Problem
        </span>
      </div>
      <section id="problem" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-6">Manual Prompt Engineering Doesn't Scale</h2>
        </Reveal>
        <Reveal>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-8">
            At ByteMethod AI, every RAG project follows the same frustrating pattern: craft a prompt,
            test it, observe failures, tweak, repeat. The cycle continues until the deadline arrives or
            the client signs off — whichever comes first.
          </p>
        </Reveal>

        {/* Manual cycle — editorial flow */}
        <Reveal>
          <div className="border border-surface-variant p-6 mb-8">
            <p className="font-inter text-[0.65rem] uppercase tracking-widest text-on-surface-variant/40 mb-5">
              The cycle
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {["Write Prompt", "Test Queries", "Find Failures", "Tweak Prompt"].map((step, i, arr) => (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center gap-1.5 min-w-[76px]">
                    <div className="w-7 h-7 border border-surface-variant flex items-center justify-center">
                      <span className="font-newsreader text-[0.78rem] text-on-surface-variant/40">{i + 1}</span>
                    </div>
                    <span className="font-inter text-[0.72rem] text-on-surface-variant text-center">{step}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="font-inter text-[0.85rem] text-on-surface-variant/25 pb-5">→</span>
                  )}
                </React.Fragment>
              ))}
              <span className="font-inter text-[0.72rem] text-on-surface-variant/40 italic ml-1 pb-5">
                ↩ repeat for weeks
              </span>
            </div>
          </div>
        </Reveal>

        {/* 4 pain points */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-surface-variant mb-8">
          {[
            { label: "Resource Drain",  body: "Weeks of engineering time spent on subjective prompt iterations with no guaranteed improvement." },
            { label: "No Clear Target", body: "Clients don't know what 'good' looks like until they see the final product. Feedback loops are slow." },
            { label: "Missing Metrics", body: "Without ground truth, teams iterate blindly with no measurable progress or exit criteria." },
            { label: "Slow Delivery",   body: "Trial-and-error delays deployments and frustrates stakeholders expecting faster turnaround." },
          ].map((p, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="border-b border-r border-surface-variant p-6">
                <p className="font-inter text-[0.7rem] uppercase tracking-widest text-on-surface-variant/50 mb-2">
                  {p.label}
                </p>
                <p className="font-inter text-[0.85rem] text-on-surface-variant leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="pt-6 border-t border-surface-variant">
            <p className="font-newsreader text-[1.2rem] italic text-ink/70 leading-relaxed">
              "Can DSPy's automatic prompt optimization replace this manual cycle? And if so — does it matter how we start?"
            </p>
          </div>
        </Reveal>
      </section>

      {/* ===== OUR APPROACH ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
          Our Approach
        </span>
      </div>
      <section id="approach" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-6">A Controlled Experiment</h2>
        </Reveal>
        <Reveal>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-8">
            We designed a controlled experiment: same legal document corpus, same evaluation framework (RAGAS),
            same infrastructure — but deliberately different starting conditions.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reveal>
            <div className="border border-surface-variant p-6">
              <p className="font-inter text-[0.7rem] uppercase tracking-widest text-on-surface-variant/50 mb-5">
                Shared Foundation
              </p>
              <div className="space-y-4">
                {[
                  { label: "Document Corpus", detail: "Model Inter-American Law on Access to Public Information — 114 pages, ~139 chunks" },
                  { label: "LLM Backend",     detail: "Azure OpenAI GPT-4o (generation) + text-embedding-3-large (3072-dim)" },
                  { label: "Evaluation",      detail: "RAGAS v0.4 — Answer Accuracy, Context Relevance, Response Groundedness" },
                  { label: "Retrieval",       detail: "FAISS IndexFlatL2 · Top-K = 6 · Chunk: 1200 chars, 300 overlap" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-0.5">
                    <span className="font-inter text-[0.72rem] font-semibold text-ink uppercase tracking-wide">
                      {item.label}
                    </span>
                    <span className="font-inter text-[0.8rem] text-on-surface-variant leading-relaxed">
                      {item.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="border border-surface-variant p-6">
              <p className="font-inter text-[0.7rem] uppercase tracking-widest text-on-surface-variant/50 mb-5">
                Variables
              </p>
              <div className="space-y-4">
                {[
                  { label: "Initial Prompt", vals: ["Naive (one-liner)", "Rich (expert-level)"] },
                  { label: "Constraints",    vals: ["Tight",             "Tolerant"]             },
                  { label: "Sample Size",    vals: ["12 (test set)",     "50 (full benchmark)"]  },
                  { label: "Optimization",   vals: ["6 MIPRO trials",    "10 MIPRO candidates"]  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="font-inter text-[0.72rem] font-semibold text-ink uppercase tracking-wide w-28 shrink-0 mt-0.5">
                      {item.label}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.vals.map((v, i) => (
                        <span
                          key={i}
                          className={`font-inter text-[0.72rem] px-2 py-0.5 border ${
                            i === 0
                              ? "border-surface-variant text-on-surface-variant/55"
                              : "border-ink/20 text-on-surface-variant"
                          }`}
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== ARCHITECTURE ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
          Architecture
        </span>
      </div>
      <section id="architecture" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-6">System Architecture</h2>
        </Reveal>
        <Reveal>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-8">
            Both experiments shared a common architecture — React frontend, FastAPI backend, and a DSPy
            optimization layer sitting on top of shared data infrastructure.
          </p>
        </Reveal>

        {/* Layered architecture table */}
        <Reveal>
          <div className="border border-surface-variant overflow-hidden mb-10">
            {[
              {
                layer: "Client",
                items: [{ name: "React Frontend",    detail: "Vite · Tailwind · Recharts" }],
              },
              {
                layer: "API",
                items: [{ name: "FastAPI",            detail: "Async REST · Swagger docs · Health checks" }],
              },
              {
                layer: "Core Engine",
                items: [
                  { name: "LangChain RAG",  detail: "Baseline" },
                  { name: "DSPy RAG",       detail: "ChainOfThought" },
                  { name: "RAGAS",          detail: "3 evaluation metrics" },
                ],
              },
              {
                layer: "Optimizers",
                items: [
                  { name: "BootstrapFewShot", detail: "+1500–2000 tokens/query" },
                  { name: "MIPROv2",          detail: "Zero runtime overhead" },
                ],
              },
              {
                layer: "Data",
                items: [
                  { name: "FAISS",        detail: "139 chunks · 3072-dim vectors" },
                  { name: "Azure SQL",    detail: "Eval cache · versioning" },
                  { name: "Azure OpenAI", detail: "GPT-4o + Ada embeddings" },
                ],
              },
            ].map((row, rowIdx, arr) => (
              <div
                key={row.layer}
                className={`flex items-stretch ${rowIdx < arr.length - 1 ? "border-b border-surface-variant" : ""}`}
              >
                <div className="w-24 shrink-0 bg-surface-variant/20 border-r border-surface-variant flex items-center px-3 py-4">
                  <span className="font-inter text-[0.62rem] uppercase tracking-widest text-on-surface-variant/50 leading-snug">
                    {row.layer}
                  </span>
                </div>
                <div className="flex flex-wrap flex-1">
                  {row.items.map((item, i) => (
                    <div
                      key={item.name}
                      className={`px-5 py-4 flex flex-col gap-1 ${
                        i < row.items.length - 1 ? "border-r border-surface-variant" : ""
                      }`}
                    >
                      <span className="font-inter text-[0.8rem] font-semibold text-ink">{item.name}</span>
                      <span className="font-inter text-[0.7rem] text-on-surface-variant/55">{item.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Query Processing Flow */}
        <Reveal>
          <h3 className="font-newsreader text-[1.15rem] text-ink mb-4">Query Processing Flow</h3>
        </Reveal>
        <Reveal>
          <div className="border border-surface-variant overflow-hidden mb-10">
            <div className="flex flex-wrap">
              {[
                { n: "1", title: "Ingestion",  body: "PDF → PyPDF2 → Recursive Chunking",  note: "1200 chars, 300 overlap" },
                { n: "2", title: "Embedding",  body: "text-embedding-3-large",              note: "3072 dimensions"         },
                { n: "3", title: "Retrieval",  body: "FAISS Similarity Search",             note: "Top-K = 6"               },
                { n: "4", title: "Generation", body: "DSPy ChainOfThought",                 note: "GPT-4o"                  },
                { n: "5", title: "Evaluation", body: "RAGAS Metrics",                       note: "3 metrics"               },
              ].map((step, i, arr) => (
                <div
                  key={step.n}
                  className={`flex-1 min-w-[110px] p-4 flex flex-col gap-1 ${
                    i < arr.length - 1 ? "border-r border-surface-variant" : ""
                  }`}
                >
                  <span className="font-newsreader text-[1.5rem] text-on-surface-variant/15 leading-none mb-1">
                    {step.n}
                  </span>
                  <span className="font-inter text-[0.78rem] font-semibold text-ink">{step.title}</span>
                  <span className="font-inter text-[0.72rem] text-on-surface-variant/65 leading-snug">{step.body}</span>
                  <span className="font-inter text-[0.62rem] text-on-surface-variant/35 uppercase tracking-wide mt-1">
                    {step.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* DSPy Optimization Pipeline */}
        <Reveal>
          <h3 className="font-newsreader text-[1.15rem] text-ink mb-4">DSPy Optimization Pipeline</h3>
        </Reveal>
        <Reveal>
          <div className="border border-surface-variant overflow-hidden mb-2">
            <div className="flex flex-wrap">
              {[
                { title: "Training Data",   body: "50 Q&A pairs",         note: "70/30 split",     highlight: false },
                { title: "DSPy Module",     body: "RAGModule",             note: "ChainOfThought",  highlight: false },
                { title: "Optimizer",       body: "MIPROv2 / Bootstrap",   note: "Auto-tune",       highlight: true  },
                { title: "Output",          body: "Production Ready",      note: "Cached in DB",    highlight: false },
              ].map((step, i, arr) => (
                <div
                  key={step.title}
                  className={`flex-1 min-w-[100px] p-4 flex flex-col gap-1 ${
                    step.highlight ? "bg-ink" : ""
                  } ${i < arr.length - 1 ? "border-r border-surface-variant" : ""}`}
                >
                  <span className={`font-inter text-[0.62rem] uppercase tracking-widest mb-0.5 ${
                    step.highlight ? "text-surface/45" : "text-on-surface-variant/40"
                  }`}>
                    {step.title}
                  </span>
                  <span className={`font-inter text-[0.82rem] font-semibold ${
                    step.highlight ? "text-surface" : "text-ink"
                  }`}>
                    {step.body}
                  </span>
                  <span className={`font-inter text-[0.7rem] ${
                    step.highlight ? "text-surface/55" : "text-on-surface-variant/55"
                  }`}>
                    {step.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== TWO PATHS ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
          Two Paths
        </span>
      </div>
      <section id="two-paths" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-6">Two Paths, One Goal</h2>
        </Reveal>
        <Reveal>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-8">
            We deliberately started with different configurations to understand how DSPy behaves across
            the spectrum of initial conditions. Same destination, different journeys.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chinmoy's path */}
          <Reveal>
            <div className="border border-surface-variant p-6 flex flex-col gap-5 h-full">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-ink text-surface flex items-center justify-center font-inter text-[0.7rem] font-semibold tracking-wide shrink-0">
                    CM
                  </div>
                  <div>
                    <p className="font-inter text-[0.85rem] font-semibold text-ink leading-tight">
                      Chinmoy Mitra
                    </p>
                    <p className="font-inter text-[0.65rem] uppercase tracking-widest text-on-surface-variant/50">
                      Constrained Approach
                    </p>
                  </div>
                </div>
                <p className="font-newsreader text-[1rem] italic text-on-surface-variant leading-relaxed">
                  "Start minimal. Let DSPy explore broadly. See how much it can improve from near-zero."
                </p>
              </div>

              <div className="space-y-2 border-t border-surface-variant pt-4">
                {[
                  ["Initial Prompt", "One-liner, naive"],
                  ["Test Samples",   "50"              ],
                  ["MIPRO Trials",   "6"               ],
                  ["Training Time",  "~4 min"          ],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-baseline gap-4">
                    <span className="font-inter text-[0.7rem] text-on-surface-variant/45 uppercase tracking-wide">
                      {k}
                    </span>
                    <span className="font-inter text-[0.8rem] text-ink text-right">{v}</span>
                  </div>
                ))}
              </div>

              <div className="bg-surface-variant/30 p-4">
                <p className="font-inter text-[0.62rem] uppercase tracking-widest text-on-surface-variant/40 mb-2">
                  Starting Prompt
                </p>
                <p className="font-inter text-[0.8rem] text-on-surface-variant italic leading-relaxed">
                  "Answer questions based on provided context from domain-specific documents."
                </p>
              </div>

              <div className="border-t border-surface-variant pt-4 mt-auto">
                <p className="font-inter text-[0.62rem] uppercase tracking-widest text-on-surface-variant/40 mb-1">
                  Result
                </p>
                <p className="font-inter text-[0.85rem] font-semibold text-ink">Efficiency Gains</p>
                <p className="font-inter text-[0.78rem] text-on-surface-variant mt-1">
                  38% cost reduction · 3.2× faster · comparable accuracy
                </p>
              </div>
            </div>
          </Reveal>

          {/* Nipu's path */}
          <Reveal delay={100}>
            <div className="border border-surface-variant p-6 flex flex-col gap-5 h-full">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <a
                    href="https://notmeher.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-surface-variant flex items-center justify-center font-inter text-[0.7rem] font-semibold tracking-wide text-ink border border-surface-variant hover:bg-ink hover:text-surface transition-colors no-underline shrink-0"
                  >
                    MN
                  </a>
                  <div>
                    <p className="font-inter text-[0.85rem] font-semibold text-ink leading-tight">
                      <a
                        href="https://notmeher.github.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink hover:underline underline-offset-2 no-underline"
                      >
                        Mehedi Hasan Nipu ↗
                      </a>
                    </p>
                    <p className="font-inter text-[0.65rem] uppercase tracking-widest text-on-surface-variant/50">
                      Rich Approach
                    </p>
                  </div>
                </div>
                <p className="font-newsreader text-[1rem] italic text-on-surface-variant leading-relaxed">
                  "Start with domain expertise. Guide DSPy toward specific improvements. Maximize accuracy."
                </p>
              </div>

              <div className="space-y-2 border-t border-surface-variant pt-4">
                {[
                  ["Initial Prompt",   "Detailed, expert-level"],
                  ["Test Samples",     "50"                    ],
                  ["MIPRO Candidates", "10"                    ],
                  ["Training Time",    "~20 min"               ],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-baseline gap-4">
                    <span className="font-inter text-[0.7rem] text-on-surface-variant/45 uppercase tracking-wide">
                      {k}
                    </span>
                    <span className="font-inter text-[0.8rem] text-ink text-right">{v}</span>
                  </div>
                ))}
              </div>

              <div className="bg-surface-variant/30 p-4">
                <p className="font-inter text-[0.62rem] uppercase tracking-widest text-on-surface-variant/40 mb-2">
                  Starting Prompt
                </p>
                <p className="font-inter text-[0.8rem] text-on-surface-variant italic leading-relaxed">
                  "You are an expert legal assistant specializing in Access to Information law. Base your
                  answer ONLY on the provided context. Cite specific Articles..."
                </p>
              </div>

              <div className="border-t border-surface-variant pt-4 mt-auto">
                <p className="font-inter text-[0.62rem] uppercase tracking-widest text-on-surface-variant/40 mb-1">
                  Result
                </p>
                <p className="font-inter text-[0.85rem] font-semibold text-ink">Accuracy Gains</p>
                <p className="font-inter text-[0.78rem] text-on-surface-variant mt-1">
                  +5–7% across all RAGAS metrics · consistent improvement
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== RESULTS ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
          Results
        </span>
      </div>
      <section id="results" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-6">Results</h2>
        </Reveal>

        {/* Chinmoy's results */}
        <Reveal>
          <h3 className="font-newsreader text-[1.15rem] text-ink mb-2">
            Chinmoy's Benchmark — Efficiency Through Constraints
          </h3>
          <p className="font-inter text-[0.75rem] text-on-surface-variant/50 mb-5">
            12-sample benchmark · Legal Domain
          </p>
        </Reveal>
        <Reveal>
          <div className="border border-surface-variant overflow-x-auto mb-4">
            <table className="w-full min-w-[580px] font-inter text-[0.8rem]">
              <thead>
                <tr className="border-b border-surface-variant">
                  {["System", "Accuracy", "Groundedness", "Tokens", "Cost", "Latency"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[0.62rem] uppercase tracking-widest text-on-surface-variant/40 font-normal"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    sys: "LangChain Baseline",
                    acc: "64.6%",        ground: "70.8%", tokens: "48,748",
                    cost: "$0.256",      lat: "13.96s",   best: false,
                  },
                  {
                    sys: "DSPy Baseline",
                    acc: "66.7% +3.2%",  ground: "64.6%", tokens: "30,517",
                    cost: "$0.158",      lat: "7.38s",    best: false,
                  },
                  {
                    sys: "DSPy Bootstrap",
                    acc: "70.8% +9.6%",  ground: "56.3%", tokens: "30,512",
                    cost: "$0.158",      lat: "4.33s",    best: true,
                  },
                  {
                    sys: "DSPy MIPRO",
                    acc: "64.6%",        ground: "64.6%", tokens: "30,539",
                    cost: "$0.159",      lat: "6.37s",    best: false,
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-surface-variant last:border-0 transition-colors ${
                      row.best ? "bg-ink/[0.04]" : "hover:bg-surface-variant/15"
                    }`}
                  >
                    <td className="px-4 py-3 text-ink font-medium">
                      {row.sys}
                      {row.best && (
                        <span className="ml-2 font-inter text-[0.6rem] border border-ink/20 px-1.5 py-0.5 text-on-surface-variant/55 uppercase tracking-wide">
                          best acc.
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-on-surface-variant">{row.acc}</td>
                    <td className="px-4 py-3 text-on-surface-variant">{row.ground}</td>
                    <td className="px-4 py-3 text-on-surface-variant">{row.tokens}</td>
                    <td className="px-4 py-3 text-on-surface-variant">{row.cost}</td>
                    <td className="px-4 py-3 text-on-surface-variant">{row.lat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <Reveal>
          <div className="border-l-2 border-ink/15 pl-5 mb-12">
            <p className="font-inter text-[0.85rem] text-on-surface-variant leading-relaxed">
              <strong className="text-ink">Key observation:</strong> With tight constraints and a naive
              starting prompt, DSPy primarily optimized for efficiency rather than accuracy — finding ways to
              reduce token usage and latency while maintaining comparable accuracy.
            </p>
          </div>
        </Reveal>

        {/* Nipu's results */}
        <Reveal>
          <h3 className="font-newsreader text-[1.15rem] text-ink mb-2">
            Nipu's Benchmark — Accuracy Through Rich Prompts
          </h3>
          <p className="font-inter text-[0.75rem] text-on-surface-variant/50 mb-5">
            50-sample benchmark · Legal Domain
          </p>
        </Reveal>
        <Reveal>
          <div className="border border-surface-variant overflow-x-auto mb-12">
            <table className="w-full min-w-[480px] font-inter text-[0.8rem]">
              <thead>
                <tr className="border-b border-surface-variant">
                  {["System", "Accuracy", "Relevance", "Groundedness", "Avg Score"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[0.62rem] uppercase tracking-widest text-on-surface-variant/40 font-normal"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    sys: "LangChain Baseline",
                    acc: "82–87%",           rel: "80–85%",           gnd: "81–86%",           avg: "81–86%",    best: false,
                  },
                  {
                    sys: "DSPy Optimized",
                    acc: "87–92% (+5–7%)",   rel: "85–90% (+5–7%)",   gnd: "86–91% (+5–7%)",   avg: "86–91%",    best: true,
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-surface-variant last:border-0 ${
                      row.best ? "bg-ink/[0.04]" : ""
                    }`}
                  >
                    <td className="px-4 py-3 text-ink font-medium">
                      {row.sys}
                      {row.best && (
                        <span className="ml-2 font-inter text-[0.6rem] border border-ink/20 px-1.5 py-0.5 text-on-surface-variant/55 uppercase tracking-wide">
                          best
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-on-surface-variant">{row.acc}</td>
                    <td className="px-4 py-3 text-on-surface-variant">{row.rel}</td>
                    <td className="px-4 py-3 text-on-surface-variant">{row.gnd}</td>
                    <td className="px-4 py-3 text-on-surface-variant">{row.avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Prompt Evolution */}
        <Reveal>
          <h3 className="font-newsreader text-[1.15rem] text-ink mb-2">Prompt Evolution</h3>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-6">
            One of the most instructive outputs was observing how MIPROv2 transformed a minimal starting prompt:
          </p>
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_72px_1fr] border border-surface-variant overflow-hidden mb-6">
            <div className="p-6">
              <p className="font-inter text-[0.62rem] uppercase tracking-widest text-on-surface-variant/40 mb-3">
                Before — Naive
              </p>
              <p className="font-inter text-[0.85rem] text-on-surface-variant italic leading-relaxed">
                "Answer questions based on provided context from domain-specific documents."
              </p>
            </div>
            <div className="flex flex-col items-center justify-center border-l border-r border-surface-variant py-6">
              <p className="font-inter text-[0.58rem] uppercase tracking-widest text-on-surface-variant/35 mb-1.5 text-center">
                MIPROv2
              </p>
              <span className="font-inter text-[1.1rem] text-on-surface-variant/25">→</span>
            </div>
            <div className="p-6 bg-surface-variant/20">
              <p className="font-inter text-[0.62rem] uppercase tracking-widest text-on-surface-variant/40 mb-3">
                After — Optimized
              </p>
              <p className="font-inter text-[0.85rem] text-on-surface-variant leading-relaxed">
                "Using the information contained strictly within the provided context, answer the given
                question in a clear and concise manner.{" "}
                <strong className="text-ink">
                  Ensure your response follows a step-by-step reasoning process
                </strong>{" "}
                to explain the logical foundation for your conclusions.{" "}
                <strong className="text-ink">
                  Do not include information or make assumptions that go beyond the supplied context.
                </strong>"
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <p className="font-inter text-[0.85rem] text-on-surface-variant leading-relaxed">
            MIPRO added explicit step-by-step reasoning, emphasized strict adherence to context, and
            prohibited assumptions — modifications that directly aligned with the RAGAS metrics being
            optimized.
          </p>
        </Reveal>
      </section>

      {/* ===== TAKEAWAYS ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
          Takeaways
        </span>
      </div>
      <section id="takeaways" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-6">Key Takeaways</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-surface-variant mb-10">
          {[
            {
              n: "01",
              title: "Starting Point Determines Outcome Type",
              body: "A naive prompt led to efficiency gains; a rich prompt led to accuracy gains. DSPy optimizes toward your metric, but the optimization landscape depends on where you start.",
            },
            {
              n: "02",
              title: "Trade-offs Are Real",
              body: "BootstrapFewShot improved accuracy but reduced groundedness. MIPRO maintained balance but showed smaller gains. Choose optimizers based on your priority metric.",
            },
            {
              n: "03",
              title: "Efficiency Is a Valid Win",
              body: "38% cost reduction and 3.2× latency improvement are significant for production systems. Even without accuracy gains, DSPy can deliver ROI through efficiency alone.",
            },
            {
              n: "04",
              title: "Sample Size Matters",
              body: "12 samples vs. 50 samples produced different optimization dynamics. More data leads to better generalization, but even small datasets show measurable improvement.",
            },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="border-b border-r border-surface-variant p-6">
                <p className="font-newsreader text-[2rem] text-on-surface-variant/12 leading-none mb-3">
                  {item.n}
                </p>
                <p className="font-inter text-[0.85rem] font-semibold text-ink mb-2">{item.title}</p>
                <p className="font-inter text-[0.82rem] text-on-surface-variant leading-relaxed">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Production recommendations */}
        <Reveal>
          <div className="border border-surface-variant p-6">
            <p className="font-inter text-[0.7rem] uppercase tracking-widest text-on-surface-variant/50 mb-5">
              Production Recommendations
            </p>
            <div className="space-y-5">
              {[
                {
                  label: "Use MIPROv2 for high-traffic systems",
                  body:  "Zero additional token overhead at inference, scales infinitely, one-time training cost.",
                },
                {
                  label: "Use BootstrapFewShot for research or low-traffic",
                  body:  "Higher accuracy potential, but adds 1500–2000 tokens per query at inference.",
                },
                {
                  label: "Define metrics before optimization",
                  body:  "What you measure is what you improve — choose RAGAS metrics carefully before running optimizers.",
                },
                {
                  label: "Cache aggressively",
                  body:  "Both experiments used Azure SQL caching to avoid redundant LLM calls during evaluation cycles.",
                },
              ].map((rec, i, arr) => (
                <div
                  key={i}
                  className={`flex gap-4 items-start ${i < arr.length - 1 ? "pb-5 border-b border-surface-variant" : ""}`}
                >
                  <span className="font-newsreader text-[0.9rem] text-on-surface-variant/22 shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-inter text-[0.82rem] font-semibold text-ink mb-1">{rec.label}</p>
                    <p className="font-inter text-[0.8rem] text-on-surface-variant leading-relaxed">{rec.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== WHAT'S NEXT ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
          What's Next
        </span>
      </div>
      <section id="next" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-6">What's Next</h2>
        </Reveal>
        <Reveal>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-8">
            This experiment validated DSPy for our team's workflow. We're now rolling it out across new RAG
            projects, with a few areas we're exploring next:
          </p>
        </Reveal>

        <div className="border border-surface-variant mb-10">
          {[
            {
              title: "Cross-Domain Transfer",
              body:  "Can optimized prompts from legal RAG transfer to medical or financial domains with minimal retraining?",
            },
            {
              title: "Multi-Objective Optimization",
              body:  "Simultaneously optimize for accuracy, groundedness, and cost — current optimizers treat these independently.",
            },
            {
              title: "Continuous Re-Optimization",
              body:  "Auto-trigger re-optimization when evaluation metrics drift below thresholds — closing the feedback loop in production.",
            },
          ].map((step, i, arr) => (
            <Reveal key={i} delay={i * 60}>
              <div
                className={`flex gap-6 p-6 items-start ${
                  i < arr.length - 1 ? "border-b border-surface-variant" : ""
                }`}
              >
                <span className="font-newsreader text-[1.6rem] text-on-surface-variant/15 leading-none shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-inter text-[0.85rem] font-semibold text-ink mb-1">{step.title}</p>
                  <p className="font-inter text-[0.82rem] text-on-surface-variant leading-relaxed">{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="border-t border-surface-variant pt-8 mb-12">
            <p className="font-newsreader text-[1.4rem] italic text-ink/75 leading-relaxed max-w-2xl">
              "DSPy doesn't eliminate trial-and-error — it transforms it into a programmatic, reproducible process."
            </p>
            <p className="font-inter text-[0.78rem] text-on-surface-variant/50 mt-3">
              The manual prompt tweaking cycle has been replaced with systematic, metric-driven
              optimization that clients can actually trust.
            </p>
          </div>
        </Reveal>

        {/* Collaborator CTA */}
        <Reveal>
          <div className="border border-surface-variant p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex items-center gap-4">
              <img src={ByteMethodLogo} alt="ByteMethod AI" className="h-7 opacity-65" />
              <div>
                <p className="font-inter text-[0.78rem] text-on-surface-variant leading-snug">
                  Study conducted with{" "}
                  <strong className="text-ink">Mehedi Hasan Nipu</strong> at ByteMethod AI (A Dexian Company)
                </p>
                <p className="font-inter text-[0.72rem] text-on-surface-variant/50 mt-0.5">
                  Supervised by Dr. Bushra Chowdhury
                </p>
              </div>
            </div>
            <a
              href="https://notmeher.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-[0.8rem] text-ink border border-ink/30 px-5 py-2.5 hover:bg-ink hover:text-surface transition-colors no-underline shrink-0 text-center"
            >
              Visit Nipu's Portfolio →
            </a>
          </div>
        </Reveal>
      </section>

    </main>
  );
}

export default DSPyOptimization;
