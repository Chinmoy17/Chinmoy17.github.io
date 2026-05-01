import React from "react";
import resumeData from "../../data/resume.json";
import { Reveal } from "../utils/Reveal";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const openTo = [
  {
    label: "Research Collaboration",
    body: "NLP, medical imaging, LLM evaluation, and DSPy optimization. Always interested in comparing notes with other researchers working on similar problems.",
  },
  {
    label: "Enterprise AI Consulting",
    body: "Agentic workflows, RAG pipelines, and production LLM systems. Happy to discuss architecture, evaluation strategy, or give a second opinion on a design.",
  },
  {
    label: "Writing & Talks",
    body: "Technical writing on applied AI, prompt engineering, and system design. Open to contributing to publications or speaking at events.",
  },
  {
    label: "General Inquiry",
    body: "Just want to connect, share ideas, or talk about what you're building? Feel free to reach out — I reply to everyone.",
  },
];

function Contact() {
  const links = resumeData.links;

  const channels = [
    {
      icon: FaEnvelope,
      label: "Email",
      handle: links.email,
      href: `mailto:${links.email}`,
      external: false,
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      handle: "chinmoy-mitra",
      href: links.linkedin,
      external: true,
    },
    {
      icon: FaGithub,
      label: "GitHub",
      handle: "chinmoy17",
      href: links.github,
      external: true,
    },
  ];

  return (
    <main className="max-w-container mx-auto px-8 pt-24 pb-xl">

      {/* ===== HEADER ===== */}
      <section className="mb-xl">
        <Reveal>
          <p className="font-inter text-label-caps text-on-surface-variant uppercase mb-4 tracking-[0.1em]">
            Get in Touch
          </p>
          <h1 className="font-newsreader text-h1 text-ink mb-6">Contact</h1>
          <div className="h-[1px] w-16 bg-ink mb-6" />
          <p className="font-inter text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Open to research collaborations, enterprise AI projects, and conversations
            about what you're building. Pick a channel below or just say hi.
          </p>
        </Reveal>
      </section>

      {/* ===== WHAT I'M OPEN TO ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-[0.85rem] left-0 bg-surface pr-6 font-newsreader text-[1.3rem] text-ink leading-none">
          What I'm Open To
        </span>
      </div>

      <section className="mb-xl grid grid-cols-1 md:grid-cols-2 gap-x-16">
        {openTo.map((item, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="border-t border-surface-variant pt-5 pb-8">
              <p className="font-inter text-[0.62rem] uppercase tracking-[0.14em] text-on-surface-variant/40 mb-2">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-newsreader text-[1.2rem] text-ink mb-2 leading-tight">
                {item.label}
              </h3>
              <p className="font-inter text-body-md text-on-surface-variant/80 leading-relaxed">
                {item.body}
              </p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ===== CHANNELS ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-[0.85rem] left-0 bg-surface pr-6 font-newsreader text-[1.3rem] text-ink leading-none">
          Find Me
        </span>
      </div>

      <section className="mb-xl grid grid-cols-1 md:grid-cols-12 gap-12">
        <Reveal className="md:col-span-4">
          <p className="font-newsreader text-[1.5rem] italic text-ink/80 leading-relaxed">
            Currently at Dexian Bangladesh. Always interested in what's being
            built next.
          </p>
        </Reveal>

        <div className="md:col-span-8">
          {channels.map((ch, i) => (
            <Reveal key={i} delay={i * 80}>
              <a
                href={ch.href}
                target={ch.external ? "_blank" : undefined}
                rel={ch.external ? "noopener noreferrer" : undefined}
                className={`flex items-center justify-between py-5 no-underline group transition-opacity hover:opacity-70 ${
                  i < channels.length - 1 ? "border-b border-surface-variant" : ""
                }`}
              >
                <div className="flex items-center gap-5">
                  <ch.icon className="text-ink text-[1.05rem] shrink-0" />
                  <span className="font-inter text-[0.65rem] uppercase tracking-[0.14em] text-on-surface-variant/40 w-16 shrink-0">
                    {ch.label}
                  </span>
                  <span className="font-newsreader text-[1.2rem] text-ink">
                    {ch.handle}
                  </span>
                </div>
                <span className="font-inter text-on-surface-variant/30 group-hover:text-ink transition-colors text-lg">
                  →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== CLOSING ===== */}
      <Reveal>
        <div className="w-full h-px bg-surface-variant mb-xl" />
      </Reveal>

      <section className="pb-16">
        <Reveal delay={100}>
          <p className="font-newsreader text-[1.5rem] italic text-ink/80 max-w-xl leading-relaxed mb-6">
            The best conversations start with a simple message.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <a
            href={`mailto:${links.email}`}
            className="font-inter text-body-md text-ink border-b border-ink/40 pb-1 hover:border-ink transition-colors no-underline"
          >
            {links.email}
          </a>
        </Reveal>
      </section>

    </main>
  );
}

export default Contact;
