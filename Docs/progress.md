# Portfolio Project Progress & Context

## Project Overview
Personal portfolio website for Chinmoy Mitra showcasing projects, skills, resume, and travel blogs. Built with React.js and deployed as a static site.

**Tech Stack:**
- React 17.0.2
- React-Bootstrap 2.10.10
- React Router DOM 6.30.1
- Typewriter Effect, Particles, GitHub Calendar
- React Icons, Parallax Tilt
- React-PDF for resume display

## Project Structure

```
Chinmoy17.github.io/
├── public/
│   ├── index.html          # Entry HTML
│   ├── manifest.json       # PWA manifest
│   └── robots.txt
│
├── src/
│   ├── App.js              # Main app with routing
│   ├── App.css             # App-level styles
│   ├── index.js            # React entry point
│   ├── style.css           # Global styles
│   │
│   ├── Assets/
│   │   ├── Projects/       # Project images
│   │   └── Travel/         # Travel blog images
│   │
│   └── components/
│       ├── Navbar.js       # Navigation bar
│       ├── Footer.js       # Footer component
│       ├── Particle.js     # Background particles
│       ├── Pre.js          # Preloader
│       ├── ScrollToTop.js  # Scroll utility
│       │
│       ├── Home/
│       │   ├── Home.js     # Landing page
│       │   ├── Home2.js    # Second section
│       │   └── Type.js     # Typewriter effect
│       │
│       ├── About/
│       │   ├── About.js    # About page
│       │   ├── AboutCard.js
│       │   ├── Github.js   # GitHub calendar
│       │   ├── Techstack.js
│       │   └── Toolstack.js
│       │
│       ├── Projects/
│       │   ├── Projects.js
│       │   ├── ProjectCards.js
│       │   └── ProjectCards.css
│       │
│       ├── Resume/
│       │   └── ResumeNew.js
│       │
│       └── TravelBlog/
│           ├── TravelBlog.js
│           ├── TravelBlogCard.js
│           ├── TravelBlogDetail.js
│           └── blogs.js    # Blog data
│
├── static/                 # Build output
├── package.json
└── README.md
```

## Routes Structure
- `/` - Home page with intro and typewriter effect
- `/about` - About section with tech stack
- `/project` - Project showcase
- `/resume` - Resume display
- `/travelblog` - Travel blog listing
- `/blog/:id` - Individual blog details

## Current Features
1. **Multi-page SPA** with React Router
2. **Responsive design** using React-Bootstrap
3. **Animated elements** - particles, typewriter, parallax
4. **Project showcase** with GitHub links
5. **Travel blog** with image galleries
6. **Resume viewer** with PDF support
7. **GitHub contribution calendar**

## Development Phases

### Phase 1: Modernization & Academic Transformation ⏳
Convert from flashy/gimmicky design to clean, professional academic style
- Remove excessive animations (particles, parallax)
- Simplify color scheme (reduce purple gradients)
- Replace typewriter with static professional headline
- Redesign layout to be more publication-focused
- Add proper citations and academic formatting

### Phase 2: Content Enhancement 📋
- Add research publications section
- Include academic achievements
- Add coursework/projects with proper documentation
- Create blog section for technical writeups
- Add proper metadata and SEO

### Phase 3: Performance & Accessibility 🚀
- Optimize bundle size
- Improve accessibility (ARIA labels, keyboard navigation)
- Add proper semantic HTML
- Implement lazy loading
- PWA enhancements

### Phase 4: Advanced Features 🔧
- Dark/light theme toggle
- Search functionality
- Tag-based filtering for projects
- Analytics integration
- Contact form with backend

## User Preferences

**⚠️ IMPORTANT: Development Guidelines**

Before making any changes:
1. **Always confirm with the user** before implementing modifications
2. **Make small, incremental changes** - one feature/component at a time
3. **Discuss the approach first** - explain what will be changed and why
4. **Show code diffs** for review when possible
5. **Test after each change** - verify nothing breaks
6. **Commit frequently** - maintain version control

