import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaUniversity, FaCalendarAlt, FaMapMarkerAlt, FaAward } from "react-icons/fa";
import Particle from "../Particle";
import resumeData from "../../data/resume.json";

function Education() {
  const educationList = resumeData.education;

  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <h1 className="project-heading" style={{ marginBottom: "40px" }}>
          Academic <strong className="purple">Background</strong>
        </h1>
        <Row>
          {educationList.map((edu, index) => (
            <Col xs={12} className="mb-4" key={index}>
              <Card className="project-card-view" style={{ textAlign: "left", padding: "16px" }}>
                <Card.Body>
                  <Row className="align-items-center">
                    <Col lg={9} md={8}>
                      <h3 style={{ fontSize: "clamp(1.2em, 4vw, 1.8em)", fontWeight: "700", color: "var(--color-text)" }}>{edu.degree}</h3>
                      <h5 style={{ color: "var(--color-accent)", fontWeight: "600", marginTop: "10px" }}>
                        <FaUniversity style={{ marginBottom: "4px", marginRight: "8px" }} />
                        {edu.institution}
                      </h5>
                    </Col>
                    <Col lg={3} md={4} className="text-md-end mt-3 mt-md-0">
                      <div style={{ 
                        display: "inline-block",
                        background: "var(--color-accent)",
                        color: "#fff",
                        padding: "8px 16px",
                        borderRadius: "50px",
                        fontWeight: "500",
                        boxShadow: "0 4px 10px rgba(39, 76, 119, 0.3)"
                      }}>
                        <FaCalendarAlt style={{ marginBottom: "3px", marginRight: "8px" }} />
                        {edu.date}
                      </div>
                    </Col>
                  </Row>

                  <div style={{ marginTop: "15px", fontSize: "1.1em", fontWeight: "500", color: "var(--color-text)" }}>
                     {edu.location && (
                      <span style={{ marginRight: "25px", display: "inline-flex", alignItems: "center" }}>
                        <FaMapMarkerAlt style={{ marginRight: "8px", color: "var(--color-accent)" }} />
                        {edu.location}
                      </span>
                    )}
                    {edu.cgpa && (
                      <span style={{ display: "inline-flex", alignItems: "center" }}>
                        CGPA: <span style={{ color: "var(--color-accent)", fontWeight: "bold", marginLeft: "5px" }}>{edu.cgpa}</span>
                      </span>
                    )}
                    {edu.gpa && (
                      <span style={{ display: "inline-flex", alignItems: "center" }}>
                        GPA: <span style={{ color: "var(--color-accent)", fontWeight: "bold", marginLeft: "5px" }}>{edu.gpa}</span>
                      </span>
                    )}
                  </div>

                  {/* Thesis Section */}
                  {edu.thesis && (
                    <div style={{ 
                      marginTop: "25px", 
                      padding: "20px", 
                      background: "rgba(255, 255, 255, 0.5)", 
                      borderRadius: "12px", 
                      borderLeft: "5px solid var(--color-accent)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                    }}>
                      <h6 style={{ fontWeight: "700", color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.9em" }}>
                        Undergraduate Thesis
                      </h6>
                      <p style={{ margin: "8px 0", fontStyle: "italic", fontSize: "1.15em", color: "var(--color-text)", fontWeight: "500" }}>
                        "{edu.thesis.title}"
                      </p>
                      {edu.thesis.supervisor && (
                        <small style={{ display: "block", marginTop: "5px", color: "#666", fontWeight: "600" }}>
                          Supervisor: {edu.thesis.supervisor}
                        </small>
                      )}
                      {edu.thesis.link && (
                        <a 
                          href={edu.thesis.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-block",
                            marginTop: "12px",
                            fontSize: "0.85em",
                            color: "var(--color-accent)",
                            textDecoration: "none",
                            fontWeight: "700",
                            borderBottom: "2px solid var(--color-accent)"
                          }}
                        >
                          Read Thesis Book →
                        </a>
                      )}
                    </div>
                  )}

                  {/* Leadership Section */}
                  {edu.leadership && edu.leadership.length > 0 && (
                    <div style={{ marginTop: "20px" }}>
                       <h6 style={{ fontSize: "0.9em", textTransform: "uppercase", letterSpacing: "1px", color: "#666", fontWeight: "700" }}>
                         Leadership & Activities
                       </h6>
                       {edu.leadership.map((item, i) => (
                         <div key={i} style={{ marginTop: "8px", background: "rgba(39, 76, 119, 0.04)", padding: "12px", borderRadius: "8px" }}>
                           <span style={{ fontWeight: "700", color: "var(--color-accent)", display: "block" }}>{item.role}</span>
                           <span style={{ fontSize: "0.95em", color: "var(--color-text)" }}>{item.summary}</span>
                         </div>
                       ))}
                    </div>
                  )}

                  {/* Awards Section */}
                  {edu.awards && edu.awards.length > 0 && (
                     <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {edu.awards.map((award, i) => (
                           <span key={i} style={{ 
                             display: "inline-flex",
                             alignItems: "center",
                             background: "rgba(39, 76, 119, 0.08)",
                             color: "var(--color-accent)",
                             border: "1px solid rgba(39, 76, 119, 0.2)",
                             padding: "8px 16px",
                             borderRadius: "8px",
                             fontWeight: "600",
                             fontSize: "0.95em"
                           }}>
                              <FaAward style={{ marginRight: "8px", fontSize: "1.1em" }} /> {award}
                           </span>
                        ))}
                     </div>
                  )}

                  {/* Coursework */}
                  {edu.coursework && (
                    <div style={{ marginTop: "25px" }}>
                      <h6 style={{ 
                        fontSize: "0.9em", 
                        textTransform: "uppercase", 
                        letterSpacing: "1px", 
                        color: "#666",
                        marginBottom: "15px",
                        fontWeight: "700"
                      }}>
                        Key Coursework
                      </h6>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {edu.coursework.map((course, i) => (
                          <span 
                            key={i} 
                            style={{ 
                              background: "#fff",
                              border: "1px solid #e0e0e0",
                              color: "var(--color-text)",
                              padding: "6px 14px",
                              borderRadius: "20px",
                              fontSize: "0.9rem",
                              fontWeight: "500",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.03)"
                            }}
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
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
