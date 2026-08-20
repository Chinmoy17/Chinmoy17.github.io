import React, { useState, useEffect } from "react";
import resumeData from "../../data/resume.json";
import { Reveal } from "../utils/Reveal";
import {
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
  "Outlier (Scale AI)": outlierLogo,
};

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
    role: "AI Engineer (on probation)",
    type: "Onsite",
    location: "Bashundhara R/A, Dhaka",
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
    company: "Outlier (Scale AI)",
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
    location: "Remote · RUET, Rajshahi",
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
      <div
        className={`hidden md:block absolute -left-[33px] top-[14px] w-4 h-px ${
          isCurrentRole ? "bg-ink" : "bg-surface-variant"
        }`}
      ></div>

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
          <span className="text-ink font-medium">{exp.company}</span>
          {exp.location && (
            <span className="flex items-center gap-1 text-[0.8rem] text-on-surface-variant/80">
              <FaMapMarkerAlt className="text-[0.6rem]" />
              {exp.location}
            </span>
          )}
          <span className="font-inter text-[0.8rem] text-on-surface-variant sm:hidden">
            {formatDate(exp.start)} — {formatDate(exp.end)}
          </span>
        </div>
      </header>

      <div className="pl-0 md:pl-5 md:border-l md:border-surface-variant pt-2">
        <p className="font-inter text-body-md text-ink/80 max-w-3xl leading-relaxed mb-4">
          {exp.summary}
        </p>

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

        {exp.highlights && exp.highlights.length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 font-inter text-[0.75rem] uppercase tracking-[0.08em] text-ink flex items-center gap-2 hover:gap-3 transition-all duration-300 bg-transparent border-none cursor-pointer p-0 group"
          >
            <span className="border-b border-ink/50 pb-px group-hover:border-ink transition-colors">
              {expanded ? "Hide" : "Contributions"}
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

        {expanded && exp.highlights && exp.highlights.length > 0 && (
          <ul className="mt-5 space-y-4 list-none pl-0 pb-2">
            {exp.highlights.map((h, i) => (
              <li
                key={i}
                className="font-inter text-body-md text-ink/80 pl-5 border-l-2 border-surface-variant leading-relaxed"
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

  const toc = [
    { id: "experience", label: "Experience"      },
    { id: "education",  label: "Education"       },
    { id: "beyond",    label: "Beyond Work"     },
    { id: "skills",     label: "Technical Stack" },
    { id: "awards",     label: "Awards"          },
  ];

  const [activeSection, setActiveSection] = useState("experience");

  useEffect(() => {
    const ids = toc.map(t => t.id);
    const handler = () => {
      const scrollY = window.scrollY + 140;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <main className="max-w-container mx-auto px-8 pt-10 pb-16">

      {/* Sidebar + Content Layout */}
      <div className="md:flex md:gap-8">

        {/* Sticky sidebar TOC */}
        <aside className="hidden md:block w-40 shrink-0 -ml-4">
          <div className="sticky top-24">
            <p className="font-inter text-[0.6rem] uppercase tracking-[0.14em] text-on-surface-variant/60 mb-4">
              Contents
            </p>
            <nav className="border-l border-surface-variant">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`block pl-4 py-1.5 font-inter text-[0.78rem] no-underline transition-colors duration-150 border-l -ml-px ${
                    activeSection === item.id
                      ? "border-ink text-ink"
                      : "border-transparent text-on-surface-variant/70 hover:text-ink"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main scrollable content */}
        <div className="flex-1 min-w-0">

          {/* ===== EXPERIENCE ===== */}
          <div id="experience">
            <Reveal>
              <div className="w-full h-px bg-surface-variant mb-md"></div>
            </Reveal>

            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-xl">
              <div className="md:col-span-3 sticky top-28 self-start">
                <Reveal>
                  <h2 className="font-newsreader text-[2.5rem] leading-[1.2] text-ink">
                    Experience
                  </h2>
                </Reveal>
              </div>

              <div className="md:col-span-9 relative pl-0 md:pl-8">
                <div className="hidden md:block absolute left-0 top-2 bottom-0 w-px bg-surface-variant"></div>
                {experiences.map((exp, index) => (
                  <Reveal key={index} delay={index * 100}>
                    <ExperienceEntry exp={exp} defaultExpanded={false} />
                  </Reveal>
                ))}
              </div>
            </section>
          </div>

          {/* ===== EDUCATION ===== */}
          <div id="education">
            <Reveal>
              <div className="w-full h-px bg-surface-variant mb-md"></div>
            </Reveal>

            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-xl">
              <div className="md:col-span-3 sticky top-28 self-start">
                <Reveal>
                  <h2 className="font-newsreader text-[2.5rem] leading-[1.2] text-ink">
                    Academic Foundations
                  </h2>
                </Reveal>
              </div>

              <div className="md:col-span-9 relative pl-0 md:pl-8">
                <div className="hidden md:block absolute left-0 top-2 bottom-0 w-px bg-surface-variant"></div>
                {education.map((edu, index) => (
                  <Reveal key={index} delay={index * 100}>
                    <article className="relative mb-20">
                      <div className="hidden md:block absolute -left-[33px] top-[14px] w-4 h-px bg-surface-variant"></div>

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
                          <span className="flex items-center gap-1 text-[0.8rem] text-on-surface-variant/80">
                              <FaMapMarkerAlt className="text-[0.6rem]" />
                              {edu.location}
                            </span>
                          )}
                          {(edu.cgpa || edu.gpa) && (
                            <span className="text-[0.8rem] text-on-surface-variant/80">
                              {edu.cgpa || `GPA: ${edu.gpa}`}
                            </span>
                          )}
                          <span className="font-inter text-[0.8rem] text-on-surface-variant sm:hidden">
                            {edu.date}
                          </span>
                        </div>
                      </header>

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
                              <p className="font-inter text-[0.8rem] text-on-surface-variant mt-1">
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
          </div>

          {/* ===== BEYOND THE WORK ===== */}
          <div id="beyond">
            <Reveal>
              <div className="w-full h-px bg-surface-variant mb-md"></div>
            </Reveal>

            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-xl">
              <div className="md:col-span-3 sticky top-28 self-start">
                <Reveal>
                  <h2 className="font-newsreader text-[2.5rem] leading-[1.2] text-ink">
                    Beyond the Work
                  </h2>
                  <p className="font-inter text-[0.9rem] text-on-surface-variant mt-3 leading-relaxed">
                    The parts of me that don&rsquo;t fit on a r&eacute;sum&eacute; but shape how I work.
                  </p>
                </Reveal>
              </div>

              <div className="md:col-span-9 space-y-10">
                <Reveal delay={100}>
                  <article className="border-t border-surface-variant pt-5">
                    <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-2">Competitive Programming</p>
                    <h3 className="font-newsreader text-[1.5rem] text-ink leading-snug mb-2">Fundamentals, kept sharp</h3>
                    <p className="font-inter text-body-md text-ink/80 leading-relaxed">
                      Algorithms are how I keep my problem-solving sharp. I&rsquo;ve worked through <span className="text-ink font-medium">350+ problems</span> across LeetCode and Codeforces, and I care most about the theory underneath them &mdash; data structures, algorithms, and clean reasoning, driven by C++.
                    </p>
                  </article>
                </Reveal>

                <Reveal delay={180}>
                  <article className="border-t border-surface-variant pt-5">
                    <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-2">Community &amp; Events</p>
                    <h3 className="font-newsreader text-[1.5rem] text-ink leading-snug mb-2">Building the room, not just the code</h3>
                    <p className="font-inter text-body-md text-ink/80 leading-relaxed">
                      As Joint Secretary of the Rajshahi City Association at RUET (2023&ndash;2024), I helped organize community events &mdash; Pitha festivals, inauguration ceremonies, and farewell programs.
                    </p>
                  </article>
                </Reveal>

                <Reveal delay={260}>
                  <article className="border-t border-surface-variant pt-5">
                    <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-2">Trekking</p>
                    <h3 className="font-newsreader text-[1.5rem] text-ink leading-snug mb-2">A mountain guy at heart</h3>
                    <p className="font-inter text-body-md text-ink/80 leading-relaxed">
                      When I step away from the screen, I head for the mountains. I&rsquo;ve completed the Annapurna Base Camp trek and explored the trails of Bandarban, Darjeeling, and Sikkim. The climb always resets how I think.
                    </p>
                  </article>
                </Reveal>
              </div>
            </section>
          </div>

          {/* ===== TECHNICAL STACK ===== */}
          <div id="skills">
            <Reveal>
              <div className="w-full h-px bg-surface-variant mb-md"></div>
            </Reveal>

            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-xl">
              <div className="md:col-span-3 sticky top-28 self-start">
                <Reveal>
                  <h2 className="font-newsreader text-[2.5rem] leading-[1.2] text-ink">
                    Technical Stack
                  </h2>
                </Reveal>
              </div>
              <div className="md:col-span-9">
                <Reveal delay={50}>
                  <p className="font-inter text-body-md text-ink/75 mb-12 max-w-2xl">
                    The tools I reach for, and what I use each one for.
                  </p>
                </Reveal>

                <div className="space-y-14">
                  <Reveal delay={100}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-4">
                        <h3 className="font-newsreader text-[1.4rem] font-medium text-ink leading-tight">
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

                  <Reveal delay={200}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-4">
                        <h3 className="font-newsreader text-[1.4rem] font-medium text-ink leading-tight">
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

                  <Reveal delay={300}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-4">
                        <h3 className="font-newsreader text-[1.4rem] font-medium text-ink leading-tight">
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

                  <Reveal delay={400}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-4">
                        <h3 className="font-newsreader text-[1.4rem] font-medium text-ink leading-tight">
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
          </div>

          {/* ===== AWARDS ===== */}
          <div id="awards">
            <Reveal>
              <div className="w-full h-px bg-surface-variant mb-md"></div>
            </Reveal>

            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-xl">
              <div className="md:col-span-3 sticky top-28 self-start">
                <Reveal>
                  <h2 className="font-newsreader text-[2.5rem] leading-[1.2] text-ink">
                    Awards
                  </h2>
                </Reveal>
              </div>
              <div className="md:col-span-9">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">

                  <Reveal delay={80}>
                    <div className="border-t border-surface-variant pt-4">
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
          </div>

          {/* ===== CTA ===== */}
          <Reveal>
            <div className="text-center py-10 border-t border-surface-variant">
              <p className="font-inter text-body-md text-on-surface-variant mb-4">
                Open to opportunities and collaboration.
              </p>
              <a
                href={resumeData.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink text-on-ink px-8 py-3 font-inter text-label-caps uppercase tracking-[0.1em] hover:bg-surface hover:text-ink border border-ink transition-colors duration-200 no-underline inline-block"
              >
                View LinkedIn Profile →
              </a>
            </div>
          </Reveal>

        </div>
      </div>
    </main>
  );
}

export default About;
