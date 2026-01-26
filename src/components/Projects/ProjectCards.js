import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./ProjectCards.css";

// function ProjectCards(props) {
//   return (
//     <Card className="project-card-view">
//       <Card.Img variant="top" src={props.imgPath} alt="card-img" />
//       <Card.Body>
//         <Card.Title>{props.title}</Card.Title>
//         <Card.Text style={{ textAlign: "justify" }}>
//           {props.description}
//         </Card.Text>
//         <Button variant="primary" href={props.ghLink} target="_blank">
//           <BsGithub /> &nbsp;
//           {props.isBlog ? "Blog" : "GitHub"}
//         </Button>
//         {"\n"}
//         {"\n"}

//         {/* If the component contains Demo link and if it's not a Blog then, it will render the below component  */}

//         {!props.isBlog && props.demoLink && (
//           <Button
//             variant="primary"
//             href={props.demoLink}
//             target="_blank"
//             style={{ marginLeft: "10px" }}
//           >
//             <CgWebsite /> &nbsp;
//             {"Demo"}
//           </Button>
//         )}
//       </Card.Body>
//     </Card>
//   );
// }
// export default ProjectCards;
function ProjectCards(props) {
  const hasRepo = Boolean(props.ghLink);
  const hasDemo = Boolean(props.demoLink);
  const hasCaseStudy = Boolean(props.caseStudyLink);

  return (
    <Card className="project-card-view">
      <div className="project-card-image-container">
        <Card.Img
          variant="top"
          src={props.imgPath}
          alt="card-img"
          className="project-card-img"
        />
      </div>
      <Card.Body>
        <Card.Title className="project-card-title">{props.title}</Card.Title>

        {props.visibility && props.visibility !== "public" ? (
          <div className="project-card-private">Private / SSO</div>
        ) : null}

        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>

        <div className="project-card-actions">
          {hasCaseStudy ? (
            <Button as={Link} to={props.caseStudyLink} variant="primary">
              Read case study
            </Button>
          ) : null}

          {hasRepo ? (
            <Button variant="outline-primary" href={props.ghLink} target="_blank" rel="noreferrer">
              <BsGithub /> &nbsp;
              {props.isBlog ? "Blog" : "GitHub"}
            </Button>
          ) : null}

          {!props.isBlog && hasDemo ? (
            <Button variant="outline-primary" href={props.demoLink} target="_blank" rel="noreferrer">
              <CgWebsite /> &nbsp;Demo
            </Button>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;