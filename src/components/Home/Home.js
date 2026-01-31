import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";
import Particle from "../Particle";
import Type from "./Type";
import {
  AiFillGithub,
  AiFillInstagram,
  AiOutlineMail,
  AiOutlineDownload,
} from "react-icons/ai";
import { FaLinkedinIn, FaBrain, FaServer, FaCode, FaGraduationCap, FaFileAlt } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          {/* ========== HERO SECTION ========== */}
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
                <span className="purple">Application Developer (AI/ML)</span> @ Dexian Bangladesh
              </p>

              <div style={{ paddingLeft: 50, paddingTop: 20, textAlign: "left" }}>
                {/* Punchy Value Proposition */}
                <p className="home-about-body" style={{ fontSize: "1.2em", lineHeight: "1.7", color: "var(--color-text)" }}>
                  I ship <b className="purple">production-ready AI systems</b>—from agentic workflows and RAG pipelines to evaluation-driven LLM applications.
                </p>
                <p className="home-about-body" style={{ fontSize: "1.1em", lineHeight: "1.6", color: "var(--color-text)", marginTop: "-10px" }}>
                  My work bridges <b>research and engineering</b>: I take cutting-edge ideas (DSPy, MCP, fine-tuning), validate them rigorously, and turn them into <b>reliable, measurable systems</b> for enterprise use.
                </p>
                
                <div style={{ marginTop: 25, marginBottom: 25 }}>
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

                <div className="home-connect-label">Connect with me</div>

                <ul className="home-about-social-links" style={{ justifyContent: "left", paddingTop: 10 }}>
                  <li className="social-icons">
                    <a
                      href="https://github.com/chinmoy17"
                      target="_blank"
                      rel="noreferrer"
                      className="icon-colour home-social-icons"
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
                      className="icon-colour home-social-icons"
                      data-platform="linkedin"
                      aria-label="linkedin"
                      title="LinkedIn"
                    >
                      <FaLinkedinIn />
                    </a>
                  </li>
                  <li className="social-icons">
                    <a
                      href="https://scholar.google.com/citations?view_op=list_works&hl=en&user=kUignlYAAAAJ"
                      target="_blank"
                      rel="noreferrer"
                      className="icon-colour home-social-icons"
                      data-platform="scholar"
                      aria-label="Google Scholar"
                      title="Google Scholar"
                    >
                      <SiGooglescholar />
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
                  <li className="social-icons">
                    <a
                      href="mailto:rudrochinmoy@gmail.com"
                      className="icon-colour home-social-icons"
                      data-platform="email"
                      aria-label="email"
                      title="Email"
                    >
                      <AiOutlineMail />
                    </a>
                  </li>
                </ul>
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Tilt>
                <img
                  src={myImg}
                  alt="Chinmoy Mitra"
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

          {/* ========== RESEARCH HIGHLIGHT (for Professors) ========== */}
          <Row style={{ marginTop: "40px", marginBottom: "30px" }}>
            <Col md={12}>
              <div className="home-research-banner glass-surface">
                <div className="home-research-badge">
                  <FaGraduationCap style={{ marginRight: 8 }} />
                  IEEE Published • RUET CSE Graduate
                </div>
                <h3 className="home-research-title">
                  Transfer Learning Based Multiclass Brain Tumor Classification Using MRI Data
                </h3>
                <p className="home-research-desc">
                  ResNet50 transfer learning achieving <b>~99.50% accuracy</b> on multiclass MRI brain tumor classification. 
                  Published at <b>IEEE QPAN 2025</b>.
                </p>
                <div className="home-research-links">
                  <a 
                    href="https://scholar.google.com/citations?view_op=list_works&hl=en&user=kUignlYAAAAJ" 
                    target="_blank" 
                    rel="noreferrer"
                    className="home-research-link"
                  >
                    <SiGooglescholar style={{ marginRight: 6 }} /> Google Scholar
                  </a>
                  <Link to="/research" className="home-research-link">
                    <FaFileAlt style={{ marginRight: 6 }} /> More Research →
                  </Link>
                </div>
              </div>
            </Col>
          </Row>

          {/* ========== FEATURED WORK SECTION ========== */}
          <Row style={{ marginTop: "35px", marginBottom: "30px" }}>
            <Col md={12}>
              <h2 className="home-featured-title">
                Featured <strong className="purple">Work</strong>
              </h2>
              <p className="home-featured-subtitle">
                Production-grade AI systems I've built and shipped.
              </p>
            </Col>

            <Col md={4} style={{ marginTop: "14px" }}>
              <div className="home-featured-card glass-surface home-featured-card-animated">
                <div className="home-featured-kicker">🚀 Enterprise AI</div>
                <h3 className="home-featured-card-title">AgentFlow</h3>
                <p className="home-featured-card-body">
                  Modular AI workflow platform: prompt-to-app deployment, dynamic tool discovery (MCP-inspired), RAG/Chat/Search capabilities. <b>Demo in minutes, not weeks.</b>
                </p>
                <div className="home-featured-tags">
                  <span className="home-tag">Azure OpenAI</span>
                  <span className="home-tag">DSPy</span>
                  <span className="home-tag">FastAPI</span>
                </div>
                <Link className="home-featured-link" to="/project/agentflow">
                  View Case Study →
                </Link>
              </div>
            </Col>

            <Col md={4} style={{ marginTop: "14px" }}>
              <div className="home-featured-card glass-surface home-featured-card-animated">
                <div className="home-featured-kicker">🤖 ML/NLP</div>
                <h3 className="home-featured-card-title">Note2Action</h3>
                <p className="home-featured-card-body">
                  AI-powered task prediction from 600+ Account Managers' weekly notes. NLP pipeline that infers next actions from free-form text.
                </p>
                <div className="home-featured-tags">
                  <span className="home-tag">NLP</span>
                  <span className="home-tag">ML Pipeline</span>
                  <span className="home-tag">Production</span>
                </div>
                <Link className="home-featured-link" to="/project">
                  Explore Projects →
                </Link>
              </div>
            </Col>

            <Col md={4} style={{ marginTop: "14px" }}>
              <div className="home-featured-card glass-surface home-featured-card-animated">
                <div className="home-featured-kicker">📄 Open Source</div>
                <h3 className="home-featured-card-title">PDF-ALAP (RAG)</h3>
                <p className="home-featured-card-body">
                  Multilingual PDF Chatbot with English/Bangla support. FAISS vector store, OCR pipeline, Gemini LLM, FastAPI backend.
                </p>
                <div className="home-featured-tags">
                  <span className="home-tag">RAG</span>
                  <span className="home-tag">FAISS</span>
                  <span className="home-tag">OCR</span>
                </div>
                <Link className="home-featured-link" to="/project/multilingual-pdf-chatbot-rag">
                  View Project →
                </Link>
              </div>
            </Col>
          </Row>

          {/* ========== EXPERTISE SECTION ========== */}
          <Row style={{ marginTop: "50px", marginBottom: "40px", justifyContent: "center", gap: "20px" }}>
            <h2 style={{ fontSize: "2.4em", marginBottom: "10px", marginTop: "20px", color: "var(--color-text)", fontWeight: "bold" }}>
              Core <strong className="purple">Expertise</strong>
            </h2>

            <p className="home-expertise-intro">
              Where I focus my energy—bridging cutting-edge AI research with production engineering.
            </p>
            
            <Col md={3} className="home-expertise-card glass-surface home-expertise-card-animated">
               <div className="home-expertise-icon"><FaBrain /></div>
               <h3 className="home-expertise-title">Generative AI & LLMs</h3>
               <p className="home-expertise-desc">
                 Building <b>Agentic Workflows</b>, RAG pipelines, prompt optimization (DSPy), and evaluation-driven LLM systems for enterprise.
               </p>
               <div className="home-expertise-tech">
                 LangChain • Azure OpenAI • DSPy • FAISS
               </div>
              <Link className="home-expertise-link" to="/project">Explore Projects →</Link>
            </Col>

            <Col md={3} className="home-expertise-card glass-surface home-expertise-card-animated">
               <div className="home-expertise-icon"><FaServer /></div>
               <h3 className="home-expertise-title">Full-Stack Engineering</h3>
               <p className="home-expertise-desc">
                 End-to-end application development: REST APIs, containerization, cloud deployment, and modern frontend frameworks.
               </p>
               <div className="home-expertise-tech">
                 FastAPI • React • Docker • Azure
               </div>
              <Link className="home-expertise-link" to="/project">Explore Projects →</Link>
            </Col>
            
            <Col md={3} className="home-expertise-card glass-surface home-expertise-card-animated">
               <div className="home-expertise-icon"><FaCode /></div>
               <h3 className="home-expertise-title">ML/DL & Research</h3>
               <p className="home-expertise-desc">
                 <b>IEEE published</b> researcher. Computer Vision, Transfer Learning, and translating research papers into working systems.
               </p>
               <div className="home-expertise-tech">
                 PyTorch • TensorFlow • OpenCV • Hugging Face
               </div>
              <Link className="home-expertise-link" to="/research">View Research →</Link>
            </Col>
          </Row>

          {/* ========== CONTACT / GET IN TOUCH SECTION ========== */}
          <Row style={{ marginTop: "40px", marginBottom: "30px" }}>
            <Col md={12}>
              <div className="home-contact-section glass-surface">
                <h2 className="home-contact-title">
                  Let's <strong className="purple">Connect</strong>
                </h2>
                <p className="home-contact-subtitle">
                  Whether you're a <b>professor</b> exploring research collaboration, a <b>recruiter</b> looking for AI/ML talent, or a <b>fellow engineer</b> wanting to discuss ideas—I'd love to hear from you.
                </p>
                
                <div className="home-contact-methods">
                  <a 
                    href="mailto:rudrochinmoy@gmail.com" 
                    className="home-contact-card home-contact-email"
                  >
                    <AiOutlineMail className="home-contact-icon" />
                    <div>
                      <span className="home-contact-label">Email</span>
                      <span className="home-contact-value">rudrochinmoy@gmail.com</span>
                    </div>
                  </a>
                  
                  <a 
                    href="https://www.linkedin.com/in/chinmoy-mitra/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="home-contact-card"
                  >
                    <FaLinkedinIn className="home-contact-icon" style={{ color: "#0a66c2" }} />
                    <div>
                      <span className="home-contact-label">LinkedIn</span>
                      <span className="home-contact-value">in/chinmoy-mitra</span>
                    </div>
                  </a>
                  
                  <a 
                    href="https://github.com/chinmoy17" 
                    target="_blank" 
                    rel="noreferrer"
                    className="home-contact-card"
                  >
                    <AiFillGithub className="home-contact-icon" />
                    <div>
                      <span className="home-contact-label">GitHub</span>
                      <span className="home-contact-value">chinmoy17</span>
                    </div>
                  </a>
                </div>

                <p className="home-contact-note">
                  <b>For Academic Inquiries:</b> I'm open to research collaborations in Generative AI, NLP, and Computer Vision. 
                  Feel free to reach out via email with your proposal.
                </p>
              </div>
            </Col>
          </Row>

        </Container>
      </Container>
    </section>
  );
}

export default Home;
