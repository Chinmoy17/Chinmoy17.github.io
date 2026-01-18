import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Particle from "../Particle";
import resumeData from "../../data/resume.json";

function Education() {
  const educationList = resumeData.education;

  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Academic <strong className="purple">Background</strong>
        </h1>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          {educationList.map((edu, index) => (
            <Col md={10} style={{ paddingTop: "30px", paddingBottom: "30px" }} key={index}>
              <Card className="quote-card-view">
                <Card.Body>
                  <h3 style={{ marginBottom: "15px" }}>{edu.degree}</h3>
                  <h5 style={{ color: "#a788dd", marginBottom: "10px" }}>
                    {edu.institution}
                  </h5>
                  {edu.location && (
                    <p style={{ fontSize: "0.95em", opacity: 0.85 }}>
                      📍 {edu.location}
                    </p>
                  )}
                  {edu.cgpa && (
                    <p style={{ fontSize: "1em", fontWeight: "500" }}>
                      CGPA: {edu.cgpa}
                    </p>
                  )}
                  {edu.gpa && (
                    <p style={{ fontSize: "1em", fontWeight: "500" }}>
                      GPA: {edu.gpa}
                    </p>
                  )}
                  {edu.coursework && (
                    <>
                      <h6 style={{ marginTop: "20px", marginBottom: "10px" }}>
                        Relevant Coursework:
                      </h6>
                      <ul style={{ textAlign: "left", paddingLeft: "25px" }}>
                        {edu.coursework.map((course, i) => (
                          <li key={i}>{course}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Education;
