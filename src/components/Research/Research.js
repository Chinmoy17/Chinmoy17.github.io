import React from "react";
import { Link } from "react-router-dom";
import { FiExternalLink, FiArrowRight, FiGithub } from "react-icons/fi";
import { SiGooglescholar } from "react-icons/si";
import resumeData from "../../data/resume.json";
import { Reveal } from "../utils/Reveal";

function Research() {
  const pubs = resumeData.publications || [];
  const researchProjects = (resumeData.projects || []).filter(
    (p) => p.category === "research"
  );
  const researchExp = resumeData.experience.find(
    (e) => e.company.includes("Research Lab") || e.role.includes("Research")
  );

  return (
    <main className="max-w-container mx-auto px-8 pt-10 pb-16">

      {/* ===== HEADER ===== */}
      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-7">
            <Reveal>
              <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-4">
                Research & Publications
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="font-newsreader text-h1 text-ink mb-4">
                Investigations
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <div className="h-[1px] w-16 bg-ink mb-4"></div>
              <p className="font-inter text-body-lg text-on-surface-variant max-w-xl">
                Where academic rigour meets production constraints &mdash; I study how learning systems fail when accuracy alone looks fine, and how to evaluate, harden, and control them.
              </p>
            </Reveal>
          </div>

          {/* Focus areas — right column, compact tag row */}
          <Reveal delay={300} className="md:col-span-5">
            <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-2.5">
              Focus Areas
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="font-inter text-[0.78rem] text-ink border border-ink/25 px-2.5 py-1">Failure-aware LLM evaluation</span>
              <span className="font-inter text-[0.78rem] text-ink border border-ink/25 px-2.5 py-1">Robust & efficient learning</span>
              <span className="font-inter text-[0.78rem] text-ink border border-ink/25 px-2.5 py-1">Multi-agent LLM control</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== PUBLICATIONS & SUBMITTED WORK ===== */}
      <h2 className="font-newsreader text-[1.5rem] md:text-[1.75rem] font-medium text-ink leading-tight mb-2">
        Publications & Submitted Work
      </h2>
      <div className="w-full h-px bg-surface-variant mb-1"></div>

      <section className="mb-10">
        {pubs.map((pub, i) => (
          <Reveal key={i} delay={i * 40}>
            <article className="flex flex-col gap-2.5 py-3.5 border-b border-surface-variant">

              <div className="flex items-start gap-3">
                {/* Index */}
                <span className="font-inter text-[0.8rem] text-on-surface-variant/40 tabular-nums w-6 shrink-0 pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <h3 className="font-inter text-[0.95rem] font-semibold text-ink leading-snug">
                      {pub.title}
                    </h3>
                    {pub.status && (
                      <span
                        className={`font-inter text-[0.62rem] uppercase tracking-[0.1em] ${
                          pub.status === "Accepted" || pub.status === "Published"
                            ? "text-emerald-700"
                            : "text-on-surface-variant"
                        }`}
                      >
                        {pub.status}
                      </span>
                    )}
                  </div>
                  <p className="font-inter text-[0.78rem] text-on-surface-variant/80 mt-0.5">
                    <span className="font-medium">{pub.venue}</span>, {pub.year}
                    {pub.notes && <span className="text-on-surface-variant/50"> · {pub.notes}</span>}
                  </p>
                </div>
              </div>

              {/* Actions — lower-left, under the index column */}
              <div className="flex items-center gap-2 pl-9">
                {pub.link && (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-inter text-[0.7rem] font-medium text-surface bg-ink border border-ink px-2.5 py-1 hover:bg-surface hover:text-ink transition-colors duration-150 no-underline"
                  >
                    <FiExternalLink size={11} aria-hidden="true" /> Paper
                  </a>
                )}
                {pub.scholarProfile && (
                  <a
                    href={pub.scholarProfile}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-inter text-[0.7rem] font-medium text-surface bg-ink border border-ink px-2.5 py-1 hover:bg-surface hover:text-ink transition-colors duration-150 no-underline"
                  >
                    <SiGooglescholar size={11} aria-hidden="true" /> Scholar
                  </a>
                )}
              </div>

            </article>
          </Reveal>
        ))}
      </section>

      {/* ===== PERSONAL RESEARCH ===== */}
      <h2 className="font-newsreader text-[1.5rem] md:text-[1.75rem] font-medium text-ink leading-tight mb-2">
        Personal Research
      </h2>
      <div className="w-full h-px bg-surface-variant mb-1"></div>
      <p className="font-inter text-[0.85rem] text-on-surface-variant max-w-xl mb-4">
        Self-initiated studies and applied experiments &mdash; not yet formally published.
      </p>

      <section className="mb-10">
        {researchProjects.map((p, i) => (
          <Reveal key={p.id} delay={i * 40}>
            <article className="flex flex-col gap-2.5 py-3.5 border-b border-surface-variant group">

              <div className="flex items-start gap-3">
                {/* Index */}
                <span className="font-inter text-[0.8rem] text-on-surface-variant/40 tabular-nums w-6 shrink-0 pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <h3 className="font-inter text-[0.95rem] font-semibold text-ink leading-snug group-hover:opacity-80 transition-opacity">
                      {p.title}
                    </h3>
                    <span className="font-inter text-[0.62rem] uppercase tracking-[0.1em] text-on-surface-variant">
                      {p.visibility === "public" ? "Open Access" : "Private"}
                    </span>
                  </div>
                  <p className="font-inter text-[0.78rem] text-on-surface-variant/80 mt-0.5">
                    {p.id === "dspy-rag-optimization"
                      ? "Collaborative Study"
                      : p.id === "paper-retraction-analysis"
                      ? "NLP Analysis"
                      : "ML Research"}
                    {p.stack && p.stack.length > 0 && (
                      <span className="text-on-surface-variant/50"> · {p.stack.slice(0, 4).join(", ")}</span>
                    )}
                  </p>
                  {p.metrics && p.metrics.length > 0 && (
                    <p className="font-inter text-[0.75rem] text-on-surface-variant/60 mt-0.5">
                      {p.metrics.join(" · ")}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions — lower-left, under the index column */}
              <div className="flex items-center gap-2 pl-9">
                {p.slug && (
                  <Link
                    to={`/research/${p.slug}`}
                    className="inline-flex items-center gap-1.5 font-inter text-[0.7rem] font-medium text-surface bg-ink border border-ink px-2.5 py-1 hover:bg-surface hover:text-ink transition-colors duration-150 no-underline"
                  >
                    Read Paper <FiArrowRight size={11} aria-hidden="true" />
                  </Link>
                )}
                {p.visibility === "public" && p.links?.repo && (
                  <a
                    href={p.links.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-inter text-[0.7rem] font-medium text-surface bg-ink border border-ink px-2.5 py-1 hover:bg-surface hover:text-ink transition-colors duration-150 no-underline"
                  >
                    <FiGithub size={11} aria-hidden="true" /> GitHub
                  </a>
                )}
              </div>

            </article>
          </Reveal>
        ))}
      </section>

      {/* ===== RESEARCH EXPERIENCE ===== */}
      {researchExp && (
        <>
          <h2 className="font-newsreader text-[1.5rem] md:text-[1.75rem] font-medium text-ink leading-tight mb-2">
            Research Experience
          </h2>
          <div className="w-full h-px bg-surface-variant mb-6"></div>

          <section className="mb-10">
            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-9 md:order-1">
                  <h2 className="font-newsreader text-h3 text-ink mb-1">{researchExp.role}</h2>
                  <p className="font-inter text-body-md text-on-surface-variant mb-4">{researchExp.company}</p>
                  <div className="space-y-2">
                    {researchExp.highlights.map((h, i) => (
                      <p key={i} className="font-inter text-[0.88rem] text-on-surface-variant leading-relaxed pl-4 border-l border-surface-variant">
                        {h}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-3 md:order-2 md:text-right">
                  <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] leading-relaxed">
                    {new Date(researchExp.start).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    {" — "}
                    {researchExp.end
                      ? new Date(researchExp.end).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                      : "Present"}
                  </p>
                </div>
              </div>
            </Reveal>
          </section>
        </>
      )}

      {/* ===== CTA ===== */}
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-8 border-t border-surface-variant">
          <p className="font-inter text-[1.05rem] md:text-[1.2rem] font-semibold text-ink">
            Open to research collaboration, co-authorship, and pre-PhD volunteering.
          </p>
          <Link
            to="/contact"
            className="bg-ink text-on-ink px-8 py-3 font-inter text-label-caps uppercase tracking-[0.1em] hover:bg-surface hover:text-ink border border-ink transition-colors duration-200 no-underline inline-block shrink-0"
          >
            Get in Touch &rarr;
          </Link>
        </div>
      </Reveal>

    </main>
  );
}

export default Research;
