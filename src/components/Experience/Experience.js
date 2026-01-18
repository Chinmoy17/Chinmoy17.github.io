import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Particle from "../Particle";
import resumeData from "../../data/resume.json";

function Experience() {
  const experiences = resumeData.experience;

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Professional <strong className="purple">Experience</strong>
        </h1>
        <p style={{ color: "var(--color-text)" }}>
          My professional journey in <strong className="purple">Software Engineering</strong> and <strong className="purple">Research</strong>.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {experiences.map((exp, idx) => (
            <Col md={12} className="project-card" key={idx} style={{ marginBottom: "20px" }}>
              <Card className="project-card-view" style={{ textAlign: "left" }}>
                <Card.Body>
                  <Row>
                    <Col md={9}>
                      <Card.Title style={{ fontSize: "1.7em", fontWeight: "bold" }}>
                        {exp.role}
                      </Card.Title>
                      <Card.Subtitle className="mb-2" style={{ color: "var(--color-accent)", fontSize: "1.2em" }}>
                        {exp.company}
                      </Card.Subtitle>
                    </Col>
                    <Col md={3} style={{ textAlign: "right", color: "var(--color-text)", opacity: 0.8 }}>
                      <h5>{new Date(exp.start).toLocaleDateString("en-US", { year: "numeric", month: "long" })} - {exp.end ? new Date(exp.end).toLocaleDateString("en-US", { year: "numeric", month: "long" }) : "Present"}</h5>
                      <p style={{ fontStyle: "italic" }}>{exp.location} ({exp.type})</p>
                    </Col>
                  </Row>
                  
                  <div style={{ marginTop: "15px" }}>
                    <ul style={{ paddingLeft: "20px" }}>
                      {exp.highlights.map((point, i) => (
                        <li key={i} style={{ marginBottom: "8px", fontSize: "1.05em" }}>
                          {point}
                        </li>
                      ))}
                    </ul>
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

export default Experience;
