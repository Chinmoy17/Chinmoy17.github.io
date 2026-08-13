/**
 * Project Registry
 * Maps project slugs to their dedicated React components (lazy-loaded).
 * Projects without a dedicated component will fall back to GenericProjectDetail.
 */
import { lazy } from "react";

// Lazy-load dedicated project components
const RFPPlatformProject = lazy(() => import("./projects/RFPPlatform"));
const AgentFlowProject = lazy(() => import("./projects/AgentFlow"));
const PDFAlapProject = lazy(() => import("./projects/PDFAlap"));
const Note2ActionProject = lazy(() => import("./projects/Note2Action"));

/**
 * Registry mapping slug → lazy component
 * Add new projects here as they get dedicated components
 */
const projectRegistry = {
  "rfp-platform": RFPPlatformProject,
  agentflow: AgentFlowProject,
  "multilingual-pdf-chatbot-rag": PDFAlapProject,
  note2action: Note2ActionProject,
  // "blog-generator-llms": lazy(() => import("./projects/BlogGenerator")),
  // Add more as needed...
};

/**
 * Check if a project has a dedicated component
 * @param {string} slug - Project slug
 * @returns {boolean}
 */
export function hasDedicatedComponent(slug) {
  return slug in projectRegistry;
}

/**
 * Get the dedicated component for a project
 * @param {string} slug - Project slug
 * @returns {React.LazyExoticComponent | null}
 */
export function getProjectComponent(slug) {
  return projectRegistry[slug] || null;
}

export default projectRegistry;
