import React from "react";
import { Link, useNavigate } from "react-router-dom";
import resumeData from "../../data/resume.json";
import { Reveal } from "../utils/Reveal";

function Projects() {
  const navigate = useNavigate();
  const allProjects = Array.isArray(resumeData.projects)
    ? resumeData.projects.filter((p) => (p.category || "project") === "project")
    : [];

  const featured = allProjects.filter((p) => p.featured);
  const rest = allProjects.filter((p) => !p.featured);

  return (
    <main className="max-w-container mx-auto px-8 pt-24 pb-16">

      {/* ===== HEADER ===== */}
      <section className="mb-xl max-w-3xl">
        <Reveal>
          <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-4">
            Selected Work
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="font-newsreader text-h1 text-ink mb-6">
            Projects & Case Studies
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <div className="h-[1px] w-16 bg-ink mb-6"></div>
          <p className="font-inter text-body-lg text-on-surface-variant max-w-2xl">
            End-to-end systems shipped in production, research prototypes, and open-source experiments. Click any project for a full case study — problem, methods, results.
          </p>
        </Reveal>
      </section>

      {/* ===== ENTERPRISE & PRODUCTION ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-xl">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
          Enterprise & Production
        </span>
      </div>

      <section className="mb-xl">
        {featured.map((p, i) => {
          const isPrivate = p.visibility && p.visibility !== "public";
          const caseStudyLink = p.slug ? `/project/${p.slug}` : "/project";
          const externalUrl = p.noCaseStudy && p.links?.demo ? p.links.demo : null;
          const openCard = () =>
            externalUrl
              ? window.open(externalUrl, "_blank", "noopener,noreferrer")
              : navigate(caseStudyLink);

          return (
            <Reveal key={p.id} delay={i * 80}>
              <article onClick={openCard} className="relative grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-surface-variant py-10 group cursor-pointer transition-all duration-300 ease-out hover:scale-[1.01] hover:bg-surface-container-low/50">

                {/* Index */}
                <div className="md:col-span-1">
                  <span className="font-newsreader text-[2rem] text-on-surface-variant/30 leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="md:col-span-11">
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    {p.tier && (
                      <span className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
                        {p.tier}
                      </span>
                    )}
                    <span className="text-on-surface-variant/40 text-xs">·</span>
                    <span className="font-inter text-label-caps text-on-surface-variant/60 uppercase tracking-[0.1em]">
                      {isPrivate ? "Private / SSO" : "Public"}
                    </span>
                  </div>

                  {/* Title — stretched link makes the whole card clickable */}
                  <h2 className="font-newsreader text-h3 text-ink mb-3 leading-snug">
                    {externalUrl ? (
                      <a
                        href={externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-ink no-underline transition-opacity group-hover:opacity-80 after:absolute after:inset-0 after:content-['']"
                      >
                        {p.title}
                        <span className="text-on-surface-variant/50 transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                      </a>
                    ) : (
                      <Link
                        to={caseStudyLink}
                        className="inline-flex items-center gap-2 text-ink no-underline transition-opacity group-hover:opacity-80 after:absolute after:inset-0 after:content-['']"
                      >
                        {p.title}
                        <span className="text-on-surface-variant/50 transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                      </Link>
                    )}
                  </h2>

                  {/* Stack */}
                  <p className="font-inter text-[0.8rem] text-on-surface-variant/70 mb-4 leading-relaxed">
                    {(p.stack || []).slice(0, 6).join(" · ")}
                  </p>

                  {/* Summary */}
                  <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">
                    {p.summary}
                  </p>

                  {/* External actions — left aligned, above the stretched overlay */}
                  {((p.links?.demo && !externalUrl) || (!isPrivate && p.links?.repo)) && (
                    <div onClick={(e) => e.stopPropagation()} className="relative z-10 mt-5 flex flex-wrap items-center gap-5">
                      {p.links?.demo && !externalUrl && (
                        <a
                          href={p.links.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="font-inter text-[0.8rem] font-medium text-ink border-b border-ink/40 pb-px hover:border-ink transition-colors no-underline"
                        >
                          View Live App &rarr;
                        </a>
                      )}
                      {!isPrivate && p.links?.repo && (
                        <a
                          href={p.links.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="font-inter text-[0.8rem] text-on-surface-variant border-b border-surface-variant pb-px hover:text-ink hover:border-ink transition-colors no-underline"
                        >
                          GitHub &rarr;
                        </a>
                      )}
                    </div>
                  )}
                </div>

              </article>
            </Reveal>
          );
        })}
      </section>

      {/* ===== OPEN SOURCE & EXPERIMENTS ===== */}
      {rest.length > 0 && (
        <>
          <div className="relative w-full h-[1px] bg-surface-variant mb-xl">
            <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
              Open Source & Experiments
            </span>
          </div>

          <section className="mb-xl">
            {rest.map((p, i) => {
              const isPrivate = p.visibility && p.visibility !== "public";
              const caseStudyLink = p.slug ? `/project/${p.slug}` : "/project";

              return (
                <Reveal key={p.id} delay={i * 80}>
                  <article onClick={() => navigate(caseStudyLink)} className="relative grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-surface-variant py-8 group cursor-pointer transition-all duration-300 ease-out hover:scale-[1.01] hover:bg-surface-container-low/50">

                    {/* Index */}
                    <div className="md:col-span-1">
                      <span className="font-newsreader text-[2rem] text-on-surface-variant/30 leading-none select-none">
                        {String(featured.length + i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-11">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {p.tier && (
                          <span className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
                            {p.tier}
                          </span>
                        )}
                        {p.tier && <span className="text-on-surface-variant/40 text-xs">·</span>}
                        <span className="font-inter text-label-caps text-on-surface-variant/60 uppercase tracking-[0.1em]">
                          {isPrivate ? "Private" : "Public"}
                        </span>
                      </div>

                      <h2 className="font-newsreader text-[1.5rem] leading-snug text-ink mb-3">
                        <Link
                          to={caseStudyLink}
                          className="inline-flex items-center gap-2 text-ink no-underline transition-opacity group-hover:opacity-80 after:absolute after:inset-0 after:content-['']"
                        >
                          {p.title}
                          <span className="text-on-surface-variant/50 transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                        </Link>
                      </h2>

                      <p className="font-inter text-[0.8rem] text-on-surface-variant/70 mb-3 leading-relaxed">
                        {(p.stack || []).join(" · ")}
                      </p>

                      <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">
                        {p.summary}
                      </p>

                      {!isPrivate && p.links?.repo && (
                        <div onClick={(e) => e.stopPropagation()} className="relative z-10 mt-4 flex flex-wrap items-center gap-5">
                          <a
                            href={p.links.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="font-inter text-[0.8rem] text-on-surface-variant border-b border-surface-variant pb-px hover:text-ink hover:border-ink transition-colors no-underline"
                          >
                            GitHub &rarr;
                          </a>
                        </div>
                      )}
                    </div>

                  </article>
                </Reveal>
              );
            })}
          </section>
        </>
      )}

    </main>
  );
}

export default Projects;
