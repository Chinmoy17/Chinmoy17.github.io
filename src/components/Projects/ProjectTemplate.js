import React from "react";
import { Container, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
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
             Back to Projects
          </button>

          <div className="project-topbar-actions">
            {project?.links?.demo ? (
              <a className="project-topbar-action" href={project.links.demo} target="_blank" rel="noreferrer">
                Live Demo
              </a>
            ) : null}
            {project?.links?.repo ? (
              <a className="project-topbar-action" href={project.links.repo} target="_blank" rel="noreferrer">
                Source
              </a>
            ) : null}
            <Link className="project-topbar-action" to="/project">
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
                      <span className="link-icon">↗</span> View Source
                    </a>
                  )}
                  {project?.links?.demo && (
                    <a className="project-sidebar-link" href={project.links.demo} target="_blank" rel="noreferrer">
                      <span className="link-icon">▶</span> Live Demo
                    </a>
                  )}
                  <a className="project-sidebar-link" href={resumeData.links?.linkedin} target="_blank" rel="noreferrer">
                    <span className="link-icon">→</span> Get in Touch
                  </a>
                </div>

                {/* Tech Stack - Compact */}
                <div className="project-sidebar-card project-sidebar-stack-card">
                  <div className="project-sidebar-title">Built With</div>
                  <div className="project-sidebar-tags">
                    {(project?.stack || []).slice(0, 8).map((t) => (
                      <Badge key={t} className="project-sidebar-tag">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                {isPrivate && (
                  <div className="project-sidebar-notice">
                    🔒 Internal project
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