Never make sweeping changes without explicit approval. Break large tasks into reviewable chunks.

## Known Issues
- Some commented-out code in components (AboutCard.js, TravelBlog.js)
- Duplicate route configuration in App.js
- Mixed styling approaches (CSS files + inline styles)
- Heavy dependencies (could be optimized)
- No TypeScript (considering migration?)

## Next Steps
1. Review current "gimmicky" elements (see issues.md)
2. Plan academic redesign approach
3. Create mockups/wireframes for new design
4. Incremental component updates
5. Testing and refinement

---

**Last Updated:** January 2, 2026  
**Current Branch:** dev  
**Status:** Active Development

## Today's Update — January 5, 2026

**Homepage Foundations**
- Full-bleed hero: inner container switched to `container-fluid` in Home to remove max-width constraints.
- Full-height section: `.home-section` uses `min-height: calc(100vh - var(--nav-h))`, vertically centered; added `--nav-h` token.
- Unified background: introduced `--section-tint` and layered a subtle tint over `var(--color-bg)` for `.home-about-section` to visually merge first and second portions.
- Navbar repo link: converted to a navy, underlined anchor with focus ring and hover color shift; sticky darken behavior retained.
- Social icons: rounded-square glass buttons with brand colors (GitHub, LinkedIn, Instagram), hover/focus elevation; wrapped the icons group in a glass container.
- Accessibility: added `aria-label`/`title` to social anchors; clear focus outlines across interactive elements.

**Data Groundwork (staged, not wired)**
- Generated `src/data/resume.json` from Docs to serve as the single source-of-truth for Experience, Education, Projects, Publications, and Awards. Rendering will be wired after approval.

## Homepage — Planned Enhancements (Pending Approval)
- CTAs: add "View CV" and "Contact" buttons in the hero; optional "Download CV" linked to latest PDF.
- Metrics chips: small, readable counters (e.g., publication count, scholarships, notable projects).
- Type treatment: optionally replace or tone down typewriter for a concise professional headline; keep Inter scale and maintain contrast ≥ 4.5:1.
- Visual polish: tune spacing and padding, consider card edge style (flush vs. rounded), adjust `--section-tint` strength, fine-tune icon sizes.
- Performance: lazy-load hero illustration; ensure CSS is scoped and minimal; respect reduced motion.

## Broader Plan (Experience & Publications)
- Information Architecture: add `/experience` and `/publications` routes; render from `resume.json`.
- Experience: timeline with company/role/dates and impact bullets; filters and deep cards for roles (Dexian, Walton, Outlier, YLRL).
- Publications: single highlighted paper (IEEE QPAN 2025) + Google Scholar link; room for future entries.
- Design Tokens: refine color system using OKLCH/LCH for perceptual consistency; elevation tiers; spacing scale; accessible focus rings.
- Interactions: predictable hover/press states, keyboard navigation, reduced motion support.

---

**Last Updated:** January 5, 2026  
**Focus Area:** Homepage UI and data groundwork  
**Status:** Ready for next homepage enhancements (awaiting approval)

### Addendum — Resume Page Tweaks (Jan 5, 2026)
- Filled empty sides by rendering PDF pages at responsive width (`Page width = min(viewport − 96, 1200)`) rather than fixed scale.
- Wrapped the resume content in a glass container (`.resume-glass-wrapper`) with subtle blur, border, and elevation for a professional look.
- Added rounded corners and light shadow to PDF pages; download buttons aligned within the glass container.

---

**Last Updated:** January 18, 2026
**Focus Area:** Homepage Branding & Structural Overhaul
**Status:** Reviewing Homepage Redesign

## Update — January 18, 2026

