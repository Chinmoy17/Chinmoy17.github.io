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
        <p style={{ color: "white" }}>
          Here's where I've worked and what I've built.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {experiences.map((exp, idx) => (
            <Col md={10} className="project-card" key={idx}>
              <Card className="project-card-view">
                <Card.Body>
                  <Card.Title style={{ fontSize: "1.5em" }}>
                    {exp.role}
                  </Card.Title>
                  <Card.Subtitle className="mb-2" style={{ color: "#a788dd" }}>
                    {exp.company} • {exp.type}
                    {exp.location && ` • ${exp.location}`}
                  </Card.Subtitle>
                  <Card.Text style={{ fontSize: "0.9em", opacity: 0.8 }}>
                    {new Date(exp.start).toLocaleDateString("en-US", { 
                      year: "numeric", 
                      month: "short" 
                    })} - {exp.end ? new Date(exp.end).toLocaleDateString("en-US", { 
                      year: "numeric", 
                      month: "short" 
                    }) : "Present"}
                  </Card.Text>
                  <ul style={{ textAlign: "left", paddingLeft: "20px" }}>
                    {exp.highlights.map((point, i) => (
                      <li key={i} style={{ marginBottom: "10px" }}>{point}</li>
                    ))}
                  </ul>
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
