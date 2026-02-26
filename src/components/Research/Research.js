import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Particle from "../Particle";
import resumeData from "../../data/resume.json";
import { BsFileEarmarkPdf, BsGithub, BsArrowRight } from "react-icons/bs";

function Research() {
  // Safe check if publications exists
  const pubs = resumeData.publications || [];

  const researchProjects = Array.isArray(resumeData.projects)
    ? resumeData.projects.filter((p) => p.category === "research")
    : [];
  
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
        <p style={{ color: "var(--color-text)" }}>
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
                      {pub.venue} <span style={{ color: "var(--color-text)" }}>|</span> {pub.year}
                      {pub.notes && <span style={{ fontSize: "0.9em", color: "var(--color-text)", opacity: 0.7, marginLeft: "10px" }}>({pub.notes})</span>}
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

        {/* Research Projects / Case Studies - Academic Style (No Images) */}
        {researchProjects.length > 0 && (
          <Row style={{ justifyContent: "center", marginTop: "10px", paddingBottom: "10px" }}>
            <h2 className="project-heading" style={{ fontSize: "2.0em", textAlign: "left", paddingLeft: "15px", marginTop: "0px" }}>
              Research <strong className="purple">Projects</strong>
            </h2>
            <p style={{ color: "var(--color-text)", textAlign: "left", paddingLeft: "15px", marginTop: "-8px", fontSize: "1.05em" }}>
              In-depth case studies and analyses exploring NLP, computer vision, and machine learning.
            </p>

            {researchProjects.map((p, idx) => (
              <Col md={12} className="project-card" key={p.id || p.slug || p.title} style={{ marginBottom: "16px" }}>
                <Card className="project-card-view" style={{ textAlign: "left" }}>
                  <Card.Body style={{ padding: "24px 28px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                      <div style={{ flex: "1", minWidth: "280px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                          <span style={{
                            background: "var(--color-accent)",
                            color: "white",
                            padding: "4px 10px",
                            borderRadius: "4px",
                            fontSize: "0.8rem",
                            fontWeight: "600"
                          }}>
                            {idx + 1}
                          </span>
                          <Card.Title style={{ fontSize: "1.4em", fontWeight: "700", margin: 0, color: "var(--color-text)" }}>
                            {p.title}
                          </Card.Title>
                        </div>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "12px", marginBottom: "12px" }}>
                          {p.stack?.slice(0, 6).map((tech, i) => (
                            <span key={i} style={{
                              background: "rgba(39, 76, 119, 0.08)",
                              color: "var(--color-accent)",
                              padding: "3px 10px",
                              borderRadius: "4px",
                              fontSize: "0.8rem",
                              fontWeight: "500",
                              border: "1px solid rgba(39, 76, 119, 0.15)"
                            }}>
                              {tech}
                            </span>
                          ))}
                        </div>

                        <Card.Text style={{ fontSize: "1.02em", lineHeight: "1.65", color: "var(--color-text)", opacity: 0.85, marginBottom: "12px" }}>
                          {p.summary}
                        </Card.Text>

                        {/* Metrics badges - the hook! */}
                        {p.metrics && p.metrics.length > 0 && (
                          <div style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px",
                            marginTop: "14px",
                            paddingTop: "12px",
                            borderTop: "1px solid rgba(39, 76, 119, 0.15)"
                          }}>
                            {p.metrics.map((metric, i) => (
                              <span key={i} style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                background: "rgba(39, 76, 119, 0.06)",
                                color: "var(--color-text)",
                                padding: "5px 12px",
                                borderRadius: "6px",
                                fontSize: "0.85rem",
                                fontWeight: "600",
                                border: "1px solid rgba(39, 76, 119, 0.12)"
                              }}>
                                <span style={{ color: "var(--color-accent)", fontSize: "1.1em" }}>●</span>
                                {metric}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div style={{ display: "flex", gap: "10px", flexShrink: 0, alignSelf: "flex-start" }}>
                        {p.visibility === "public" && p.links?.repo && (
                          <Button
                            variant="outline-primary"
                            href={p.links.repo}
                            target="_blank"
                            style={{
                              borderColor: "var(--color-accent)",
                              color: "var(--color-accent)",
                              fontWeight: "500",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px"
                            }}
                          >
                            <BsGithub /> Code
                          </Button>
                        )}
                        {p.slug && (
                          <Link
                            to={`/research/${p.slug}`}
                            style={{
                              background: "var(--color-accent)",
                              color: "white",
                              padding: "8px 16px",
                              borderRadius: "6px",
                              textDecoration: "none",
                              fontWeight: "600",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              fontSize: "0.95rem"
                            }}
                          >
                            Read Paper <BsArrowRight />
                          </Link>
                        )}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Research Experience Section - moved to bottom */}
        {researchExp.length > 0 && (
          <Row style={{ justifyContent: "center", marginTop: "10px" }}>
            <h2 className="project-heading" style={{ fontSize: "2.0em", textAlign: "left", paddingLeft: "15px", marginTop: "0px" }}>
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
                      <Col md={3} style={{ textAlign: "right", color: "var(--color-text)", opacity: 0.8 }}>
                         <h5>{new Date(exp.start).toLocaleDateString("en-US", { year: "numeric", month: "long" })} - {exp.end ? new Date(exp.end).toLocaleDateString("en-US", { year: "numeric", month: "long" }) : "Present"}</h5>
                      </Col>
                    </Row>
                    <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
                      {exp.highlights.map((point, i) => (
                        <li key={i} style={{ marginBottom: "8px", fontSize: "1.05em" }}>
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
