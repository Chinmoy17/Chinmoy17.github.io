import React from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Particle from "../Particle";
import resumeData from "../../data/resume.json";

import agent from "../../Assets/Projects/agent.jpg";
import vowel from "../../Assets/Projects/vowel.jpg";
import blog from "../../Assets/Projects/blog.jpg";
import cpu from "../../Assets/Projects/cpu.gif";
import ap from "../../Assets/Projects/ap.gif";

const coverById = {
  agentflow: agent,
  "bangla-vowel": vowel,
  "blog-generator": blog,
  "custom-cpu": cpu,
  "ai-painter": ap,
};

function getCoverForProject(project) {
  return coverById[project.id] || agent;
}

function Projects() {
  const projects = Array.isArray(resumeData.projects)
    ? resumeData.projects.filter((p) => (p.category || "project") === "project")
    : [];
  projects.sort((a, b) => {
    const aFeatured = a.featured ? 1 : 0;
    const bFeatured = b.featured ? 1 : 0;
    if (aFeatured !== bFeatured) return bFeatured - aFeatured;
    return (a.title || "").localeCompare(b.title || "");
  });

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Projects & <strong className="purple">Case Studies</strong>
        </h1>
        <p style={{ color: "var(--color-text)" }}>
          Click any project to read a full case study (problem, methods, results). Public code links are shown only when available.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {projects.map((p) => {
            const isPrivate = p.visibility && p.visibility !== "public";
            const cover = getCoverForProject(p);
            const caseStudyLink = p.slug ? `/project/${p.slug}` : "/project";

            return (
              <Col md={12} className="project-card" key={p.id || p.slug || p.title} style={{ marginBottom: "20px" }}>
                <Card className="project-card-view" style={{ textAlign: "left" }}>
                  <Card.Body>
                    <Row>
                      <Col md={3} style={{ marginBottom: "12px" }}>
                        <img
                          src={cover}
                          alt={p.title}
                          style={{
                            width: "100%",
                            borderRadius: "12px",
                            border: "1px solid var(--color-border)",
                            boxShadow: "var(--shadow-1)",
                            objectFit: "cover",
                            maxHeight: "140px",
                          }}
                        />
                      </Col>

                      <Col md={7}>
                        <Card.Title style={{ fontSize: "1.6em", fontWeight: "bold" }}>{p.title}</Card.Title>

                        <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                          {isPrivate ? (
                            <Badge bg="secondary" style={{ borderRadius: "999px", padding: "6px 10px", fontWeight: 700 }}>
                              Private / SSO
                            </Badge>
                          ) : (
                            <Badge bg="success" style={{ borderRadius: "999px", padding: "6px 10px", fontWeight: 700 }}>
                              Public
                            </Badge>
                          )}

                          {(p.stack || []).slice(0, 6).map((t) => (
                            <Badge
                              key={t}
                              bg="light"
                              text="dark"
                              style={{ borderRadius: "999px", padding: "6px 10px", border: "1px solid var(--color-border)" }}
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>

                        <Card.Text style={{ marginTop: "12px", fontSize: "1.05em", lineHeight: 1.65 }}>
                          {p.summary}
                        </Card.Text>
                      </Col>

                      <Col md={2} style={{ textAlign: "right" }}>
                        <Button
                          as={Link}
                          to={caseStudyLink}
                          variant="primary"
                          className="viewbtn"
                          style={{ marginLeft: 0, width: "100%" }}
                        >
                          Explore Project →
                        </Button>

                        {!isPrivate && p.links?.repo ? (
                          <Button
                            variant="outline-primary"
                            href={p.links.repo}
                            target="_blank"
                            rel="noreferrer"
                            style={{ marginTop: "10px", width: "100%" }}
                          >
                            GitHub
                          </Button>
                        ) : null}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
