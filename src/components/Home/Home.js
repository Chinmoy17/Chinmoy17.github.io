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
import { FaLinkedinIn } from "react-icons/fa";
import { SiPytorch, SiReact, SiDocker } from "react-icons/si";

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
                  I bridge the gap between <b className="purple">Academic Research</b> and <b className="purple">Production Engineering</b>.
                  <br /><br />
                  As an <b>AI Practitioner</b>, I architect intelligent agents and RAG systems (like <i>Note2Action</i> & <i>DemoFactory</i>) that solve complex real-world problems.
                  <br />
                  My background spans from publishing in <b>IEEE</b> to building scalable <b>Full-Stack Applications</b>.
                </p>
                
                <div style={{ marginTop: 30, marginBottom: 30 }}>
                  <Type />
                </div>

                {/* Tech Stack Mini-Badges */}
                <div style={{ display: "flex", gap: "15px", marginBottom: "25px", flexWrap: "wrap", opacity: 0.9 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(238, 76, 44, 0.1)", padding: "5px 12px", borderRadius: "15px", border: "1px solid rgba(238, 76, 44, 0.2)"}}>
                        <SiPytorch style={{ color: "#EE4C2C" }} /> <span style={{fontSize: "0.9em"}}>PyTorch</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(97, 218, 251, 0.1)", padding: "5px 12px", borderRadius: "15px", border: "1px solid rgba(97, 218, 251, 0.2)"}}>
                        <SiReact style={{ color: "#61DAFB" }} /> <span style={{fontSize: "0.9em"}}>React</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(36, 150, 237, 0.1)", padding: "5px 12px", borderRadius: "15px", border: "1px solid rgba(36, 150, 237, 0.2)"}}>
                        <SiDocker style={{ color: "#2496ED" }} /> <span style={{fontSize: "0.9em"}}>Docker</span>
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
                    borderRadius: "50%", 
                    border: "5px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 0 30px rgba(39, 76, 119, 0.4)"
                  }}
                />
              </Tilt>
            </Col>
          </Row>

          <Row style={{ marginTop: "50px", marginBottom: "50px", justifyContent: "center" }}>
            <Col md={10} className="home-about-social">
               <div style={{ 
                 background: "rgba(39, 76, 119, 0.05)", 
                 border: "1px solid rgba(39, 76, 119, 0.15)",
                 borderRadius: "15px",
                 padding: "30px",
                 textAlign: "center"
               }}>
                 <h2 style={{ fontSize: "1.8em", marginBottom: "20px" }}>
                   Building <span className="purple">Intelligent</span> Systems
                 </h2>
                 <p style={{ fontSize: "1.1em", lineHeight: "1.6", maxWidth: "800px", margin: "0 auto", color: "var(--color-text)" }}>
                   "My focus is on creating autonomous agents and improving human-AI interaction. From crafting <b className="purple">fine-tuned LLMs</b> to deploying scalable <b className="purple">microservices</b>, I enjoy the entire lifecycle of software development."
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