**Major Architecture & Branding Overhaul**
- **Navigation Structure**: Removed `About` page; promoted `Experience`, `Education`, `Skills`, `Research` to main navbar.
- **Academic Theme**: Implemented "Academic Navy" theme with glassmorphism; fixed high-contrast visibility issues.
- **Homepage Redesign**: 
  - Updated branding to professional "Bridging AI Research & Engineering" narrative.
  - Replaced avatar with rounded-square style.
  - Added 3-column "Areas of Expertise" grid (Generative AI, Full Stack, Research).
  - Introduction of expanded 8-badge tech stack strip.
- **Technical Fixes**: Resolved `SiHuggingface` import errors; fixed GitHub Pages routing (404 redirects).

---

**Last Updated:** January 26, 2026  
**Focus Area:** Project case studies (AgentFlow)

## Update — January 26, 2026

**Project Case Studies → Blog-Style Pages**
- Upgraded project detail pages to read like a blog post (hero image, narrative intro, TL;DR callout, on-page TOC, better typography).
- Added per-project layout flexibility via `caseStudy.layout` in `src/data/resume.json` (each project page can be structured differently).

**AgentFlow Case Study (Featured)**
- Added a story-driven intro at the top (no heading) focused on the real business problem: demos/POCs taking weeks can cost deals; AgentFlow enables prompt-to-app demos + instant deployment for client-facing validation.
- Incorporated visuals into the narrative:
  - Architecture diagram used inside the “How it works” section.
  - Tool Gateway vision image used in the “What’s next” section.
- Implemented a screenshot walkthrough using the `Agentlfow Info/SS/` flow.
  - Walkthrough steps render with text on the left and the screenshot on the right.
  - Screenshot sizing is controlled via CSS (fixed right-column width with responsive fallback).

**Assets + Styling**
- Copied AgentFlow images/screenshots into `public/assets/projects/agentflow/` for stable public paths.
- Added styling for:
  - Hero image presentation (figure + caption).
  - Two-column step walkthrough layout and custom screenshot sizing.

**Key Files Updated**
- `src/components/Projects/ProjectDetail.js`
- `src/data/resume.json`
- `src/style.css`
- `public/assets/projects/agentflow/*`

---

**Last Updated:** January 31, 2026  
**Focus Area:** AgentFlow Case Study — Premium UX Polish

## Update — January 31, 2026

### AgentFlow Project Page — Complete Overhaul

**Architecture Refactor**
- Migrated from generic JSON-driven renderer to **dedicated per-project React components**
- Created `ProjectTemplate.js` as a shared wrapper providing consistent layout, navigation, and sidebar
- AgentFlow is now a standalone component at `src/components/Projects/projects/AgentFlow/index.js`
- Supports unique layouts, custom sections, and project-specific styling per project

**Layout & Navigation**
- **Left Sidebar** (sticky): Contents (TOC), Quick Links, Built With tags, internal project notice
- **Topbar**: Back to Projects button + action links (Live Demo, Source, All Projects)
- **Full-width content area**: Removed Bootstrap grid constraints for cleaner flex layout
- **Responsive behavior**: Sidebar scrollable on small height/width screens; collapses gracefully on mobile

**Visual Polish**
- **Professional icons** via `react-icons` (Feather + Simple Icons): back button, quick links, tech stack badges
- **"Built With" chips**: Subtle gradient pills with tech-specific icons (Azure, OpenAI, FastAPI, React, etc.)
- **Project Scope section**: Replaced "TL;DR" with clean "Project Scope" header + checkmark grid layout
- **Step numbers**: Gradient badge numbers (1, 2, 3...) before each experience step title

**Experience Section — Story Flow**
- **Alternating layout**: Odd steps = text left + image right; Even steps = image left + text right
- **Card hover effects**: Subtle lift and shadow on hover for engagement
- **Image constraints**: `max-height: 400px` to prevent tall screenshots from dominating
- **Clean spacing**: 56px gap between steps for visual breathing room

**Fullscreen Image Viewer (Lightbox)**
- **React Portal**: Renders at `document.body` level to cover entire viewport
- **Dark overlay**: `rgba(0,0,0,0.9)` background, no blur (keeps image sharp)
- **Zoom controls**: Mouse wheel + button controls (−/+), zoom level indicator (50%–400%)
- **Close options**: Click outside, press ESC, or × button
- **Smooth transitions**: Transform-based zoom with 150ms easing

