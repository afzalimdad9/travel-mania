import { Card, Col, Container, Row } from "react-bootstrap";
import EcoFriendly from "../../../public/images/eco-friendly.svg";
import UnveilingOff from "../../../public/images/unveiling-off.svg";
import Image from "next/image";

const blogPosts = [
  {
    image: EcoFriendly,
    title: "Eco-Friendly Travel Destinations",
    description:
      "How to use centuries of unfair advantage to make the world a more equal place",
    date: "2nd January, 2022",
  },
  {
    image: UnveilingOff,
    title: "Unveiling Off-the-Beaten-Path Destinations",
    description:
      "How to use centuries of unfair advantage to make the world a more equal place",
    date: "2nd January, 2022",
  },
  {
    image: UnveilingOff,
    title: "Unveiling Off-the-Beaten-Path Destinations",
    description:
      "How to use centuries of unfair advantage to make the world a more equal place",
    date: "2nd January, 2022",
  },
];

const LatestTravelBlog = () => {
  return (
    <Container className="mt-5">
      <p className="section-title mb-4 fs-4 fw-semibold">
        Our Latest Travel Blog
      </p>
      <Row>
        {blogPosts.map((post, index) => (
          <Col md={4} key={index}>
            <Card className="mb-5">
              <Image
                src={post.image}
                alt={post.title}
                className="w-100 object-fit-cover"
              />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.description}</Card.Text>
                <Card.Text className="text-muted">{post.date}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LatestTravelBlog;
