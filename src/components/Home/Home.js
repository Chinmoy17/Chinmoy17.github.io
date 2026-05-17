import React, { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import resumeData from "../../data/resume.json";
import avatarImg from "../../Assets/avatar.png";
import { Reveal } from "../utils/Reveal";
import { MdOutlineHub, MdOutlineApps, MdOutlineTune } from "react-icons/md";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

function Home() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          title: "Portfolio Contact",
          name: formState.name,
          email_address: formState.email,
          message: formState.message,
          time: new Date().toLocaleString(),
        },
        { publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY }
      )
      .then(() => {
        setSending(false);
        setSent(true);
        setFormState({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setSending(false);
        const msg = err?.text || err?.message || JSON.stringify(err);
        setError(`Error: ${msg}`);
      });
  };
  const milestones = [
    {
      date: "2019 – 2024",
      title: "B.Sc. Computer Science",
      org: "RUET",
      note: "CGPA 3.11/4.00 · Thesis: Brain Tumor Classification",
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
      body: "Shipped Note2Action — predicting next actions for 600+ account managers. Designed evaluation pipelines with regression guards before every production rollout.",
      linkLabel: "View Projects →",
      linkTo: "/project",
      external: false,
      highlight: null,
    },
    {
      icon: MdOutlineApps,
      title: "Multi-Agent Systems & BM Product Accelerator",
      body: "Built the skill-extractor agent for BM Product Accelerator — a multi-agent platform (planner, skill-extractor, coding agent). Given legacy production code as input, the skill-extractor parses reusable skills into a GitLab repo and builds a tree-based index with quality weights.",
      highlight: "Tree-based index reduces skill search complexity from O(n²) to O(log n), letting the planner and coding agents retrieve relevant skills instantly at scale.",
      linkLabel: "View Projects →",
      linkTo: "/project",
      external: false,
    },
    {
      icon: MdOutlineTune,
      title: "Research: DSPy & Evaluation-Driven LLMs",
      body: "Ongoing controlled experiments optimizing LLM pipelines with DSPy 2.5+. Measured results show 38% cost reduction and +9.6% accuracy gains over baseline prompting. Targeting an arXiv preprint — results are real, the paper is in progress.",
      linkLabel: "Read Research →",
      linkTo: "/research",
      external: false,
      highlight: null,
    },
  ];

  return (
    <main className="max-w-container mx-auto px-8 pt-24 pb-0">

      {/* ===== HERO ===== */}
      <section className="mb-xl flex flex-col md:flex-row items-start gap-16">

        {/* F-pattern: TEXT LEFT — first horizontal scan hits name + headline */}
        <div className="w-full md:w-2/3">
          <Reveal delay={100}>
            <p className="font-inter text-label-caps text-on-surface-variant uppercase mb-3 tracking-[0.1em]">
              AI/ML Application Developer · Prospective PhD (Fall 2027)
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="font-newsreader text-h1 text-ink mb-4">
              Chinmoy Mitra
            </h1>
          </Reveal>
          <Reveal delay={250}>
            <div className="h-[1px] w-16 bg-ink mb-6" />
            {/* Level 1 — editorial lead */}
            <p className="font-newsreader text-[1.35rem] italic text-ink leading-[1.55] mb-5 max-w-lg">
              Full-stack developer building AI/ML-integrated systems — from
              production web apps to agentic GenAI pipelines that save real time
              and resources.
            </p>
            {/* Level 2 — current role + focus */}
            <p className="font-inter text-[0.95rem] text-on-surface-variant leading-relaxed mb-6 max-w-md">
              Currently at Dexian Bangladesh shipping multi-agent architectures,
              RAG systems, and LLM evaluation frameworks that go from research to
              production fast.
            </p>
            {/* Level 3 — scannable key facts */}
            <div className="flex flex-col gap-3 max-w-lg">
              <div className="flex gap-4 items-baseline">
                <span className="font-inter text-[0.65rem] uppercase tracking-[0.12em] text-on-surface-variant/80 shrink-0 w-20">
                  Published
                </span>
                <span className="font-inter text-[0.82rem] text-ink font-medium leading-snug">
                  IEEE QPAN 2025 — brain tumor classification via transfer learning
                </span>
                <a
                  href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=kUignlYAAAAJ&citation_for_view=kUignlYAAAAJ:u5HHmVD_uO8C"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-[0.72rem] text-on-surface-variant/60 border-b border-on-surface-variant/30 pb-px hover:text-ink hover:border-ink transition-colors no-underline shrink-0"
                >
                  View →
                </a>
              </div>
              <div className="flex gap-4 items-baseline">
                <span className="font-inter text-[0.65rem] uppercase tracking-[0.12em] text-on-surface-variant/80 shrink-0 w-20">
                  Seeking
                </span>
                <span className="font-inter text-[0.82rem] text-on-surface-variant leading-snug">
                  Fall 2027 PhD · NLP · LLM Evaluation · Computational Systems ·
                  Healthcare AI
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/project"
                className="bg-ink text-on-ink px-8 py-3 font-inter text-label-caps uppercase tracking-[0.1em] hover:bg-surface hover:text-ink border border-ink transition-colors duration-200 no-underline"
              >
                Explore Projects
              </Link>
              <Link
                to="/research"
                className="bg-transparent text-ink px-8 py-3 font-inter text-label-caps uppercase tracking-[0.1em] border border-ink hover:bg-ink hover:text-on-ink transition-colors duration-200 no-underline"
              >
                Research →
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Photo + social — RIGHT column, secondary in F-scan */}
        <Reveal className="w-full md:w-1/3 shrink-0 max-w-[300px] md:ml-auto md:-mt-12">
          <div className="relative">
            {/* Oval ground shadow */}
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
          <style>{`
            @keyframes riseUp {
              0% {
                clip-path: inset(100% 0 0 0);
                transform: translateY(40px);
                opacity: 0;
              }
              100% {
                clip-path: inset(0% 0 0 0);
                transform: translateY(0);
                opacity: 1;
              }
            }
          `}</style>
          {/* Social links below photo — aligned with image */}
          <div className="mt-5 flex flex-col gap-3 pl-4">
            <a
              href={resumeData.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 font-inter text-[0.8rem] text-on-surface-variant hover:text-ink transition-colors no-underline group"
            >
              <FaLinkedinIn className="text-[1.05rem] shrink-0 transition-colors" style={{ color: "#0A66C2" }} />
              <span>LinkedIn</span>
            </a>
            <a
              href={resumeData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 font-inter text-[0.8rem] text-on-surface-variant hover:text-ink transition-colors no-underline group"
            >
              <FaGithub className="text-[1.05rem] shrink-0 transition-colors" style={{ color: "#1c1c19" }} />
              <span>chinmoy17</span>
            </a>
            <a
              href={`mailto:${resumeData.links.email}`}
              className="flex items-center gap-2.5 font-inter text-[0.8rem] text-on-surface-variant hover:text-ink transition-colors no-underline group"
            >
              <SiGmail className="text-[1.05rem] shrink-0 transition-colors" style={{ color: "#EA4335" }} />
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

      <section className="mb-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left: editorial statement — sticky so it anchors as focus areas scroll */}
          <Reveal className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <p className="font-newsreader text-[1.6rem] italic text-ink leading-relaxed mb-6">
                I design systems that think, reason, and act — from LLM
                orchestration to production ML pipelines that serve real users at
                scale.
              </p>
              <p className="font-inter text-[0.78rem] uppercase tracking-[0.12em] text-on-surface-variant/70">
                Focus Areas
              </p>
            </div>
          </Reveal>

          {/* Right: 3 focus areas */}
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

      <section className="mb-xl">
        {/* Timeline rows — editorial table, no boxes */}
        <div className="divide-y divide-surface-variant">
          {milestones.map((m, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className={`grid grid-cols-[7rem_1fr] md:grid-cols-[9rem_1fr] gap-x-8 py-5 items-baseline group ${m.current ? "" : ""}`}>
                {/* Date column */}
                <p className={`font-inter text-[0.7rem] uppercase tracking-[0.1em] pt-0.5 ${m.current ? "text-ink font-semibold" : "text-on-surface-variant/70"}`}>
                  {m.date}
                </p>
                {/* Content column */}
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`font-newsreader text-[1.05rem] leading-snug ${m.current ? "text-ink" : "text-ink"}`}>
                      {m.title}
                    </span>
                    <span className={`font-inter text-[0.78rem] ${m.current ? "text-on-surface-variant" : "text-on-surface-variant/70"}`}>
                      · {m.org}
                    </span>
                    {m.current && (
                      <span className="font-inter text-[0.6rem] uppercase tracking-[0.12em] text-ink border border-ink px-1.5 py-0.5 leading-none">
                        Now
                      </span>
                    )}
                  </div>
                  <p className="font-inter text-[0.8rem] text-on-surface-variant/70 leading-relaxed">
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

        {/* By the Numbers */}
        <Reveal delay={500}>
          <div className="mt-12 pt-10 border-t border-surface-variant">
            <p className="font-inter text-[0.65rem] uppercase tracking-[0.14em] text-on-surface-variant/70 mb-8">
              By the Numbers
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {[
                { value: "600+", label: "Account Managers", sub: "Note2Action automation" },
                { value: "38%", label: "Cost Reduction", sub: "DSPy LLM optimization" },
                { value: "3.2×", label: "Latency Improvement", sub: "Production RAG system" },
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
          </div>
        </Reveal>
      </section>

      {/* ===== CLOSING — flat, no box ===== */}
      <Reveal>
        <div className="relative w-full h-[1px] bg-surface-variant mb-16 mt-xl" />
      </Reveal>

      <Reveal>
        <section className="mb-0 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Left: heading + copy + social */}
            <div>
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
              <div className="flex flex-col gap-4">
                <a
                  href={resumeData.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-inter text-[0.85rem] text-on-surface-variant hover:text-ink transition-colors no-underline group"
                >
                  <FaLinkedinIn className="text-[1.1rem] shrink-0 text-ink" />
                  <span className="border-b border-ink/30 pb-px group-hover:border-ink transition-colors">
                    LinkedIn &rarr;
                  </span>
                </a>
                <a
                  href={resumeData.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-inter text-[0.85rem] text-on-surface-variant hover:text-ink transition-colors no-underline group"
                >
                  <FaGithub className="text-[1.1rem] shrink-0 text-ink" />
                  <span className="border-b border-ink/30 pb-px group-hover:border-ink transition-colors">
                    GitHub &rarr;
                  </span>
                </a>
              </div>
            </div>

            {/* Right: inline EmailJS form */}
            <div>
              {sent ? (
                <div className="py-12">
                  <p className="font-newsreader text-[1.4rem] italic text-ink mb-2">
                    Message sent.
                  </p>
                  <p className="font-inter text-[0.88rem] text-on-surface-variant">
                    I&apos;ll get back to you as soon as I can.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <label className="font-inter text-[0.65rem] uppercase tracking-[0.14em] text-on-surface-variant/70">
                      Name
                    </label>
                    <input
                      type="text"
                      name="from_name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState((p) => ({ ...p, name: e.target.value }))}
                      className="w-full bg-transparent border-b border-surface-variant focus:border-ink outline-none font-inter text-[0.92rem] text-ink py-2 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-inter text-[0.65rem] uppercase tracking-[0.14em] text-on-surface-variant/70">
                      Email
                    </label>
                    <input
                      type="email"
                      name="reply_to"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState((p) => ({ ...p, email: e.target.value }))}
                      className="w-full bg-transparent border-b border-surface-variant focus:border-ink outline-none font-inter text-[0.92rem] text-ink py-2 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-inter text-[0.65rem] uppercase tracking-[0.14em] text-on-surface-variant/70">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
                      className="w-full bg-transparent border-b border-surface-variant focus:border-ink outline-none font-inter text-[0.92rem] text-ink py-2 resize-none transition-colors"
                      placeholder="What's on your mind?"
                    />
                  </div>
                  {error && (
                    <p className="font-inter text-[0.8rem] text-red-600">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="self-start bg-ink text-on-ink px-8 py-3 font-inter text-label-caps uppercase tracking-[0.1em] border border-ink hover:bg-surface hover:text-ink transition-colors duration-200 disabled:opacity-50"
                  >
                    {sending ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}

export default Home;
