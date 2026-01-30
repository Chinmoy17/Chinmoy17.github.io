import React, { Suspense } from "react";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Particle from "../Particle";
import { getProjectComponent, hasDedicatedComponent } from "./projectRegistry";
import GenericProjectDetail from "./GenericProjectDetail";

/**
 * ProjectDetail Router
 * Checks if a project has a dedicated component and renders it.
 * Falls back to GenericProjectDetail for projects without dedicated components.
 */
function ProjectDetail() {
  const { slug } = useParams();

  // Check if this project has a dedicated component
  if (hasDedicatedComponent(slug)) {
    const DedicatedComponent = getProjectComponent(slug);
    
    return (
      <Suspense fallback={<ProjectLoadingFallback />}>
        <DedicatedComponent />
      </Suspense>
    );
  }

  // Fall back to generic renderer for projects without dedicated components
  return <GenericProjectDetail slug={slug} />;
}

/**
 * Loading fallback while lazy-loading dedicated project components
 */
function ProjectLoadingFallback() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <Link className="project-detail-back" to="/project">
          &lt; Back to Projects
        </Link>
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          minHeight: "50vh",
          color: "var(--color-text)"
        }}>
          <div style={{ textAlign: "center" }}>
            <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p style={{ marginTop: "16px", fontSize: "1.1em" }}>Loading project...</p>
          </div>
        </div>
      </Container>
    </Container>
  );
}

export default ProjectDetail;




