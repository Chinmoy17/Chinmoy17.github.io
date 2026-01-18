import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Particle from "../Particle";
import resumeData from "../../data/resume.json";
import { 
  SiPython, SiCplusplus, SiC, SiTypescript, SiPostgresql, 
  SiMicrosoftazure, SiDocker, SiKubernetes, SiGit, 
  SiFastapi, SiReact, SiNodedotjs, 
  SiPytorch, SiTensorflow, SiScikitlearn, SiOpencv,
  SiLatex, SiLinux, SiPostman, SiVisualstudiocode
} from "react-icons/si";
import { FaDatabase, FaCloud, FaCode, FaBrain, FaTools, FaServer } from "react-icons/fa";

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
  const skillGroups = resumeData.skills.groups;

  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <h1 className="project-heading" style={{ marginBottom: "50px" }}>
          Technical <strong className="purple">Proficiency</strong>
        </h1>
        
        <Row style={{ justifyContent: "center", gap: "20px" }}>
          {skillGroups.map((group, idx) => (
            <Col xs={12} md={12} lg={5} key={idx} className="mb-4">
              <Card className="project-card-view" style={{ height: "100%", padding: "10px" }}>
                <Card.Body>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid var(--glass-border)", paddingBottom: "10px" }}>
                    <span style={{ fontSize: "1.5em", color: "var(--color-accent)", marginRight: "10px" }}>
                      {getCategoryIcon(group.name)}
                    </span>
                    <h3 style={{ margin: 0, fontSize: "1.4em", fontWeight: "600" }}>
                      {group.name}
                    </h3>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                    {group.items.map((skill, i) => (
                      <div 
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          background: "rgba(39, 76, 119, 0.1)",
                          border: "1px solid rgba(39, 76, 119, 0.2)",
                          borderRadius: "8px",
                          padding: "8px 12px",
                          transition: "all 0.3s ease",
                          cursor: "default"
                        }}
                        className="skill-pill"
                      >
                        <span style={{ fontSize: "1.2em", marginRight: "8px", display: "flex" }}>
                          {getIcon(skill)}
                        </span>
                        <span style={{ fontWeight: "500", fontSize: "0.95em" }}>{skill}</span>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Skills;
