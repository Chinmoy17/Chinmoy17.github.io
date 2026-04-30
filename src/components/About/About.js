import React, { useState } from "react";
import { Link } from "react-router-dom";
import resumeData from "../../data/resume.json";
import {
  FaBriefcase,
  FaGraduationCap,
  FaAward,
  FaBookOpen,
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
        <strong key={i} className="text-ink">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  return (
    <div className="border border-surface-variant bg-surface-container-low p-md mb-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        {logo ? (
          <img
            src={logo}
            alt={exp.company}
            className="w-12 h-12 object-contain border border-surface-variant shrink-0"
          />
        ) : (
          <div className="w-12 h-12 border border-surface-variant flex items-center justify-center bg-surface shrink-0">
            <FaBriefcase className="text-on-surface-variant" />
          </div>
        )}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-newsreader text-h3 text-ink">{exp.role}</h3>
            {isCurrentRole && (
              <span className="font-inter text-[0.65rem] uppercase tracking-[0.1em] bg-ink text-on-ink px-2 py-0.5">
                Current
              </span>
            )}
          </div>
          <p className="font-inter text-body-md text-on-surface-variant">
            {exp.company}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-2 font-inter text-[0.8rem] text-on-surface-variant opacity-80">
            <span>
              {formatDate(exp.start)} — {formatDate(exp.end)}
            </span>
            {exp.location && (
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-[0.7rem]" />
                {exp.location}
              </span>
            )}
            <span className="border border-surface-variant px-2 py-0.5 text-[0.7rem] uppercase tracking-wider">
              {exp.type}
            </span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <p className="font-inter text-body-md text-on-surface-variant mt-4">
        {exp.summary}
      </p>

      {/* Tech Stack */}
      {exp.techStack && (
        <div className="flex flex-wrap gap-2 mt-4">
          {exp.techStack.map((tech, i) => (
            <span
              key={i}
              className="font-inter text-[0.75rem] text-ink border border-surface-variant px-2 py-0.5 bg-surface"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Highlights - collapsible */}
      {exp.highlights && exp.highlights.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="font-inter text-[0.8rem] text-on-surface-variant flex items-center gap-2 hover:text-ink transition-colors bg-transparent border-none cursor-pointer p-0"
          >
            {expanded ? (
              <>
                Hide details <FaChevronUp className="text-[0.6rem]" />
              </>
            ) : (
              <>
                Show {exp.highlights.length} key achievements{" "}
                <FaChevronDown className="text-[0.6rem]" />
              </>
            )}
          </button>

          {expanded && (
            <ul className="mt-3 space-y-2 list-none pl-0">
              {exp.highlights.map((h, i) => (
                <li
                  key={i}
                  className="font-inter text-body-md text-on-surface-variant pl-4 border-l-2 border-surface-variant"
                >
                  {parseHighlight(h)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
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
      </section>

      {/* ===== EXPERIENCE SECTION ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-xl">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
          Experience
        </span>
      </div>

      <section className="mb-xl">
        {experiences.map((exp, index) => (
          <ExperienceEntry
            key={index}
            exp={exp}
            defaultExpanded={index === 0}
          />
        ))}
      </section>

      {/* ===== EDUCATION SECTION ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-xl">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
          Education
        </span>
      </div>

      <section className="mb-xl">
        {education.map((edu, index) => (
          <div
            key={index}
            className="border border-surface-variant bg-surface-container-low p-md mb-6"
          >
            <div className="flex items-start gap-3">
              <FaGraduationCap className="text-ink text-xl mt-1 shrink-0" />
              <div className="flex-1">
                <h3 className="font-newsreader text-h3 text-ink mb-1">
                  {edu.degree}
                </h3>
                <p className="font-inter text-body-md text-on-surface-variant">
                  {edu.institution}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-2 font-inter text-[0.8rem] text-on-surface-variant opacity-80">
                  <span>{edu.date}</span>
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

                {/* Thesis */}
                {edu.thesis && (
                  <div className="mt-4 pl-4 border-l-2 border-surface-variant">
                    <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-1">
                      Thesis
                    </p>
                    <p className="font-inter text-body-md text-ink">
                      {edu.thesis.title}
                    </p>
                    <p className="font-inter text-[0.8rem] text-on-surface-variant">
                      Supervisor: {edu.thesis.supervisor}
                    </p>
                  </div>
                )}

                {/* Coursework */}
                {edu.coursework && (
                  <div className="mt-4">
                    <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-2">
                      Key Coursework
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, i) => (
                        <span
                          key={i}
                          className="font-inter text-[0.75rem] text-on-surface-variant border border-surface-variant px-2 py-0.5 bg-surface"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Awards within education */}
                {edu.awards && (
                  <div className="mt-4">
                    <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-2">
                      Awards
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.awards.map((award, i) => (
                        <span
                          key={i}
                          className="font-inter text-[0.75rem] text-ink border border-surface-variant px-2.5 py-1 bg-surface"
                        >
                          <FaAward className="inline mr-1 text-[0.65rem]" />
                          {award}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ===== PUBLICATION SECTION ===== */}
      {publication && (
        <>
          <div className="relative w-full h-[1px] bg-surface-variant mb-xl">
            <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
              Publication
            </span>
          </div>

          <section className="mb-xl">
            <div className="border border-surface-variant bg-surface-container-low p-md">
              <div className="flex items-start gap-3">
                <FaBookOpen className="text-ink text-lg mt-1 shrink-0" />
                <div>
                  <h3 className="font-newsreader text-h3 text-ink mb-2">
                    {publication.title}
                  </h3>
                  <p className="font-inter text-body-md text-on-surface-variant">
                    {publication.venue}, {publication.year} &middot;{" "}
                    {publication.notes}
                  </p>
                  <p className="font-inter text-body-md text-on-surface-variant mt-2">
                    {publication.summary}
                  </p>
                  {publication.scholarProfile && (
                    <a
                      href={publication.scholarProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-inter text-body-md text-ink border-b border-ink pb-0.5 hover:opacity-70 transition-opacity no-underline inline-block mt-3"
                    >
                      Google Scholar Profile &rarr;
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ===== SKILLS SECTION ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-xl">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
          Technical Skills
        </span>
      </div>

      <section className="mb-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((group, i) => (
            <div key={i} className="border border-surface-variant bg-surface-container-low p-md">
              <h4 className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-3">
                {group.name}
              </h4>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, j) => (
                  <span
                    key={j}
                    className="font-inter text-[0.8rem] text-ink border border-surface-variant px-2.5 py-1 bg-surface"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== AWARDS SECTION ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-xl">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
          Awards & Recognition
        </span>
      </div>

      <section className="mb-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {awards.map((award, i) => (
            <div
              key={i}
              className="flex items-center gap-3 border border-surface-variant bg-surface-container-low px-md py-4"
            >
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
          ))}
        </div>
      </section>

      {/* ===== DOWNLOAD CV ===== */}
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
    </main>
  );
}

export default About;
