import React from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Particle from "../Particle";
import resumeData from "../../data/resume.json";

function ProjectDetail() {
  const { slug } = useParams();
  const project = (resumeData.projects || []).find((p) => p.slug === slug);

  if (!project) {
    return (
      <Container fluid className="project-section">
        <Particle />
        <Container>
          <h1 className="project-heading">Project not found</h1>
          <p style={{ color: "var(--color-text)" }}>
            The project you’re looking for doesn’t exist (or the link is outdated).
          </p>
          <Link className="home-cta home-cta-primary" to="/project">
            Back to Projects
          </Link>
        </Container>
      </Container>
    );
  }

  const isPrivate = project.visibility && project.visibility !== "public";
  const caseStudy = project.caseStudy || {};

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <div className="project-detail-header">
          <Link className="project-detail-back" to="/project">
             Back to Projects
          </Link>

          <h1 className="project-heading" style={{ marginTop: "12px" }}>
            {project.title}
          </h1>

          <div className="project-detail-meta">
            {isPrivate ? (
              <Badge bg="secondary" className="project-visibility-badge">
                Private / SSO
              </Badge>
            ) : (
              <Badge bg="success" className="project-visibility-badge">
                Public
              </Badge>
            )}

            {(project.stack || []).slice(0, 6).map((t) => (
              <Badge key={t} bg="light" text="dark" className="project-tag">
                {t}
              </Badge>
            ))}
          </div>

          <p className="project-detail-summary">{project.summary}</p>

          {isPrivate ? (
            <div className="project-detail-note">
              This is an internal/company project. Source code and live deployment are not publicly shareable.
            </div>
          ) : null}
        </div>

        <Row style={{ marginTop: "18px" }}>
          <Col md={8} style={{ marginTop: "12px" }}>
            <div className="project-detail-card">
              <h2 className="project-detail-title">Problem statement</h2>
              <p className="project-detail-text">
                {caseStudy.problem || "Coming soon. I’ll document the problem context and constraints here."}
              </p>
            </div>

            <div className="project-detail-card">
              <h2 className="project-detail-title">Methods</h2>
              {Array.isArray(caseStudy.methods) && caseStudy.methods.length ? (
                <ul className="project-detail-list">
                  {caseStudy.methods.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              ) : (
                <p className="project-detail-text">
                  Coming soon. I’ll outline the architecture, workflow, and key design decisions.
                </p>
              )}
            </div>

            <div className="project-detail-card">
              <h2 className="project-detail-title">Results</h2>
              {Array.isArray(caseStudy.results) && caseStudy.results.length ? (
                <ul className="project-detail-list">
                  {caseStudy.results.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              ) : (
                <p className="project-detail-text">
                  Coming soon. I’ll include evaluation results, qualitative outcomes, and key learnings.
                </p>
              )}
            </div>

            {Array.isArray(caseStudy.constraints) && caseStudy.constraints.length ? (
              <div className="project-detail-card">
                <h2 className="project-detail-title">Constraints</h2>
                <ul className="project-detail-list">
                  {caseStudy.constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Col>

          <Col md={4} style={{ marginTop: "12px" }}>
            <div className="project-detail-card">
              <h2 className="project-detail-title">Links</h2>

              {project.links && project.links.repo ? (
                <a className="project-detail-link" href={project.links.repo} target="_blank" rel="noreferrer">
                  View source on GitHub
                </a>
              ) : (
                <div className="project-detail-muted">No public repository link available.</div>
              )}

              {project.links && project.links.demo ? (
                <a className="project-detail-link" href={project.links.demo} target="_blank" rel="noreferrer">
                  View live demo
                </a>
              ) : null}

              <div className="project-detail-muted" style={{ marginTop: "10px" }}>
                Want more details?
              </div>
              <a className="project-detail-link" href={resumeData.links?.linkedin} target="_blank" rel="noreferrer">
                Message me on LinkedIn
              </a>
            </div>

            <div className="project-detail-card">
              <h2 className="project-detail-title">Next updates</h2>
              <ul className="project-detail-list">
                <li>Full workflow steps and architecture diagram</li>
                <li>Screenshots (redacted where necessary)</li>
                <li>Evaluation tables and comparison metrics (e.g., DSPy)</li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ProjectDetail;