**Files Created/Modified**
- `src/components/Projects/ProjectTemplate.js` — Shared project page wrapper
- `src/components/Projects/projects/AgentFlow/index.js` — Dedicated AgentFlow component
- `src/components/Projects/projects/AgentFlow/AgentFlow.module.css` — Project-specific styles
- `src/components/Projects/projects/AgentFlow/data.js` — AgentFlow metadata
- `src/style.css` — Global project layout styles (sidebar, topbar, responsive)

---

## Current Site State

### Completed Features ✅
- **Homepage**: Professional hero, Areas of Expertise grid, tech stack strip, glass social icons
- **Navigation**: Experience, Education, Skills, Research, Projects, Resume routes
- **Projects List**: Card grid with cover images linking to `/project/:slug`
- **AgentFlow Case Study**: Full blog-style page with:
  - Hero section (badges, tagline, 3D concept image)
  - Project Scope overview
  - Problem/Solution narrative
  - How It Works (architecture diagram)
  - Experience walkthrough (6 steps with screenshots)
  - Architecture deep-dive
  - Results & metrics
  - What's Next vision
- **Image Lightbox**: Click any image → fullscreen view with zoom controls
- **Resume Page**: Glass container, responsive PDF rendering
- **Responsive Design**: Works on desktop, tablet, mobile; handles small viewports

### Design System
- **Theme**: Academic Navy with glassmorphism accents
- **Typography**: Inter font family, clear hierarchy
- **Colors**: `--imp-text-color` (purple accent), `--color-card-bg`, `--color-border`
- **Icons**: react-icons (Feather for UI, Simple Icons for tech logos)

---

## Next Steps & Intent

### Immediate (Polish & QA)
1. **Test cross-browser**: Verify lightbox and layout on Chrome, Firefox, Safari, Edge
2. **Mobile testing**: Ensure touch gestures work for lightbox (pinch-to-zoom consideration)
3. **Performance audit**: Check image loading, bundle size, Lighthouse score
4. **Accessibility review**: Keyboard navigation, focus management, screen reader testing

### Short-term (Content)
1. **Add more project case studies**: Apply same dedicated component pattern to other projects
2. **Finalize content**: Review AgentFlow copy for typos, tighten narrative
3. **Update resume.json**: Ensure all project metadata is current

### Medium-term (Features)
1. **Project filtering/tags**: Filter projects by tech stack or category on `/project`
2. **Dark/Light theme toggle**: Respect system preference + manual override
3. **Search**: Global search across projects, blog, resume content
4. **Contact form**: Simple email form or Calendly integration

### Long-term (Growth)
1. **Blog/Technical Writing**: Dedicated blog section for articles
2. **Analytics**: Privacy-respecting analytics (Plausible or Umami)
3. **CI/CD**: Automated builds and preview deployments
4. **SEO**: Meta tags, Open Graph, structured data for projects

---

**Status:** AgentFlow case study complete and polished  
**Next Focus:** Cross-browser testing, then additional project pages

---

## Update — January 31, 2026 (Session 2)

### PDF-ALAP Case Study — Complete Build

**New Project Component**
- Created dedicated case study component at `src/components/Projects/projects/PDFAlap/`
- Files: `index.js`, `data.js`, `PDFAlap.module.css`
- Follows same architecture pattern as AgentFlow (ProjectTemplate wrapper, dedicated styling)

**Content & Narrative**
- Full technical deep-dive pulled from GitHub repository (Chinmoy17/PDF-Alap)
- Story-driven intro: Built for learning RAG systems, now production-ready for freshers/students
- Sections: Problem, Solution Architecture, Technical Deep-Dive, Features, Results, Future Roadmap
- Architecture diagram using Mermaid-style visual explanation
- Code snippets for key implementations (PDF processing, vector store, query chain)

