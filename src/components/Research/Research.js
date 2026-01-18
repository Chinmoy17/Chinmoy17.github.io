import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Particle from "../Particle";
import resumeData from "../../data/resume.json";

function Research() {
  const pubs = resumeData.publications;
  const researchExp = resumeData.experience.filter(
    exp => exp.company === "Young Learner's Research Lab"
  );

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Research & <strong className="purple">Publications</strong>
        </h1>
        
        <h2 style={{ fontSize: "1.8em", paddingTop: "30px", paddingBottom: "20px" }}>
          Publications
        </h2>
        <Row style={{ justifyContent: "center" }}>
          {pubs.map((pub, idx) => (
            <Col md={10} className="project-card" key={idx}>
              <Card className="project-card-view">
                <Card.Body>
                  <Card.Title style={{ fontSize: "1.4em" }}>
                    {pub.title}
                  </Card.Title>
                  <Card.Subtitle style={{ color: "#a788dd", paddingTop: "10px" }}>
                    {pub.venue} {pub.year} {pub.notes && `• ${pub.notes}`}
                  </Card.Subtitle>
                  <Card.Text style={{ paddingTop: "15px", textAlign: "justify" }}>
                    {pub.summary}
                  </Card.Text>
                  {pub.scholarProfile && (
                    <Button 
                      variant="primary" 
                      href={pub.scholarProfile}
                      target="_blank"
                      style={{ marginTop: "10px" }}
                    >
                      View on Google Scholar
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {researchExp.length > 0 && (
          <>
            <h2 style={{ fontSize: "1.8em", paddingTop: "50px", paddingBottom: "20px" }}>
              Research Experience
            </h2>
            <Row style={{ justifyContent: "center" }}>
              {researchExp.map((exp, idx) => (
                <Col md={10} className="project-card" key={idx}>
                  <Card className="project-card-view">
                    <Card.Body>
                      <Card.Title>{exp.role} - {exp.company}</Card.Title>
                      <Card.Text style={{ fontSize: "0.9em", opacity: 0.8 }}>
                        {new Date(exp.start).toLocaleDateString("en-US", { 
                          year: "numeric", 
                          month: "short" 
                        })} - {exp.end ? new Date(exp.end).toLocaleDateString("en-US", { 
                          year: "numeric", 
                          month: "short" 
                        }) : "Present"}
                      </Card.Text>
                      <ul style={{ textAlign: "left", paddingLeft: "20px", paddingTop: "10px" }}>
                        {exp.highlights.map((point, i) => (
                          <li key={i} style={{ marginBottom: "8px" }}>{point}</li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </Container>
  );
}

export default Research;
