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
      <h1>{blog.title}</h1>
      <Link to="/">
        <Button variant="secondary" style={{ marginBottom: "20px" }}>
          ← Back to All Blogs
        </Button>
      </Link>

      <p style={{ whiteSpace: "pre-line" }}>{blog.story}</p>

      {blog.photos.map((photo, idx) => (
        <div key={idx} style={{ margin: "40px 0" }}>
          <img
            src={photo.src}
            alt={photo.caption}
            style={{ width: "100%", borderRadius: "5px" }}
            loading="lazy"
          />
          <p style={{ marginTop: "10px" }}>{photo.caption}</p>
        </div>
      ))}

      <h2 style={{ marginTop: "60px" }}>Related Videos</h2>
      <Row>
        {blog.videos.map((video, idx) => (
          <Col md={6} key={idx} style={{ marginBottom: "30px" }}>
            <YouTube videoId={video.youtubeId} opts={{ width: "100%", height: "315" }} />
            <p style={{ marginTop: "10px" }}>{video.title}</p>
          </Col>
        ))}
      </Row>

      <Link to="/">
        <Button variant="secondary" style={{ marginTop: "20px" }}>
          ← Back to All Blogs
        </Button>
      </Link>
    </Container>
  );
}

export default TravelBlogDetail;
