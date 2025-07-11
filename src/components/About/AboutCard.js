import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Chinmoy Mitra </span>
            from <span className="purple"> Dhaka, Bangladesh.</span>
            <br />
            I am currently employed as an AI trainer at Scale Ai, where I help to train LLM models.
            <br />
            I have completed BSc in Computer Science and Engineering from Rajshahi University of Engineering and Technology (RUET).
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Learning about breakthrough technologies in AI.
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Chinmoy</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
