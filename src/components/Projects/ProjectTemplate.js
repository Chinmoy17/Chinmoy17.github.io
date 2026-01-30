import React from "react";
import { Container, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiExternalLink,
  FiGithub,
  FiMessageCircle,
  FiPlay,
  FiLock,
  FiCode,
  FiSearch,
} from "react-icons/fi";
import {
  SiDocker,
  SiFastapi,
  SiMicrosoftazure,
  SiOpenai,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import Particle from "../Particle";
import resumeData from "../../data/resume.json";

/**
 * ProjectTemplate
 * A reusable wrapper for dedicated project components.
 * Provides consistent header, layout structure, and LEFT sidebar.
 */
function ProjectTemplate({
  project,
  heroSection,
  toc = [],
  showAside = true,
  variant = "immersive",
  children,
}) {
  const isPrivate = project?.visibility && project.visibility !== "public";
  const navigate = useNavigate();

  const iconForStackItem = (value) => {
    const text = String(value || "");
    if (/azure/i.test(text)) return SiMicrosoftazure;
    if (/openai/i.test(text)) return SiOpenai;
    if (/fastapi/i.test(text)) return SiFastapi;
    if (/react/i.test(text)) return SiReact;
    if (/typescript/i.test(text)) return SiTypescript;
    if (/docker/i.test(text)) return SiDocker;
    if (/serper|search/i.test(text)) return FiSearch;
    return FiCode;
  };

  const handleBack = () => {
    // More reliable than a plain <Link> if something is intercepting clicks.
    navigate("/project");
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container className="project-container-wide">
        <div className="project-topbar">
          <button type="button" className="project-back-btn" onClick={handleBack}>
            <FiArrowLeft className="project-inline-icon" aria-hidden="true" />
            Back to Projects
          </button>

          <div className="project-topbar-actions">
            {project?.links?.demo ? (
              <a className="project-topbar-action" href={project.links.demo} target="_blank" rel="noreferrer">
                <FiPlay className="project-inline-icon" aria-hidden="true" />
                Live Demo
              </a>
            ) : null}
            {project?.links?.repo ? (
              <a className="project-topbar-action" href={project.links.repo} target="_blank" rel="noreferrer">
                <FiGithub className="project-inline-icon" aria-hidden="true" />
                Source
              </a>
            ) : null}
            <Link className="project-topbar-action" to="/project">
              <FiExternalLink className="project-inline-icon" aria-hidden="true" />
              All Projects
            </Link>
          </div>
        </div>

        <div className="project-layout">
          {/* LEFT Sidebar - Sticky, no internal scroll */}
          {showAside && (
            <aside className="project-sidebar-col">
              <div className="project-sidebar-left">
                {/* Table of Contents */}
                {toc.length > 0 && (
                  <div className="project-sidebar-card project-sidebar-toc-card">
                    <div className="project-sidebar-title">Contents</div>
                    <nav className="project-sidebar-toc">
                      {toc.map((t, index) => (
                        <a 
                          key={t.id} 
                          className="project-sidebar-toc-link" 
                          href={`#${t.id}`}
                        >
                          <span className="toc-number">{String(index + 1).padStart(2, '0')}</span>
                          <span className="toc-text">{t.title}</span>
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Quick Links */}
                <div className="project-sidebar-card project-sidebar-links-card">
                  <div className="project-sidebar-title">Quick Links</div>
                  {project?.links?.repo && (
                    <a className="project-sidebar-link" href={project.links.repo} target="_blank" rel="noreferrer">
                      <FiGithub className="project-inline-icon" aria-hidden="true" />
                      View Source
                    </a>
                  )}
                  {project?.links?.demo && (
                    <a className="project-sidebar-link" href={project.links.demo} target="_blank" rel="noreferrer">
                      <FiPlay className="project-inline-icon" aria-hidden="true" />
                      Live Demo
                    </a>
                  )}
                  <a className="project-sidebar-link" href={resumeData.links?.linkedin} target="_blank" rel="noreferrer">
                    <FiMessageCircle className="project-inline-icon" aria-hidden="true" />
                    Get in Touch
                  </a>
                </div>

                {/* Tech Stack - Compact */}
                <div className="project-sidebar-card project-sidebar-stack-card">
                  <div className="project-sidebar-title">Built With</div>
                  <div className="project-sidebar-tags">
                    {(project?.stack || []).slice(0, 8).map((t) => {
                      const Icon = iconForStackItem(t);
                      return (
                        <Badge key={t} className="project-sidebar-tag">
                          <Icon className="project-tag-icon" aria-hidden="true" />
                          {t}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {isPrivate && (
                  <div className="project-sidebar-notice">
                    <FiLock className="project-inline-icon" aria-hidden="true" />
                    Internal project
                  </div>
                )}
              </div>
            </aside>
          )}

          {/* Main Content - FULL WIDTH */}
          <main className="project-content-col">
            <article className={`project-content project-content-${variant}`}>
              {/* Custom hero section passed by component */}
              {heroSection}
              {children}
            </article>
          </main>
        </div>
      </Container>
    </Container>
  );
}

export default ProjectTemplate;
