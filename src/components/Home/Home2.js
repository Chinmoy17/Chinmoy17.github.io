import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import Github from "../About/Github";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              BRIDGING <span className="purple"> AI </span> AND <span className="purple"> SOFTWARE ENGINEERING </span>
            </h1>
            <p className="home-about-body">
              I am an <b>AI Practitioner</b> and <b>Full Stack Engineer</b> dedicated to building intelligent systems that optimize workflows and solve complex problems.
              <br />
              <br />
              With a strong foundation in 
              <i>
                <b className="purple"> Computer Science</b>
              </i>, I bridge the gap between research and production—taking state-of-the-art models from conception to scalable deployment.
              <br />
              <br />
              My core focus lies in &nbsp;
              <i>
                <b className="purple">Machine Learning, NLP,</b> and <b className="purple">Deep Learning</b>
              </i>
              , with specific expertise in building <b>RAG systems</b> and <b>Agentic Workflows</b>.
              <br />
              <br />
              I also leverage modern engineering stacks like <b className="purple">FastAPI</b>, <b className="purple">React.js</b>, and <b className="purple">Docker</b> to create robust, user-centric applications.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img
                src={myImg}
                alt="avatar"
                className="img-fluid"
                style={{
                  width: "280px",
                  height: "280px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: "0 0 25px 5px rgba(39, 76, 119, 0.6)",
                  border: "4px solid rgba(255, 255, 255, 0.15)",
                }}
              />
            </Tilt>
          </Col>
        </Row>
        
        <div style={{ paddingBottom: "30px", paddingTop: "30px" }}>
            <Github />
        </div>

        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/chinmoy17"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
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
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
