import React from "react";
import { Container, Row, Col } from "react-bootstrap";
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
import { 
  SiPytorch, SiReact, SiDocker, SiPython, SiFastapi, 
  SiMicrosoftazure, SiNextdotjs, SiPostgresql 
} from "react-icons/si";

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

              <div style={{ paddingLeft: 50, paddingTop: 20, textAlign: "left" }}>
                <p className="home-about-body" style={{ fontSize: "1.2em", lineHeight: "1.6", color: "var(--color-text)" }}>
                  <b className="purple">Bridging the gap</b> between Academic Research and Production Engineering.
                  <br /><br />
                  As an <b>AI Practitioner</b>, I architect intelligent agents and RAG systems that solve complex real-world problems.
                  <br />
                  My background spans from publishing in <b>IEEE</b> to building scalable <b>Full-Stack Applications</b>.
                </p>
                
                <div style={{ marginTop: 30, marginBottom: 30 }}>
                  <Type />
                </div>

                {/* Tech Stack Expanded */}
                <div style={{ display: "flex", gap: "12px", marginBottom: "25px", flexWrap: "wrap", opacity: 0.95 }}>
                    <div className="tech-badge" style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(55, 118, 171, 0.1)", padding: "6px 14px", borderRadius: "8px", border: "1px solid rgba(55, 118, 171, 0.2)"}}>
                        <SiPython style={{ color: "#3776AB" }} /> <span style={{fontSize: "0.9em", fontWeight: "600"}}>Python</span>
                    </div>
                    <div className="tech-badge" style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(238, 76, 44, 0.1)", padding: "6px 14px", borderRadius: "8px", border: "1px solid rgba(238, 76, 44, 0.2)"}}>
                        <SiPytorch style={{ color: "#EE4C2C" }} /> <span style={{fontSize: "0.9em", fontWeight: "600"}}>PyTorch</span>
                    </div>
                    <div className="tech-badge" style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(0, 150, 136, 0.1)", padding: "6px 14px", borderRadius: "8px", border: "1px solid rgba(0, 150, 136, 0.2)"}}>
                        <SiFastapi style={{ color: "#009688" }} /> <span style={{fontSize: "0.9em", fontWeight: "600"}}>FastAPI</span>
                    </div>
                    <div className="tech-badge" style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(0, 120, 212, 0.1)", padding: "6px 14px", borderRadius: "8px", border: "1px solid rgba(0, 120, 212, 0.2)"}}>
                        <SiMicrosoftazure style={{ color: "#0078D4" }} /> <span style={{fontSize: "0.9em", fontWeight: "600"}}>Azure</span>
                    </div>
                    <div className="tech-badge" style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(97, 218, 251, 0.1)", padding: "6px 14px", borderRadius: "8px", border: "1px solid rgba(97, 218, 251, 0.2)"}}>
                        <SiReact style={{ color: "#61DAFB" }} /> <span style={{fontSize: "0.9em", fontWeight: "600"}}>React</span>
                    </div>
                    <div className="tech-badge" style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(36, 150, 237, 0.1)", padding: "6px 14px", borderRadius: "8px", border: "1px solid rgba(36, 150, 237, 0.2)"}}>
                        <SiDocker style={{ color: "#2496ED" }} /> <span style={{fontSize: "0.9em", fontWeight: "600"}}>Docker</span>
                    </div>
                    <div className="tech-badge" style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(0, 0, 0, 0.05)", padding: "6px 14px", borderRadius: "8px", border: "1px solid rgba(0, 0, 0, 0.2)"}}>
                        <SiNextdotjs style={{ color: "black" }} /> <span style={{fontSize: "0.9em", fontWeight: "600"}}>Next.js</span>
                    </div>
                     <div className="tech-badge" style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(51, 103, 145, 0.1)", padding: "6px 14px", borderRadius: "8px", border: "1px solid rgba(51, 103, 145, 0.2)"}}>
                        <SiPostgresql style={{ color: "#336791" }} /> <span style={{fontSize: "0.9em", fontWeight: "600"}}>PostgreSQL</span>
                    </div>
                </div>

                <ul className="home-about-social-links" style={{ justifyContent: "left", paddingTop: 10 }}>
                  <li className="social-icons">
                    <a
                      href="https://github.com/chinmoy17"
                      target="_blank"
                      rel="noreferrer"
                      className="icon-colour  home-social-icons"
                      aria-label="github"
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
                      aria-label="linkedin"
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
                      aria-label="instagram"
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

          <Row style={{ marginTop: "50px", marginBottom: "50px", justifyContent: "center", gap: "20px" }}>
            <h2 style={{ fontSize: "2.4em", marginBottom: "30px", marginTop: "20px", color: "var(--color-text)", fontWeight: "bold" }}>
              My Area of <strong className="purple">Expertise</strong>
            </h2>
            
            <Col md={3} className="home-about-social" style={{ background: "rgba(255,255,255,0.4)", borderRadius: "15px", padding: "30px", border: "1px solid var(--glass-border)", boxShadow: "var(--shadow-1)" }}>
               <div style={{ fontSize: "3em", color: "var(--color-accent)", marginBottom: "15px" }}><FaBrain /></div>
               <h3 style={{ fontSize: "1.3em", marginBottom: "10px", fontWeight: "700" }}>Generative AI & LLMs</h3>
               <p style={{ fontSize: "1em", color: "var(--color-text)", opacity: 0.9 }}>
                 Specializing in <b>Agentic Workflows</b>, RAG pipelines, and fine-tuning Large Language Models for custom enterprise solutions.
               </p>
            </Col>

            <Col md={3} className="home-about-social" style={{ background: "rgba(255,255,255,0.4)", borderRadius: "15px", padding: "30px", border: "1px solid var(--glass-border)", boxShadow: "var(--shadow-1)" }}>
               <div style={{ fontSize: "3em", color: "var(--color-accent)", marginBottom: "15px" }}><FaServer /></div>
               <h3 style={{ fontSize: "1.3em", marginBottom: "10px", fontWeight: "700" }}>Full-Stack Engineering</h3>
               <p style={{ fontSize: "1em", color: "var(--color-text)", opacity: 0.9 }}>
                 Building robust, scalable web applications using <b>FastAPI, React,</b> and <b>Docker</b>. From database design to frontend deployment.
               </p>
            </Col>
            
            <Col md={3} className="home-about-social" style={{ background: "rgba(255,255,255,0.4)", borderRadius: "15px", padding: "30px", border: "1px solid var(--glass-border)", boxShadow: "var(--shadow-1)" }}>
               <div style={{ fontSize: "3em", color: "var(--color-accent)", marginBottom: "15px" }}><FaCode /></div>
               <h3 style={{ fontSize: "1.3em", marginBottom: "10px", fontWeight: "700" }}>Algorithms & Research</h3>
               <p style={{ fontSize: "1em", color: "var(--color-text)", opacity: 0.9 }}>
                 Published <b>IEEE</b> author with a deep understanding of Data Structures, Algorithms, Transfer Learning, and Computer Vision.
               </p>
            </Col>
          </Row>

        </Container>
      </Container>
    </section>
  );
}

export default Home;
