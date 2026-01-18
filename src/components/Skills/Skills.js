import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import resumeData from "../../data/resume.json";

function Skills() {
  const skillGroups = resumeData.skills.groups;

  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
          Technical <strong className="purple">Skillset</strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
          {skillGroups.map((group, idx) => (
            <Col xs={12} md={6} lg={4} className="tech-icons" key={idx}>
              <h3 style={{ 
                fontSize: "1.3em", 
                paddingBottom: "15px",
                color: "#a788dd" 
              }}>
                {group.name}
              </h3>
              <ul style={{ 
                listStyle: "none", 
                padding: 0,
                textAlign: "left"
              }}>
                {group.items.map((skill, i) => (
                  <li key={i} style={{ 
                    padding: "8px 0",
                    fontSize: "1.05em",
                    borderBottom: "1px solid rgba(255,255,255,0.1)"
                  }}>
                    • {skill}
                  </li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Skills;
