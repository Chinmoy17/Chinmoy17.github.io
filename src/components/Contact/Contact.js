import React from "react";
import resumeData from "../../data/resume.json";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Contact() {
  const links = resumeData.links;

  return (
    <main className="max-w-container mx-auto px-8 pt-24 pb-xl">
      <section className="mb-xl">
        <p className="font-inter text-label-caps text-on-surface-variant uppercase mb-4 tracking-[0.1em]">
          Get in Touch
        </p>
        <h1 className="font-newsreader text-h1 text-ink mb-6">Contact</h1>
        <div className="h-[1px] w-16 bg-ink mb-6"></div>
        <p className="font-inter text-body-lg text-on-surface-variant max-w-2xl">
          Interested in collaborating, have a question, or just want to connect?
          Feel free to reach out through any of the channels below.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-xl">
        {/* Email */}
        <a
          href={`mailto:${links.email}`}
          className="border border-surface-variant bg-surface-container-low p-md flex flex-col items-center text-center hover:border-ink transition-colors duration-200 no-underline group"
        >
          <FaEnvelope className="text-ink text-2xl mb-4" />
          <h3 className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-2">
            Email
          </h3>
          <p className="font-inter text-body-md text-ink group-hover:opacity-80">
            {links.email}
          </p>
        </a>

        {/* LinkedIn */}
        <a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-surface-variant bg-surface-container-low p-md flex flex-col items-center text-center hover:border-ink transition-colors duration-200 no-underline group"
        >
          <FaLinkedin className="text-ink text-2xl mb-4" />
          <h3 className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-2">
            LinkedIn
          </h3>
          <p className="font-inter text-body-md text-ink group-hover:opacity-80">
            chinmoy-mitra
          </p>
        </a>

        {/* GitHub */}
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-surface-variant bg-surface-container-low p-md flex flex-col items-center text-center hover:border-ink transition-colors duration-200 no-underline group"
        >
          <FaGithub className="text-ink text-2xl mb-4" />
          <h3 className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-2">
            GitHub
          </h3>
          <p className="font-inter text-body-md text-ink group-hover:opacity-80">
            chinmoy17
          </p>
        </a>
      </section>

      {/* Direct CTA */}
      <section className="border-t border-surface-variant pt-xl text-center">
        <p className="font-inter text-body-lg text-on-surface-variant mb-6">
          Prefer a direct message?
        </p>
        <a
          href={`mailto:${links.email}`}
          className="bg-ink text-on-ink px-8 py-3 font-inter text-label-caps uppercase tracking-[0.1em] hover:bg-surface hover:text-ink border border-ink transition-colors duration-200 no-underline inline-block"
        >
          Send an Email
        </a>
      </section>
    </main>
  );
}

export default Contact;
