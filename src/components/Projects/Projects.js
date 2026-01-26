import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
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
  const projects = Array.isArray(resumeData.projects) ? [...resumeData.projects] : [];
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
          {projects.map((p) => (
            <Col md={4} className="project-card" key={p.id || p.slug || p.title}>
              <ProjectCard
                imgPath={getCoverForProject(p)}
                isBlog={false}
                title={p.title}
                description={p.summary}
                ghLink={p.visibility === "public" ? p.links?.repo : null}
                demoLink={p.visibility === "public" ? p.links?.demo : null}
                visibility={p.visibility}
                caseStudyLink={p.slug ? `/project/${p.slug}` : null}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
