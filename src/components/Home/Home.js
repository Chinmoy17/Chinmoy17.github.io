import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import myImg from "../../Assets/avatar.png";
import Particle from "../Particle";
import Type from "./Type";
import {
  AiFillGithub,
  AiOutlineMail,
  AiOutlineDownload,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";

function Home() {
  // Research interests are now in prose form below

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
                  I am an AI/ML Application Developer at <b>Dexian Bangladesh</b> and a published researcher specializing in the intersection of <b className="purple">Large Language Models (LLMs)</b> and <b className="purple">Medical Deep Learning</b>. I bridge the gap between theoretical research and production-grade systems, focusing on agentic workflows, RAG pipelines, and evaluation-driven optimization.
                </p>

                <p className="home-about-body" style={{ fontSize: "1.05em", lineHeight: "1.6", color: "var(--color-text)", marginBottom: "18px" }}>
                  Currently, I lead the development of high-impact AI solutions, including <b>Note2Action</b>—a task-prediction system supporting 600+ managers—and <b>AgentFlow</b>, a prompt-to-deployment engine. My recent optimization study using DSPy achieved a 38% cost reduction while maintaining measurable accuracy gains. My technical stack spans the full lifecycle: from PyTorch and FastAPI to Azure MLOps and React.
                </p>

                <p className="home-about-body" style={{ fontSize: "1.05em", lineHeight: "1.6", color: "var(--color-text)", marginBottom: "20px" }}>
                  I hold a <b>B.Sc. in CSE</b> from RUET. My undergraduate thesis on Multiclass Brain Tumor Classification (accepted at IEEE QPAN 2025) achieved 99.50% accuracy through innovative transfer learning. I am now actively seeking <b className="purple">PhD opportunities</b> where I can apply my experience in Agentic AI and Multimodal LLMs to solve complex, high-stakes challenges in Healthcare and Cybersecurity.
                </p>

                <div style={{ marginTop: 20, marginBottom: 25 }}>
                  <Type />
                </div>

                {/* CTA Row with Resume Download */}
                <div className="home-cta-row" aria-label="Primary actions">
                  <Link className="home-cta home-cta-primary" to="/research">
                    Research & Publications
                  </Link>
                  <Link className="home-cta" to="/project">
                    Engineering Projects
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

          {/* ========== RESEARCH INTERESTS ========== */}
          <Row style={{ marginTop: "30px", marginBottom: "25px" }}>
            <Col md={12}>
              <h2 style={{ fontSize: "1.6em", marginBottom: "8px", color: "var(--color-text)", fontWeight: "bold" }}>
                Research <strong className="purple">Interests</strong>
              </h2>
              <p style={{ color: "var(--color-accent)", fontSize: "1.1em", fontWeight: "600", marginBottom: "16px", fontStyle: "italic" }}>
                Reliable & Multimodal Intelligent Systems
              </p>
              
              <p style={{ color: "var(--color-text)", lineHeight: "1.8", fontSize: "1.02em", marginBottom: "14px" }}>
                <b className="purple">Generative AI & LLM Optimization:</b> I work on evaluation-driven frameworks (DSPy, LangGraph, RAGAS) to move beyond stochastic prompting toward measurable, agentic workflows. I architect RAG-based automation and rapid prototyping platforms requiring high-fidelity generation and logical consistency.
              </p>

              <p style={{ color: "var(--color-text)", lineHeight: "1.8", fontSize: "1.02em", marginBottom: "14px" }}>
                <b className="purple">Medical AI & Multimodal Diagnostics:</b> My thesis on MRI Brain Tumor Classification (IEEE QPAN 2025) achieved 99.50% accuracy via transfer learning. I'm exploring how foundation models can integrate multiple clinical modalities to enhance diagnostic decision support.
              </p>

              <p style={{ color: "var(--color-text)", lineHeight: "1.8", fontSize: "1.02em", margin: 0 }}>
                <b className="purple">Emerging Interest — AI in Cybersecurity:</b> I'm actively studying the dual role of LLMs in security: agentic systems for automated vulnerability detection and repair, alongside defenses against adversarial attacks on LLM-integrated software.
              </p>
            </Col>
          </Row>

          {/* ========== FEATURED WORK SECTION ========== */}
          <Row style={{ marginTop: "25px", marginBottom: "20px" }}>
            <Col md={12}>
              <h2 style={{ fontSize: "1.6em", marginBottom: "15px", color: "var(--color-text)", fontWeight: "bold" }}>
                Featured <strong className="purple">Work</strong>
              </h2>
            </Col>

            <Col md={4} style={{ marginTop: "10px" }}>
              <div style={{ padding: "14px 18px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.02)", height: "100%" }}>
                <h3 style={{ fontSize: "1.1em", color: "var(--color-accent)", margin: "0 0 8px 0" }}>DSPy RAG Optimization</h3>
                <p style={{ fontSize: "0.9em", color: "var(--color-text)", margin: "0 0 10px 0", lineHeight: "1.5" }}>
                  38% cost reduction, 3.2× faster. Collaborative study on automatic prompt optimization.
                </p>
                <Link style={{ fontSize: "0.9em", color: "var(--color-accent)" }} to="/research/dspy-rag-optimization">
                  Research →
                </Link>
              </div>
            </Col>

            <Col md={4} style={{ marginTop: "10px" }}>
              <div style={{ padding: "14px 18px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.02)", height: "100%" }}>
                <h3 style={{ fontSize: "1.1em", color: "var(--color-accent)", margin: "0 0 8px 0" }}>Note2Action</h3>
                <p style={{ fontSize: "0.9em", color: "var(--color-text)", margin: "0 0 10px 0", lineHeight: "1.5" }}>
                  AI task prediction serving 600+ Account Managers. NLP pipeline from notes to actions.
                </p>
                <Link style={{ fontSize: "0.9em", color: "var(--color-accent)" }} to="/project">
                  Projects →
                </Link>
              </div>
            </Col>

            <Col md={4} style={{ marginTop: "10px" }}>
              <div style={{ padding: "14px 18px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.02)", height: "100%" }}>
                <h3 style={{ fontSize: "1.1em", color: "var(--color-accent)", margin: "0 0 8px 0" }}>AgentFlow</h3>
                <p style={{ fontSize: "0.9em", color: "var(--color-text)", margin: "0 0 10px 0", lineHeight: "1.5" }}>
                  Prompt-to-deployment platform. Ship demos in minutes, not weeks.
                </p>
                <Link style={{ fontSize: "0.9em", color: "var(--color-accent)" }} to="/project/agentflow">
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
              <p style={{ fontSize: "1em", color: "var(--color-text)", opacity: 0.9, marginBottom: "12px" }}>
                I’m always open to research discussions and collaboration—especially around LLMs, medical AI, multimodal learning, and evaluation-driven ML systems.
              </p>
              <p style={{ fontSize: "1em", color: "var(--color-text)", opacity: 0.9, marginBottom: "20px" }}>
                I’m also open to industry collaborations, consulting, and building production AI systems with teams who care about measurable quality.
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
              </ul>
            </Col>
          </Row>

        </Container>
      </Container>
    </section>
  );
}

export default Home;
