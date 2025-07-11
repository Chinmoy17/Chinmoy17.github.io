import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

// Example blog data
const blogs = [
  {
    title: "Trip to Darjeeling",
    images: [
      require("../../Assets/Travel/darjeeling1.jpg"),
      require("../../Assets/Travel/darjeeling2.jpg"),
    ],
    caption: "A beautiful sunrise at Tiger Hill, Darjeeling.",
  },
  {
    title: "Exploring Sundarbans",
    images: [
      require("../../Assets/Travel/sundarban1.jpg"),
      require("../../Assets/Travel/sundarban2.jpg"),
    ],
    caption: "The wild beauty of the Sundarbans mangrove forest.",
  },
];

function TravelBlog() {
  return (
    <Container className="travel-blog-section">
      <h1 className="project-heading">
        My <strong className="purple">Travel Blogs</strong>
      </h1>
      <Row>
        {blogs.map((blog, idx) => (
          <Col md={6} key={idx} style={{ marginBottom: "30px" }}>
            <Card>
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Row>
                  {blog.images.map((img, i) => (
                    <Col xs={6} key={i}>
                      <img
                        src={img}
                        alt={blog.title}
                        style={{ width: "100%", marginBottom: "10px" }}
                      />
                    </Col>
                  ))}
                </Row>
                <Card.Text style={{ marginTop: "10px" }}>{blog.caption}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default TravelBlog;