import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Projects", path: "/project" },
    { label: "Research", path: "/research" },
    { label: "Contact", path: "/contact" },
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

        {/* Right: Dark mode toggle */}
        <div className="flex items-center gap-4">
          <button
            className="text-on-surface hover:text-on-surface-variant transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            <MdDarkMode size={22} />
          </button>

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
        </div>
      )}
    </nav>
  );
}

export default NavBar;