**Styling Standardization**
- Fixed all colors to use Academic Navy theme (`--color-accent: #274C77`)
- Badge colors corrected (navy background + white text for visibility)
- Button text changed to "Explore Project →" for consistency
- CSS Module with proper spacing, typography, and responsive behavior

### Projects Page — Major Restructuring

**Project Order Fixed**
- Discovered `Projects.js` had sorting logic that overrode JSON order
- Removed the `projects.sort()` block entirely
- Projects now display in exact JSON order: AgentFlow → PDF-ALAP → Note2Action → DemoFactory → Blog Generator → AI Painter → Custom CPU

**Research Projects Separated**
- Removed 3 research-focused entries from projects list:
  - Bangla Vowel Recognition
  - Paper Retraction NLP Analysis  
  - Student AI Usage Survey
- These will be displayed on the Research page instead

**Tier Badges Added**
- New `tier` field in resume.json for project classification
- AgentFlow: "Enterprise" badge (navy highlight)
- PDF-ALAP: "Learning Project" badge (navy highlight)
- Helps visitors understand project scope and complexity at a glance

**Project Card Images Fixed**
- AgentFlow: Changed from generic `agent.jpg` to actual screenshot (`Screenshot 2026-01-26 162743.png`)
- PDF-ALAP: Added mapping to use `demo.png` from project assets
- Both now show real product screenshots instead of placeholder images

### Files Created/Modified
- `src/components/Projects/projects/PDFAlap/index.js` — New case study component
- `src/components/Projects/projects/PDFAlap/data.js` — Project metadata
- `src/components/Projects/projects/PDFAlap/PDFAlap.module.css` — Project-specific styles
- `src/components/Projects/Projects.js` — Removed sorting, added tier badges, fixed image mappings
- `src/components/Projects/projectRegistry.js` — Added PDF-ALAP lazy import
- `src/data/resume.json` — Added tier fields, reordered projects, removed research items
- `public/assets/projects/pdf-alap/` — Project screenshots (demo.png, screenshot1.png, etc.)

---

## Current Project List (Ordered)

| # | Project | Tier | Visibility | Case Study |
|---|---------|------|------------|------------|
| 1 | AgentFlow | Enterprise | Private/SSO | ✅ Complete |
| 2 | PDF-ALAP (Multilingual PDF Chatbot) | Learning Project | Public | ✅ Complete |
| 3 | Note2Action | — | Private/SSO | ❌ Pending |
| 4 | DemoFactory | — | Private/SSO | ❌ Pending |
| 5 | Blog Generator via LLMs | — | Public | ❌ Pending |
| 6 | AI Painter | — | Public | ❌ Pending |
| 7 | 4-Bit Custom CPU | — | Public | ❌ Pending |

---

## Next Session — Motives & Priorities

### Immediate (Case Studies)
1. **Note2Action Case Study** — Private enterprise tool, need to craft narrative without exposing internals
2. **DemoFactory Case Study** — Similar approach, highlight capabilities without sensitive details
3. **Blog Generator Case Study** — Public repo, can show code and technical details
4. **AI Painter Case Study** — Fun creative project, show GAN/diffusion work
5. **Custom CPU Case Study** — Hardware/assembly focus, educational project

### Content Generation
- Need to generate/create cover images for remaining projects (Note2Action, DemoFactory)
- Consider creating architecture diagrams for each project
- Screenshots may need to be mocked or styled for private projects

### Research Page
- Wire up the 3 research projects (Bangla Vowel, Paper Retraction, Student AI Usage)
- Design research card layout (publication-style with citations)
- Add Google Scholar link integration

### Polish & Deployment
1. Run production build and test all routes
2. Verify all images load correctly
3. Test responsive behavior on mobile
4. Deploy to GitHub Pages
5. Verify 404 redirects work for SPA routing

---

**Last Updated:** January 31, 2026  
**Session Focus:** PDF-ALAP case study + Projects page restructuring  
**Status:** 2/7 case studies complete, ready for remaining projects
