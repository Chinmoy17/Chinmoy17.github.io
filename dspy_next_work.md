# DSPy Research Project - Implementation Reference

This document captures the patterns, styles, and approach used for building academic-style research project pages. Use this as a reference for the upcoming DSPy project.

---

## Folder Structure Pattern

```
src/components/Research/
├── Research.js                      # Main listing page
├── ResearchDetail.js                # Router component for /research/:slug
├── researchRegistry.js              # Lazy-load registry
└── projects/
    └── [ProjectName]/
        ├── index.js                 # Main component
        ├── [ProjectName].module.css # CSS Module styles
        └── contents/                # Raw materials (notebooks, README, data)
            └── README.md
```

---

## Key Files to Update for New Project

1. **researchRegistry.js** - Add lazy import and registry entry
2. **resume.json** - Add project entry with `category: "research"`
3. **Create project folder** with index.js and CSS module

---

## Academic Paper Structure (Section Pattern)

```javascript
const sections = [
  { id: "abstract", title: "Abstract", number: "0" },
  { id: "introduction", title: "Introduction", number: "1" },
  { id: "research-questions", title: "Research Questions", number: "2" },
  { id: "dataset", title: "Dataset & Features", number: "3" },
  { id: "data-preparation", title: "Data Preparation", number: "4" },
  { id: "methodology", title: "Methodology", number: "5" },
  { id: "results", title: "Results & Analysis", number: "6" },
  { id: "discussion", title: "Discussion", number: "7" },
  { id: "conclusion", title: "Conclusion", number: "8" },
];
```

---

## Component Layout Structure

```jsx
<Container fluid className="project-section">
  <Particle />

  <div className={styles.pageWrapper}>
    {/* Left Sidebar - Table of Contents */}
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <Link to="/research" className={styles.backLink}>← Back to Research</Link>
        <nav className={styles.tocNav}>...</nav>
        <div className={styles.sidebarMeta}>...</div>
        <a href="GITHUB_LINK" className={styles.githubLink}>View on GitHub</a>
      </div>
    </aside>

    {/* Main Content */}
    <main className={styles.mainContent}>
      <header className={styles.paperHeader}>...</header>
      {/* Sections */}
      <section id="abstract" className={styles.section}>...</section>
      ...
    </main>
  </div>

  {/* Lightbox Modal */}
  {lightbox.open && createPortal(...)}
</Container>
```

---

## Visual Elements (NO CODE BLOCKS)

### 1. Pipeline Box (for Data Preparation / Workflows)

```jsx
<div className={styles.pipelineBox}>
  <div className={styles.pipelineSteps}>
    <div className={styles.pipelineStep}>
      <div className={styles.pipelineIcon}>1</div>
      <div className={styles.pipelineContent}>
        <div className={styles.pipelineStepTitle}>Step Title</div>
        <div className={styles.pipelineStepDesc}>
          Description with <code className={styles.inlineCode}>inline code</code> styling.
        </div>
      </div>
    </div>
    <div className={styles.pipelineArrow}>↓</div>
    {/* More steps... */}
  </div>
</div>
```

### 2. Algorithm Box (for Methodology / Technical Details)

```jsx
<div className={styles.algorithmBox}>
  <div className={styles.algorithmTitle}>Algorithm/Process Name</div>
  <ul className={styles.algorithmSteps}>
    <li><strong>Step Label:</strong> Description text</li>
    <li><strong>Step Label:</strong> More description</li>
  </ul>
</div>
```

### 3. Research Question Cards

```jsx
<div className={styles.researchQuestion}>
  <span className={styles.rqBadge}>RQ1</span>
  <div>
    <p className={styles.rqText}>The research question?</p>
    <p className={styles.rqRationale}>Rationale and context...</p>
  </div>
</div>
```

### 4. Data Tables

```jsx
<div className={styles.tableWrapper}>
  <table className={styles.dataTable}>
    <caption>Table X: Description</caption>
    <thead>
      <tr><th>Column</th><th>Column</th></tr>
    </thead>
    <tbody>
      <tr><td>Data</td><td>Data</td></tr>
      <tr className={styles.highlightRow}><td><strong>Best</strong></td><td>Value</td></tr>
    </tbody>
  </table>
</div>
```

### 5. Findings/Metrics Grid

```jsx
<div className={styles.findingsGrid}>
  <div className={styles.findingCard}>
    <span className={styles.findingValue}>99.47%</span>
    <span className={styles.findingLabel}>Best Accuracy</span>
  </div>
  {/* More cards... */}
</div>
```

### 6. Challenge/Feature Grid

```jsx
<div className={styles.challengeGrid}>
  <div className={styles.challengeCard}>
    <h4>Challenge Title</h4>
    <p>Description of the challenge...</p>
  </div>
</div>
```

### 7. Method Cards

