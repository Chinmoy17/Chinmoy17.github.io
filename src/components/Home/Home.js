import React from "react";
import { Link } from "react-router-dom";
import resumeData from "../../data/resume.json";
import avatarImg from "../../Assets/avatar.png";
import { Reveal } from "../utils/Reveal";
import { MdOutlineHub, MdOutlineApps, MdOutlineTune } from "react-icons/md";

function Home() {
  const milestones = [
    {
      date: "2019 – 2024",
      title: "B.Sc. Computer Science",
      org: "RUET",
      note: "CGPA 3.65 · Thesis: Brain Tumor Classification",
      current: false,
    },
    {
      date: "Mar 2024 – Jul 2025",
      title: "AI Contributor",
      org: "Outlier",
      note: "LLM training data & prompt engineering at scale",
      current: false,
    },
    {
      date: "2025",
      title: "Published",
      org: "IEEE QPAN 2025",
      note: "Brain tumor classification via transfer learning",
      current: false,
    },
    {
      date: "Aug – Oct 2025",
      title: "AI Intern",
      org: "Walton Hi-Tech Industries",
      note: "Enterprise RAG chatbot for multiple business units",
      current: false,
    },
    {
      date: "Oct 2025 – Present",
      title: "App Dev: AI/ML",
      org: "Dexian Bangladesh",
      note: "Note2Action · DemoFactory · Agentic AI systems",
      current: true,
    },
  ];

  const focusAreas = [
    {
      icon: MdOutlineHub,
      title: "Agentic AI & LLM Systems",
      body: "Built Note2Action — an automation predicting next actions for 600+ account managers. Designed evaluation pipelines that catch regressions before rollout.",
      linkLabel: "View Projects →",
      linkTo: "/project",
      external: false,
    },
    {
      icon: MdOutlineApps,
      title: "RFP Platform & Demo Automation",
      body: "Built DemoFactory — an AI-driven platform that generates and deploys customizable applications from user queries. End-to-end proposal automation with agentic orchestration.",
      linkLabel: "View Projects →",
      linkTo: "/project",
      external: false,
    },
    {
      icon: MdOutlineTune,
      title: "DSPy & Evaluation-Driven LLMs",
      body: "Implemented evaluation-driven iteration with test sets, rubrics, and regression suites. Ran controlled DSPy optimization experiments showing 38% cost reduction and +9.6% accuracy gains.",
      linkLabel: "Read Research →",
      linkTo: "/research/dspy-rag-optimization",
      external: false,
    },
  ];

  const techStack = [
    "Python", "DSPy 2.5+", "LangChain", "FastAPI",
    "Azure OpenAI", "React", "FAISS", "PostgreSQL", "Docker",
  ];

  return (
    <main className="max-w-container mx-auto px-8 pt-24 pb-0">

      {/* ===== HERO ===== */}
      <section className="mb-xl flex flex-col md:flex-row items-center gap-16">
        {/* Photo */}
        <Reveal className="w-full md:w-1/3 shrink-0 max-w-[280px]">
          <div className="border border-surface-variant p-2 bg-surface-container-low">
            <img
              src={avatarImg}
              alt="Chinmoy Mitra"
              className="w-full h-auto object-cover aspect-[3/4]"
            />
          </div>
        </Reveal>

        {/* Content */}
        <div className="w-full md:w-2/3">
          <Reveal delay={100}>
            <p className="font-inter text-label-caps text-on-surface-variant uppercase mb-4 tracking-[0.1em]">
              AI/ML Application Developer & Researcher
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="font-newsreader text-h1 text-ink mb-6">
              Chinmoy Mitra
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <div className="h-[1px] w-16 bg-ink mb-6" />
            <p className="font-inter text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              I design and build production AI systems — agentic workflows, RAG
              pipelines, and evaluation frameworks that ship to real enterprise
              environments. Currently at Dexian Bangladesh, where I shipped
              Note2Action for 600+ account managers and DemoFactory for
              AI-driven app generation. Also researching DSPy optimization and
              medical imaging on the side.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/project"
                className="bg-ink text-on-ink px-8 py-3 font-inter text-label-caps uppercase tracking-[0.1em] hover:bg-surface hover:text-ink border border-ink transition-colors duration-200 no-underline"
              >
                View Projects
              </Link>
              <a
                href={resumeData.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent text-ink px-8 py-3 font-inter text-label-caps uppercase tracking-[0.1em] border border-ink hover:bg-ink hover:text-on-ink transition-colors duration-200 no-underline"
              >
                LinkedIn →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== WHAT I BUILD ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-[0.85rem] left-0 bg-surface pr-6 font-newsreader text-[1.3rem] text-ink leading-none">
          What I Build
        </span>
      </div>

      <section className="mb-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left: editorial statement */}
          <Reveal className="md:col-span-5">
            <p className="font-newsreader text-[1.75rem] italic text-ink/90 leading-relaxed">
              I design systems that think, reason, and act — from LLM
              orchestration to production ML pipelines that serve real users at
              scale.
            </p>
          </Reveal>

          {/* Right: 3 focus areas */}
          <div className="md:col-span-7 space-y-10">
            {focusAreas.map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className={i < focusAreas.length - 1 ? "border-b border-surface-variant pb-8" : ""}>
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="text-ink text-[1.1rem] shrink-0 -mt-3" />
                    <h3 className="font-newsreader text-[1.25rem] text-ink font-medium leading-none">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-3">
                    {item.body}
                  </p>
                  <Link
                    to={item.linkTo}
                    className="font-inter text-[0.8rem] text-ink border-b border-ink/40 pb-px hover:border-ink transition-colors no-underline"
                  >
                    {item.linkLabel}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== JOURNEY / TIMELINE ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-[0.85rem] left-0 bg-surface pr-6 font-newsreader text-[1.3rem] text-ink leading-none">
          Timeline
        </span>
      </div>

      <section className="mb-xl">
        {/* Desktop: horizontal */}
        <Reveal>
          <div className="hidden md:block relative mb-8">
            {/* connecting line */}
            <div className="absolute top-[7px] left-0 right-0 h-px bg-surface-variant" />
            <div className="flex">
              {milestones.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-start relative pr-4">
                  {/* node */}
                  <div className={`w-3.5 h-3.5 border relative z-10 mb-4 ${
                    m.current
                      ? "bg-ink border-ink"
                      : "bg-surface border-on-surface-variant/40"
                  }`} />
                  <p className="font-inter text-[0.6rem] uppercase tracking-[0.12em] text-on-surface-variant/40 mb-1 leading-none">
                    {m.date}
                  </p>
                  <p className="font-inter text-[0.82rem] font-semibold text-ink leading-tight mb-0.5">
                    {m.title}
                  </p>
                  <p className="font-inter text-[0.75rem] text-on-surface-variant/70 leading-tight mb-1">
                    {m.org}
                  </p>
                  <p className="font-inter text-[0.68rem] text-on-surface-variant/45 leading-snug">
                    {m.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Mobile: vertical */}
        <div className="md:hidden relative mb-8">
          <div className="absolute left-[6px] top-2 bottom-2 w-px bg-surface-variant" />
          {milestones.map((m, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="flex gap-5 pb-6 last:pb-0">
                <div className={`shrink-0 w-3.5 h-3.5 border mt-0.5 relative z-10 ${
                  m.current
                    ? "bg-ink border-ink"
                    : "bg-surface border-on-surface-variant/40"
                }`} />
                <div>
                  <p className="font-inter text-[0.62rem] uppercase tracking-[0.12em] text-on-surface-variant/40 mb-0.5">
                    {m.date}
                  </p>
                  <p className="font-inter text-[0.85rem] font-semibold text-ink leading-tight">
                    {m.title}
                  </p>
                  <p className="font-inter text-[0.78rem] text-on-surface-variant/70">
                    {m.org}
                  </p>
                  <p className="font-inter text-[0.72rem] text-on-surface-variant/45 leading-snug mt-0.5">
                    {m.note}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <Link
            to="/about"
            className="font-inter text-[0.8rem] text-ink border-b border-ink/40 pb-px hover:border-ink transition-colors no-underline"
          >
            Full background & experience →
          </Link>
        </Reveal>

        {/* Tech stack */}
        <Reveal delay={500}>
          <div className="mt-10 pt-8 border-t border-surface-variant">
            <p className="font-inter text-[0.6rem] uppercase tracking-[0.14em] text-on-surface-variant/40 mb-4">
              Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((t) => (
                <span
                  key={t}
                  className="font-inter text-[0.72rem] text-on-surface-variant border border-surface-variant px-2.5 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== CLOSING ===== */}
      <Reveal>
        <div className="w-full h-px bg-surface-variant mb-xl mt-xl" />
      </Reveal>

      <section className="mb-0 pb-16">
        <Reveal delay={100}>
          <p className="font-newsreader text-[1.5rem] italic text-ink/80 max-w-2xl leading-relaxed mb-3">
            Currently building agentic AI systems at Dexian.
          </p>
          <p className="font-inter text-body-md text-on-surface-variant/70 max-w-xl leading-relaxed">
            Open to research collaborations in NLP, medical imaging, and LLM
            evaluation.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10 flex flex-wrap gap-8 md:gap-12 items-center">
            <a
              href={`mailto:${resumeData.links.email}`}
              className="font-inter text-body-md text-ink border-b border-ink/40 pb-1 hover:border-ink transition-colors no-underline"
            >
              {resumeData.links.email}
            </a>
            <a
              href={resumeData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-body-md text-ink border-b border-ink/40 pb-1 hover:border-ink transition-colors no-underline"
            >
              GitHub →
            </a>
            <a
              href={resumeData.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-body-md text-ink border-b border-ink/40 pb-1 hover:border-ink transition-colors no-underline"
            >
              LinkedIn →
            </a>
            <Link
              to="/research"
              className="font-inter text-body-md text-ink border-b border-ink/40 pb-1 hover:border-ink transition-colors no-underline"
            >
              Research →
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

export default Home;
