import React from "react";
import { Link } from "react-router-dom";
import resumeData from "../../data/resume.json";
import avatarImg from "../../Assets/avatar.png";
import { Reveal } from "../utils/Reveal";
import { MdOutlineHub, MdOutlineApps, MdOutlineTune } from "react-icons/md";
import { FaGithub, FaLinkedinIn, FaExternalLinkAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

function Home() {
  const milestones = [
    {
      date: "2019 - 2024",
      title: "B.Sc. Computer Science & Engineering",
      org: "RUET",
      note: "CGPA 3.11/4.00. Thesis on brain tumor classification via transfer learning. Dutch Bangla Bank Scholar, RUET Technical Scholar.",
      current: false,
    },
    {
      date: "Mar 2024 - Jul 2025",
      title: "AI Contributor",
      org: "Outlier",
      note: "Designed high-quality prompts and evaluated outputs to improve LLM performance in code generation, refactoring, and summarization across Python and Swift contexts.",
      current: false,
    },
    {
      date: "2025",
      title: "Published - IEEE QPAN 2025",
      org: "IEEE",
      note: "Transfer learning based multiclass brain tumor classification using MRI data. Achieved ~99.50% accuracy with ensemble methods.",
      current: false,
    },
    {
      date: "Aug - Oct 2025",
      title: "AI Intern",
      org: "Walton Hi-Tech Industries",
      note: "Contributed to an enterprise RAG chatbot serving customer support, order processing, HRMS, and warranty claims across Bangladesh's largest electronics manufacturer.",
      current: false,
    },
    {
      date: "Oct 2025 - Present",
      title: "Application Developer: AI/ML",
      org: "Dexian Bangladesh",
      note: "Shipping Note2Action (automation for 600+ AMs), DemoFactory (AI app generator), and agentic workflows with evaluation-driven iteration for production LLM systems.",
      current: true,
    },
  ];

  const focusAreas = [
    {
      icon: MdOutlineHub,
      title: "Agentic AI & LLM Systems",
      body: "Shipped Note2Action \u2014 predicting next actions for 600+ account managers. Designed evaluation pipelines with regression guards before every production rollout.",
      linkLabel: "View Projects \u2192",
      linkTo: "/project",
      highlight: null,
    },
    {
      icon: MdOutlineApps,
      title: "Multi-Agent Systems & BM Product Accelerator",
      body: "Built the skill-extractor agent for BM Product Accelerator \u2014 a multi-agent platform (planner, skill-extractor, coding agent). Given legacy production code as input, the skill-extractor parses reusable skills into a GitLab repo and builds a tree-based index with quality weights.",
      highlight: "Tree-based index reduces skill search complexity from O(n\u00b2) to O(log n), letting the planner and coding agents retrieve relevant skills instantly at scale.",
      linkLabel: "View Projects \u2192",
      linkTo: "/project",
    },
    {
      icon: MdOutlineTune,
      title: "Research: DSPy & Evaluation-Driven LLMs",
      body: "Ongoing controlled experiments optimizing LLM pipelines with DSPy 2.5+. Measured results show 38% cost reduction and +9.6% accuracy gains over baseline prompting. Targeting an arXiv preprint \u2014 results are real, the paper is in progress.",
      linkLabel: "Read Research \u2192",
      linkTo: "/research",
      highlight: null,
    },
  ];

  return (
    <main className="max-w-container mx-auto px-8 pt-24 pb-0">

      {/* ===== HERO ===== */}
      <section className="mb-20 flex flex-col md:flex-row items-start gap-16">

        {/* F-pattern: TEXT LEFT */}
        <div className="w-full md:w-2/3">
          <Reveal delay={100}>
            <p className="font-inter text-label-caps text-on-surface-variant uppercase mb-3 tracking-[0.1em]">
              AI/ML Application Developer &middot; Prospective PhD (Fall 2027)
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="font-newsreader text-h1 text-ink mb-4">
              Chinmoy Mitra
            </h1>
          </Reveal>
          <Reveal delay={250}>
            <div className="h-[1px] w-16 bg-ink mb-6" />
            <p className="font-newsreader text-[1.35rem] italic text-ink leading-[1.55] mb-2">
              Full-stack developer building AI/ML-integrated systems &mdash; from
              production web apps to agentic GenAI pipelines that save real time
              and resources.
            </p>
            <p className="font-inter text-[0.95rem] text-on-surface-variant leading-relaxed mb-6">
              Currently at Dexian Bangladesh shipping multi-agent architectures,
              RAG systems, and LLM evaluation frameworks that go from research to
              production fast.
            </p>
            {/* Scannable key facts */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-4 items-baseline">
                <span className="font-inter text-[0.65rem] uppercase tracking-[0.12em] text-on-surface-variant/80 shrink-0 w-20">
                  Published
                </span>
                <span className="font-inter text-[0.82rem] text-ink font-medium leading-snug">
                  IEEE QPAN 2025 &mdash; brain tumor classification via transfer learning
                </span>
                <a
                  href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=kUignlYAAAAJ&citation_for_view=kUignlYAAAAJ:u5HHmVD_uO8C"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-inter text-[0.72rem] text-[#2563eb] hover:text-[#1d4ed8] transition-colors no-underline shrink-0"
                >
                  <FaExternalLinkAlt className="text-[0.55rem]" />
                  <span>Link</span>
                </a>
              </div>
              <div className="flex gap-4 items-baseline">
                <span className="font-inter text-[0.65rem] uppercase tracking-[0.12em] text-on-surface-variant/80 shrink-0 w-20">
                  Seeking
                </span>
                <span className="font-inter text-[0.82rem] text-on-surface-variant leading-snug">
                  Fall 2027 PhD &middot; NLP &middot; LLM Evaluation &middot; Computational Systems &middot;
                  Healthcare AI
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/project"
                className="bg-transparent text-ink px-8 py-3 font-inter text-label-caps uppercase tracking-[0.1em] border border-ink hover:bg-ink hover:text-on-ink transition-colors duration-200 no-underline"
              >
                Explore Projects
              </Link>
              <Link
                to="/research"
                className="bg-transparent text-ink px-8 py-3 font-inter text-label-caps uppercase tracking-[0.1em] border border-ink hover:bg-ink hover:text-on-ink transition-colors duration-200 no-underline"
              >
                Research &rarr;
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Photo + social */}
        <Reveal className="w-full md:w-1/3 shrink-0 max-w-[300px] md:ml-auto md:-mt-12">
          <div className="relative">
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[60%] h-5 rounded-full blur-xl pointer-events-none"
              style={{ background: "rgba(28,28,25,0.12)" }}
            />
            <div className="relative" style={{ animation: "riseUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
              WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 28%)",
              maskImage: "linear-gradient(to top, transparent 0%, black 28%)" }}>
              <img
                src={avatarImg}
                alt="Chinmoy Mitra"
                className="w-full h-auto object-contain block"
                style={{ filter: "contrast(1.03) brightness(1.01)" }}
              />
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-3 pl-4">
            <a href={resumeData.links.linkedin} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 font-inter text-[0.8rem] text-on-surface-variant hover:text-ink transition-colors no-underline group">
              <FaLinkedinIn className="text-[1.05rem] shrink-0" style={{ color: "#0A66C2" }} />
              <span>LinkedIn</span>
            </a>
            <a href={resumeData.links.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 font-inter text-[0.8rem] text-on-surface-variant hover:text-ink transition-colors no-underline group">
              <FaGithub className="text-[1.05rem] shrink-0" style={{ color: "#1c1c19" }} />
              <span>chinmoy17</span>
            </a>
            <a href={"mailto:" + resumeData.links.email}
              className="flex items-center gap-2.5 font-inter text-[0.8rem] text-on-surface-variant hover:text-ink transition-colors no-underline group">
              <SiGmail className="text-[1.05rem] shrink-0" style={{ color: "#EA4335" }} />
              <span>{resumeData.links.email}</span>
            </a>
          </div>
        </Reveal>
      </section>

      {/* ===== WHAT I BUILD ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-[0.85rem] left-0 pr-6 font-newsreader text-[1.3rem] text-ink leading-none" style={{ background: "#fcf9f4" }}>
          What I Build
        </span>
      </div>

      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <Reveal className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <p className="font-newsreader text-[1.6rem] italic text-ink leading-relaxed mb-6">
                I design systems that think, reason, and act &mdash; from LLM
                orchestration to production ML pipelines that serve real users at
                scale.
              </p>
              <p className="font-inter text-[0.78rem] uppercase tracking-[0.12em] text-on-surface-variant/70">
                Focus Areas
              </p>
            </div>
          </Reveal>

          <div className="md:col-span-8 space-y-10">
            {focusAreas.map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className={i < focusAreas.length - 1 ? "border-b border-surface-variant pb-10" : ""}>
                  <div className="flex items-start gap-2 mb-2">
                    <item.icon className="text-ink text-[1.1rem] shrink-0 mt-[0.2rem]" />
                    <h3 className="font-newsreader text-[1.25rem] text-ink font-medium leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-3">
                    {item.body}
                  </p>
                  {item.highlight && (
                    <p className="font-inter text-[0.82rem] text-ink border-l-2 border-ink pl-3 leading-relaxed mb-3">
                      {item.highlight}
                    </p>
                  )}
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
        <span className="absolute -top-[0.85rem] left-0 pr-6 font-newsreader text-[1.3rem] text-ink leading-none" style={{ background: "#fcf9f4" }}>
          Timeline
        </span>
      </div>

      <section className="mb-20">
        <div className="divide-y divide-surface-variant max-w-4xl">
          {milestones.map((m, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="grid grid-cols-[7.5rem_1fr] md:grid-cols-[10rem_1fr] gap-x-8 py-6 items-start">
                <div className="pt-0.5">
                  <p className={"font-inter text-[0.7rem] uppercase tracking-[0.1em] " + (m.current ? "text-ink font-semibold" : "text-on-surface-variant/70")}>
                    {m.date}
                  </p>
                  {m.current && (
                    <span className="inline-block mt-1.5 font-inter text-[0.55rem] uppercase tracking-[0.12em] text-ink border border-ink px-1.5 py-0.5 leading-none">
                      Now
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <span className="font-newsreader text-[1.1rem] text-ink leading-snug">
                      {m.title}
                    </span>
                    <span className="font-inter text-[0.78rem] text-on-surface-variant/80">
                      &middot; {m.org}
                    </span>
                  </div>
                  <p className="font-inter text-[0.82rem] text-on-surface-variant leading-relaxed">
                    {m.note}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <div className="mt-6">
            <Link
              to="/about"
              className="font-inter text-[0.8rem] text-ink border-b border-ink/40 pb-px hover:border-ink transition-colors no-underline"
            >
              Full background & experience &rarr;
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ===== BY THE NUMBERS ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-[0.85rem] left-0 pr-6 font-newsreader text-[1.3rem] text-ink leading-none" style={{ background: "#fcf9f4" }}>
          By the Numbers
        </span>
      </div>

      <section className="mb-20">
        <Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-10 gap-x-8">
            {[
              { value: "600+", label: "Account Managers", sub: "Note2Action automation" },
              { value: "38%", label: "Cost Reduction", sub: "DSPy LLM optimization" },
              { value: "3.2x", label: "Latency Improvement", sub: "Production RAG system" },
              { value: "99.5%", label: "Model Accuracy", sub: "IEEE QPAN 2025 paper" },
              { value: "35K+", label: "Papers Analyzed", sub: "Retraction NLP study" },
            ].map((s, i) => (
              <div key={i}>
                <p className="font-newsreader text-[2rem] text-ink leading-none mb-1">
                  {s.value}
                </p>
                <p className="font-inter text-[0.78rem] text-ink font-medium leading-tight mb-0.5">
                  {s.label}
                </p>
                <p className="font-inter text-[0.7rem] text-on-surface-variant/70 leading-snug">
                  {s.sub}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ===== CLOSING - CTA to Contact ===== */}
      <Reveal>
        <div className="relative w-full h-[1px] bg-surface-variant mb-16" />
      </Reveal>

      <Reveal>
        <section className="mb-0 pb-20 max-w-2xl">
          <p className="font-inter text-[0.7rem] uppercase tracking-[0.14em] text-on-surface-variant/70 mb-8">
            Let&apos;s Work Together
          </p>
          <h2 className="font-newsreader text-[2rem] md:text-[2.4rem] text-ink leading-tight mb-5">
            Got a project, research idea, or just want to talk AI?
          </h2>
          <p className="font-inter text-[0.95rem] text-on-surface-variant leading-relaxed mb-10">
            I&apos;m always open to interesting conversations &mdash; whether
            it&apos;s a collaboration, a PhD opportunity, or a challenging
            engineering problem.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              to="/contact"
              className="bg-transparent text-ink px-8 py-3 font-inter text-label-caps uppercase tracking-[0.1em] border border-ink hover:bg-ink hover:text-on-ink transition-colors duration-200 no-underline"
            >
              Get in Touch &rarr;
            </Link>
            <a
              href={resumeData.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-inter text-[0.85rem] text-on-surface-variant hover:text-ink transition-colors no-underline"
            >
              <FaLinkedinIn className="text-[1rem]" style={{ color: "#0A66C2" }} />
              <span>LinkedIn</span>
            </a>
            <a
              href={resumeData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-inter text-[0.85rem] text-on-surface-variant hover:text-ink transition-colors no-underline"
            >
              <FaGithub className="text-[1rem]" style={{ color: "#1c1c19" }} />
              <span>GitHub</span>
            </a>
          </div>
        </section>
      </Reveal>
    </main>
  );
}

export default Home;
