import React from "react";
import Card from "react-bootstrap/Card";

function TravelCard({ title, images, caption }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Row>
          {images.map((img, i) => (
            <Col xs={6} key={i}>
              <img
                src={img}
                alt={title}
                style={{ width: "100%", marginBottom: "10px" }}
              />
            </Col>
          ))}
        </Row>
        <Card.Text style={{ marginTop: "10px" }}>{caption}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TravelCard;
