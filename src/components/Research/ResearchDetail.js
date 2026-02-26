import React, { Suspense } from "react";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Particle from "../Particle";
import { getResearchComponent, hasDedicatedResearchComponent } from "./researchRegistry";

/**
 * ResearchDetail Router
 * Checks if a research project has a dedicated component and renders it.
 * Falls back to a placeholder for projects without dedicated components.
 */
function ResearchDetail() {
  const { slug } = useParams();

  // Check if this research project has a dedicated component
  if (hasDedicatedResearchComponent(slug)) {
    const DedicatedComponent = getResearchComponent(slug);

    return (
      <Suspense fallback={<ResearchLoadingFallback />}>
        <DedicatedComponent />
      </Suspense>
    );
  }

  // Fall back to placeholder for research projects without dedicated components
  return <ResearchNotFound slug={slug} />;
}

/**
 * Loading fallback while lazy-loading dedicated research components
 */
function ResearchLoadingFallback() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <Link className="project-detail-back" to="/research">
          &lt; Back to Research
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
            <p style={{ marginTop: "16px", fontSize: "1.1em" }}>Loading research project...</p>
          </div>
        </div>
      </Container>
    </Container>
  );
}

/**
 * Fallback component when research project is not found
 */
function ResearchNotFound({ slug }) {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <Link className="project-detail-back" to="/research">
          &lt; Back to Research
        </Link>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          color: "var(--color-text)"
        }}>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "16px" }}>Research Project Not Found</h2>
            <p>The research project "{slug}" does not have a dedicated page yet.</p>
            <Link to="/research" style={{ color: "var(--color-accent)" }}>
              Return to Research
            </Link>
          </div>
        </div>
      </Container>
    </Container>
  );
}

export default ResearchDetail;
