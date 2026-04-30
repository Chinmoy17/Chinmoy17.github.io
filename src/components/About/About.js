import React, { useState } from "react";
import resumeData from "../../data/resume.json";
import { Reveal } from "../utils/Reveal";
import {
  FaBriefcase,
  FaAward,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

// Company logos
import dexianLogo from "../../Assets/CompanyLogos/dexian.jpeg";
import waltonLogo from "../../Assets/CompanyLogos/walton.png";
import outlierLogo from "../../Assets/CompanyLogos/outlier.jpeg";

const companyLogos = {
  "Dexian Bangladesh": dexianLogo,
  "Walton Hi\u2011Tech Industries": waltonLogo,
  Outlier: outlierLogo,
};

// Full experience data (matches Experience.js)
const experiences = [
  {
    company: "Dexian Bangladesh",
    role: "Application Developer: AI/ML",
    type: "Onsite",
    location: "Dhaka, Bangladesh",
    start: "2025-10-15",
    end: null,
    summary:
      "Build and ship agentic AI and evaluation-driven LLM systems for enterprise workflows, with an emphasis on reliability, measurable quality, and production readiness.",
    techStack: ["Python", "FastAPI", "LangChain", "Azure", "React", "DSPy", "Docker", "PostgreSQL"],
    highlights: [
      "Developed AI/ML-powered solutions across multiple products, including **Note2Action** — an automation system predicting next actions for **600+ Account Managers**.",
      "Built **DemoFactory** — an AI-driven platform that generates and deploys customizable applications from user queries.",
      "Designed **agentic workflows** and **RAG pipelines** with a strong focus on correctness, controllability, and real-world usability.",
      "Implemented **evaluation-driven iteration** for prompts and LLM behaviors (test sets, rubrics, regressions) to improve quality before rollout.",
      "Developed end-to-end data and model pipelines: data preparation, training/experimentation, deployment integration, and automation workflows.",
      "Partnered with stakeholders to translate ambiguous business needs into clear problem statements, measurable acceptance criteria, and usable UX flows.",
      "Produced clear technical documentation and handoff notes to support maintainability, onboarding, and cross-team collaboration.",
    ],
  },
  {
    company: "Walton Hi\u2011Tech Industries",
    role: "AI Intern",
    type: "Onsite",
    location: "Gazipur, Bangladesh",
    start: "2025-08-01",
    end: "2025-10-09",
    summary:
      "Contributed to enterprise-scale RAG systems for Bangladesh's largest electronics manufacturer.",
    techStack: ["Python", "LangChain", "RAG", "FastAPI", "Vector DB"],
    highlights: [
      "Contributed to a comprehensive **RAG-based chatbot** for customer support, order processing, HRMS, product search, and warranty claims.",
      "Supported end-to-end components (retrieval, orchestration, evaluation) to improve internal productivity.",
    ],
  },
  {
    company: "Outlier",
    role: "AI Contributor",
    type: "Remote",
    location: "San Francisco, CA (Remote)",
    start: "2024-03-01",
    end: "2025-07-31",
    summary:
      "Enhanced LLM capabilities through high-quality training data and prompt engineering.",
    techStack: ["Python", "Swift", "LLMs", "Prompt Engineering"],
    highlights: [
      "Designed **high-quality prompts and responses** to improve LLM performance in code generation, refactoring, and summarization.",
      "Assisted in fine-tuning workflows via curated datasets and output evaluation.",
      "Contributed across **Swift and Python** code contexts; supported audio training pipelines for LLMs.",
    ],
  },
  {
    company: "Young Learner's Research Lab",
    role: "Research Assistant",
    type: "Non-paid",
    location: "Remote",
    start: "2024-11-01",
    end: "2025-02-28",
    summary:
      "Conducted research on abstractive summarization using state-of-the-art LLMs.",
    techStack: ["PyTorch", "LLaMA", "LoRA", "Hugging Face", "NLP"],
    highlights: [
      "Collaborated on **abstractive summarization** using LLaMA, DeepSeek, and Mixtral.",
      "Fine-tuned transformer models on **CNN/DailyMail and XSum** using LoRA.",
      "Evaluated with **ROUGE and BERTScore** to measure summary quality and relevance.",
    ],
  },
];

function ExperienceEntry({ exp, defaultExpanded }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const isCurrentRole = exp.end === null;
  const logo = companyLogos[exp.company];

  const formatDate = (dateStr) => {
    if (!dateStr) return "Present";
    const d = new Date(dateStr);
    return d.toLocaleString("default", { month: "short", year: "numeric" });
  };

  const parseHighlight = (text) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="text-ink font-semibold">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  return (
    <article className="relative mb-28 last:mb-15">
      {/* Timeline marker — horizontal dash */}
      <div
        className={`hidden md:block absolute -left-[33px] top-[14px] w-4 h-px ${
          isCurrentRole ? "bg-ink" : "bg-surface-variant"
        }`}
      ></div>

      {/* Header: Role + Date on same baseline */}
      <header className="mb-3">
        <div className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-3">
            {logo ? (
              <img
                src={logo}
                alt={exp.company}
                className="w-10 h-10 object-contain border border-surface-variant shrink-0"
              />
            ) : (
              <div className="w-10 h-10 border border-surface-variant flex items-center justify-center bg-surface-container-low shrink-0">
                <span className="font-inter text-[0.7rem] font-semibold text-on-surface-variant uppercase">
                  {exp.company.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </span>
              </div>
            )}
            <h3 className="font-newsreader text-h3 text-ink leading-none">{exp.role}</h3>
            {isCurrentRole && (
              <span className="font-inter text-[0.6rem] uppercase tracking-[0.1em] bg-ink text-on-ink px-1.5 py-0.5">
                Now
              </span>
            )}
          </div>
          <span className="font-inter text-[0.8rem] text-on-surface-variant shrink-0 hidden sm:block">
            {formatDate(exp.start)} — {formatDate(exp.end)}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 font-inter text-body-md text-on-surface-variant ml-[52px]">
          <span>{exp.company}</span>
          {exp.location && (
            <span className="flex items-center gap-1 text-[0.8rem] text-on-surface-variant/60">
              <FaMapMarkerAlt className="text-[0.6rem]" />
              {exp.location}
            </span>
          )}
          <span className="font-inter text-[0.8rem] text-on-surface-variant sm:hidden">
            {formatDate(exp.start)} — {formatDate(exp.end)}
          </span>
        </div>
      </header>

      {/* Content area with nested left border */}
      <div className="pl-0 md:pl-5 md:border-l md:border-surface-variant pt-2">
        {/* Summary */}
        <p className="font-inter text-body-md text-on-surface-variant/80 max-w-3xl leading-relaxed mb-4">
          {exp.summary}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap items-center gap-2">
          {exp.techStack && exp.techStack.map((tech, i) => (
            <span
              key={i}
              className="font-inter text-[0.7rem] text-on-surface-variant border border-surface-variant px-2.5 py-1 bg-surface-container-low"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* See Impact button — below tech stack with inviting animation */}
        {exp.highlights && exp.highlights.length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 font-inter text-[0.75rem] uppercase tracking-[0.08em] text-ink flex items-center gap-2 hover:gap-3 transition-all duration-300 bg-transparent border-none cursor-pointer p-0 group"
          >
            <span className="border-b border-ink/50 pb-px group-hover:border-ink transition-colors">
              {expanded ? "Hide Impact" : "See Impact"}
            </span>
            <span className={`inline-flex flex-col items-center -gap-1 transition-transform duration-300 ${!expanded ? "animate-bounce-x" : ""}`}>
              {expanded ? (
                <FaChevronUp className="text-[0.5rem]" />
              ) : (
                <>
                  <FaChevronDown className="text-[0.45rem] -mb-[3px]" />
                  <FaChevronDown className="text-[0.45rem] -mb-[3px] opacity-70" />
                  <FaChevronDown className="text-[0.45rem] opacity-40" />
                </>
              )}
            </span>
          </button>
        )}

        {/* Highlights - collapsible */}
        {expanded && exp.highlights && exp.highlights.length > 0 && (
          <ul className="mt-5 space-y-4 list-none pl-0 pb-2">
            {exp.highlights.map((h, i) => (
              <li
                key={i}
                className="font-inter text-body-md text-on-surface-variant/80 pl-5 border-l-2 border-surface-variant leading-relaxed"
              >
                {parseHighlight(h)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

function About() {
  const education = resumeData.education;
  const publication = resumeData.publications[0];
  const awards = resumeData.awards;


  return (
    <main className="max-w-container mx-auto px-8 pt-24 pb-xl">
      {/* Page Title */}
      <section className="mb-xl">
        <Reveal>
          
          <h1 className="font-newsreader text-h1 text-ink mb-6">
            About Me
          </h1>
          <div className="h-[1px] w-16 bg-ink mb-6"></div>
          <p className="font-inter text-body-lg text-on-surface-variant max-w-3xl">
            A detailed look at the systems I've built, the research that shaped my thinking, and the tools I reach for. Scroll through experience, education, publications, and technical skills below.
          </p>
        </Reveal>
      </section>

      {/* ===== EXPERIENCE SECTION ===== */}
      <Reveal>
        <div className="w-full h-px bg-surface-variant mb-md"></div>
        <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-lg">
          Professional Tenure
        </p>
      </Reveal>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-xl">
        {/* Left Column: Sticky Section Title */}
        <div className="md:col-span-3">
          <Reveal>
            <h2 className="font-newsreader text-[2.5rem] leading-[1.2] text-ink sticky top-28">
              Experience
            </h2>
          </Reveal>
        </div>

        {/* Right Column: Timeline Content */}
        <div className="md:col-span-9 relative pl-0 md:pl-8">
          {/* Vertical timeline line */}
          <div className="hidden md:block absolute left-0 top-2 bottom-0 w-px bg-surface-variant"></div>

          {experiences.map((exp, index) => (
            <Reveal key={index} delay={index * 100}>
              <ExperienceEntry
                exp={exp}
                defaultExpanded={index === 0}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== EDUCATION SECTION ===== */}
      <Reveal>
        <div className="w-full h-px bg-surface-variant mb-md"></div>
        <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-lg">
          Scholarly Background
        </p>
      </Reveal>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-xl">
        {/* Left Column: Sticky Section Title */}
        <div className="md:col-span-3">
          <Reveal>
            <h2 className="font-newsreader text-[2.5rem] leading-[1.2] text-ink sticky top-28">
              Academic Foundations
            </h2>
          </Reveal>
        </div>

        {/* Right Column: Education Content */}
        <div className="md:col-span-9 relative pl-0 md:pl-8">
          {/* Vertical timeline line */}
          <div className="hidden md:block absolute left-0 top-2 bottom-0 w-px bg-surface-variant"></div>

          {education.map((edu, index) => (
            <Reveal key={index} delay={index * 100}>
              <article className="relative mb-20">
                {/* Timeline marker */}
                <div className="hidden md:block absolute -left-[33px] top-[14px] w-4 h-px bg-surface-variant"></div>

                {/* Header: Degree + Date on same line */}
                <header className="mb-3">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <h3 className="font-newsreader text-h3 text-ink leading-none">
                      {edu.degree}
                    </h3>
                    <span className="font-inter text-[0.8rem] text-on-surface-variant shrink-0 hidden sm:block">
                      {edu.date}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 font-inter text-body-md text-on-surface-variant">
                    <span className="text-ink font-medium">{edu.institution}</span>
                    {edu.location && (
                      <span className="flex items-center gap-1 text-[0.8rem] text-on-surface-variant/60">
                        <FaMapMarkerAlt className="text-[0.6rem]" />
                        {edu.location}
                      </span>
                    )}
                    {(edu.cgpa || edu.gpa) && (
                      <span className="text-[0.8rem] text-on-surface-variant/60">
                        {edu.cgpa || `GPA: ${edu.gpa}`}
                      </span>
                    )}
                    <span className="font-inter text-[0.8rem] text-on-surface-variant sm:hidden">
                      {edu.date}
                    </span>
                  </div>
                </header>

                {/* Content area with nested left border — only if there's content */}
                {(edu.thesis || edu.coursework || edu.awards) && (
                  <div className="pl-0 md:pl-5 md:border-l md:border-surface-variant pt-2 mt-3">
                    {edu.thesis && (
                      <div className="mb-5">
                        <h4 className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-1.5">
                          Thesis
                        </h4>
                        <p className="font-inter text-body-md text-ink leading-relaxed">
                          {edu.thesis.title}
                        </p>
                        <p className="font-inter text-[0.8rem] text-on-surface-variant/70 mt-1">
                          Supervisor: {edu.thesis.supervisor}
                        </p>
                      </div>
                    )}

                    {edu.coursework && (
                      <div className="mb-5">
                        <h4 className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-2">
                          Key Coursework
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.coursework.map((course, i) => (
                            <span
                              key={i}
                              className="font-inter text-[0.7rem] text-on-surface-variant border border-surface-variant px-2.5 py-1 bg-surface-container-low"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {edu.awards && (
                      <div>
                        <h4 className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-2">
                          Awards
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.awards.map((award, i) => (
                            <span
                              key={i}
                              className="font-inter text-[0.7rem] text-ink border border-surface-variant px-2.5 py-1 bg-surface-container-low"
                            >
                              <FaAward className="inline mr-1 text-[0.6rem]" />
                              {award}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== PUBLICATION SECTION ===== */}
      {publication && (
        <>
          <Reveal>
            <div className="w-full h-px bg-surface-variant mb-md"></div>
            <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-lg">
              Research Output
            </p>
          </Reveal>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-xl">
            <div className="md:col-span-3">
              <Reveal>
                <h2 className="font-newsreader text-[2.5rem] leading-[1.2] text-ink sticky top-28">
                  Research
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-9 space-y-12">
              {/* IEEE Publication */}
              <Reveal delay={100}>
                <article>
                  <h3 className="font-newsreader text-h3 text-ink mb-2">
                    {publication.title}
                  </h3>
                  <p className="font-inter text-body-md text-on-surface-variant">
                    {publication.venue}, {publication.year} &middot;{" "}
                    {publication.notes}
                  </p>
                  <p className="font-inter text-body-md text-on-surface-variant/80 mt-3 leading-relaxed">
                    {publication.summary}
                  </p>
                  {publication.scholarProfile && (
                    <a
                      href={publication.scholarProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-inter text-body-md text-ink border-b border-ink/40 pb-0.5 hover:border-ink transition-colors no-underline inline-block mt-4"
                    >
                      Google Scholar Profile &rarr;
                    </a>
                  )}
                </article>
              </Reveal>

              {/* DSPy Research */}
              <Reveal delay={200}>
                <article>
                  <h3 className="font-newsreader text-h3 text-ink mb-2">
                    DSPy RAG Optimization: Taming Trial-and-Error in Production Systems
                  </h3>
                  <p className="font-inter text-body-md text-on-surface-variant">
                    Collaborative Research, 2024 &middot; Applied AI / Prompt Optimization
                  </p>
                  <p className="font-inter text-body-md text-on-surface-variant/80 mt-3 leading-relaxed">
                    A collaborative study comparing DSPy's automatic prompt optimization strategies in production RAG systems. Two engineers, different starting conditions, same goal — demonstrating how initial constraints affect whether you gain accuracy or efficiency. Programmatic prompt optimization over manual engineering.
                  </p>
                  <a
                    href="/research/dspy-rag-optimization"
                    className="font-inter text-body-md text-ink border-b border-ink/40 pb-0.5 hover:border-ink transition-colors no-underline inline-block mt-4"
                  >
                    Read Full Research &rarr;
                  </a>
                </article>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* ===== SKILLS SECTION ===== */}
      <Reveal>
        <div className="w-full h-px bg-surface-variant mb-md"></div>
        <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-lg">
          Technical Proficiency
        </p>
      </Reveal>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-xl">
        <div className="md:col-span-3">
          <Reveal>
            <h2 className="font-newsreader text-[2.5rem] leading-[1.2] text-ink sticky top-28">
              Technical Stack
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-9">
          <Reveal delay={50}>
            <p className="font-inter text-body-md text-on-surface-variant mb-12 max-w-2xl">
              An architectural overview of core competencies, focusing on foundational systems, modern frameworks, and applied artificial intelligence.
            </p>
          </Reveal>

          <div className="space-y-14">
            {/* Intelligence & Frameworks */}
            <Reveal delay={100}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-4">
                  <h3 className="font-newsreader text-[1.4rem] text-ink leading-tight">
                    Intelligence &<br className="hidden md:block" /> Frameworks
                  </h3>
                </div>
                <div className="md:col-span-8 space-y-3">
                  <p className="font-inter text-body-md text-on-surface-variant">
                    <span className="text-ink font-medium">PyTorch</span> &nbsp;/ Deep Learning & Model Training
                  </p>
                  <p className="font-inter text-body-md text-on-surface-variant">
                    <span className="text-ink font-medium">TensorFlow</span> &nbsp;/ Production Deployment
                  </p>
                  <p className="font-inter text-body-md text-on-surface-variant">
                    <span className="text-ink font-medium">Hugging Face Transformers</span> &nbsp;/ NLP Architectures
                  </p>
                  <p className="font-inter text-body-md text-on-surface-variant">
                    <span className="text-ink font-medium">LangChain & LlamaIndex</span> &nbsp;/ LLM Orchestration
                  </p>
                  <p className="font-inter text-body-md text-on-surface-variant">
                    <span className="text-ink font-medium">DSPy</span> &nbsp;/ Programmatic Prompt Optimization
                  </p>
                  <p className="font-inter text-body-md text-on-surface-variant">
                    <span className="text-ink font-medium">Scikit-learn</span> &nbsp;/ Classical ML & Evaluation
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Systems & Architecture */}
            <Reveal delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-4">
                  <h3 className="font-newsreader text-[1.4rem] text-ink leading-tight">
                    Systems &<br className="hidden md:block" /> Architecture
                  </h3>
                </div>
                <div className="md:col-span-8 space-y-3">
                  <p className="font-inter text-body-md text-on-surface-variant">
                    <span className="text-ink font-medium">Microsoft Azure</span> &nbsp;/ Cloud Infrastructure
                  </p>
                  <p className="font-inter text-body-md text-on-surface-variant">
                    <span className="text-ink font-medium">Docker & Kubernetes</span> &nbsp;/ Container Orchestration
                  </p>
                  <p className="font-inter text-body-md text-on-surface-variant">
                    <span className="text-ink font-medium">FastAPI</span> &nbsp;/ High-Performance APIs
                  </p>
                  <p className="font-inter text-body-md text-on-surface-variant">
                    <span className="text-ink font-medium">CI/CD (Azure DevOps)</span> &nbsp;/ Deployment Pipelines
                  </p>
                  <p className="font-inter text-body-md text-on-surface-variant">
                    <span className="text-ink font-medium">React & Node.js</span> &nbsp;/ Interface Engineering
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Data Layer */}
            <Reveal delay={300}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-4">
                  <h3 className="font-newsreader text-[1.4rem] text-ink leading-tight">
                    Data &<br className="hidden md:block" /> Storage
                  </h3>
                </div>
                <div className="md:col-span-8 space-y-3">
                  <p className="font-inter text-body-md text-on-surface-variant">
                    <span className="text-ink font-medium">PostgreSQL & Cosmos DB</span> &nbsp;/ Relational & Document Stores
                  </p>
                  <p className="font-inter text-body-md text-on-surface-variant">
                    <span className="text-ink font-medium">FAISS & ChromaDB</span> &nbsp;/ Vector Search & Retrieval
                  </p>
                  <p className="font-inter text-body-md text-on-surface-variant">
                    <span className="text-ink font-medium">Milvus & Pinecone</span> &nbsp;/ Scalable Vector Databases
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Core Foundations */}
            <Reveal delay={400}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-4">
                  <h3 className="font-newsreader text-[1.4rem] text-ink leading-tight">
                    Core<br className="hidden md:block" /> Foundations
                  </h3>
                </div>
                <div className="md:col-span-8 space-y-3">
                  <p className="font-inter text-body-md text-on-surface-variant">
                    <span className="text-ink font-medium">Python</span> &nbsp;/ Data Science & Backend
                  </p>
                  <p className="font-inter text-body-md text-on-surface-variant">
                    <span className="text-ink font-medium">TypeScript</span> &nbsp;/ Typed Application Logic
                  </p>
                  <p className="font-inter text-body-md text-on-surface-variant">
                    <span className="text-ink font-medium">C++</span> &nbsp;/ High-Performance Computing
                  </p>
                  <p className="font-inter text-body-md text-on-surface-variant">
                    <span className="text-ink font-medium">SQL</span> &nbsp;/ Data Querying & Analytics
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== AWARDS SECTION ===== */}
      <Reveal>
        <div className="w-full h-px bg-surface-variant mb-md"></div>
        <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-lg">
          Recognition
        </p>
      </Reveal>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-xl">
        <div className="md:col-span-3">
          <Reveal>
            <h2 className="font-newsreader text-[2.5rem] leading-[1.2] text-ink sticky top-28">
              Awards
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">

            <Reveal delay={80}>
              <div className="border-t border-ink pt-4">
                <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-2">Scholarship</p>
                <p className="font-newsreader text-[1.25rem] text-ink leading-snug">Dutch Bangla Bank Scholarship for Undergraduates</p>
                <p className="font-inter text-[0.8rem] text-on-surface-variant mt-1">2019 – 2023 &middot; 4 years consecutive</p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="border-t border-surface-variant pt-4">
                <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-2">Scholarship</p>
                <p className="font-newsreader text-[1.25rem] text-ink leading-snug">RUET Technical Scholarship</p>
                <p className="font-inter text-[0.8rem] text-on-surface-variant mt-1">2019, 2022</p>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="border-t border-surface-variant pt-4">
                <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-2">Leadership</p>
                <p className="font-newsreader text-[1.25rem] text-ink leading-snug">Class Representative</p>
                <p className="font-inter text-[0.8rem] text-on-surface-variant mt-1">Leadership Award &middot; 4 consecutive years</p>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="border-t border-surface-variant pt-4">
                <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-2">Competition</p>
                <p className="font-newsreader text-[1.25rem] text-ink leading-snug">RUET Codesmash — 10th Place</p>
                <p className="font-inter text-[0.8rem] text-on-surface-variant mt-1">Intra-RUET Programming Contest &middot; 2019</p>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="border-t border-surface-variant pt-4">
                <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-2">Competition</p>
                <p className="font-newsreader text-[1.25rem] text-ink leading-snug">RUET GanJam — Participant</p>
                <p className="font-inter text-[0.8rem] text-on-surface-variant mt-1">Intra-RUET Programming Contest &middot; 2020</p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ===== DOWNLOAD CV ===== */}
      <Reveal>
        <div className="text-center py-lg border-t border-surface-variant">
          <p className="font-inter text-body-md text-on-surface-variant mb-4">
            Want the full details?
          </p>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ink text-on-ink px-8 py-3 font-inter text-label-caps uppercase tracking-[0.1em] hover:bg-surface hover:text-ink border border-ink transition-colors duration-200 no-underline inline-block"
          >
            Download Resume (PDF)
          </a>
        </div>
      </Reveal>
    </main>
  );
}

export default About;
