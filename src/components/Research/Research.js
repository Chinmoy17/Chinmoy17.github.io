import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Particle from "../Particle";
import resumeData from "../../data/resume.json";
import { BsFileEarmarkPdf } from "react-icons/bs";

function Research() {
  // Safe check if publications exists
  const pubs = resumeData.publications || [];
  
  // Specific filter for the lab experience
  const researchExp = resumeData.experience.filter(
    exp => exp.company.includes("Research Lab") || exp.role.includes("Research")
  );

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Research <strong className="purple">Highlights</strong>
        </h1>
        <p style={{ color: "white" }}>
          Explorations in <strong className="purple">Machine Learning, NLP,</strong> and <strong className="purple">Computer Vision</strong>.
        </p>

        {/* Publications Section */}
        {pubs.length > 0 && (
          <Row style={{ justifyContent: "center", paddingBottom: "30px" }}>
            <h2 className="project-heading" style={{ fontSize: "2.0em", textAlign: "left", paddingLeft: "15px" }}>
              Selected <strong className="purple">Publications</strong>
            </h2>
            {pubs.map((pub, idx) => (
              <Col md={12} className="project-card" key={idx} style={{ marginBottom: "20px" }}>
                <Card className="project-card-view" style={{ textAlign: "left" }}>
                  <Card.Body>
                    <Card.Title style={{ fontSize: "1.6em", fontWeight: "bold" }}>
                      {pub.title}
                    </Card.Title>
                    <Card.Subtitle style={{ color: "var(--color-accent)", marginTop: "10px", fontSize: "1.1em" }}>
                      {pub.venue} <span style={{ color: "white" }}>|</span> {pub.year}
                      {pub.notes && <span style={{ fontSize: "0.9em", color: "#a5a5a5", marginLeft: "10px" }}>({pub.notes})</span>}
                    </Card.Subtitle>
                    <Card.Text style={{ marginTop: "15px", fontSize: "1.05em", lineHeight: "1.6" }}>
                      {pub.summary}
                    </Card.Text>
                    
                    <div style={{ marginTop: "15px" }}>
                      {pub.scholarProfile && (
                        <Button 
                          variant="primary" 
                          href={pub.scholarProfile}
                          target="_blank"
                          className="viewbtn"
                          style={{ marginLeft: "0", marginRight: "10px" }}
                        >
                          Google Scholar
                        </Button>
                      )}
                      {pub.link && (
                        <Button
                          variant="primary"
                          href={pub.link}
                          target="_blank"
                          className="viewbtn"
                        >
                          <BsFileEarmarkPdf /> Paper/Thesis
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Research Experience Section */}
        {researchExp.length > 0 && (
          <Row style={{ justifyContent: "center" }}>
            <h2 className="project-heading" style={{ fontSize: "2.0em", textAlign: "left", paddingLeft: "15px", marginTop: "20px" }}>
              Research <strong className="purple">Experience</strong>
            </h2>
            {researchExp.map((exp, idx) => (
              <Col md={12} className="project-card" key={idx} style={{ marginBottom: "20px" }}>
                <Card className="project-card-view" style={{ textAlign: "left" }}>
                  <Card.Body>
                    <Row>
                      <Col md={9}>
                        <Card.Title style={{ fontSize: "1.6em", fontWeight: "bold" }}>
                          {exp.role}
                        </Card.Title>
                        <Card.Subtitle style={{ color: "var(--color-accent)", fontSize: "1.2em", marginBottom: "10px" }}>
                          {exp.company}
                        </Card.Subtitle>
                      </Col>
                      <Col md={3} style={{ textAlign: "right", color: "#a5a5a5" }}>
                         <h5>{new Date(exp.start).toLocaleDateString("en-US", { year: "numeric", month: "long" })} - {exp.end ? new Date(exp.end).toLocaleDateString("en-US", { year: "numeric", month: "long" }) : "Present"}</h5>
                      </Col>
                    </Row>
                    <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
                      {exp.highlights.map((point, i) => (
                        <li key={i} style={{ marginBottom: "8px", fontSize: "1.05em", color: "rgba(255, 255, 255, 0.9)" }}>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </Container>
  );
}

export default Research;
