import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Reveal } from "../../../utils/Reveal";
import ByteMethodLogo from "./logoofbmai-removebg-preview.png";

const toc = [
  { id: "abstract",      label: "Abstract"     },
  { id: "introduction",  label: "Introduction" },
  { id: "methodology",   label: "Methodology"  },
  { id: "architecture",  label: "Architecture" },
  { id: "two-paths",     label: "Two Paths"    },
  { id: "results",       label: "Results"      },
  { id: "takeaways",     label: "Takeaways"    },
  { id: "next",          label: "What's Next"  },
];

function DSPyOptimization() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("abstract");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = toc.length - 1; i >= 0; i--) {
        const el = document.getElementById(toc[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(toc[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="max-w-container mx-auto px-6 pt-24 pb-16">
      <div className="md:flex md:gap-10 lg:gap-14">

        {/* ===== STICKY SIDEBAR ===== */}
        <aside className="hidden md:block w-44 shrink-0">
          <div className="sticky top-24">
            <button
              type="button"
              onClick={() => navigate("/research")}
              className="flex items-center gap-2 font-inter text-[0.72rem] text-on-surface-variant hover:text-ink transition-colors uppercase tracking-[0.1em] mb-8"
            >
              <FiArrowLeft size={12} />
              Research
            </button>

            <p className="font-inter text-[0.6rem] uppercase tracking-[0.14em] text-on-surface-variant/35 mb-3">
              Contents
            </p>

            <nav className="flex flex-col">
              {toc.map((item, i) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`flex items-baseline gap-2.5 py-1.5 pl-3 border-l no-underline transition-all ${
                    activeSection === item.id
                      ? "border-ink text-ink"
                      : "border-surface-variant text-on-surface-variant/70 hover:text-on-surface-variant hover:border-on-surface-variant/30"
                  }`}
                >
                  <span className={`font-inter text-[0.58rem] tabular-nums shrink-0 ${
                    activeSection === item.id ? "text-ink/50" : "text-on-surface-variant/40"
                  }`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-inter text-[0.72rem] leading-snug">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-1 min-w-0">

          {/* ===== TOP NAV ===== */}
          <div className="flex items-center justify-between mb-16">
            {/* Back button — mobile only; sidebar handles desktop */}
            <button
              type="button"
              onClick={() => navigate("/research")}
              className="flex items-center gap-2 font-inter text-[0.8rem] text-on-surface-variant hover:text-ink transition-colors uppercase tracking-[0.1em] md:hidden"
            >
              <FiArrowLeft className="text-base" />
              Back to Research
            </button>
            {/* Breadcrumb — desktop only */}
            <div className="hidden md:flex items-center gap-2 font-inter text-[0.72rem] text-on-surface-variant/50">
              <Link to="/research" className="hover:text-ink transition-colors no-underline">Research</Link>
              <span className="text-on-surface-variant/25">/</span>
              <span className="text-ink">DSPy Case Study</span>
            </div>
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
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-5">
                {["Case Study", "DSPy", "Legal RAG"].map((tag, i) => (
                  <React.Fragment key={tag}>
                    {i > 0 && <span className="text-on-surface-variant/40 text-xs">·</span>}
                    <span className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
                      {tag}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="font-inter text-[1.55rem] md:text-[1.9rem] font-semibold text-ink leading-[1.22] tracking-tight mb-2">
                Automated Prompt Optimization<br />for Production RAG Systems
              </h1>
              <p className="font-newsreader text-[1.05rem] italic text-ink/50 mb-8">
                Taming Trial-and-Error in Production RAG
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-4">
                <a
                  href="https://bytemethod.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 no-underline group"
                >
                  <div className="bg-ink px-2.5 py-1.5 inline-flex items-center shrink-0">
                    <img src={ByteMethodLogo} alt="ByteMethod AI" className="h-[18px]" />
                  </div>
                  <span className="font-inter text-[0.65rem] uppercase tracking-widest text-on-surface-variant/65 group-hover:text-ink transition-colors">
                    A Dexian Company
                  </span>
                </a>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1.5">
                <span className="font-inter text-[0.82rem] text-on-surface-variant">Chinmoy Mitra</span>
                <span className="text-on-surface-variant/35 text-xs">·</span>
                <a
                  href="https://notmeher.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-[0.82rem] text-on-surface-variant hover:text-ink no-underline hover:underline underline-offset-2"
                >
                  Mehedi Hasan Nipu ↗
                </a>
                <span className="text-on-surface-variant/35 text-xs">·</span>
                <span className="font-inter text-[0.78rem] text-on-surface-variant/65">
                  Supervised by{" "}
                  <a
                    href="https://www.linkedin.com/in/bushra-chowdhury-972604149/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:underline underline-offset-2 no-underline"
                  >
                    Dr. Bushra Chowdhury ↗
                  </a>
                </span>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <p className="font-mono text-[0.68rem] text-on-surface-variant/55 mt-7 leading-relaxed">
                DSPy 2.5+ · LangChain · RAGAS v0.4 · Azure OpenAI GPT-4o · FAISS · FastAPI · React 18 · Azure SQL
              </p>
            </Reveal>

            {/* Mobile inline TOC */}
            <Reveal delay={280}>
              <div className="border-t border-surface-variant mt-10 pt-5 md:hidden">
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  {toc.map((item, i) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="flex items-baseline gap-2 no-underline group"
                    >
                      <span className="font-inter text-[0.58rem] tabular-nums text-on-surface-variant/45 group-hover:text-on-surface-variant/70 transition-colors select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-inter text-[0.78rem] text-on-surface-variant group-hover:text-ink transition-colors">
                        {item.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          {/* ===== ABSTRACT ===== */}
          <div className="relative w-full h-[1px] bg-surface-variant mb-10">
            <span className="absolute -top-[0.85rem] left-0 bg-surface pr-6 font-newsreader text-[1.3rem] text-ink leading-none">
              Abstract
            </span>
          </div>
          <section id="abstract" className="mb-xl">
            <Reveal>
              <p className="font-inter text-[1rem] text-ink/80 leading-[1.85] max-w-3xl">
                Traditional RAG systems in enterprise deployments rely on manually-crafted, static prompts
                that require weeks of iterative engineering with no systematic improvement path. This case
                study presents a controlled experiment conducted at ByteMethod AI in which two engineers —
                starting from deliberately different prompt quality baselines — applied DSPy's automatic
                optimization framework to the same legal document retrieval system. Using RAGAS v0.4 as a
                shared evaluation protocol across identical infrastructure, we demonstrate that DSPy delivers
                measurable, reproducible improvements. However, the nature of those improvements depends
                critically on the starting condition: a minimal one-line baseline yielded 38% cost reduction
                and 3.2× latency improvement with comparable accuracy; an expert-level baseline yielded
                +5–7% accuracy gains across all RAGAS metrics. Both paths produced production-deployable
                systems, confirming that DSPy's optimization ceiling is shaped by — but not limited by —
                the quality of initial human-written prompts.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-2 border-t border-surface-variant mt-10 pt-0">
                {[
                  { key: "Keywords",  val: "DSPy · RAG · Prompt Optimization · RAGAS · LLM Evaluation"    },
                  { key: "Domain",    val: "Legal document retrieval — Access to Information law"          },
                  { key: "LLM",       val: "Azure OpenAI GPT-4o · text-embedding-3-large"                 },
                  { key: "Status",    val: "Completed · Production-deployed at ByteMethod AI"             },
                ].map((item, i) => (
                  <div
                    key={item.key}
                    className={`py-4 pr-6 border-b border-surface-variant ${i % 2 === 1 ? "md:pl-8" : ""}`}
                  >
                    <p className="font-inter text-[0.62rem] uppercase tracking-widest text-on-surface-variant/60 mb-1">
                      {item.key}
                    </p>
                    <p className="font-inter text-[0.82rem] text-ink/80 leading-snug">{item.val}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* ===== INTRODUCTION ===== */}
          <div className="relative w-full h-[1px] bg-surface-variant mb-10">
            <span className="absolute -top-[0.85rem] left-0 bg-surface pr-6 font-newsreader text-[1.3rem] text-ink leading-none">
              Introduction
            </span>
          </div>
          <section id="introduction" className="mb-xl">
            <Reveal>
              <h2 className="font-inter text-[1.05rem] font-semibold text-ink mb-1">1. Introduction</h2>
              <div className="h-px w-8 bg-on-surface-variant/25 mb-7" />
            </Reveal>

            <Reveal>
              <p className="font-inter text-body-md text-ink/80 leading-relaxed mb-5">
                Retrieval-Augmented Generation (RAG) has become the standard architecture for deploying
                large language models against proprietary document corpora. In this paradigm, a retrieval
                layer fetches relevant context chunks at query time, which are then passed to the language
                model alongside the user's question. The quality of generated answers depends heavily on
                the quality of the system prompt — and in practice, crafting that prompt is a manual,
                iterative process with no formal exit condition.
              </p>
            </Reveal>

            <Reveal>
              <p className="font-inter text-body-md text-ink/80 leading-relaxed mb-5">
                At ByteMethod AI, this friction is routine. Each new RAG project begins the same way: write
                an initial prompt, test against a sample of user queries, observe failure modes, revise, and
                repeat. Without ground-truth evaluation infrastructure, progress is measured subjectively.
                The cycle continues until the deadline arrives or the client approves — whichever comes first.
              </p>
            </Reveal>

            <Reveal>
              <p className="font-inter text-body-md text-ink/80 leading-relaxed mb-5">
                DSPy (Declarative Self-improving Language Programs), developed at Stanford NLP, reframes
                this as a compilation problem: given a module definition, a training set, and an evaluation
                metric, DSPy optimizers automatically search the space of prompts and few-shot demonstrations
                to maximize the metric. The manual iteration loop is replaced by a one-time training run.
                We deployed this framework on a legal document retrieval system — a 114-page PDF corpus of
                Access to Information law — evaluated against a curated Q&A benchmark using RAGAS v0.4.
              </p>
            </Reveal>

            <Reveal>
              <p className="font-inter text-body-md text-ink/80 leading-relaxed mb-8">
                A central question prior DSPy literature leaves underexplored is whether the{" "}
                <em>quality of the initial human-written prompt</em> affects the character of DSPy's
                improvement. To investigate this, we designed a controlled experiment in which two engineers
                began optimization from opposite points on the prompt-quality spectrum — one with a minimal
                one-line prompt, one with a carefully-crafted expert-level prompt — on otherwise identical
                infrastructure. The experimental design enables a direct comparison of DSPy's behavior
                across two initialization conditions.
              </p>
            </Reveal>

            {/* Research questions */}
            <Reveal>
              <div className="border-l-2 border-ink/20 pl-6 mb-10">
                <p className="font-inter text-[0.62rem] uppercase tracking-widest text-on-surface-variant/60 mb-4">
                  Research Questions
                </p>
                <div className="space-y-3">
                  {[
                    { id: "RQ1", q: "Can DSPy's automatic optimization produce measurable, reproducible improvements over a hand-crafted LangChain RAG baseline?" },
                    { id: "RQ2", q: "Does the quality of the initial prompt — naive vs. expert-level — affect the type of improvement DSPy produces (efficiency vs. accuracy)?" },
                    { id: "RQ3", q: "Do both optimization paths produce systems suitable for production deployment under real-world latency and cost constraints?" },
                  ].map(({ id, q }) => (
                    <div key={id} className="flex gap-3">
                      <span className="font-inter text-[0.68rem] font-semibold text-on-surface-variant/60 shrink-0 pt-[0.2rem] uppercase tracking-wide">{id}</span>
                      <p className="font-inter text-[0.88rem] text-ink/80 leading-relaxed">{q}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Motivating constraints - bullet list */}
            <Reveal>
              <p className="font-inter text-[0.62rem] uppercase tracking-widest text-on-surface-variant/60 mb-4">
                Motivating Constraints
              </p>
              <ul className="space-y-2.5 mb-2">
                {[
                  { id: "P1", label: "Engineering Cost",    body: "Weeks of engineer time consumed by subjective prompt iterations with no guaranteed improvement trajectory." },
                  { id: "P2", label: "Absent Ground Truth", body: "Without a held-out evaluation set, 'good enough' is decided by stakeholder intuition rather than a measurable metric." },
                  { id: "P3", label: "No Exit Condition",   body: "Lacking a formal stopping criterion, teams iterate until deadline pressure forces a stop — not until quality is achieved." },
                  { id: "P4", label: "Delivery Risk",       body: "Iterative delays compound across multi-client environments, creating schedule pressure that incentivizes premature acceptance." },
                ].map(({ id, label, body }) => (
                  <li key={id} className="flex gap-3 font-inter text-[0.88rem] text-ink/80 leading-relaxed">
                    <span className="font-inter text-[0.62rem] font-semibold text-on-surface-variant/50 uppercase tracking-widest shrink-0 pt-[0.3rem]">{id}</span>
                    <span><span className="font-medium text-ink">{label}:</span> {body}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          {/* ===== METHODOLOGY ===== */}
          <div className="relative w-full h-[1px] bg-surface-variant mb-10">
            <span className="absolute -top-[0.85rem] left-0 bg-surface pr-6 font-newsreader text-[1.3rem] text-ink leading-none">
              Methodology
            </span>
          </div>
          <section id="methodology" className="mb-xl">
            <Reveal>
              <h2 className="font-inter text-[1.05rem] font-semibold text-ink mb-1">2. Methodology</h2>
              <div className="h-px w-8 bg-on-surface-variant/25 mb-7" />
            </Reveal>

            <Reveal>
              <h3 className="font-inter text-[0.85rem] font-semibold text-ink mb-3">2.1 Experimental Design</h3>
            </Reveal>
            <Reveal>
              <p className="font-inter text-body-md text-ink/80 leading-relaxed mb-6">
                Both experiments operated on identical infrastructure: a 114-page Access to Information law
                PDF corpus ingested as 139 chunks (chunk_size=1200, overlap=300), indexed with FAISS using
                text-embedding-3-large (3072 dims), and evaluated via RAGAS v0.4 across three metrics:
                Answer Accuracy, Context Relevance, and Groundedness. Azure OpenAI GPT-4o served as the
                generation model with FAISS Top-K=6 retrieval for both paths. The sole controlled variable
                was the quality of the initial human-written prompt and the downstream optimizer configuration.
              </p>
            </Reveal>
            <Reveal>
              <div className="overflow-x-auto mb-10">
                <table className="w-full min-w-[480px] font-inter text-[0.8rem] border-t border-surface-variant">
                  <thead>
                    <tr className="border-b border-surface-variant">
                      {["Variable", "Path A \u2014 Chinmoy Mitra", "Path B \u2014 Mehedi Hasan Nipu"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-[0.62rem] uppercase tracking-widest text-on-surface-variant/60 font-normal">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { v: "Initial prompt quality", a: "Minimal one-liner, naive",       b: "Expert-level, domain-specific"   },
                      { v: "Optimizer used",          a: "BootstrapFewShot + MIPROv2",    b: "MIPROv2"                          },
                      { v: "Training samples",        a: "12",                            b: "50"                               },
                      { v: "Optimizer trials",        a: "6",                             b: "10 candidates"                    },
                      { v: "Training time",           a: "\u2248 4 min",                  b: "\u2248 20 min"                    },
                      { v: "Primary outcome",         a: "Efficiency (cost, latency)",    b: "Accuracy (RAGAS metrics)"         },
                    ].map((row) => (
                      <tr key={row.v} className="border-b border-surface-variant last:border-0">
                        <td className="px-4 py-3 font-medium text-ink text-[0.78rem]">{row.v}</td>
                        <td className="px-4 py-3 text-on-surface-variant text-[0.78rem]">{row.a}</td>
                        <td className="px-4 py-3 text-on-surface-variant text-[0.78rem]">{row.b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            <Reveal>
              <h3 className="font-inter text-[0.85rem] font-semibold text-ink mb-3">2.2 Replication Protocol</h3>
              <p className="font-inter text-body-md text-ink/80 leading-relaxed mb-8">
                The following procedure is fully reproducible. Steps apply to both paths; path-specific
                parameters are noted where they diverge.
              </p>
            </Reveal>

            {/* Prerequisites */}
            <Reveal>
              <div className="mb-10">
                <p className="font-inter text-[0.65rem] uppercase tracking-[0.14em] text-on-surface-variant/60 mb-4">
                  Prerequisites
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-inter text-[0.72rem] font-semibold text-ink mb-3 uppercase tracking-wide">
                      Runtime
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Python 3.10+", "Azure OpenAI API key", "Azure SQL instance"].map((dep) => (
                        <span
                          key={dep}
                          className="font-inter text-[0.72rem] text-on-surface-variant bg-surface-variant/40 px-2.5 py-1 border border-surface-variant"
                        >
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-inter text-[0.72rem] font-semibold text-ink mb-3 uppercase tracking-wide">
                      Python Packages
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "dspy-ai>=2.5",
                        "langchain",
                        "ragas==0.4.*",
                        "faiss-cpu",
                        "fastapi",
                        "openai",
                        "pypdf2",
                        "pandas",
                      ].map((pkg) => (
                        <span
                          key={pkg}
                          className="font-mono text-[0.68rem] text-ink bg-surface-variant/30 px-2 py-0.5 border border-surface-variant/70"
                        >
                          {pkg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Key configuration parameters */}
            <Reveal>
              <div className="border border-surface-variant overflow-x-auto mb-10">
                <table className="w-full font-inter text-[0.8rem]">
                  <thead>
                    <tr className="border-b border-surface-variant">
                      <th className="px-4 py-3 text-left text-[0.62rem] uppercase tracking-widest text-on-surface-variant/40 font-normal">
                        Parameter
                      </th>
                      <th className="px-4 py-3 text-left text-[0.62rem] uppercase tracking-widest text-on-surface-variant/40 font-normal">
                        Value
                      </th>
                      <th className="px-4 py-3 text-left text-[0.62rem] uppercase tracking-widest text-on-surface-variant/40 font-normal">
                        Rationale
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { param: "chunk_size",      val: "1200",     note: "Balances context density vs. retrieval precision for legal docs"  },
                      { param: "chunk_overlap",   val: "300",      note: "25% overlap preserves sentence boundaries across chunks"         },
                      { param: "top_k",           val: "6",        note: "Empirically determined — more context without exceeding GPT-4o context window" },
                      { param: "embedding_dim",   val: "3072",     note: "text-embedding-3-large full dimension for max retrieval quality"  },
                      { param: "num_candidates",  val: "6 / 10",   note: "Constrained path (6) vs. rich path (10) MIPRO trials"           },
                      { param: "train_split",     val: "70/30",    note: "35 training, 15 dev pairs from 50 Q&A set"                       },
                      { param: "random_state",    val: "42",       note: "Fixed seed for reproducible train/dev splits"                    },
                    ].map((row) => (
                      <tr key={row.param} className="border-b border-surface-variant last:border-0 hover:bg-surface-variant/10 transition-colors">
                        <td className="px-4 py-3">
                          <span className="font-mono text-[0.75rem] text-ink">{row.param}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-[0.75rem] text-on-surface-variant">{row.val}</span>
                        </td>
                        <td className="px-4 py-3 font-inter text-[0.78rem] text-on-surface-variant/65 leading-relaxed">
                          {row.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            {/* Step-by-step protocol */}
            <Reveal>
              <p className="font-inter text-[0.65rem] uppercase tracking-[0.14em] text-on-surface-variant/60 mb-6">
                Steps
              </p>
            </Reveal>
            <div className="relative">
              {/* vertical rule */}
              <div className="absolute left-[18px] top-6 bottom-6 w-px bg-surface-variant hidden md:block" />
              <div className="space-y-0">
                {[
                  {
                    n: "01",
                    title: "Prepare the corpus",
                    body: "Export the target PDF to a raw text file using PyPDF2. Run the recursive character splitter with chunk_size=1200, chunk_overlap=300. Store chunk metadata (page, position) alongside text.",
                    detail: "Output: list of ~139 LangChain Document objects",
                  },
                  {
                    n: "02",
                    title: "Build the vector index",
                    body: "Embed all chunks using text-embedding-3-large (3072 dims). Persist the FAISS IndexFlatL2 to disk. Verify top-K=6 retrieval returns coherent, non-redundant context for 5 test queries.",
                    detail: "Output: faiss_index/ directory + chunk metadata JSON",
                  },
                  {
                    n: "03",
                    title: "Establish LangChain baseline",
                    body: "Implement a standard RetrievalQA chain with GPT-4o. Run the full RAGAS evaluation suite (Answer Accuracy, Context Relevance, Groundedness) on 12 benchmark queries. Record all token counts and latency.",
                    detail: "Output: baseline_results.json with per-query metrics",
                  },
                  {
                    n: "04",
                    title: "Configure the DSPy module",
                    body: "Define a RAGModule with a dspy.ChainOfThought signature. Load FAISS retriever as the context source. Configure lm = dspy.LM('azure/gpt-4o') and rm = FaissRM(). Run unoptimized DSPy as a second baseline.",
                    detail: "Output: dspy_baseline_results.json",
                  },
                  {
                    n: "05",
                    title: "Curate Q&A training set",
                    body: "Generate 50 question-answer pairs from the corpus using GPT-4o with the actual chunks as context. Manual review: discard any pairs where the answer is not directly derivable from the source text. Split 70/30 (random_state=42).",
                    detail: "Output: train_set.json (35 pairs) + dev_set.json (15 pairs)",
                  },
                  {
                    n: "06",
                    title: "Run DSPy optimization",
                    body: "For the constrained path: run BootstrapFewShot with metric=ragas_accuracy (12 samples, 6 MIPRO trials, ~4 min). For the rich path: run MIPROv2 with 10 candidates, 50 samples, ~20 min. Cache all LLM calls to Azure SQL to avoid redundant API costs during iteration.",
                    detail: "Output: optimized_program.pkl (serialized DSPy module)",
                  },
                  {
                    n: "07",
                    title: "Evaluate and compare",
                    body: "Load the optimized program and run the same RAGAS benchmark as the baseline. Record all metrics side-by-side. Inspect the auto-generated prompts in the compiled module to understand what changed.",
                    detail: "Output: final_comparison.json + optimized prompt text",
                  },
                ].map((step, i, arr) => (
                  <Reveal key={step.n} delay={i * 60}>
                    <div className={`flex gap-6 py-6 ${i < arr.length - 1 ? "border-b border-surface-variant" : ""}`}>
                      {/* Step number circle */}
                      <div className="shrink-0 flex flex-col items-center gap-0">
                        <div className="w-9 h-9 rounded-full border border-surface-variant bg-surface flex items-center justify-center relative z-10">
                          <span className="font-inter text-[0.65rem] tabular-nums text-on-surface-variant/60">
                            {step.n}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 pt-1.5">
                        <p className="font-inter text-[0.88rem] font-semibold text-ink mb-2">{step.title}</p>
                        <p className="font-inter text-[0.82rem] text-ink/80 leading-relaxed mb-3">
                          {step.body}
                        </p>
                        <p className="font-mono text-[0.68rem] text-on-surface-variant/50 border-l-2 border-surface-variant pl-3 leading-relaxed">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ===== ARCHITECTURE ===== */}
          <div className="relative w-full h-[1px] bg-surface-variant mb-10">
            <span className="absolute -top-[0.85rem] left-0 bg-surface pr-6 font-newsreader text-[1.3rem] text-ink leading-none">
              Architecture
            </span>
          </div>
          <section id="architecture" className="mb-xl">
            <Reveal>
              <h2 className="font-inter text-[0.72rem] uppercase tracking-widest text-on-surface-variant mb-4">System Architecture</h2>
            </Reveal>
            <Reveal>
              <p className="font-inter text-body-md text-ink/80 leading-relaxed mb-10">
                Both experiments shared a common architecture — React frontend, FastAPI backend, and a DSPy
                optimization layer sitting on top of shared data infrastructure.
              </p>
            </Reveal>

            {/* ── 1. System Stack — tiered visual diagram ── */}
            <Reveal>
              <h3 className="font-newsreader text-[1.15rem] text-ink mb-6">System Stack</h3>
            </Reveal>
            <Reveal>
              <div className="mb-12 relative">
                {[
                  {
                    tier: "Client",
                    accent: "border-l-[3px] border-on-surface-variant/15",
                    bg: "",
                    components: [
                      { name: "React 18", note: "Vite · Tailwind · Recharts" },
                    ],
                  },
                  {
                    tier: "API",
                    accent: "border-l-[3px] border-on-surface-variant/15",
                    bg: "",
                    components: [
                      { name: "FastAPI", note: "Uvicorn · Swagger · Health checks" },
                    ],
                  },
                  {
                    tier: "RAG Engine",
                    accent: "border-l-[3px] border-on-surface-variant/25",
                    bg: "bg-surface-variant/10",
                    components: [
                      { name: "LangChain RAG", note: "Baseline — LCEL · RetrievalQA" },
                      { name: "DSPy 2.5+",     note: "ChainOfThought · RAGModule"    },
                    ],
                  },
                  {
                    tier: "Optimizers",
                    accent: "border-l-[3px] border-ink/40",
                    bg: "bg-ink/[0.04]",
                    components: [
                      { name: "BootstrapFewShot", note: "+1500–2000 tokens at inference"   },
                      { name: "MIPROv2",           note: "Instruction-only · zero runtime" },
                    ],
                    highlight: true,
                  },
                  {
                    tier: "Evaluation",
                    accent: "border-l-[3px] border-on-surface-variant/15",
                    bg: "",
                    components: [
                      { name: "RAGAS v0.4", note: "Accuracy · Relevance · Groundedness · LLM-as-judge" },
                    ],
                  },
                  {
                    tier: "Data",
                    accent: "border-l-[3px] border-on-surface-variant/15",
                    bg: "bg-surface-variant/10",
                    components: [
                      { name: "FAISS IndexFlatL2", note: "139 chunks · 3072-dim · Top-K=6" },
                      { name: "Azure OpenAI",      note: "GPT-4o · text-embedding-3-large" },
                      { name: "Azure SQL",         note: "LLM response cache · versioning" },
                    ],
                  },
                ].map((row, i, arr) => (
                  <React.Fragment key={row.tier}>
                    <div className={`flex items-stretch ${row.accent} ${row.bg}`}>
                      {/* Tier label */}
                      <div className="w-28 shrink-0 flex items-center px-4 py-4">
                        <span className="font-inter text-[0.6rem] uppercase tracking-[0.15em] text-on-surface-variant/60">
                          {row.tier}
                        </span>
                      </div>
                      {/* Components */}
                      <div className="flex flex-wrap gap-3 flex-1 px-3 py-4 border-l border-surface-variant">
                        {row.components.map((c) => (
                          <div
                            key={c.name}
                            className={`border px-4 py-2.5 flex flex-col gap-0.5 ${
                              row.highlight
                                ? "border-ink/20 bg-ink/[0.04]"
                                : "border-surface-variant bg-surface"
                            }`}
                          >
                            <span className={`font-inter text-[0.82rem] font-semibold leading-tight ${
                              row.highlight ? "text-ink" : "text-ink"
                            }`}>
                              {c.name}
                            </span>
                            <span className="font-mono text-[0.65rem] text-on-surface-variant/60 leading-snug">
                              {c.note}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Connector arrow between tiers */}
                    {i < arr.length - 1 && (
                      <div className="flex items-center h-5">
                        <div className="w-28 shrink-0 flex items-center justify-center">
                          <span className="font-inter text-[0.65rem] text-on-surface-variant/20">↓</span>
                        </div>
                        <div className="flex-1" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </Reveal>

            {/* ── 2. Query Processing Flow — horizontal pipeline ── */}
            <Reveal>
              <h3 className="font-newsreader text-[1.15rem] text-ink mb-2">Query Processing Flow</h3>
              <p className="font-inter text-[0.72rem] text-on-surface-variant/60 mb-6">
                How a user query travels through the pipeline at inference time
              </p>
            </Reveal>
            <Reveal>
              <div className="overflow-x-auto mb-12">
                <div className="flex items-stretch min-w-[680px]">
                  {[
                    { n: "01", title: "Ingestion",   note: "PyPDF2 → Recursive split",      sub: "1200 chars · 300 overlap", badge: "Offline" },
                    { n: "02", title: "Embedding",   note: "text-embedding-3-large",         sub: "3072 dimensions",          badge: "Offline" },
                    { n: "03", title: "Retrieval",   note: "FAISS IndexFlatL2",              sub: "Top-K = 6",                badge: "Online"  },
                    { n: "04", title: "Generation",  note: "DSPy ChainOfThought",            sub: "GPT-4o · optimized prompt", badge: "Online"  },
                    { n: "05", title: "Evaluation",  note: "RAGAS v0.4",                     sub: "3 metrics · cache to SQL", badge: "Eval"    },
                  ].map((step, i, arr) => (
                    <React.Fragment key={step.n}>
                      <div className={`flex flex-col border border-surface-variant p-4 flex-1 min-w-0 gap-2 ${
                        step.badge === "Online" ? "bg-surface-variant/10" : "bg-surface"
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-newsreader text-[1.6rem] text-on-surface-variant/10 leading-none">
                            {step.n}
                          </span>
                          <span className={`font-inter text-[0.55rem] uppercase tracking-widest px-1.5 py-0.5 border ${
                            step.badge === "Online"
                              ? "text-ink border-ink/20"
                              : step.badge === "Eval"
                              ? "text-on-surface-variant/50 border-surface-variant"
                              : "text-on-surface-variant/35 border-surface-variant"
                          }`}>
                            {step.badge}
                          </span>
                        </div>
                        <p className="font-inter text-[0.82rem] font-semibold text-ink leading-tight">{step.title}</p>
                        <p className="font-inter text-[0.72rem] text-on-surface-variant/65 leading-snug">{step.note}</p>
                        <p className="font-mono text-[0.62rem] text-on-surface-variant/35 mt-auto">{step.sub}</p>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="flex items-center shrink-0 px-1">
                          <span className="font-inter text-[0.9rem] text-on-surface-variant/25">→</span>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ── 3. DSPy Optimization Pipeline — 3-phase with arrows ── */}
            <Reveal>
              <h3 className="font-newsreader text-[1.15rem] text-ink mb-2">DSPy Optimization Pipeline</h3>
              <p className="font-inter text-[0.72rem] text-on-surface-variant/60 mb-6">
                One-time training process that compiles the production-ready module
              </p>
            </Reveal>
            <Reveal>
              <div className="overflow-x-auto mb-4">
                <div className="flex items-stretch min-w-[560px]">
                  {[
                    {
                      phase: "Input",
                      dark: false,
                      items: [
                        { label: "Training set", val: "50 Q&A pairs"   },
                        { label: "Dev split",    val: "70 / 30"        },
                        { label: "Module",       val: "RAGModule"      },
                        { label: "Metric",       val: "RAGAS Accuracy" },
                      ],
                    },
                    {
                      phase: "Optimization",
                      dark: true,
                      items: [
                        { label: "Bootstrap",  val: "Constrained path"  },
                        { label: "MIPROv2",    val: "Rich path"         },
                        { label: "Trials",     val: "6 / 10"            },
                        { label: "Runtime",    val: "~4 / ~20 min"      },
                      ],
                    },
                    {
                      phase: "Output",
                      dark: false,
                      items: [
                        { label: "Prompt",     val: "Auto-generated"    },
                        { label: "Demos",      val: "Bootstrap only"    },
                        { label: "Artifact",   val: "program.pkl"       },
                        { label: "Cache",      val: "Azure SQL"         },
                      ],
                    },
                  ].map((col, i, arr) => (
                    <React.Fragment key={col.phase}>
                      <div className={`flex-1 p-5 flex flex-col gap-3.5 border ${
                        col.dark
                          ? "bg-ink border-ink"
                          : "bg-surface border-surface-variant"
                      }`}>
                        <p className={`font-inter text-[0.6rem] uppercase tracking-[0.16em] mb-1 ${
                          col.dark ? "text-surface/40" : "text-on-surface-variant/35"
                        }`}>
                          {col.phase}
                        </p>
                        {col.items.map((item) => (
                          <div key={item.label} className="flex flex-col gap-0.5">
                            <span className={`font-inter text-[0.6rem] uppercase tracking-widest ${
                              col.dark ? "text-surface/30" : "text-on-surface-variant/35"
                            }`}>
                              {item.label}
                            </span>
                            <span className={`font-inter text-[0.82rem] font-medium ${
                              col.dark ? "text-surface" : "text-ink"
                            }`}>
                              {item.val}
                            </span>
                          </div>
                        ))}
                      </div>
                      {i < arr.length - 1 && (
                        <div className="flex items-center shrink-0 px-2">
                          <span className={`font-inter text-[1rem] ${
                            i === 0 ? "text-on-surface-variant/25" : "text-surface/30"
                          }`}>→</span>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <p className="font-inter text-[0.72rem] text-on-surface-variant/65 leading-relaxed">
                The compiled module is loaded at inference time — BootstrapFewShot appends demonstrations to each
                query, while MIPROv2 modifies only the system instruction with zero additional token cost.
              </p>
            </Reveal>
          </section>

          {/* ===== TWO PATHS ===== */}
          <div className="relative w-full h-[1px] bg-surface-variant mb-10">
            <span className="absolute -top-[0.85rem] left-0 bg-surface pr-6 font-newsreader text-[1.3rem] text-ink leading-none">
              Two Paths
            </span>
          </div>
          <section id="two-paths" className="mb-xl">
            <Reveal>
              <h2 className="font-newsreader text-h3 text-ink mb-6">Two Paths, One Goal</h2>
            </Reveal>
            <Reveal>
              <p className="font-inter text-body-md text-ink/80 leading-relaxed mb-8">
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
                        <span className="font-inter text-[0.7rem] text-on-surface-variant/60 uppercase tracking-wide">
                          {k}
                        </span>
                        <span className="font-inter text-[0.8rem] text-ink text-right">{v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-surface-variant/30 p-4">
                    <p className="font-inter text-[0.62rem] uppercase tracking-widest text-on-surface-variant/60 mb-2">
                      Starting Prompt
                    </p>
                    <p className="font-inter text-[0.8rem] text-on-surface-variant italic leading-relaxed">
                      "Answer questions based on provided context from domain-specific documents."
                    </p>
                  </div>

                  <div className="border-t border-surface-variant pt-4 mt-auto">
                    <p className="font-inter text-[0.62rem] uppercase tracking-widest text-on-surface-variant/60 mb-1">
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
                        <span className="font-inter text-[0.7rem] text-on-surface-variant/60 uppercase tracking-wide">
                          {k}
                        </span>
                        <span className="font-inter text-[0.8rem] text-ink text-right">{v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-surface-variant/30 p-4">
                    <p className="font-inter text-[0.62rem] uppercase tracking-widest text-on-surface-variant/60 mb-2">
                      Starting Prompt
                    </p>
                    <p className="font-inter text-[0.8rem] text-on-surface-variant italic leading-relaxed">
                      "You are an expert legal assistant specializing in Access to Information law. Base your
                      answer ONLY on the provided context. Cite specific Articles..."
                    </p>
                  </div>

                  <div className="border-t border-surface-variant pt-4 mt-auto">
                    <p className="font-inter text-[0.62rem] uppercase tracking-widest text-on-surface-variant/60 mb-1">
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
            <span className="absolute -top-[0.85rem] left-0 bg-surface pr-6 font-newsreader text-[1.3rem] text-ink leading-none">
              Results
            </span>
          </div>
          <section id="results" className="mb-xl">
            <Reveal>
              <h2 className="font-inter text-[1.05rem] font-semibold text-ink mb-1">3. Results</h2>
              <div className="h-px w-8 bg-on-surface-variant/25 mb-7" />
            </Reveal>

            {/* Chinmoy's results */}
            <Reveal>
              <h3 className="font-newsreader text-[1.15rem] text-ink mb-2">
                3.1 Path A: Constrained Initialization
              </h3>
              <p className="font-inter text-[0.75rem] text-on-surface-variant/50 mb-5">
                Chinmoy Mitra · 12-sample benchmark · Legal Domain
              </p>
            </Reveal>

            {/* Metric bar charts — visual comparison */}
            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8 mb-10 pt-2">
                {[
                  {
                    title: "Answer Accuracy",
                    unit: "%",
                    max: 75,
                    higher: true,
                    data: [
                      { label: "LangChain Baseline",  val: 64.6 },
                      { label: "DSPy (unoptimized)",   val: 66.7 },
                      { label: "DSPy Bootstrap",       val: 70.8, best: true },
                      { label: "DSPy MIPRO",           val: 64.6 },
                    ],
                  },
                  {
                    title: "Response Latency",
                    unit: "s",
                    max: 15,
                    higher: false,
                    data: [
                      { label: "LangChain Baseline",  val: 13.96 },
                      { label: "DSPy (unoptimized)",   val: 7.38  },
                      { label: "DSPy Bootstrap",       val: 4.33, best: true },
                      { label: "DSPy MIPRO",           val: 6.37  },
                    ],
                  },
                  {
                    title: "Cost per Batch",
                    unit: "",
                    prefix: "$",
                    max: 0.27,
                    higher: false,
                    data: [
                      { label: "LangChain Baseline",  val: 0.256 },
                      { label: "DSPy (unoptimized)",   val: 0.158 },
                      { label: "DSPy Bootstrap",       val: 0.158, best: true },
                      { label: "DSPy MIPRO",           val: 0.159 },
                    ],
                  },
                ].map((chart) => (
                  <div key={chart.title}>
                    <div className="flex items-baseline justify-between mb-4">
                      <p className="font-inter text-[0.72rem] font-semibold text-ink">{chart.title}</p>
                      {!chart.higher && (
                        <p className="font-inter text-[0.55rem] text-on-surface-variant/45 uppercase tracking-wide">lower is better</p>
                      )}
                    </div>
                    <div className="space-y-3">
                      {chart.data.map((row) => (
                        <div key={row.label}>
                          <div className="flex items-baseline justify-between mb-1">
                            <span className="font-inter text-[0.68rem] text-on-surface-variant leading-tight">{row.label}</span>
                            <span className={`font-inter text-[0.68rem] tabular-nums ${row.best ? "text-ink font-semibold" : "text-on-surface-variant/60"}`}>
                              {chart.prefix || ""}{row.val}{chart.unit}
                            </span>
                          </div>
                          <div className="h-[4px] bg-surface-variant/50">
                            <div
                              className={`h-full ${row.best ? "bg-ink" : "bg-on-surface-variant/25"}`}
                              style={{ width: `${Math.round((row.val / chart.max) * 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
                <p className="font-inter text-[0.85rem] text-ink/80 leading-relaxed">
                  <strong className="text-ink">Key observation:</strong> With tight constraints and a naive
                  starting prompt, DSPy primarily optimized for efficiency rather than accuracy — finding ways to
                  reduce token usage and latency while maintaining comparable accuracy.
                </p>
              </div>
            </Reveal>

            {/* Nipu's results */}
            <Reveal>
              <h3 className="font-newsreader text-[1.15rem] text-ink mb-2">
                3.2 Path B: Rich Initialization
              </h3>
              <p className="font-inter text-[0.75rem] text-on-surface-variant/50 mb-5">
                Mehedi Hasan Nipu · 50-sample benchmark · Legal Domain
              </p>
            </Reveal>

            {/* RAGAS comparison bar chart */}
            <Reveal>
              <div className="mb-8 max-w-lg">
                <div className="flex items-baseline justify-between mb-5">
                  <p className="font-inter text-[0.72rem] font-semibold text-ink">RAGAS Metric Comparison</p>
                </div>
                <div className="space-y-6">
                  {[
                    { metric: "Answer Accuracy",    lc: 84.5, dspy: 89.5 },
                    { metric: "Context Relevance",  lc: 82.5, dspy: 87.5 },
                    { metric: "Groundedness",       lc: 83.5, dspy: 88.5 },
                  ].map((row) => (
                    <div key={row.metric}>
                      <p className="font-inter text-[0.72rem] text-on-surface-variant mb-2">{row.metric}</p>
                      <div className="space-y-1.5">
                        {[
                          { label: "LangChain Baseline", val: row.lc,   best: false },
                          { label: "DSPy Optimized",     val: row.dspy, best: true  },
                        ].map((bar) => (
                          <div key={bar.label} className="flex items-center gap-3">
                            <span className="font-inter text-[0.62rem] text-on-surface-variant/65 w-32 shrink-0 leading-tight">{bar.label}</span>
                            <div className="flex-1 h-[4px] bg-surface-variant/50">
                              <div
                                className={`h-full ${bar.best ? "bg-ink" : "bg-on-surface-variant/25"}`}
                                style={{ width: `${bar.val}%` }}
                              />
                            </div>
                            <span className={`font-inter text-[0.65rem] tabular-nums w-10 text-right ${bar.best ? "text-ink font-semibold" : "text-on-surface-variant/60"}`}>
                              ~{bar.val}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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

            {/* ===== CONSOLIDATED SUMMARY TABLE ===== */}
            <Reveal>
              <h3 className="font-newsreader text-[1.15rem] text-ink mb-2">
                3.3 Combined Performance Summary
              </h3>
              <p className="font-inter text-[0.75rem] text-on-surface-variant/50 mb-5">
                LangChain baseline vs. best DSPy result per metric
              </p>
            </Reveal>
            <Reveal>
              <div className="border border-surface-variant overflow-x-auto mb-12">
                <table className="w-full font-inter text-[0.8rem]">
                  <thead>
                    <tr className="border-b border-surface-variant bg-surface-container-low">
                      {["Metric", "LangChain Baseline", "DSPy Best", "Delta"].map((h) => (
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
                      { metric: "Answer Accuracy",   baseline: "64.6%",    best: "70.8%",     delta: "+9.6%",  note: "Bootstrap" },
                      { metric: "Response Latency",  baseline: "13.96s",   best: "4.33s",     delta: "−69%",   note: "Bootstrap" },
                      { metric: "Token Usage",       baseline: "48,748",   best: "30,512",    delta: "−37%",   note: "MIPRO"     },
                      { metric: "Cost / Batch",      baseline: "$0.256",   best: "$0.158",    delta: "−38%",   note: "MIPRO"     },
                      { metric: "RAGAS Score",       baseline: "81–86%",   best: "86–91%",    delta: "+5–7%",  note: "Rich path" },
                    ].map((row) => (
                      <tr key={row.metric} className="border-b border-surface-variant last:border-0 hover:bg-surface-variant/10 transition-colors">
                        <td className="px-4 py-3 text-ink font-medium">{row.metric}</td>
                        <td className="px-4 py-3 text-on-surface-variant">{row.baseline}</td>
                        <td className="px-4 py-3 text-on-surface-variant">
                          {row.best}
                          <span className="ml-2 font-inter text-[0.6rem] text-on-surface-variant/40 uppercase tracking-wide">
                            {row.note}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-inter text-[0.78rem] font-semibold text-ink">{row.delta}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            {/* Prompt Evolution */}
            <Reveal>
              <h3 className="font-newsreader text-[1.15rem] text-ink mb-2">Prompt Evolution</h3>
              <p className="font-inter text-body-md text-ink/80 leading-relaxed mb-6">
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
            <span className="absolute -top-[0.85rem] left-0 bg-surface pr-6 font-newsreader text-[1.3rem] text-ink leading-none">
              Discussion
            </span>
          </div>
          <section id="takeaways" className="mb-xl">
            <Reveal>
              <h2 className="font-inter text-[1.05rem] font-semibold text-ink mb-1">4. Discussion</h2>
              <div className="h-px w-8 bg-on-surface-variant/25 mb-7" />
            </Reveal>
            <div className="space-y-7 mb-10">
              {[
                {
                  n: "1",
                  title: "Starting Point Determines Outcome Type",
                  body: "A naive prompt led to efficiency gains; a rich prompt led to accuracy gains. DSPy optimizes toward your metric, but the optimization landscape depends on where you start.",
                },
                {
                  n: "2",
                  title: "Trade-offs Are Real",
                  body: "BootstrapFewShot improved accuracy but reduced groundedness. MIPRO maintained balance but showed smaller gains. Choose optimizers based on your priority metric.",
                },
                {
                  n: "3",
                  title: "Efficiency Is a Valid Win",
                  body: "38% cost reduction and 3.2× latency improvement are significant for production systems. Even without accuracy gains, DSPy can deliver ROI through efficiency alone.",
                },
                {
                  n: "4",
                  title: "Sample Size Matters",
                  body: "12 samples vs. 50 samples produced different optimization dynamics. More data leads to better generalization, but even small datasets show measurable improvement.",
                },
              ].map((item, i, arr) => (
                <Reveal key={item.n}>
                  <div className={`flex gap-5 ${i < arr.length - 1 ? "pb-7 border-b border-surface-variant" : ""}`}>
                    <span className="font-inter text-[0.65rem] text-on-surface-variant/45 shrink-0 tabular-nums pt-0.5">{item.n}.</span>
                    <div>
                      <p className="font-inter text-[0.88rem] font-semibold text-ink mb-1.5">{item.title}</p>
                      <p className="font-inter text-[0.85rem] text-ink/80 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Production recommendations */}
            <Reveal>
              <p className="font-inter text-[0.62rem] uppercase tracking-widest text-on-surface-variant/60 mb-4">Production Recommendations</p>
              <ul className="space-y-3">
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
                ].map((rec, i) => (
                  <li key={i} className="flex gap-3 font-inter text-[0.85rem] text-ink/80 leading-relaxed">
                    <span className="text-on-surface-variant/40 shrink-0 pt-0.5">—</span>
                    <span><span className="font-medium text-ink">{rec.label}:</span> {rec.body}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          {/* ===== WHAT'S NEXT ===== */}
          <div className="relative w-full h-[1px] bg-surface-variant mb-10">
            <span className="absolute -top-[0.85rem] left-0 bg-surface pr-6 font-newsreader text-[1.3rem] text-ink leading-none">
              Future Directions
            </span>
          </div>
          <section id="next" className="mb-xl">
            <Reveal>
              <h2 className="font-inter text-[1.05rem] font-semibold text-ink mb-1">5. Future Directions</h2>
              <div className="h-px w-8 bg-on-surface-variant/25 mb-7" />
            </Reveal>
            <Reveal>
              <p className="font-inter text-body-md text-ink/80 leading-relaxed mb-8">
                This experiment validated DSPy for our team's workflow. We're now rolling it out across new RAG
                projects, with a few areas we're exploring next:
              </p>
            </Reveal>

            <div className="space-y-6 mb-10">
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
                <Reveal key={i}>
                  <div className={`flex gap-5 ${i < arr.length - 1 ? "pb-6 border-b border-surface-variant" : ""}`}>
                    <span className="font-inter text-[0.65rem] text-on-surface-variant/40 shrink-0 tabular-nums pt-0.5">{i + 1}.</span>
                    <div>
                      <p className="font-inter text-[0.88rem] font-semibold text-ink mb-1.5">{step.title}</p>
                      <p className="font-inter text-[0.85rem] text-ink/80 leading-relaxed">{step.body}</p>
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
                  <div className="bg-ink px-2 py-1 inline-flex items-center shrink-0">
                    <img src={ByteMethodLogo} alt="ByteMethod AI" className="h-5" />
                  </div>
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
      </div>
    </div>
  );
}

export default DSPyOptimization;
