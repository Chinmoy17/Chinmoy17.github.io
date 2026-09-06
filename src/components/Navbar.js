import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SiGooglescholar } from "react-icons/si";
import resumeData from "../data/resume.json";

const scholarUrl = "https://scholar.google.com/citations?view_op=list_works&hl=en&user=kUignlYAAAAJ";

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Research", path: "/research" },
    { label: "Projects", path: "/project" },
    { label: "Contact", path: "/contact" },
  ];

  const socials = [
    { label: "Google Scholar", url: scholarUrl, Icon: SiGooglescholar, hoverClass: "hover:text-[#4285F4]" },
    { label: "GitHub", url: resumeData.links.github, Icon: FiGithub, hoverClass: "hover:text-[#181717]" },
    { label: "LinkedIn", url: resumeData.links.linkedin, Icon: FiLinkedin, hoverClass: "hover:text-[#0A66C2]" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-nav-bg sticky top-0 w-full z-50 border-b border-surface-variant transition-all duration-300">
      <div className="max-w-container mx-auto px-8 h-20 flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          className="font-newsreader font-bold text-lg tracking-tight text-on-surface no-underline hover:no-underline"
        >
          Chinmoy Mitra
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-newsreader text-base tracking-tight">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`pb-1 transition-colors duration-200 no-underline ${
                isActive(link.path)
                  ? "text-on-surface border-b border-on-surface"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: socials + dark mode toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {socials.map(({ label, url, Icon, hoverClass }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`group relative text-on-surface-variant ${hoverClass} transition-colors duration-200`}
              >
                <Icon size={18} />
                <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded-sm bg-ink text-on-ink font-inter text-[0.62rem] uppercase tracking-[0.08em] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">
                  {label}
                </span>
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[1.5px] bg-on-surface transition-transform duration-200 ${
                mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-on-surface transition-opacity duration-200 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-on-surface transition-transform duration-200 ${
                mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-nav-bg border-t border-surface-variant px-8 py-6">
          <div className="flex flex-col gap-4 font-newsreader text-base">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`no-underline transition-colors duration-200 ${
                  isActive(link.path)
                    ? "text-on-surface font-medium"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-5 mt-6 pt-6 border-t border-surface-variant">
            {socials.map(({ label, url, Icon, hoverClass }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`text-on-surface-variant ${hoverClass} transition-colors duration-200`}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
