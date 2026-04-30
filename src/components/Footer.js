import React from "react";
import resumeData from "../data/resume.json";

function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: "GitHub", url: resumeData.links.github },
    { label: "LinkedIn", url: resumeData.links.linkedin },
    { label: "Email", url: `mailto:${resumeData.links.email}` },
  ];

  return (
    <footer className="bg-nav-bg w-full mt-32 border-t border-surface-variant">
      <div className="max-w-container mx-auto px-8 py-16 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-newsreader text-xs uppercase tracking-[0.1em] text-on-surface">
          &copy; {year} AI/ML Research Portfolio. Precision in Code.
        </div>
        <div className="flex gap-6 font-newsreader text-xs uppercase tracking-[0.1em]">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-on-surface transition-opacity duration-200 opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
