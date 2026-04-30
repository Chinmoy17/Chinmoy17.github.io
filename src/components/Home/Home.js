import React from "react";
import { Link } from "react-router-dom";
import resumeData from "../../data/resume.json";
import avatarImg from "../../Assets/avatar.png";
import { Reveal } from "../utils/Reveal";
import {
  MdOutlinePsychology,
  MdOutlineMedicalServices,
  MdOutlineSecurity,
} from "react-icons/md";
import { FaGraduationCap, FaAward, FaBookOpen } from "react-icons/fa";

function Home() {
  const experience = resumeData.experience;
  const education = resumeData.education[0];
  const publication = resumeData.publications[0];

  const formatDate = (dateStr) => {
    if (!dateStr) return "Present";
    const d = new Date(dateStr);
    return d.toLocaleString("default", { month: "short", year: "numeric" });
  };

  const impactLines = {
    "Dexian Bangladesh": "AI automation for 600+ Account Managers",
    "Walton Hi\u2011Tech Industries": "Enterprise RAG chatbot for multiple business functions",
    "Outlier": "LLM training data & prompt engineering at scale",
    "Young Learner's Research Lab": "Fine-tuned LLMs for abstractive summarization",
  };

  return (
    <main className="max-w-container mx-auto px-8 pt-24 pb-0">
      {/* ===== HERO SECTION ===== */}
      <section className="mb-xl flex flex-col md:flex-row items-center gap-16">
        {/* Photo */}
        <Reveal className="w-full md:w-1/3 shrink-0 max-w-[300px]">
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
            <div className="h-[1px] w-16 bg-ink mb-6"></div>
            <p className="font-inter text-body-lg text-on-surface-variant max-w-2xl">
              Full-Stack AI Developer & Collaborative Researcher (2+ Years Exp).
              Architecting end-to-end pipelines and integrating advanced LLMs, RAG
              systems, and agentic workflows into scalable enterprise solutions.
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
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent text-ink px-8 py-3 font-inter text-label-caps uppercase tracking-[0.1em] border border-ink hover:bg-ink hover:text-on-ink transition-colors duration-200 no-underline"
              >
                Download CV
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== WHAT I BUILD ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-xl">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
          What I Build
        </span>
      </div>

      <section className="mb-xl">
        {/* Two-column: statement + focus items */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Left: editorial statement */}
          <Reveal className="md:col-span-5">
            <p className="font-newsreader text-[1.75rem] italic text-ink/90 leading-relaxed">
              I design systems that think, reason, and act — from LLM orchestration to production ML pipelines that serve real users at scale.
            </p>
          </Reveal>

          {/* Right: 3 focus areas, open layout */}
          <div className="md:col-span-7 space-y-10">
            <Reveal delay={100}>
              <div className="border-b border-surface-variant pb-8">
                <div className="flex items-center gap-2 mb-2">
                  <MdOutlinePsychology className="text-ink text-lg" />
                  <h3 className="font-newsreader text-[1.25rem] text-ink font-medium">
                    Agentic AI & LLM Systems
                  </h3>
                </div>
                <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-3">
                  Built Note2Action — an automation predicting next actions for 600+ account managers. Designed evaluation pipelines that catch regressions before rollout.
                </p>
                <Link
                  to="/project"
                  className="font-inter text-[0.8rem] text-ink border-b border-ink/40 pb-px hover:border-ink transition-colors no-underline"
                >
                  View Projects &rarr;
                </Link>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="border-b border-surface-variant pb-8">
                <div className="flex items-center gap-2 mb-2">
                  <MdOutlineMedicalServices className="text-ink text-lg" />
                  <h3 className="font-newsreader text-[1.25rem] text-ink font-medium">
                    Medical Deep Learning
                  </h3>
                </div>
                <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-3">
                  Thesis on transfer learning for brain tumor classification (VGG16, ResNet50, InceptionV3). Published at IEEE QPAN 2025.
                </p>
                <Link
                  to="/research"
                  className="font-inter text-[0.8rem] text-ink border-b border-ink/40 pb-px hover:border-ink transition-colors no-underline"
                >
                  Read Research &rarr;
                </Link>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MdOutlineSecurity className="text-ink text-lg" />
                  <h3 className="font-newsreader text-[1.25rem] text-ink font-medium">
                    Cybersecurity & Infrastructure
                  </h3>
                </div>
                <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">
                  Integrating ML models into security pipelines for anomaly detection and threat intelligence. Background in network security and secure system architecture.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== PROFESSIONAL TRAJECTORY DIVIDER ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-xl">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
          Professional Trajectory
        </span>
      </div>

      {/* ===== EXPERIENCE TIMELINE ===== */}
      <section className="mb-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-0 gap-x-8">
          {experience.map((exp, index) => (
            <React.Fragment key={index}>
              {/* Date column */}
              <Reveal delay={index * 100} className="md:col-span-3 text-left md:text-right">
                <p className="font-inter text-label-caps text-on-surface-variant pt-2 uppercase tracking-[0.1em]">
                  {formatDate(exp.start)} — {formatDate(exp.end)}
                </p>
              </Reveal>

              {/* Content column */}
              <Reveal
                delay={index * 100 + 50}
                className={`md:col-span-9 border-l border-surface-variant pl-8 relative ${
                  index < experience.length - 1 ? "pb-10" : ""
                }`}
              >
                {/* Timeline marker */}
                <div
                  className={`absolute w-3 h-3 -left-[6px] top-2 ${
                    !exp.end ? "bg-ink" : "border border-ink bg-surface"
                  }`}
                ></div>

                <h3 className="font-newsreader text-h3 text-ink mb-1">
                  {exp.role}
                </h3>
                <p className="font-inter text-body-md text-on-surface-variant mb-2">
                  {exp.company}
                </p>
                <p className="font-inter text-body-md text-on-surface-variant opacity-80">
                  {impactLines[exp.company] || exp.highlights?.[0] || ""}
                </p>
              </Reveal>
            </React.Fragment>
          ))}
        </div>

        {/* Link to About */}
        <Reveal delay={500}>
          <div className="mt-8 md:ml-[25%] pl-8">
            <Link
              to="/about"
              className="font-inter text-body-md text-ink border-b border-ink pb-0.5 hover:opacity-70 transition-opacity no-underline"
            >
              View full background &rarr;
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ===== EDUCATION & CREDENTIALS DIVIDER ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-xl mt-xl">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
          Education & Credentials
        </span>
      </div>

      {/* ===== EDUCATION & CREDENTIALS ===== */}
      <section className="mb-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main education */}
          <div className="md:col-span-7">
            <Reveal delay={100}>
              <div className="flex items-start gap-3 mb-3">
                <FaGraduationCap className="text-ink text-xl mt-1 shrink-0" />
                <div>
                  <h3 className="font-newsreader text-h3 text-ink mb-1">
                    B.Sc. in Computer Science & Engineering
                  </h3>
                  <p className="font-inter text-body-md text-on-surface-variant">
                    Rajshahi University of Engineering & Technology (RUET)
                  </p>
                  <p className="font-inter text-body-md text-on-surface-variant opacity-80">
                    {education.date} &middot; CGPA: {education.cgpa}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Thesis */}
            <Reveal delay={200}>
              <div className="flex items-start gap-3 mt-6 mb-3">
                <FaBookOpen className="text-ink text-lg mt-1 shrink-0" />
                <div>
                  <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-2">
                    Thesis
                  </p>
                  <p className="font-inter text-body-md text-ink">
                    {education.thesis.title}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Publication */}
            {publication && (
              <Reveal delay={300}>
                <div className="flex items-start gap-3 mt-6">
                  <FaBookOpen className="text-ink text-lg mt-1 shrink-0" />
                  <div>
                    <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-2">
                      Publication
                    </p>
                    <p className="font-inter text-body-md text-ink">
                      {publication.title}
                    </p>
                    <p className="font-inter text-body-md text-on-surface-variant">
                      {publication.venue}, {publication.year} &middot;{" "}
                      {publication.summary.split(";")[0]}
                    </p>
                    {publication.scholarProfile && (
                      <a
                        href={publication.scholarProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-inter text-body-md text-ink border-b border-ink pb-0.5 hover:opacity-70 transition-opacity no-underline inline-block mt-2"
                      >
                        Google Scholar &rarr;
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          {/* Awards sidebar */}
          <div className="md:col-span-5">
            <Reveal delay={200}>
              <div className="flex items-center gap-2 mb-4">
                <FaAward className="text-ink text-lg" />
                <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
                  Awards & Scholarships
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.awards.slice(0, 3).map((award, i) => (
                  <span
                    key={i}
                    className="font-inter text-[0.8rem] text-on-surface-variant border border-surface-variant px-3 py-1.5 bg-surface-container-low inline-block"
                  >
                    {award.name}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== CURRENTLY + NAVIGATION CLOSER ===== */}
      <Reveal>
        <div className="w-full h-px bg-surface-variant mb-lg mt-xl"></div>
      </Reveal>

      <section className="mb-0 pb-12 text-center">
        <Reveal delay={100}>
          <p className="font-newsreader text-[1.5rem] italic text-ink/80 max-w-2xl mx-auto leading-relaxed mb-3">
            Currently building agentic AI systems at Dexian.
          </p>
          <p className="font-inter text-body-md text-on-surface-variant/70 max-w-xl mx-auto">
            Open to research collaborations in NLP, medical imaging, and LLM evaluation.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-12">
            <Link
              to="/project"
              className="font-inter text-body-lg text-ink border-b border-ink/40 pb-1 hover:border-ink transition-colors no-underline"
            >
              View Projects &rarr;
            </Link>
            <Link
              to="/research"
              className="font-inter text-body-lg text-ink border-b border-ink/40 pb-1 hover:border-ink transition-colors no-underline"
            >
              Read Research &rarr;
            </Link>
            <Link
              to="/contact"
              className="font-inter text-body-lg text-ink border-b border-ink/40 pb-1 hover:border-ink transition-colors no-underline"
            >
              Get in Touch &rarr;
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

export default Home;
