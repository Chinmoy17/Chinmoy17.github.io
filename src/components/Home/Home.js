import React from "react";
import { Link } from "react-router-dom";
import resumeData from "../../data/resume.json";
import avatarImg from "../../Assets/avatar.png";
import {
  AiFillGithub,
  AiOutlineMail,
  AiOutlineDownload,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";
import styles from "./Home.module.css";

function Home() {
  const featuredProjects = resumeData.projects.filter((p) => p.featured);
  const scholarUrl = resumeData.publications?.[0]?.scholarProfile;

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.page}>
      {/* ===== LEFT SIDEBAR ===== */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarInner}>
          <img
            src={avatarImg}
            alt="Chinmoy Mitra"
            className={styles.avatar}
          />

          <h1 className={styles.name}>Chinmoy Mitra</h1>
          <p className={styles.title}>
            AI/ML Application Developer &amp; Researcher
          </p>
          <p className={styles.affiliation}>Dexian Bangladesh</p>

          <div className={styles.socialRow}>
            <a
              href={resumeData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <AiFillGithub />
            </a>
            <a
              href={resumeData.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            {scholarUrl && (
              <a
                href={scholarUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Scholar"
              >
                <SiGooglescholar />
              </a>
            )}
            <a
              href={`mailto:${resumeData.links.email}`}
              aria-label="Email"
            >
              <AiOutlineMail />
            </a>
          </div>

          <hr className={styles.divider} />

          <nav className={styles.sideNav}>
            <a
              href="#about"
              className={styles.sideNavLink}
              onClick={(e) => handleNavClick(e, "about")}
            >
              About
            </a>
            <a
              href="#research-interests"
              className={styles.sideNavLink}
              onClick={(e) => handleNavClick(e, "research-interests")}
            >
              Research Interests
            </a>
            <a
              href="#selected-work"
              className={styles.sideNavLink}
              onClick={(e) => handleNavClick(e, "selected-work")}
            >
              Selected Work
            </a>
            <a
              href="#news"
              className={styles.sideNavLink}
              onClick={(e) => handleNavClick(e, "news")}
            >
              News
            </a>
          </nav>

          <Link to="/resume" className={styles.cvButton}>
            <AiOutlineDownload /> Download CV
          </Link>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className={styles.main}>
        {/* --- About --- */}
        <section id="about" className={styles.section}>
          <h2 className={styles.sectionTitle}>About</h2>
          <p className={styles.aboutText}>
            I am an AI/ML Application Developer at{" "}
            <strong className={styles.accent}>Dexian Bangladesh</strong> and a
            published researcher working at the intersection of{" "}
            <strong className={styles.accent}>Large Language Models</strong> and{" "}
            <strong className={styles.accent}>Medical Deep Learning</strong>. I
            build production-grade systems — agentic workflows, RAG pipelines,
            and evaluation-driven optimization frameworks.
          </p>
          <p className={styles.aboutText}>
            My recent work includes <strong>Note2Action</strong>, a
            task-prediction system supporting 600+ managers, and{" "}
            <strong>AgentFlow</strong>, a prompt-to-deployment engine. A
            collaborative DSPy optimization study achieved 38% cost reduction
            while maintaining measurable accuracy gains. My technical stack spans
            the full lifecycle: from PyTorch and FastAPI to Azure MLOps and
            React.
          </p>
          <p className={styles.aboutText}>
            I hold a B.Sc. in CSE from RUET. My undergraduate thesis on
            Multiclass Brain Tumor Classification (accepted at IEEE QPAN 2025)
            achieved 99.50% accuracy via transfer learning. I am actively
            seeking{" "}
            <strong className={styles.accent}>PhD opportunities</strong> in
            Agentic AI and Multimodal LLMs applied to Healthcare and
            Cybersecurity.
          </p>
        </section>

        {/* --- Research Interests --- */}
        <section id="research-interests" className={styles.section}>
          <h2 className={styles.sectionTitle}>Research Interests</h2>
          <ul className={styles.interestList}>
            <li className={styles.interestItem}>
              <strong>Generative AI &amp; LLM Optimization</strong> —
              Evaluation-driven frameworks (DSPy, LangGraph, RAGAS) for
              measurable agentic workflows, RAG automation, and rapid
              prototyping platforms.
            </li>
            <li className={styles.interestItem}>
              <strong>Medical AI &amp; Multimodal Diagnostics</strong> —
              Transfer learning for MRI classification, integrating foundation
              models across clinical modalities for diagnostic decision support.
            </li>
            <li className={styles.interestItem}>
              <strong>AI in Cybersecurity</strong> — Agentic systems for
              automated vulnerability detection and repair, defenses against
              adversarial attacks on LLM-integrated software.
            </li>
          </ul>
        </section>

        {/* --- Selected Work --- */}
        <section id="selected-work" className={styles.section}>
          <h2 className={styles.sectionTitle}>Selected Work</h2>
          <div className={styles.workGrid}>
            {featuredProjects.map((project) => (
              <div key={project.id} className={styles.workCard}>
                <h3 className={styles.workCardTitle}>{project.title}</h3>
                <p className={styles.workCardDesc}>{project.summary}</p>
                <Link
                  to={`/project/${project.slug}`}
                  className={styles.workCardLink}
                >
                  View details &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* --- News --- */}
        <section id="news" className={styles.section}>
          <h2 className={styles.sectionTitle}>News</h2>
          <ul className={styles.newsList}>
            <li className={styles.newsItem}>
              <span className={styles.newsDate}>2025</span>
              <span>
                Paper accepted at IEEE QPAN 2025 — Multiclass Brain Tumor
                Classification via Transfer Learning (99.50% accuracy)
              </span>
            </li>
            <li className={styles.newsItem}>
              <span className={styles.newsDate}>2025</span>
              <span>
                Completed DSPy RAG optimization study — 38% cost reduction, 3.2x
                faster inference in production
              </span>
            </li>
            <li className={styles.newsItem}>
              <span className={styles.newsDate}>2024</span>
              <span>
                Joined Dexian Bangladesh as AI/ML Application Developer —
                building Note2Action, AgentFlow, and DemoFactory
              </span>
            </li>
            <li className={styles.newsItem}>
              <span className={styles.newsDate}>2024</span>
              <span>
                Graduated B.Sc. in Computer Science &amp; Engineering from RUET
              </span>
            </li>
          </ul>
        </section>
      </main>
    </section>
  );
}

export default Home;