```jsx
<div className={styles.methodCard}>
  <h4>Model/Method Name</h4>
  <p>
    <strong>Paradigm:</strong> Description<br/>
    <strong>Configuration:</strong> Details<br/>
    <strong>Rationale:</strong> Why chosen
  </p>
</div>
```

---

## CSS Key Classes Reference

```css
/* Layout */
.pageWrapper          /* Flex container */
.sidebar              /* Sticky left sidebar */
.mainContent          /* Main content area, max-width: 850px */

/* Header */
.paperHeader          /* Centered title area */
.paperTitle           /* Main title */
.paperAuthors         /* Author byline */
.paperKeywords        /* Keywords flex container */
.keyword              /* Individual keyword badge */

/* Sections */
.section              /* Each content section */
.sectionTitle         /* Section heading with number */
.sectionNumber        /* Numbered badge */
.subsectionTitle      /* Subsection heading */

/* Abstract */
.abstractBox          /* Left-bordered abstract container */
.abstractTitle        /* "ABSTRACT" label */
.abstractText         /* Abstract body */

/* Text */
.paragraph            /* Body text - text-align: left */
.inlineCode           /* Inline code styling */

/* Visual Boxes */
.pipelineBox          /* Pipeline container */
.pipelineStep         /* Individual step */
.pipelineIcon         /* Numbered circle */
.pipelineContent      /* Step content */
.pipelineStepTitle    /* Step title */
.pipelineStepDesc     /* Step description */
.pipelineArrow        /* Arrow between steps */

.algorithmBox         /* Algorithm container */
.algorithmTitle       /* Algorithm name */
.algorithmSteps       /* Numbered list */

/* Research Questions */
.researchQuestion     /* RQ card */
.rqBadge              /* RQ1, RQ2, etc. badge */
.rqText               /* Question text */
.rqRationale          /* Rationale italic text */

/* Tables */
.tableWrapper         /* Overflow container */
.dataTable            /* Table styling */
.highlightRow         /* Highlighted row */

/* Grids */
.findingsGrid         /* 4-column metrics grid */
.findingCard          /* Metric card */
.findingValue         /* Large metric number */
.findingLabel         /* Metric label */

.challengeGrid        /* 2-column challenge grid */
.challengeCard        /* Challenge card */

.featureGrid          /* Flex wrap for feature badges */
.featureItem          /* Individual feature badge */

/* Lightbox */
.lightboxOverlay      /* Full-screen overlay */
.lightboxContent      /* Image container */
.lightboxImage        /* The image */
.lightboxCaption      /* Image caption */
.lightboxClose        /* Close button */
```

---

## resume.json Entry Pattern

```json
{
  "id": "project-slug",
  "title": "Project Title",
  "slug": "project-slug",
  "category": "research",
  "visibility": "public",
  "summary": "Brief 2-3 sentence summary for card display.",
  "technologies": ["DSPy", "LLM", "RAG", "Python"],
  "metrics": [
    "Key metric 1",
    "Key metric 2",
    "Key metric 3"
  ],
  "links": {
    "repo": "https://github.com/..."
  }
}
```

---

## Registry Entry Pattern

```javascript
// In researchRegistry.js
const ProjectName = lazy(() => import("./projects/ProjectName"));

const researchRegistry = {
  "project-slug": ProjectName,
};
```

---

## Important Style Rules

1. **NO CODE BLOCKS** - Use visual pipeline/algorithm boxes instead
2. **text-align: left** - Explicit on all text content classes
3. **Theme colors** - Use CSS variables (--color-accent, --color-text, --color-border, --glass-bg, --glass-border)
4. **Accent color** - #274C77 (used in rgba variations)
5. **Responsive** - Media queries at 1100px, 768px, 480px breakpoints

---

## Assets Location

```
public/assets/research/[project-slug]/
├── figure1.png
├── figure2.png
└── ...
```

Reference in component:
```jsx
<img src="/assets/research/project-slug/figure1.png" alt="..." />
```

---

## DSPy Project Notes (To Be Filled)

**Project Type:** Industry-grade, deployed, secure

**Key Details (awaiting):**
- [ ] Project name/slug
- [ ] GitHub repo (if public)
- [ ] Key features/capabilities
- [ ] Architecture overview
- [ ] Performance metrics
- [ ] Deployment details
- [ ] Figures/visualizations available

**Security Considerations:**
- Project is described as "secure" - may need to omit sensitive details
- User will manage data and context
- May need to focus on high-level architecture vs. implementation details

---

## Checklist for New Project

- [ ] Create folder: `src/components/Research/projects/[ProjectName]/`
- [ ] Create `index.js` with academic structure
- [ ] Create `[ProjectName].module.css` (copy from existing, modify as needed)
- [ ] Update `researchRegistry.js` with lazy import
- [ ] Update `resume.json` with project entry
- [ ] Add assets to `public/assets/research/[project-slug]/`
- [ ] Test routing at `/research/[slug]`
- [ ] Verify sidebar navigation works
- [ ] Check responsive behavior
- [ ] Verify all text is left-aligned
