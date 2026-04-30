import React from "react";
import { Link } from "react-router-dom";
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
    <main className="max-w-container mx-auto px-8 pt-24 pb-16">

      {/* ===== HEADER ===== */}
      <section className="mb-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-7">
            <Reveal>
              <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-4">
                Research & Publications
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="font-newsreader text-h1 text-ink mb-6">
                Investigations
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <div className="h-[1px] w-16 bg-ink mb-6"></div>
              <p className="font-inter text-body-lg text-on-surface-variant max-w-xl">
                Exploring the intersection of LLM evaluation, RAG systems, and applied ML — where academic rigour meets production constraints.
              </p>
            </Reveal>
          </div>

          {/* Focus areas — right column */}
          <Reveal delay={300} className="md:col-span-5">
            <div className="space-y-4 border-l border-surface-variant pl-8">
              <div>
                <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-1">Primary Focus</p>
                <p className="font-newsreader text-[1.2rem] text-ink">LLM Evaluation & Prompt Optimization</p>
              </div>
              <div>
                <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-1">Secondary Focus</p>
                <p className="font-newsreader text-[1.2rem] text-ink">Medical Deep Learning & Imaging</p>
              </div>
              <div>
                <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-1">Active Interest</p>
                <p className="font-newsreader text-[1.2rem] text-ink">NLP, Abstractive Summarization, RAG</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== RESEARCH STUDIES ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-xl">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
          Research Studies
        </span>
      </div>

      <section className="mb-xl">
        {researchProjects.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <article className="grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-surface-variant py-10 group">

              {/* Index */}
              <div className="md:col-span-1">
                <span className="font-newsreader text-[2rem] text-on-surface-variant/30 leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div className="md:col-span-8">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
                    {p.id === "dspy-rag-optimization"
                      ? "Collaborative Study"
                      : p.id === "paper-retraction-analysis"
                      ? "NLP Analysis"
                      : "ML Research"}
                  </span>
                  <span className="text-on-surface-variant/40 text-xs">·</span>
                  <span className="font-inter text-label-caps text-on-surface-variant/60 uppercase tracking-[0.1em]">
                    {p.visibility === "public" ? "Open Access" : "Private"}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-newsreader text-h3 text-ink mb-3 group-hover:opacity-80 transition-opacity">
                  {p.title}
                </h2>

                {/* Stack */}
                <p className="font-inter text-[0.8rem] text-on-surface-variant/70 mb-4">
                  {(p.stack || []).slice(0, 6).join(" · ")}
                </p>

                {/* Summary */}
                <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-5">
                  {p.summary}
                </p>

                {/* Metrics — the editorial highlight */}
                {p.metrics && p.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-surface-variant">
                    {p.metrics.map((m, j) => (
                      <div key={j} className="flex items-baseline gap-1.5">
                        <span className="font-inter text-[0.7rem] text-on-surface-variant/40 uppercase tracking-widest">—</span>
                        <span className="font-inter text-[0.85rem] font-medium text-ink">{m}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Links */}
              <div className="md:col-span-3 flex flex-col justify-start items-start md:items-end gap-3 pt-1">
                {p.slug && (
                  <Link
                    to={`/research/${p.slug}`}
                    className="font-inter text-[0.8rem] text-ink border-b border-ink/40 pb-px hover:border-ink transition-colors no-underline"
                  >
                    Read Paper &rarr;
                  </Link>
                )}
                {p.visibility === "public" && p.links?.repo && (
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

            </article>
          </Reveal>
        ))}
      </section>

      {/* ===== PUBLICATIONS ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-xl">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
          Publications
        </span>
      </div>

      <section className="mb-xl">
        {pubs.map((pub, i) => (
          <Reveal key={i} delay={i * 80}>
            <article className="grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-surface-variant py-10">

              {/* Year / Venue */}
              <div className="md:col-span-3">
                <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] leading-relaxed">
                  {pub.year}<br />
                  {pub.venue}<br />
                  <span className="opacity-60">{pub.notes}</span>
                </p>
              </div>

              {/* Content */}
              <div className="md:col-span-6">
                <h2 className="font-newsreader text-h3 text-ink mb-4 leading-snug">
                  {pub.title}
                </h2>
                <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">
                  {pub.summary}
                </p>
              </div>

              {/* Links */}
              <div className="md:col-span-3 flex flex-col justify-start items-start md:items-end gap-3">
                {pub.scholarProfile && (
                  <a
                    href={pub.scholarProfile}
                    target="_blank"
                    rel="noreferrer"
                    className="font-inter text-[0.8rem] text-ink border-b border-ink/40 pb-px hover:border-ink transition-colors no-underline"
                  >
                    Google Scholar &rarr;
                  </a>
                )}
                {pub.link && (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noreferrer"
                    className="font-inter text-[0.8rem] text-on-surface-variant border-b border-surface-variant pb-px hover:text-ink hover:border-ink transition-colors no-underline"
                  >
                    Paper &rarr;
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
          <div className="relative w-full h-[1px] bg-surface-variant mb-xl">
            <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
              Research Experience
            </span>
          </div>

          <section className="mb-xl">
            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-3">
                  <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] leading-relaxed">
                    {new Date(researchExp.start).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    {" — "}
                    {researchExp.end
                      ? new Date(researchExp.end).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                      : "Present"}
                  </p>
                </div>
                <div className="md:col-span-9">
                  <h2 className="font-newsreader text-h3 text-ink mb-1">{researchExp.role}</h2>
                  <p className="font-inter text-body-md text-on-surface-variant mb-6">{researchExp.company}</p>
                  <div className="space-y-3">
                    {researchExp.highlights.map((h, i) => (
                      <p key={i} className="font-inter text-body-md text-on-surface-variant leading-relaxed pl-4 border-l border-surface-variant">
                        {h}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        </>
      )}

    </main>
  );
}

export default Research;
