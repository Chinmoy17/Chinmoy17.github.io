import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";
import Particle from "../Particle";
import Type from "./Type";
// import Github from "../About/Github";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn, FaBrain, FaServer, FaCode } from "react-icons/fa";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
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
                <span className="purple">Application Developer (AI/ML)</span> @ Dexian
              </p>

              <div style={{ paddingLeft: 50, paddingTop: 20, textAlign: "left" }}>
                <p className="home-about-body" style={{ fontSize: "1.2em", lineHeight: "1.6", color: "var(--color-text)" }}>
                  I’m an <b className="purple">Application Developer (AI/ML)</b> at <b>Dexian</b>, building agentic AI features and evaluation-driven LLM systems for real production workflows.
                  <br /><br />
                  My focus is making LLM/RAG pipelines <b>reliable</b>: measurable quality, predictable latency/cost, and clean engineering.
                  <br /><br />
                  I enjoy translating cutting-edge research into production—validating new ideas through case studies, then engineering them into dependable systems. I’ve published in <b>IEEE</b> and am currently working toward new publications.
                </p>
                
                <div style={{ marginTop: 30, marginBottom: 30 }}>
                  <Type />
                </div>

                <div className="home-cta-row" aria-label="Primary actions">
                  <Link className="home-cta home-cta-primary" to="/project">
                    View Projects
                  </Link>
                  <Link className="home-cta" to="/research">
                    Research Highlights
                  </Link>
                </div>

                <div className="home-connect-label">Connect with me</div>

                <ul className="home-about-social-links" style={{ justifyContent: "left", paddingTop: 10 }}>
                  <li className="social-icons">
                    <a
                      href="https://github.com/chinmoy17"
                      target="_blank"
                      rel="noreferrer"
                      className="icon-colour  home-social-icons"
                      data-platform="github"
                      aria-label="github"
                      title="GitHub"
                    >
                      <AiFillGithub />
                    </a>
                  </li>
                  <li className="social-icons">
                    <a
                      href="https://www.linkedin.com/in/chinmoy-mitra/"
                      target="_blank"
                      rel="noreferrer"
                      className="icon-colour  home-social-icons"
                      data-platform="linkedin"
                      aria-label="linkedin"
                      title="LinkedIn"
                    >
                      <FaLinkedinIn />
                    </a>
                  </li>
                  <li className="social-icons">
                    <a
                      href="https://www.instagram.com/chinmoy.17/"
                      target="_blank"
                      rel="noreferrer"
                      className="icon-colour home-social-icons"
                      data-platform="instagram"
                      aria-label="instagram"
                      title="Instagram"
                    >
                      <AiFillInstagram />
                    </a>
                  </li>
                </ul>
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Tilt>
                <img
                  src={myImg}
                  alt="home pic"
                  className="img-fluid"
                  style={{ 
                    maxHeight: "350px", 
                    borderRadius: "20px", 
                    border: "5px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 0 30px rgba(39, 76, 119, 0.4)"
                  }}
                />
              </Tilt>
            </Col>
          </Row>

          <Row style={{ marginTop: "35px", marginBottom: "30px" }}>
            <Col md={12}>
              <h2 className="home-featured-title">
                Featured <strong className="purple">Work</strong>
              </h2>
              <p className="home-featured-subtitle">
                A quick way to explore my most representative projects and research.
              </p>
            </Col>

            <Col md={4} style={{ marginTop: "14px" }}>
              <div className="home-featured-card glass-surface">
                <div className="home-featured-kicker">Featured Project</div>
                <h3 className="home-featured-card-title">Agentflow</h3>
                <p className="home-featured-card-body">
                  Prompt-to-app workflow that scaffolds an application and deployment pipeline end-to-end.
                </p>
                <Link className="home-featured-link" to="/project">
                  Explore in Projects →
                </Link>
              </div>
            </Col>

            <Col md={4} style={{ marginTop: "14px" }}>
              <div className="home-featured-card glass-surface">
                <div className="home-featured-kicker">Featured Project</div>
                <h3 className="home-featured-card-title">DemoFactory (DSPy)</h3>
                <p className="home-featured-card-body">
                  Enterprise LLM pipeline with evaluation-driven prompting and measurable improvements.
                </p>
                <Link className="home-featured-link" to="/project">
                  Explore in Projects →
                </Link>
              </div>
            </Col>

            <Col md={4} style={{ marginTop: "14px" }}>
              <div className="home-featured-card glass-surface">
                <div className="home-featured-kicker">Now Reading</div>
                <h3 className="home-featured-card-title">RLM + DSPy in Practice</h3>
                <p className="home-featured-card-body">
                  Notes and takeaways from recent research, plus how it maps to real-world systems.
                </p>
                <Link className="home-featured-link" to="/research">
                  Explore in Research →
                </Link>
              </div>
            </Col>
          </Row>

          <Row style={{ marginTop: "50px", marginBottom: "50px", justifyContent: "center", gap: "20px" }}>
            <h2 style={{ fontSize: "2.4em", marginBottom: "30px", marginTop: "20px", color: "var(--color-text)", fontWeight: "bold" }}>
              My Area of <strong className="purple">Expertise</strong>
            </h2>

            <p className="home-expertise-intro">
              Explore what I build most often—each area links to relevant projects or research.
            </p>
            
            <Col md={3} className="home-about-social" style={{ background: "rgba(255,255,255,0.4)", borderRadius: "15px", padding: "30px", border: "1px solid var(--glass-border)", boxShadow: "var(--shadow-1)" }}>
               <div style={{ fontSize: "3em", color: "var(--color-accent)", marginBottom: "15px" }}><FaBrain /></div>
               <h3 style={{ fontSize: "1.3em", marginBottom: "10px", fontWeight: "700" }}>Generative AI & LLMs</h3>
               <p style={{ fontSize: "1em", color: "var(--color-text)", opacity: 0.9 }}>
                 Specializing in <b>Agentic Workflows</b>, RAG pipelines, and fine-tuning Large Language Models for custom enterprise solutions.
               </p>
              <Link className="home-expertise-link" to="/project">Explore →</Link>
            </Col>

            <Col md={3} className="home-about-social" style={{ background: "rgba(255,255,255,0.4)", borderRadius: "15px", padding: "30px", border: "1px solid var(--glass-border)", boxShadow: "var(--shadow-1)" }}>
               <div style={{ fontSize: "3em", color: "var(--color-accent)", marginBottom: "15px" }}><FaServer /></div>
               <h3 style={{ fontSize: "1.3em", marginBottom: "10px", fontWeight: "700" }}>Full-Stack Engineering</h3>
               <p style={{ fontSize: "1em", color: "var(--color-text)", opacity: 0.9 }}>
                 Building robust, scalable web applications using <b>FastAPI, React,</b> and <b>Docker</b>. From database design to frontend deployment.
               </p>
              <Link className="home-expertise-link" to="/project">Explore →</Link>
            </Col>
            
            <Col md={3} className="home-about-social" style={{ background: "rgba(255,255,255,0.4)", borderRadius: "15px", padding: "30px", border: "1px solid var(--glass-border)", boxShadow: "var(--shadow-1)" }}>
               <div style={{ fontSize: "3em", color: "var(--color-accent)", marginBottom: "15px" }}><FaCode /></div>
               <h3 style={{ fontSize: "1.3em", marginBottom: "10px", fontWeight: "700" }}>Machine Learning, Deep Learning & Research</h3>
               <p style={{ fontSize: "1em", color: "var(--color-text)", opacity: 0.9 }}>
                 Published <b>IEEE</b> author with research-driven experience across <b>Computer Vision</b>, <b>Transfer Learning</b>, and applied <b>ML/DL</b> experimentation.
               </p>
              <Link className="home-expertise-link" to="/research">Explore →</Link>
            </Col>
          </Row>

        </Container>
      </Container>
    </section>
  );
}

export default Home;
