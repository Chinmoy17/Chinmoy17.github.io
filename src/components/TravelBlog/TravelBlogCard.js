
import React from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";

function TravelBlogCard({ title, images, caption }) {
  return (
    <Card
      className="travel-blog-card"
      style={{ backgroundColor: "#290443ff", color: "white" }}
    >
      <Card.Body>
        <Card.Title>{title}</Card.Title>

        <Carousel interval={2000} controls={false} indicators={false} pause={false}>
          {images.map((img, i) => (
            <Carousel.Item key={i}>
              <img
                src={img}
                alt={`${title} ${i}`}
                style={{
                  width: "50%",
                  borderRadius: "5px",
                  height: "175px",
                  objectFit: "cover",
                }}
                loading="lazy"
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <Card.Text style={{ marginTop: "10px" }}>{caption}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TravelBlogCard;
