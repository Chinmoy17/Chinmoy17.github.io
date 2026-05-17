import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import resumeData from "../../data/resume.json";
import { Reveal } from "../utils/Reveal";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

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
    label: "PhD Opportunities",
    body: "Targeting Fall 2027. If you know of open positions, relevant calls, or labs with strong alignment in NLP or AI systems — a quick note goes a long way. Also open to research volunteering or pre-PhD collaboration to build the right foundation.",
  },
  {
    label: "General Inquiry",
    body: "Just want to connect, share ideas, or talk about what you are building? Feel free to reach out — I reply to everyone.",
  },
];

function ContactForm({ links }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email_address: form.email,
          message: form.message,
          title: "Portfolio Contact Form",
          time: new Date().toLocaleString(),
        },
        { publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY }
      );
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Something went wrong. Please try again or email me directly.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="py-10">
        <p className="font-newsreader text-[1.5rem] italic text-ink mb-3">
          Message sent — thank you!
        </p>
        <p className="font-inter text-body-md text-on-surface-variant mb-6">
          I will get back to you soon.
        </p>
        <button
          onClick={() => setSent(false)}
          className="font-inter text-[0.8rem] text-ink border-b border-ink/40 pb-px hover:border-ink transition-colors bg-transparent cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-inter text-[0.68rem] uppercase tracking-[0.12em] text-ink/60 mb-2 font-semibold">
          Name
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-surface-container-low border border-surface-variant focus:border-ink outline-none font-inter text-[0.95rem] text-ink px-3 py-2.5 transition-colors placeholder:text-on-surface-variant/30"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="block font-inter text-[0.68rem] uppercase tracking-[0.12em] text-ink/60 mb-2 font-semibold">
          Email
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-surface-container-low border border-surface-variant focus:border-ink outline-none font-inter text-[0.95rem] text-ink px-3 py-2.5 transition-colors placeholder:text-on-surface-variant/30"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block font-inter text-[0.68rem] uppercase tracking-[0.12em] text-ink/60 mb-2 font-semibold">
          Message
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-transparent border-b-2 border-surface-variant focus:border-ink outline-none font-inter text-[0.95rem] text-ink py-2.5 transition-colors resize-none placeholder:text-on-surface-variant/30"
          placeholder="What is on your mind?"
        />
      </div>
      {error && (
        <p className="font-inter text-[0.82rem] text-red-600">{error}</p>
      )}
      <div className="pt-3">
        <button
          type="submit"
          disabled={sending}
          className="bg-ink text-on-ink px-10 py-3 font-inter text-label-caps uppercase tracking-[0.1em] hover:bg-ink/90 active:bg-ink/80 transition-colors duration-150 cursor-pointer disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}

function Contact() {
  const links = resumeData.links;

  const channels = [
    {
      icon: FaEnvelope,
      iconColor: "#EA4335",
      label: "Email",
      handle: links.email,
      href: "mailto:" + links.email,
    },
    {
      icon: FaLinkedinIn,
      iconColor: "#0A66C2",
      label: "LinkedIn",
      handle: "chinmoy-mitra",
      href: links.linkedin,
    },
    {
      icon: FaGithub,
      iconColor: "#1c1c19",
      label: "GitHub",
      handle: "chinmoy17",
      href: links.github,
    },
  ];

  return (
    <main className="max-w-container mx-auto px-8 pt-24 pb-16">

      {/* ===== HERO: LEFT info + RIGHT form ===== */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-x-16 gap-y-14 mb-20">

        {/* LEFT — 5 cols */}
        <div className="md:col-span-5">
          <Reveal delay={80}>
            <p className="font-inter text-label-caps text-on-surface-variant uppercase mb-4 tracking-[0.1em]">
              Get in Touch
            </p>
            <h1 className="font-newsreader text-h1 text-ink mb-4">Contact</h1>
            <div className="h-[1px] w-16 bg-ink mb-6" />
            <p className="font-newsreader text-[1.25rem] italic text-ink/80 leading-[1.6] mb-10">
              Open to research collaborations, enterprise AI projects, and
              conversations about what you are building.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p className="font-inter text-[0.68rem] uppercase tracking-[0.14em] text-ink font-semibold mb-5">
              Reach me directly
            </p>
            <div className="space-y-5">
              {channels.map((ch, i) => (
                <a
                  key={i}
                  href={ch.href}
                  target={ch.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={ch.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="flex items-center gap-4 group no-underline"
                >
                  <ch.icon
                    className="text-[1.1rem] shrink-0 transition-transform group-hover:scale-110"
                    style={{ color: ch.iconColor }}
                  />
                  <span className="font-inter text-[0.65rem] uppercase tracking-[0.14em] text-on-surface-variant/50 w-14 shrink-0">
                    {ch.label}
                  </span>
                  <span className="font-inter text-[0.92rem] text-ink border-b border-transparent group-hover:border-ink/40 transition-colors pb-px">
                    {ch.handle}
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* RIGHT — 7 cols */}
        <div className="md:col-span-7">
          <Reveal delay={120}>
            <div className="border-t-2 border-ink pt-8">
              <p className="font-inter text-[0.68rem] uppercase tracking-[0.14em] text-ink font-semibold mb-6">
                Send a Message
              </p>
              <ContactForm links={links} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== WHAT I'M OPEN TO ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span
          className="absolute -top-[0.85rem] left-0 pr-6 font-newsreader text-[1.3rem] text-ink leading-none"
          style={{ background: "#fcf9f4" }}
        >
          What I am Open To
        </span>
      </div>

      <section className="pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-0">
          {openTo.map((item, i) => (
            <Reveal key={i} delay={i * 70}>
              <div className="border-t border-surface-variant pt-5 pb-10">
                <p className="font-inter text-[0.6rem] uppercase tracking-[0.14em] text-on-surface-variant/40 mb-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-newsreader text-[1.1rem] text-ink mb-2 leading-tight">
                  {item.label}
                </h3>
                <p className="font-inter text-[0.85rem] text-on-surface-variant/80 leading-relaxed">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

    </main>
  );
}

export default Contact;
