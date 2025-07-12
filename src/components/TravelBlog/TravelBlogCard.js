// // TravelBlogCard.js
// import React from "react";
// import Card from "react-bootstrap/Card";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

// function TravelBlogCard({ title, images, caption }) {
//   return (
//     <Card className="travel-blog-card" style={{ backgroundColor: "#290443ff", color: "white" }}>
//       <Card.Body>
//         <Card.Title>{title}</Card.Title>
//         <Row>
//           {images.map((img, i) => (
//             <Col xs={6} key={i}>
//               <img
//                 src={img}
//                 alt={title}
//                 loading="lazy"
//                 style={{
//                   width: "100%",
//                   marginBottom: "10px",
//                   borderRadius: "5px",
//                 }}
//               />
//             </Col>
//           ))}
//         </Row>
//         <Card.Text style={{ marginTop: "10px" }}>{caption}</Card.Text>
//       </Card.Body>
//     </Card>
//   );
// }

// export default TravelBlogCard;

// /components/TravelBlogCard.js
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
                  width: "100%",
                  borderRadius: "5px",
                  height: "200px",
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
