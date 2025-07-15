// src/components/TravelBlog/TravelBlogDetail.js

import React from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import YouTube from "react-youtube";
import { blogs } from "./blogs";

function TravelBlogDetail() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) return <p>Blog not found</p>;

  return (
    <Container className="travel-blog-detail" style={{ paddingTop: "80px", color: "white" }}>
      <h1 style={{ marginBottom: "20px" }}>{blog.title}</h1>

      <Link to="/">
        <Button variant="secondary" style={{ marginBottom: "40px" }}>
          ← Back to All Blogs
        </Button>
      </Link>

      {/* Story */}
      <section style={{ marginBottom: "40px" }}>
        <p style={{ whiteSpace: "pre-line", fontSize: "1.1rem", lineHeight: "1.7" }}>
          {blog.story}
        </p>
      </section>

      {/* Photo Gallery */}
      <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>Gallery</h2>
      <Row>
        {blog.photos.map((photo, idx) => (
          <Col md={6} key={idx} style={{ marginBottom: "10px" }}>
            <img
              src={photo.src}
              alt={photo.caption}
              className="blog-image"
              loading="lazy"
            />
            <p style={{ marginTop: "10px" }}>{photo.caption}</p>
          </Col>
        ))}
      </Row>

      {/* Related Videos */}
      <h2 style={{ marginTop: "60px", marginBottom: "20px" }}>Watch the Journey</h2>
      <Row>
        {blog.videos.map((video, idx) => (
          <Col md={6} key={idx} style={{ marginBottom: "30px" }}>
            <YouTube videoId={video.youtubeId} opts={{ width: "100%", height: "315" }} />
            <p style={{ marginTop: "10px" }}>{video.title}</p>
            <p className="video-caption">{video.title}</p>

          </Col>
        ))}
      </Row>

      <Link to="/">
        <Button variant="secondary" style={{ marginTop: "40px" }}>
          ← Back to All Blogs
        </Button>
      </Link>
    </Container>
  );
}

export default TravelBlogDetail;
