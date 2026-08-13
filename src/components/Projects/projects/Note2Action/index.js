import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Reveal } from "../../../utils/Reveal";
import data from "./data";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Overload" },
  { id: "pipeline", label: "The Pipeline" },
  { id: "surfaces", label: "Two Surfaces" },
  { id: "workflow", label: "Note to Nudge" },
  { id: "architecture", label: "Under the Hood" },
  { id: "results", label: "What It Changed" },
  { id: "next", label: "Where It Goes" },
];

// Section divider with an inset caps label (shared editorial motif).
function Divider({ label }) {
  return (
    <div className="relative w-full h-[1px] bg-surface-variant mb-10">
      <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
        {label}
      </span>
    </div>
  );
}

function Note2ActionProject() {
  const navigate = useNavigate();
  const ac = data.adaptiveCard;

  return (
    <main className="max-w-container mx-auto px-8 pt-24 pb-16">

      {/* ===== TOP NAV ===== */}
      <div className="flex items-center justify-between mb-16">
        <button type="button" onClick={() => navigate("/project")}
          className="flex items-center gap-2 font-inter text-[0.8rem] text-on-surface-variant hover:text-ink transition-colors uppercase tracking-[0.1em]">
          <FiArrowLeft className="text-base" />
          Back to Projects
        </button>
        <Link to="/project"
          className="font-inter text-[0.8rem] text-on-surface-variant border-b border-surface-variant pb-px hover:text-ink hover:border-ink transition-colors no-underline uppercase tracking-[0.1em]">
          All Projects
        </Link>
      </div>

      {/* ===== HERO ===== */}
      <section className="mb-16">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {data.tags.map((tag, i) => (
              <React.Fragment key={tag}>
                {i > 0 && <span className="text-on-surface-variant/40 text-xs">·</span>}
                <span className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">{tag}</span>
              </React.Fragment>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-newsreader text-h1 text-ink mb-4">Note2Action</h1>
        </Reveal>

        <Reveal delay={200}>
          <div className="h-[1px] w-16 bg-ink mb-6"></div>
          <p className="font-newsreader text-[1.5rem] italic text-ink/80 max-w-2xl leading-relaxed">
            {data.tagline}
          </p>
        </Reveal>

        {/* Stats */}
        <Reveal delay={300}>
          <div className="flex flex-wrap gap-x-12 gap-y-6 mt-10 pt-8 border-t border-surface-variant mb-10">
            {data.stats.map((s) => (
              <div key={s.label}>
                <p className="font-newsreader text-[2.25rem] text-ink leading-none mb-1">{s.value}</p>
                <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Stack line */}
        <Reveal delay={350}>
          <p className="font-inter text-[0.78rem] text-on-surface-variant/60 mb-10">
            {(data.stack || []).join(" · ")}
          </p>
        </Reveal>

        {/* Inline TOC index */}
        <Reveal delay={400}>
          <div className="border-t border-b border-surface-variant py-5">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {toc.map((item, i) => (
                <a key={item.id} href={`#${item.id}`}
                  className="flex items-baseline gap-2 no-underline group">
                  <span className="font-newsreader text-[0.8rem] text-on-surface-variant/30 group-hover:text-on-surface-variant/60 transition-colors select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-inter text-[0.8rem] text-on-surface-variant group-hover:text-ink transition-colors">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== OVERVIEW ===== */}
      <Divider label="Overview" />
      <section id="overview" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-6">The Brief</h2>
        </Reveal>
        <div className="space-y-4 mb-8">
          {data.overview.map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <p className="font-inter text-body-md text-on-surface-variant leading-relaxed pl-5 border-l border-surface-variant">{item}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={300}>
          <p className="font-newsreader text-[1.3rem] italic text-ink/70 leading-relaxed">
            &ldquo;{data.overviewQuote}&rdquo;
          </p>
        </Reveal>
      </section>

      {/* ===== THE OVERLOAD ===== */}
      <Divider label="The Overload" />
      <section id="problem" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-4">Too much to read, nothing to do</h2>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-10 max-w-3xl">
            {data.problemIntro}
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.painPoints.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="border-t-2 border-ink pt-4 h-full">
                <h3 className="font-newsreader text-[1.15rem] text-ink mb-2">{p.title}</h3>
                <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-4">{p.body}</p>
                <p className="font-inter text-[0.85rem] text-on-surface-variant/80 italic border-l-2 border-surface-variant pl-3">{p.impact}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== THE PIPELINE ===== */}
      <Divider label="The Pipeline" />
      <section id="pipeline" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-4">One pipeline, four stages</h2>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-10 max-w-3xl">
            {data.pipelineIntro}
          </p>
        </Reveal>
        <div className="flex flex-col md:flex-row md:items-stretch">
          {data.pipeline.map((stage, i) => (
            <React.Fragment key={stage.title}>
              <Reveal delay={i * 90} className="flex-1">
                <div className="border-t-2 border-ink pt-4 pb-6 md:pb-0 md:pr-6 h-full">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-newsreader text-[1.6rem] text-ink leading-none">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-newsreader text-[1.2rem] text-ink">{stage.title}</h3>
                  </div>
                  <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-3">{stage.desc}</p>
                  <span className="font-inter text-label-caps text-on-surface-variant/50 uppercase tracking-[0.1em]">{stage.detail}</span>
                </div>
              </Reveal>
              {i < data.pipeline.length - 1 && (
                <div className="hidden md:flex items-start pt-3 px-1 text-on-surface-variant/25 font-newsreader text-3xl shrink-0 select-none" aria-hidden="true">&rarr;</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ===== TWO SURFACES ===== */}
      <Divider label="Two Surfaces" />
      <section id="surfaces" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-4">Two front doors, one stateless backend</h2>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-10 max-w-3xl">
            The same suggestion is worth nothing if it lands somewhere the AM never looks. So the same FastAPI backend feeds a focused web dashboard and a Teams bot &mdash; two clients, one endpoint, no coordination between them.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.surfaces.map((s, i) => (
            <Reveal key={s.kind} delay={i * 100}>
              <div className="border border-surface-variant bg-surface-container-lowest p-6 md:p-8 h-full">
                <p className="font-inter text-label-caps text-on-surface-variant/60 uppercase tracking-[0.1em] mb-2">{s.tech}</p>
                <h3 className="font-newsreader text-[1.4rem] text-ink mb-5">{s.kind}</h3>
                <div className="space-y-3">
                  {s.points.map((p, j) => (
                    <div key={j} className="flex items-baseline gap-3">
                      <span className="font-inter text-[0.7rem] text-on-surface-variant/40 uppercase tracking-widest shrink-0">&mdash;</span>
                      <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Faux Teams Adaptive Card */}
        <Reveal delay={150}>
          <div className="mt-14">
            <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-4">What actually lands in Teams</p>
            <div className="max-w-md">
              <div className="bg-surface-container-lowest border border-surface-variant shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                {/* header */}
                <div className="flex items-center gap-3 p-4 border-b border-surface-variant">
                  <div className="w-9 h-9 rounded-full bg-[#5b5fc7] text-white font-inter text-[0.8rem] flex items-center justify-center shrink-0">{ac.initials}</div>
                  <div className="min-w-0">
                    <p className="font-inter text-[0.85rem] text-ink font-medium leading-tight truncate">Action Items &middot; {ac.am}</p>
                    <p className="font-inter text-[0.68rem] text-on-surface-variant/60 leading-tight">GoldenCompass &middot; Microsoft Teams</p>
                  </div>
                  <span className="ml-auto font-inter text-[0.68rem] text-on-surface-variant/50 tabular-nums shrink-0">{ac.page}/{ac.total}</span>
                </div>
                {/* row */}
                <div className="p-4 border-b border-surface-variant">
                  <p className="font-inter text-[0.82rem] text-ink font-medium mb-1">
                    {ac.row.client} <span className="text-on-surface-variant/50 font-normal">&mdash; {ac.row.dept}</span>
                  </p>
                  <p className="font-inter text-[0.82rem] text-on-surface-variant leading-relaxed mb-3">{ac.row.action}</p>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-inter text-[0.72rem] text-on-surface-variant/70">Due <span className="text-ink tabular-nums">{ac.row.due}</span></span>
                    <span className="font-inter text-[0.66rem] text-on-surface-variant/40 uppercase tracking-widest">tap to expand &or;</span>
                  </div>
                </div>
                {/* action */}
                <div className="p-4">
                  <span className="inline-flex items-center gap-2 bg-[#5b5fc7] text-white font-inter text-[0.78rem] px-4 py-2">&#128231; Email Client</span>
                </div>
              </div>
              <p className="font-inter text-[0.7rem] text-on-surface-variant/45 italic mt-3">Illustrative rendering &mdash; not real client data.</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== NOTE TO NUDGE ===== */}
      <Divider label="Note to Nudge" />
      <section id="workflow" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-4">From an email address to an action</h2>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-8 max-w-3xl">
            {data.workflowIntro}
          </p>
        </Reveal>
        <div>
          {data.workflow.map((step, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="grid grid-cols-12 gap-4 border-b border-surface-variant py-5">
                <div className="col-span-1">
                  <span className="font-newsreader text-[1.75rem] text-on-surface-variant/25 leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="col-span-11 pt-1">
                  <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">{step}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== UNDER THE HOOD ===== */}
      <Divider label="Under the Hood" />
      <section id="architecture" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-6">Four decisions that kept it simple</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 mb-16">
          {data.principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="border-t border-surface-variant pt-5">
                <h3 className="font-newsreader text-[1.15rem] text-ink mb-2">{p.title}</h3>
                <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Prompt contract — the interesting bit */}
        <Reveal delay={100}>
          <div className="border-t border-surface-variant pt-8 mb-16">
            <h3 className="font-newsreader text-[1.2rem] text-ink mb-2">The interesting bit: a deliberately tiny prompt</h3>
            <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-6 max-w-3xl">
              {data.promptContract.framing} A creative model is the wrong tool here &mdash; the value is a stable, reviewable suggestion, so the prompt is constrained to return exactly two fields and nothing else.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="space-y-3 mb-5">
                  {data.promptContract.rules.map((r, i) => (
                    <div key={i} className="flex items-baseline gap-3">
                      <span className="font-inter text-[0.7rem] text-on-surface-variant/40 uppercase tracking-widest shrink-0">&mdash;</span>
                      <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">{r}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.promptContract.settings.map((s) => (
                    <span key={s} className="font-inter text-[0.68rem] text-on-surface-variant/70 border border-surface-variant px-2.5 py-1 uppercase tracking-wider">{s}</span>
                  ))}
                </div>
              </div>
              {/* faux model output */}
              <div className="bg-[#0f0f0f] p-5">
                <p className="font-mono text-[0.68rem] text-white/40 uppercase tracking-widest mb-4">model output</p>
                <div className="space-y-3">
                  {data.promptContract.output.map((o) => (
                    <div key={o.field}>
                      <p className="font-mono text-[0.7rem] text-white/40 mb-1">{o.field}:</p>
                      <p className="font-mono text-[0.8rem] text-white/90 leading-relaxed">{o.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-white/10">
                  <p className="font-mono text-[0.66rem] text-white/30 leading-relaxed">// returns "N/A" when nothing useful can be inferred</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* API surface */}
        <Reveal delay={150}>
          <div className="border-t border-surface-variant pt-8">
            <h3 className="font-newsreader text-[1.2rem] text-ink mb-5">The backend surface</h3>
            <div className="divide-y divide-surface-variant">
              {data.apiSurface.map((e, i) => (
                <div key={i} className="grid grid-cols-12 gap-x-3 gap-y-1 py-3 items-baseline">
                  <span className="col-span-3 md:col-span-1 font-mono text-[0.66rem] text-ink uppercase tracking-wider">{e.method}</span>
                  <span className="col-span-9 md:col-span-4 font-mono text-[0.74rem] text-on-surface-variant break-all">{e.path}</span>
                  <span className="col-span-12 md:col-span-7 font-inter text-[0.85rem] text-on-surface-variant/80 leading-snug">{e.purpose}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== WHAT IT CHANGED ===== */}
      <Divider label="What It Changed" />
      <section id="results" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-8">What it changed</h2>
        </Reveal>
        <div>
          {data.results.map((r, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="flex items-baseline gap-4 border-b border-surface-variant py-5">
                <span className="font-inter text-[0.7rem] text-on-surface-variant/40 uppercase tracking-widest shrink-0">&mdash;</span>
                <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">{r}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="font-inter text-[0.78rem] text-on-surface-variant/50 mt-4 italic">
            Private internal project. Source code and real client data can&rsquo;t be shared.
          </p>
        </Reveal>
      </section>

      {/* ===== WHERE IT GOES ===== */}
      <Divider label="Where It Goes" />
      <section id="next" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-4">Closing the loop</h2>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-8 max-w-3xl">
            {data.nextIntro}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="space-y-3 mb-12">
            {data.nextUp.map((item, i) => (
              <div key={i} className="flex items-baseline gap-3">
                <span className="font-inter text-[0.7rem] text-on-surface-variant/40 uppercase tracking-widest shrink-0">&mdash;</span>
                <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={200}>
          <p className="font-newsreader text-[1.4rem] italic text-ink/70 leading-relaxed max-w-3xl">
            &ldquo;{data.closingQuote}&rdquo;
          </p>
        </Reveal>
      </section>

      {/* ===== FOOTER NAV ===== */}
      <Reveal>
        <div className="border-t border-surface-variant pt-10 flex flex-wrap items-center justify-between gap-4">
          <button type="button" onClick={() => navigate("/project")}
            className="flex items-center gap-2 font-inter text-[0.8rem] text-on-surface-variant hover:text-ink transition-colors uppercase tracking-[0.1em]">
            <FiArrowLeft className="text-base" />
            All Projects
          </button>
          <Link to="/research"
            className="font-inter text-[0.8rem] text-ink border-b border-ink/40 pb-px hover:border-ink transition-colors no-underline">
            Read Research &rarr;
          </Link>
        </div>
      </Reveal>

    </main>
  );
}

export default Note2ActionProject;
