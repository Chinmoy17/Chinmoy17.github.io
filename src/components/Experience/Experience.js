import React, { useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import Particle from "../Particle";
import { FaBriefcase, FaFlask, FaLaptopCode, FaChevronDown, FaChevronUp, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { MdWork, MdSchool } from "react-icons/md";
import "./Experience.css";

// Import company logos locally
import dexianLogo from "../../Assets/CompanyLogos/dexian.jpeg";
import waltonLogo from "../../Assets/CompanyLogos/walton.png";
import outlierLogo from "../../Assets/CompanyLogos/outlier.jpeg";

// Company logos mapping
const companyLogos = {
  "Dexian Bangladesh": dexianLogo,
  "Walton Hi‑Tech Industries": waltonLogo,
  "Outlier": outlierLogo,
  "Young Learner's Research Lab": null // Will use icon instead
};

// Tech stacks for each company
const techStacks = {
  "Dexian Bangladesh": ["Python", "FastAPI", "LangChain", "Azure", "React", "DSPy", "Docker", "PostgreSQL"],
  "Walton Hi‑Tech Industries": ["Python", "LangChain", "RAG", "FastAPI", "Vector DB"],
  "Outlier": ["Python", "Swift", "LLMs", "Prompt Engineering"],
  "Young Learner's Research Lab": ["PyTorch", "LLaMA", "LoRA", "Hugging Face", "NLP"]
};

// Role type config
const roleTypeConfig = {
  "Onsite": { color: "#28a745", icon: <MdWork /> },
  "Remote": { color: "#17a2b8", icon: <FaLaptopCode /> },
  "Non‑paid": { color: "#6f42c1", icon: <FaFlask /> },
  "Hybrid": { color: "#fd7e14", icon: <FaBriefcase /> }
};

const experiences = [
  {
    company: "Dexian Bangladesh",
    role: "Application Developer: AI/ML",
    type: "Onsite",
    location: "Dhaka, Bangladesh",
    start: "2025-10-15",
    end: null,
    summary: "Build and ship agentic AI and evaluation-driven LLM systems for enterprise workflows, with an emphasis on reliability, measurable quality, and production readiness.",
    impact: "Powering AI automation for 600+ Account Managers",
    highlights: [
      "Developed AI/ML-powered solutions across multiple products, including **Note2Action** — an automation system predicting next actions for **600+ Account Managers**.",
      "Built **DemoFactory** — an AI-driven platform that generates and deploys customizable applications from user queries (internal/SSO).",
      "Designed **agentic workflows** and **RAG pipelines** with a strong focus on correctness, controllability, and real-world usability.",
      "Implemented **evaluation-driven iteration** for prompts and LLM behaviors (test sets, rubrics, regressions) to improve quality before rollout.",
      "Developed end-to-end data and model pipelines: data preparation, training/experimentation, deployment integration, and automation workflows.",
      "Partnered with stakeholders to translate ambiguous business needs into clear problem statements, measurable acceptance criteria, and usable UX flows.",
      "Produced clear technical documentation and handoff notes to support maintainability, onboarding, and cross-team collaboration."
    ]
  },
  {
    company: "Walton Hi‑Tech Industries",
    role: "AI Intern",
    type: "Onsite",
    location: "Gazipur, Bangladesh",
    start: "2025-08-01",
    end: "2025-10-09",
    summary: "Contributed to enterprise-scale RAG systems for Bangladesh's largest electronics manufacturer.",
    impact: "Built RAG chatbot serving multiple business functions",
    highlights: [
      "Contributed to a comprehensive **RAG-based chatbot** for customer support, order processing, HRMS, product search, and warranty claims.",
      "Supported end‑to‑end components (retrieval, orchestration, evaluation) to improve internal productivity."
    ]
  },
  {
    company: "Outlier",
    role: "AI Contributor",
    type: "Remote",
    location: "San Francisco, CA (Remote)",
    start: "2024-03-01",
    end: "2025-07-31",
    summary: "Enhanced LLM capabilities through high-quality training data and prompt engineering.",
    impact: "Improved LLM code generation & summarization quality",
    highlights: [
      "Designed **high‑quality prompts and responses** to improve LLM performance in code generation, refactoring, and summarization.",
      "Assisted in fine‑tuning workflows via curated datasets and output evaluation.",
      "Contributed across **Swift and Python** code contexts; supported audio training pipelines for LLMs."
    ]
  },
  {
    company: "Young Learner's Research Lab",
    role: "Research Assistant",
    type: "Non‑paid",
    location: "Remote",
    start: "2024-11-01",
    end: "2025-02-28",
    summary: "Conducted research on abstractive summarization using state-of-the-art LLMs.",
    impact: "Fine-tuned LLMs for text summarization research",
    highlights: [
      "Collaborated on **abstractive summarization** using LLaMA, DeepSeek, and Mixtral.",
      "Fine‑tuned transformer models on **CNN/DailyMail and XSum** using LoRA.",
      "Evaluated with **ROUGE and BERTScore** to measure summary quality and relevance."
    ]
  }
];

function ExperienceCard({ exp, index }) {
  const [expanded, setExpanded] = useState(false); // Collapsed by default
  const isCurrentRole = exp.end === null;
  const logo = companyLogos[exp.company];
  const techStack = techStacks[exp.company] || [];
  const roleConfig = roleTypeConfig[exp.type] || roleTypeConfig["Onsite"];

  const formatDate = (dateStr) => {
    if (!dateStr) return "Present";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years > 0 && remainingMonths > 0) return `${years}y ${remainingMonths}m`;
    if (years > 0) return `${years}y`;
    return `${months}m`;
  };

  // Parse highlight text for bold markers
  const parseHighlight = (text) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) => 
      i % 2 === 1 ? <strong key={i} className="highlight-bold">{part}</strong> : part
    );
  };

  return (
    <div className={`experience-card ${isCurrentRole ? 'current-role' : ''}`}>
      {/* Timeline connector */}
      <div className="timeline-connector">
        <div className={`timeline-dot ${isCurrentRole ? 'current' : ''}`}>
          {isCurrentRole && <span className="pulse-ring"></span>}
        </div>
        {index < experiences.length - 1 && <div className="timeline-line"></div>}
      </div>

      {/* Card Content */}
      <div className="experience-content">
        {/* Header */}
        <div className="experience-header">
          <div className="company-logo-wrapper">
            {logo ? (
              <img src={logo} alt={exp.company} className="company-logo" />
            ) : (
              <div className="company-logo-placeholder">
                <MdSchool />
              </div>
            )}
          </div>
          
          <div className="experience-title-section">
            <div className="experience-title-row">
              <h3 className="experience-role">{exp.role}</h3>
              {isCurrentRole && (
                <Badge className="current-badge">Currently Working</Badge>
              )}
            </div>
            <h4 className="experience-company">{exp.company}</h4>
            
            <div className="experience-meta">
              <span className="meta-item">
                <FaCalendarAlt />
                {formatDate(exp.start)} — {formatDate(exp.end)}
                <span className="duration">({calculateDuration(exp.start, exp.end)})</span>
              </span>
              {exp.location && (
                <span className="meta-item">
                  <FaMapMarkerAlt />
                  {exp.location}
                </span>
              )}
              <Badge 
                className="type-badge" 
                style={{ backgroundColor: roleConfig.color }}
              >
                {roleConfig.icon} {exp.type}
              </Badge>
            </div>
          </div>
        </div>

        {/* Impact Statement */}
        {exp.impact && (
          <div className="impact-statement">
            <span className="impact-icon">⚡</span>
            {exp.impact}
          </div>
        )}

        {/* Summary */}
        {exp.summary && (
          <p className="experience-summary">{exp.summary}</p>
        )}

        {/* Tech Stack */}
        {techStack.length > 0 && (
          <div className="tech-stack">
            {techStack.map((tech, i) => (
              <span key={i} className="tech-badge">{tech}</span>
            ))}
          </div>
        )}

        {/* Highlights - Collapsible */}
        <div className="highlights-section">
          <button 
            className="highlights-toggle"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>Hide Details <FaChevronUp /></>
            ) : (
              <>Show {exp.highlights.length} Key Achievements <FaChevronDown /></>
            )}
          </button>
          
          {expanded && (
            <ul className="highlights-list">
              {exp.highlights.map((highlight, i) => (
                <li key={i}>{parseHighlight(highlight)}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function Experience() {
  // Calculate total experience
  const calculateTotalExperience = () => {
    let totalMonths = 0;
    experiences.forEach(exp => {
      const startDate = new Date(exp.start);
      const endDate = exp.end ? new Date(exp.end) : new Date();
      totalMonths += (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    });
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    return years > 0 ? `${years}+ years` : `${months} months`;
  };

  return (
    <Container fluid className="experience-section">
      <Particle />
      <Container>
        <Row className="experience-header-row">
          <Col md={12}>
            <h1 className="experience-page-title">
              Professional <strong className="purple">Experience</strong>
            </h1>
            <p className="experience-subtitle">
              {calculateTotalExperience()} of hands-on experience in <strong className="purple">AI/ML Engineering</strong>, 
              {" "}<strong className="purple">Full-Stack Development</strong>, and <strong className="purple">Research</strong>.
            </p>
            
            {/* Experience Summary Stats */}
            <div className="experience-stats">
              <div className="stat-item">
                <span className="stat-number">{experiences.length}</span>
                <span className="stat-label">Roles</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{experiences.filter(e => e.type === "Onsite").length}</span>
                <span className="stat-label">Full-Time</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{experiences.filter(e => e.type === "Remote").length}</span>
                <span className="stat-label">Remote</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{experiences.filter(e => e.type === "Non‑paid").length}</span>
                <span className="stat-label">Research</span>
              </div>
            </div>
          </Col>
        </Row>

        {/* Timeline */}
        <div className="experience-timeline">
          {experiences.map((exp, idx) => (
            <ExperienceCard key={idx} exp={exp} index={idx} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="experience-cta">
          <p>Interested in working together?</p>
          <a href="mailto:rudrochinmoy@gmail.com" className="cta-button">
            Get in Touch
          </a>
        </div>
      </Container>
    </Container>
  );
}

export default Experience;
