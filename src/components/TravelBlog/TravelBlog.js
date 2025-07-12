// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import TravelBlogCard from "./TravelBlogCard";


// const blogs = [
//   {
//     title: "Trip to Darjeeling",
//     images: [
//       require("../../Assets/Travel/darjeeling1.jpg"),
//       require("../../Assets/Travel/darjeeling2.jpg"),
//     ],
//     caption: "A beautiful sunrise at Tiger Hill, Darjeeling.",
//   },
//   {
//     title: "Exploring Sundarbans",
//     images: [
//       require("../../Assets/Travel/sundarban1.jpg"),
//       require("../../Assets/Travel/sundarban2.jpg"),
//     ],
//     caption: "The wild beauty of the Debota Pahar in Bandarbans.",
//   },
// ];

// function TravelBlog() {
//   return (
//     <Container className="travel-blog-section" style={{ paddingTop: "80px" } }>
//       <h1 className="project-heading">
//         My <strong className="purple">Travel Blogs</strong>
//       </h1>
//       <Row>
//         {blogs.map((blog, idx) => (
//           <Col md={6} key={idx} style={{ marginBottom: "30px" }}>
//             <TravelBlogCard
//               title={blog.title}
//               images={blog.images}
//               caption={blog.caption}
//             />
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// }

// export default TravelBlog;

// src/components/TravelBlog/TravelBlog.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import TravelBlogCard from "./TravelBlogCard";
import { blogs } from "./blogs";

function TravelBlog() {
  return (
    <Container className="travel-blog-section" style={{ paddingTop: "80px" }}>
      <h1 className="project-heading">
        My <strong className="purple">Travel Blogs</strong>
      </h1>
      <Row>
        {blogs.map((blog) => (
          <Col md={6} key={blog.id} style={{ marginBottom: "30px" }}>
            <Link to={`/blog/${blog.id}`} style={{ textDecoration: "none" }}>
              <TravelBlogCard
                title={blog.title}
                images={blog.photos.map((p) => p.src)}
                caption={blog.story.slice(0, 100) + "..."}
              />
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default TravelBlog;
