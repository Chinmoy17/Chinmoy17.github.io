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
    <article className="relative mb-24 last:mb-0">
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
            {logo && (
              <img
                src={logo}
                alt={exp.company}
                className="w-10 h-10 object-contain border border-surface-variant shrink-0"
              />
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

        {/* Tech Stack + Toggle in same row */}
        <div className="flex flex-wrap items-center gap-2 mb-1">
          {exp.techStack && exp.techStack.map((tech, i) => (
            <span
              key={i}
              className="font-inter text-[0.7rem] text-on-surface-variant border border-surface-variant px-2.5 py-1 bg-surface-container-low"
            >
              {tech}
            </span>
          ))}

          {/* Contributions toggle — inline after tech stack */}
          {exp.highlights && exp.highlights.length > 0 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="font-inter text-[0.75rem] text-ink/60 flex items-center gap-1.5 hover:text-ink transition-colors bg-transparent border-none cursor-pointer p-0 ml-1"
            >
              <span className="border-b border-dotted border-ink/40 pb-px">
                {expanded ? "Hide details" : "See details"}
              </span>
              {expanded ? (
                <FaChevronUp className="text-[0.5rem]" />
              ) : (
                <FaChevronDown className="text-[0.5rem]" />
              )}
            </button>
          )}
        </div>

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
  const skills = resumeData.skills.groups;

  return (
    <main className="max-w-container mx-auto px-8 pt-24 pb-xl">
      {/* Page Title */}
      <section className="mb-xl">
        <Reveal>
          <p className="font-inter text-label-caps text-on-surface-variant uppercase mb-4 tracking-[0.1em]">
            Background
          </p>
          <h1 className="font-newsreader text-h1 text-ink mb-6">
            About Me
          </h1>
          <div className="h-[1px] w-16 bg-ink mb-6"></div>
          <p className="font-inter text-body-lg text-on-surface-variant max-w-3xl">
            {resumeData.summary}
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
        <div className="md:col-span-9">
          {education.map((edu, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="border border-surface-variant bg-surface-container-lowest p-md mb-6 last:mb-0">
                <header className="mb-4 border-b border-surface-variant pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-newsreader text-h3 text-ink">
                      {edu.degree}
                    </h3>
                    <span className="font-inter text-[0.8rem] text-on-surface-variant shrink-0">
                      {edu.date}
                    </span>
                  </div>
                  <p className="font-inter text-body-md text-on-surface-variant">
                    {edu.institution}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mt-2 font-inter text-[0.8rem] text-on-surface-variant/60">
                    {edu.location && (
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-[0.7rem]" />
                        {edu.location}
                      </span>
                    )}
                    {(edu.cgpa || edu.gpa) && (
                      <span>{edu.cgpa || `GPA: ${edu.gpa}`}</span>
                    )}
                  </div>
                </header>

                {edu.thesis && (
                  <div className="mb-4">
                    <h4 className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-1">
                      Thesis
                    </h4>
                    <p className="font-inter text-body-md text-ink">
                      {edu.thesis.title}
                    </p>
                    <p className="font-inter text-[0.8rem] text-on-surface-variant mt-1">
                      Supervisor: {edu.thesis.supervisor}
                    </p>
                  </div>
                )}

                {edu.coursework && (
                  <div className="mb-4">
                    <h4 className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-2">
                      Key Coursework
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, i) => (
                        <span
                          key={i}
                          className="font-inter text-[0.75rem] text-on-surface-variant border border-surface-variant px-2.5 py-1 bg-background"
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
                          className="font-inter text-[0.75rem] text-ink border border-surface-variant px-2.5 py-1 bg-background"
                        >
                          <FaAward className="inline mr-1 text-[0.65rem]" />
                          {award}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
                  Publication
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-9">
              <Reveal delay={100}>
                <div className="border border-surface-variant bg-surface-container-lowest p-md">
                  <h3 className="font-newsreader text-h3 text-ink mb-3">
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
                </div>
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
              Skills
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {skills.map((group, i) => (
              <Reveal key={i} delay={i * 80}>
                <div>
                  <h4 className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-3 border-b border-surface-variant pb-2">
                    {group.name}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill, j) => (
                      <span
                        key={j}
                        className="font-inter text-[0.8rem] text-ink border border-surface-variant px-2.5 py-1 bg-surface-container-low"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {awards.map((award, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="flex items-center gap-3 border border-surface-variant bg-surface-container-lowest px-5 py-4">
                  <FaAward className="text-ink shrink-0" />
                  <div>
                    <p className="font-inter text-body-md text-ink">
                      {award.name}
                    </p>
                    {(award.yearRange || award.year) && (
                      <p className="font-inter text-[0.8rem] text-on-surface-variant">
                        {award.yearRange || award.year}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
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
