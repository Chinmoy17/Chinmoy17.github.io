import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";
import agent from "../../Assets/Projects/agent.jpg";
import vowel from "../../Assets/Projects/vowel.jpg";
import blog from "../../Assets/Projects/blog.jpg";
import cpu from  "../../Assets/Projects/cpu.gif";
import stu from "../../Assets/Projects/stu.gif";
import ap from "../../Assets/Projects/ap.gif";
function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={agent}
              isBlog={false}
              title="AI_AGENT_ChatBot_with_FastAPI"
              description="A simple project showcasing how you can modify your agents with simple prompts. Applicable in Web Scraping and simple LLM tasks directed with the agent prompt."
              ghLink="https://github.com/Chinmoy17/AI_AGENT_ChatBot_with_FastAPI"
              // demoLink="https://chatify-49.web.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={vowel}
              isBlog={false}
              title="Bangla Vowel Detection Using Deep Learning"
              description="This project uses deep learning to detect Bangla vowels from images using the Ekushe dataset. It employs a pre-trained ResNet50 model with data augmentation and preprocessing techniques to boost accuracy. The solution achieves 97.76% test accuracy and includes workflows for training, evaluation, and predicting new images."
              ghLink="https://github.com/Chinmoy17/Bangla-Vowels-Detection-with-Transfer-Learning-DL"
              // demoLink="https://blogs.soumya-jit.tech/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={blog}
              isBlog={false}
              title="Blog Generator with LLMs"
              description="This project leverages large language models (LLMs) to generate blog content based on user prompts. It includes features like text formatting, image suggestions, and SEO optimization tips."
              ghLink="https://github.com/Chinmoy17/Blog_Generator"
              // demoLink="https://editor.soumya-jit.tech/"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={cpu}
              isBlog={false}
              title="4-bit Custom CPU Design"
              description="This project showcases the design and simulation of a custom 4-bit CPU using basic logic gates. It features a 4-bit word size, 3 ALU operations (XOR, Left Shift, ADD), 3 registers (R0–R2), and an 8×15 SRAM for instructions and data. The CPU supports ALU and jump instructions with a simple ISA. Diagrams for the ALU, Control Unit, and memory are included for easy simulation in tools like Logisim. The project serves as an academic demonstration of CPU architecture and can be expanded with more registers, operations, or pipelining."
              ghLink="https://github.com/Chinmoy17/4-Bit_Custom_CPU_Project?tab=readme-ov-file#4-bit-custom-cpu-design"
              // demoLink="https://plant49-ai.herokuapp.com/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={stu}
              isBlog={false}
              title="AI in Education: Student Perception & Usage"
              description="This project analyzes how students perceive and use AI tools in education. It examines survey data from various universities, covering AI familiarity, usage frequency, trust, originality concerns, and faculty-wise trends. Visualizations include box plots, bar charts, crosstabs, and heatmaps highlighting insights on learning experience, tech dependence, and instructor attitudes. A summary table and a demo GIF illustrate key findings. Built with Python, Pandas, Seaborn, and Matplotlib, the project provides a clear look at how AI influences academic performance and student trust."
              ghLink="https://github.com/Chinmoy17/student-ai-usage-analysis"
              // demoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" <--------Please include a demo link here
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={ap}
              isBlog={false}
              title="Ai Painter"
              description="Trained a GAN model to generate artistic images from sketches. The model learns from a dataset of paintings and can create unique artwork based on user input.This project lets users paint virtually using real-time hand tracking with Mediapipe and OpenCV. Control your brush with simple hand gestures — draw with your index finger, select colors and tools with two fingers, erase, adjust brush size, or draw circles using three fingers. The system supports saving your artwork as an image. It’s built in Python with clear modules for hand tracking and drawing logic. A great demonstration of gesture-based interaction and computer vision, it runs easily with Python, Mediapipe, OpenCV, and NumPy. Contributions and improvements are always welcome!"
              ghLink="https://github.com/soumyajit4419/Face_And_Emotion_Detection"
              // demoLink="https://blogs.soumya-jit.tech/"      <--------Please include a demo link here 
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
