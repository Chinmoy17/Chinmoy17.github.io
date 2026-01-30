import React from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Particle from "../Particle";
import resumeData from "../../data/resume.json";

import agentHero from "../../Assets/Projects/agent.jpg";
import blogHero from "../../Assets/Projects/blog.jpg";
import codeEditorHero from "../../Assets/Projects/codeEditor.png";
import cpuHero from "../../Assets/Projects/cpu.gif";

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ProjectDetail() {
  const { slug } = useParams();
  const project = (resumeData.projects || []).find((p) => p.slug === slug);

  const heroBySlug = {
    agentflow: agentHero,
    "blog-generator-llms": blogHero,
    "multilingual-pdf-chatbot-rag": codeEditorHero,
    "demofactory-dspy": cpuHero,
  };

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
  const atAGlance = caseStudy.atAGlance || {};
  const workflow = Array.isArray(caseStudy.workflow) ? caseStudy.workflow : [];
  const sections = Array.isArray(caseStudy.sections) ? caseStudy.sections : [];
  const images = Array.isArray(caseStudy.images) ? caseStudy.images : [];
  const tldr = caseStudy.tldr;
  const layout = caseStudy.layout || {};
  const variant = layout.variant || "blog";
  const showAside = layout.showAside ?? variant === "blog";
  const showToc = layout.showToc ?? true;

  const hero = caseStudy.hero || {};
  const heroSrc = hero.src || heroBySlug[project.slug];
  const heroAlt = hero.alt || "";
  const heroCaption = hero.caption;
  const nextUpdates = Array.isArray(caseStudy.nextUpdates)
    ? caseStudy.nextUpdates
    : [
        "Full workflow steps and architecture diagram",
        "Screenshots (redacted where necessary)",
        "Evaluation tables and comparison metrics (e.g., DSPy)",
      ];

  const toc = [];
  const pushToc = (title, id, enabled = true) => {
    if (!enabled) return;
    toc.push({ title, id });
  };

  const sectionId = (title, fallback) => `${slugify(slug)}-${slugify(title || fallback)}`;

  if (showToc) {
    pushToc("Summary", sectionId("Summary", "summary"), true);
    pushToc("Gallery", sectionId("Gallery", "gallery"), images.length > 0);
    pushToc("Workflow", sectionId("Workflow", "workflow"), workflow.length > 0);
    pushToc(
      "Approach",
      sectionId("Approach", "methods"),
      Array.isArray(caseStudy.methods) && caseStudy.methods.length > 0
    );
    pushToc(
      "Outcomes",
      sectionId("Outcomes", "results"),
      Array.isArray(caseStudy.results) && caseStudy.results.length > 0
    );
    sections.forEach((s, idx) =>
      pushToc(s.title || `Section ${idx + 1}`, sectionId(s.title || `section-${idx + 1}`, "section"), true)
    );
    pushToc(
      "Constraints",
      sectionId("Constraints", "constraints"),
      Array.isArray(caseStudy.constraints) && caseStudy.constraints.length > 0
    );
    pushToc("Next", sectionId("Next", "next"), nextUpdates.length > 0);
  }

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <header className="project-hero">
          <Link className="project-detail-back" to="/project">
            &lt; Back to Projects
          </Link>

          <h1 className="project-hero-title">{project.title}</h1>

          <div className="project-hero-meta">
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

          <p className="project-hero-summary">{project.summary}</p>

          {heroSrc ? (
            <figure className="project-hero-figure">
              <img className="project-hero-img" src={heroSrc} alt={heroAlt} loading="lazy" />
              {heroCaption ? <figcaption className="project-hero-caption">{heroCaption}</figcaption> : null}
            </figure>
          ) : null}

          {isPrivate ? (
            <div className="project-detail-note">
              This is an internal/company project. Source code and live deployment are not publicly shareable.
            </div>
          ) : null}
        </header>

        <Row className="project-article" style={{ marginTop: "18px" }}>
          <Col lg={showAside ? 8 : 12} style={{ marginTop: "12px" }}>
            <article className={`project-prose project-prose-${variant}`}>
              <section id={sectionId("Summary", "summary")}>
                <h2>Summary</h2>

                {tldr ? (
                  <div className="project-callout">
                    <div className="project-callout-title">TL;DR</div>
                    {Array.isArray(tldr) ? (
                      <ul>
                        {tldr.map((x, i) => (
                          <li key={i}>{x}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{tldr}</p>
                    )}
                  </div>
                ) : null}

                {atAGlance.scope ? <p>{atAGlance.scope}</p> : null}

                {!showAside && toc.length ? (
                  <div className="project-callout project-inline-toc">
                    <div className="project-callout-title">On this page</div>
                    <nav className="project-toc project-toc-inline">
                      {toc.map((t) => (
                        <a key={t.id} className="project-toc-link" href={`#${t.id}`}>
                          {t.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                ) : null}
              </section>

              {images.length ? (
                <section id={sectionId("Gallery", "gallery")}>
                  <h2>Gallery</h2>
                  <div className="project-detail-gallery">
                    {images.map((img, i) => (
                      <figure key={img.src || i} className="project-detail-figure">
                        <img
                          className="project-detail-img"
                          src={img.src}
                          alt={img.alt || ""}
                          loading="lazy"
                        />
                        {img.caption ? <figcaption className="project-detail-caption">{img.caption}</figcaption> : null}
                      </figure>
                    ))}
                  </div>
                </section>
              ) : null}

              {caseStudy.intro ? (
                <section id={sectionId("Intro", "intro")} style={{ marginTop: "18px" }}>
                  {caseStudy.intro.split('\\n').map((para, i) => (
                    <p key={i} style={{ marginBottom: para.trim() ? "14px" : "0" }}>{para}</p>
                  ))}
                </section>
              ) : null}

              {workflow.length ? (
                <section id={sectionId("Workflow", "workflow")}>
                  <h2>Workflow</h2>
                  <ol>
                    {workflow.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                </section>
              ) : null}

              {Array.isArray(caseStudy.methods) && caseStudy.methods.length ? (
                <section id={sectionId("Approach", "methods")}>
                  <h2>Approach</h2>
                  <ul>
                    {caseStudy.methods.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {Array.isArray(caseStudy.results) && caseStudy.results.length ? (
                <section id={sectionId("Outcomes", "results")}>
                  <h2>Outcomes</h2>
                  <ul>
                    {caseStudy.results.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {sections.map((section, idx) => (
                <section
                  key={`${section.title || "section"}-${idx}`}
                  id={sectionId(section.title || `section-${idx + 1}`, "section")}
                >
                  <h2>{section.title}</h2>
                  {section.image && (
                    <figure className="project-hero-figure" style={{ margin: "24px 0" }}>
                      <img className="project-hero-img" src={section.image} alt={section.imageAlt || ""} loading="lazy" />
                      {section.caption && <figcaption className="project-hero-caption">{section.caption}</figcaption>}
                    </figure>
                  )}
                  {section.content ? <p>{section.content}</p> : null}
                  {Array.isArray(section.steps) && section.steps.map((step, i) => (
                    <div key={i} className="project-step">
                      <div className="project-step-content">
                        {step.title && <h3 className="project-step-title">{step.title}</h3>}
                        {step.text && <p className="project-step-text">{step.text}</p>}
                      </div>
                      {step.image && (
                        <figure className="project-step-figure">
                          <img className="project-step-img" src={step.image} alt="" loading="lazy" />
                          {step.caption && <figcaption className="project-step-caption">{step.caption}</figcaption>}
                        </figure>
                      )}
                    </div>
                  ))}
                  {Array.isArray(section.bullets) && section.bullets.length ? (
                    <ul>
                      {section.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              {Array.isArray(caseStudy.constraints) && caseStudy.constraints.length ? (
                <section id={sectionId("Constraints", "constraints")}>
                  <h2>Constraints</h2>
                  <ul>
                    {caseStudy.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {nextUpdates.length ? (
                <section id={sectionId("Next", "next")}>
                  <h2>Next</h2>
                  <ul>
                    {nextUpdates.map((u, i) => (
                      <li key={i}>{u}</li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </article>
          </Col>

          {showAside ? (
            <Col lg={4} style={{ marginTop: "12px" }}>
            <aside className="project-aside">
              <div className="project-aside-card">
                <div className="project-aside-title">At a glance</div>
                <div className="project-detail-kv">
                  {atAGlance.role ? (
                    <div className="project-detail-kv-row">
                      <div className="project-detail-kv-key">Role</div>
                      <div className="project-detail-kv-val">{atAGlance.role}</div>
                    </div>
                  ) : null}
                  {atAGlance.stack ? (
                    <div className="project-detail-kv-row">
                      <div className="project-detail-kv-key">Stack</div>
                      <div className="project-detail-kv-val">{atAGlance.stack}</div>
                    </div>
                  ) : null}
                </div>
              </div>

              {toc.length ? (
                <div className="project-aside-card">
                  <div className="project-aside-title">On this page</div>
                  <nav className="project-toc">
                    {toc.map((t) => (
                      <a key={t.id} className="project-toc-link" href={`#${t.id}`}>
                        {t.title}
                      </a>
                    ))}
                  </nav>
                </div>
              ) : null}

              <div className="project-aside-card">
                <div className="project-aside-title">Links</div>
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
            </aside>
          </Col>
          ) : null}
        </Row>
      </Container>
    </Container>
  );
}

export default ProjectDetail;




