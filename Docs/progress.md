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
