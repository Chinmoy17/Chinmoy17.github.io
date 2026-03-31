import React, { useState } from "react";
import { Container, Row, Col, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Particle from "../Particle";
import resumeData from "../../data/resume.json";
import { 
  SiPython, SiCplusplus, SiC, SiTypescript, SiPostgresql, 
  SiMicrosoftazure, SiDocker, SiKubernetes, SiGit, 
  SiFastapi, SiReact, SiNodedotjs, 
  SiPytorch, SiTensorflow, SiScikitlearn, SiOpencv,
  SiLatex, SiLinux, SiPostman, SiVisualstudiocode
} from "react-icons/si";
import { FaDatabase, FaCloud, FaCode, FaBrain, FaTools, FaServer, FaFilter } from "react-icons/fa";
import "./Skills.css";

// Skill usage context - maps skills to projects/experiences
const skillUsage = {
  "Python": { years: "3+", projects: ["AgentFlow", "PDF-ALAP", "Note2Action", "DemoFactory"], context: "Primary language for all AI/ML projects" },
  "FastAPI": { years: "2+", projects: ["AgentFlow", "PDF-ALAP", "DemoFactory"], context: "Production API development" },
  "LangChain": { years: "1+", projects: ["AgentFlow", "PDF-ALAP", "Walton RAG Chatbot"], context: "LLM orchestration and RAG pipelines" },
  "Azure": { years: "1+", projects: ["AgentFlow", "DemoFactory"], context: "Cloud deployment and OpenAI integration" },
  "React": { years: "2+", projects: ["Portfolio", "AgentFlow UI"], context: "Frontend development" },
  "DSPy": { years: "6 months", projects: ["DemoFactory", "AgentFlow"], context: "Prompt optimization and evaluation" },
  "Docker": { years: "2+", projects: ["AgentFlow", "PDF-ALAP"], context: "Containerization and deployment" },
  "PostgreSQL": { years: "2+", projects: ["AgentFlow", "Note2Action"], context: "Database design and management" },
  "PyTorch": { years: "2+", projects: ["Brain Tumor Classification", "Research Projects"], context: "Deep learning research" },
  "TensorFlow": { years: "1+", projects: ["Brain Tumor Classification"], context: "Transfer learning and CV" },
  "Hugging Face": { years: "1+", projects: ["Text Summarization Research", "Fine-tuning"], context: "LLM fine-tuning and NLP" },
  "OpenCV": { years: "2+", projects: ["Brain Tumor Classification", "Image Processing"], context: "Computer vision tasks" },
  "FAISS": { years: "1+", projects: ["PDF-ALAP", "AgentFlow"], context: "Vector search for RAG" },
  "ChromaDB": { years: "6 months", projects: ["AgentFlow"], context: "Vector database for embeddings" },
};

// Helper to map skill names to icons
const getIcon = (skillName) => {
  const lower = skillName.toLowerCase();
  
  if (lower.includes("python")) return <SiPython />;
  if (lower.includes("c++")) return <SiCplusplus />;
  if (lower === "c") return <SiC />;
  if (lower.includes("typescript")) return <SiTypescript />;
  if (lower.includes("sql") || lower.includes("postgres")) return <SiPostgresql />;
  
  if (lower.includes("azure")) return <SiMicrosoftazure />;
  if (lower.includes("docker")) return <SiDocker />;
  if (lower.includes("kubernetes")) return <SiKubernetes />;
  if (lower.includes("git")) return <SiGit />;
  
  if (lower.includes("fastapi")) return <SiFastapi />;
  if (lower.includes("react")) return <SiReact />;
  if (lower.includes("node")) return <SiNodedotjs />;
  
  if (lower.includes("pytorch")) return <SiPytorch />;
  if (lower.includes("tensorflow")) return <SiTensorflow />;
  if (lower.includes("scikit")) return <SiScikitlearn />;
  if (lower.includes("hugging")) return <span role="img" aria-label="hugging face">🤗</span>;
  if (lower.includes("opencv")) return <SiOpencv />;
  if (lower.includes("latex")) return <SiLatex />;
  if (lower.includes("linux")) return <SiLinux />;
  if (lower.includes("postman")) return <SiPostman />;
  if (lower.includes("vs code")) return <SiVisualstudiocode />;
  
  // Default fallbacks for categories or specific items without simple icons
  if (lower.includes("data")) return <FaDatabase />;
  return <FaCode />;
};

const getCategoryIcon = (categoryName) => {
  const lower = categoryName.toLowerCase();
  if (lower.includes("ml") || lower.includes("ai")) return <FaBrain />;
  if (lower.includes("cloud") || lower.includes("devops")) return <FaCloud />;
  if (lower.includes("backend") || lower.includes("web")) return <FaServer />;
  if (lower.includes("database")) return <FaDatabase />;
  if (lower.includes("tools")) return <FaTools />;
  return <FaCode />;
};

function Skills() {
  const navigate = useNavigate();
  const skillGroups = resumeData.skills.groups;
  const [activeFilter, setActiveFilter] = useState("All");

  // Get unique categories for filtering
  const categories = ["All", ...skillGroups.map(g => g.name)];

  // Filter skill groups based on active filter
  const filteredGroups = activeFilter === "All" 
    ? skillGroups 
    : skillGroups.filter(g => g.name === activeFilter);

  // Handle skill click - navigate to projects
  const handleSkillClick = (skillName) => {
    const usage = skillUsage[skillName];
    if (usage && usage.projects.length > 0) {
      // Navigate to projects page
      navigate('/project');
    }
  };

  // Create tooltip for skill
  const renderTooltip = (skillName) => {
    const usage = skillUsage[skillName];
    if (!usage) return null;

    return (
      <Tooltip id={`tooltip-${skillName}`} className="skill-tooltip">
        <div className="skill-tooltip-content">
          <strong>{skillName}</strong>
          <div className="skill-tooltip-years">{usage.years} years experience</div>
          <div className="skill-tooltip-context">{usage.context}</div>
          {usage.projects.length > 0 && (
            <div className="skill-tooltip-projects">
              <div className="skill-tooltip-projects-label">Used in:</div>
              {usage.projects.slice(0, 3).map((proj, i) => (
                <div key={i} className="skill-tooltip-project">• {proj}</div>
              ))}
              {usage.projects.length > 3 && (
                <div className="skill-tooltip-more">+ {usage.projects.length - 3} more</div>
              )}
            </div>
          )}
          <div className="skill-tooltip-action">Click to view projects →</div>
        </div>
      </Tooltip>
    );
  };

  return (
    <Container fluid className="about-section skills-section">
      <Particle />
      <Container>
        <h1 className="project-heading" style={{ marginBottom: "20px" }}>
          Technical <strong className="purple">Proficiency</strong>
        </h1>
        
        <p className="skills-subtitle">
          Tap or hover for details
        </p>

        {/* Filter Buttons */}
        <div className="skills-filter-container">
          <FaFilter className="filter-icon" />
          <div className="skills-filters">
            {categories.map((category, idx) => (
              <button
                key={idx}
                className={`skill-filter-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <Row style={{ justifyContent: "center", gap: "20px" }}>
          {filteredGroups.map((group, idx) => (
            <Col xs={12} md={12} lg={5} key={idx} className="mb-4">
              <Card className="project-card-view skill-category-card" style={{ height: "100%", padding: "10px" }}>
                <Card.Body>
                  <div className="skill-category-header">
                    <span className="skill-category-icon">
                      {getCategoryIcon(group.name)}
                    </span>
                    <h3 className="skill-category-title">
                      {group.name}
                    </h3>
                    <span className="skill-count-badge">{group.items.length}</span>
                  </div>

                  <div className="skills-grid">
                    {group.items.map((skill, i) => {
                      const hasUsage = skillUsage[skill];
                      const skillPill = (
                        <div 
                          key={i}
                          className={`skill-pill ${hasUsage ? 'skill-pill-clickable' : ''}`}
                          onClick={() => hasUsage && handleSkillClick(skill)}
                        >
                          <span className="skill-pill-icon">
                            {getIcon(skill)}
                          </span>
                          <span className="skill-pill-name">{skill}</span>
                          {hasUsage && (
                            <span className="skill-pill-indicator">
                              {skillUsage[skill].projects.length}
                            </span>
                          )}
                        </div>
                      );

                      // Wrap with tooltip if usage data exists
                      if (hasUsage) {
                        return (
                          <OverlayTrigger
                            key={i}
                            placement="top"
                            overlay={renderTooltip(skill)}
                            trigger={["hover", "focus", "click"]}
                            rootClose
                            delay={{ show: 200, hide: 100 }}
                          >
                            {skillPill}
                          </OverlayTrigger>
                        );
                      }

                      return skillPill;
                    })}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {activeFilter !== "All" && (
          <div className="skills-filter-info">
            Showing <strong>{filteredGroups.reduce((acc, g) => acc + g.items.length, 0)}</strong> skills in <strong>{activeFilter}</strong>
          </div>
        )}
      </Container>
    </Container>
  );
}

export default Skills;
