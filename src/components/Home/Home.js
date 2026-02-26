import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import myImg from "../../Assets/avatar.png";
import Particle from "../Particle";
import Type from "./Type";
import {
  AiFillGithub,
  AiFillInstagram,
  AiOutlineMail,
  AiOutlineDownload,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";

function Home() {
  const researchInterests = [
    "Large Language Models",
    "LLM Agents",
    "Computer Vision",
    "Human-LLM Interaction",
    "AI in Healthcare",
    "Trustworthy AI",
    "Machine Learning Applications",
    "Medical AI",
    "Multi-Agent Systems",
    "Natural Language Processing",
    "Deep Learning Algorithms",
    "RAG Systems"
  ];

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          {/* ========== HERO SECTION ========== */}
          <Row>
            <Col md={8} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> CHINMOY MITRA</strong>
              </h1>

              <p className="home-role-line">
                <span className="purple">Application Developer (AI/ML)</span> @ Dexian Bangladesh
              </p>

              <div style={{ paddingLeft: 50, paddingTop: 15, textAlign: "left" }}>
                {/* Descriptive Introduction */}
                <p className="home-about-body" style={{ fontSize: "1.1em", lineHeight: "1.7", color: "var(--color-text)", marginBottom: "18px" }}>
                  My expertise lies in designing and developing <b className="purple">AI-powered applications</b>, with a particular focus on <b className="purple">Large Language Models (LLMs)</b>, agentic workflows, and evaluation-driven systems. I specialize in building <b className="purple">production-ready RAG pipelines</b>, multi-agent architectures, and enterprise AI solutions that bridge research and real-world deployment.
                </p>

                <p className="home-about-body" style={{ fontSize: "1.05em", lineHeight: "1.6", color: "var(--color-text)", marginBottom: "18px" }}>
                  Currently at <b>Dexian Bangladesh</b>, I develop AI/ML solutions including <b>Note2Action</b> (AI task prediction for 600+ Account Managers), <b>AgentFlow</b> (modular AI workflow platform), and <b>BM Product Accelerator</b> (generates POCs from PRD prompts). My work emphasizes reliability, measurable quality, and production readiness.
                </p>

                <p className="home-about-body" style={{ fontSize: "1.05em", lineHeight: "1.6", color: "var(--color-text)", marginBottom: "20px" }}>
                  I hold a <b>B.Sc. in Computer Science and Engineering</b> from RUET with <b>IEEE publication</b> on brain tumor classification achieving ~99.50% accuracy. My research bridges engineering and academia through DSPy optimization, MCP patterns, and fine-tuning methodologies.
                </p>

                <div style={{ marginTop: 20, marginBottom: 25 }}>
                  <Type />
                </div>

                {/* CTA Row with Resume Download */}
                <div className="home-cta-row" aria-label="Primary actions">
                  <Link className="home-cta home-cta-primary" to="/project">
                    View Projects
                  </Link>
                  <Link className="home-cta" to="/research">
                    Research & Publications
                  </Link>
                  <Link
                    className="home-cta home-cta-download"
                    to="/resume"
                    title="View Resume"
                  >
                    <AiOutlineDownload style={{ marginRight: 6 }} />
                    Resume
                  </Link>
                </div>
              </div>
            </Col>

            <Col md={4} style={{ paddingBottom: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img
                src={myImg}
                alt="Chinmoy Mitra"
                className="img-fluid"
                style={{
                  maxHeight: "280px",
                  borderRadius: "12px",
                  border: "3px solid rgba(255,255,255,0.1)"
                }}
              />
            </Col>
          </Row>

          {/* ========== EXPERTISE & RESEARCH INTERESTS (MERGED) ========== */}
          <Row style={{ marginTop: "30px", marginBottom: "25px" }}>
            <Col md={12}>
              <h2 style={{ fontSize: "1.6em", marginBottom: "15px", color: "var(--color-text)", fontWeight: "bold" }}>
                Expertise & <strong className="purple">Research Interests</strong>
              </h2>
              <Row>
                <Col md={6}>
                  <h4 style={{ fontSize: "1.1em", color: "var(--color-accent)", marginBottom: "10px" }}>Core Skills</h4>
                  <ul style={{ color: "var(--color-text)", lineHeight: "1.8", paddingLeft: "20px", margin: 0 }}>
                    <li>Generative AI & LLMs (RAG, Agentic Workflows, DSPy)</li>
                    <li>Full-Stack Engineering (FastAPI, React, Docker, Azure)</li>
                    <li>ML/DL & Computer Vision (PyTorch, TensorFlow, OpenCV)</li>
                    <li>IEEE Published Researcher</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h4 style={{ fontSize: "1.1em", color: "var(--color-accent)", marginBottom: "10px" }}>Research Interests</h4>
                  <ul style={{ color: "var(--color-text)", lineHeight: "1.8", paddingLeft: "20px", margin: 0 }}>
                    {researchInterests.slice(0, 6).map((interest, idx) => (
                      <li key={idx}>{interest}</li>
                    ))}
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* ========== FEATURED WORK SECTION ========== */}
          <Row style={{ marginTop: "25px", marginBottom: "20px" }}>
            <Col md={12}>
              <h2 style={{ fontSize: "1.6em", marginBottom: "15px", color: "var(--color-text)", fontWeight: "bold" }}>
                Featured <strong className="purple">Work</strong>
              </h2>
            </Col>

            <Col md={6} style={{ marginTop: "10px" }}>
              <div style={{ padding: "14px 18px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.02)" }}>
                <h3 style={{ fontSize: "1.1em", color: "var(--color-accent)", margin: "0 0 8px 0" }}>AgentFlow</h3>
                <p style={{ fontSize: "0.95em", color: "var(--color-text)", margin: "0 0 10px 0", lineHeight: "1.5" }}>
                  Prompt-to-app deployment, MCP-inspired tool discovery. Demo in minutes.
                </p>
                <Link style={{ fontSize: "0.9em", color: "var(--color-accent)" }} to="/project/agentflow">
                  Case Study →
                </Link>
              </div>
            </Col>

            <Col md={6} style={{ marginTop: "10px" }}>
              <div style={{ padding: "14px 18px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.02)" }}>
                <h3 style={{ fontSize: "1.1em", color: "var(--color-accent)", margin: "0 0 8px 0" }}>DSPy RAG Optimization</h3>
                <p style={{ fontSize: "0.95em", color: "var(--color-text)", margin: "0 0 10px 0", lineHeight: "1.5" }}>
                  38% cost reduction, 3.2× faster, +9.6% accuracy with automatic prompt optimization.
                </p>
                <Link style={{ fontSize: "0.9em", color: "var(--color-accent)" }} to="/research/dspy-rag-optimization">
                  Case Study →
                </Link>
              </div>
            </Col>

            <Col md={12} style={{ marginTop: "12px" }}>
              <Link to="/project" style={{ fontSize: "0.95em", color: "var(--color-accent)" }}>
                View all projects →
              </Link>
            </Col>
          </Row>

          {/* ========== CONTACT SECTION ========== */}
          <Row style={{ marginTop: "30px", marginBottom: "30px" }}>
            <Col md={12}>
              <h2 style={{ fontSize: "1.6em", color: "var(--color-text)", marginBottom: "15px", fontWeight: "bold" }}>
                Let's <strong className="purple">Connect</strong>
              </h2>
              <p style={{ fontSize: "1em", color: "var(--color-text)", opacity: 0.9, marginBottom: "8px" }}>
                I am always open to discussing new opportunities, research collaborations, or simply having a conversation.
              </p>
              <p style={{ fontSize: "1em", color: "var(--color-text)", opacity: 0.9, marginBottom: "20px" }}>
                Whether you are a <b>professor</b> exploring potential research candidates, a <b>recruiter</b> seeking AI/ML talent, or a <b>fellow engineer</b> interested in collaboration — I would be happy to connect.
              </p>

              <ul className="home-about-social-links" style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", gap: "15px", flexWrap: "wrap" }}>
                <li className="social-icons">
                  <a href="https://github.com/chinmoy17" target="_blank" rel="noreferrer" className="icon-colour home-social-icons" title="GitHub">
                    <AiFillGithub />
                  </a>
                </li>
                <li className="social-icons">
                  <a href="https://www.linkedin.com/in/chinmoy-mitra/" target="_blank" rel="noreferrer" className="icon-colour home-social-icons" title="LinkedIn">
                    <FaLinkedinIn />
                  </a>
                </li>
                <li className="social-icons">
                  <a href="mailto:rudrochinmoy@gmail.com" className="icon-colour home-social-icons" title="Email">
                    <AiOutlineMail />
                  </a>
                </li>
                <li className="social-icons">
                  <a href="https://scholar.google.com/citations?view_op=list_works&hl=en&user=kUignlYAAAAJ" target="_blank" rel="noreferrer" className="icon-colour home-social-icons" title="Google Scholar">
                    <SiGooglescholar />
                  </a>
                </li>
                <li className="social-icons">
                  <a href="https://www.instagram.com/chinmoy.17/" target="_blank" rel="noreferrer" className="icon-colour home-social-icons" title="Instagram">
                    <AiFillInstagram />
                  </a>
                </li>
              </ul>
            </Col>
          </Row>

        </Container>
      </Container>
    </section>
  );
}

export default Home;
