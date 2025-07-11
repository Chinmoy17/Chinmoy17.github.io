// TravelBlogCard.js
import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function TravelBlogCard({ title, images, caption }) {
  return (
    <Card className="travel-blog-card">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Row>
          {images.map((img, i) => (
            <Col xs={6} key={i}>
              <img
                src={img}
                alt={title}
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
              />
            </Col>
          ))}
        </Row>
        <Card.Text style={{ marginTop: "10px" }}>{caption}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TravelBlogCard;
