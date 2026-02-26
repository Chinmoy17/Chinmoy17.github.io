/**
 * Research Registry
 * Maps research project slugs to their dedicated React components (lazy-loaded).
 * Research projects without a dedicated component will fall back to a generic detail view.
 */
import { lazy } from "react";

// Lazy-load dedicated research project components
const PaperRetractionAnalysis = lazy(() => import("./projects/PaperRetractionAnalysis"));
const LiverDiseasePrediction = lazy(() => import("./projects/LiverDiseasePrediction"));
const DSPyOptimization = lazy(() => import("./projects/DSPy"));

/**
 * Registry mapping slug → lazy component
 * Add new research projects here as they get dedicated components
 */
const researchRegistry = {
  "paper-retraction-analysis": PaperRetractionAnalysis,
  "liver-disease-prediction": LiverDiseasePrediction,
  "dspy-rag-optimization": DSPyOptimization,
  // "student-ai-usage": lazy(() => import("./projects/StudentAIUsage")),
};

/**
 * Check if a research project has a dedicated component
 * @param {string} slug - Research project slug
 * @returns {boolean}
 */
export function hasDedicatedResearchComponent(slug) {
  return slug in researchRegistry;
}

/**
 * Get the dedicated component for a research project
 * @param {string} slug - Research project slug
 * @returns {React.LazyExoticComponent | null}
 */
export function getResearchComponent(slug) {
  return researchRegistry[slug] || null;
}

export default researchRegistry;
