import { Card, Col, Container, Row } from "react-bootstrap";

const blogPosts = [
  {
    image: "/path/to/image1.jpg",
    title: "Eco-Friendly Travel Destinations",
    description:
      "How to use centuries of unfair advantage to make the world a more equal place",
    date: "2nd January, 2022",
  },
  {
    image: "/path/to/image2.jpg",
    title: "Unveiling Off-the-Beaten-Path Destinations",
    description:
      "How to use centuries of unfair advantage to make the world a more equal place",
    date: "2nd January, 2022",
  },
  {
    image: "/path/to/image3.jpg",
    title: "Unveiling Off-the-Beaten-Path Destinations",
    description:
      "How to use centuries of unfair advantage to make the world a more equal place",
    date: "2nd January, 2022",
  },
];

const LatestTravelBlog = () => {
  return (
    <Container className="mt-5">
      <h6 className="section-title mb-4">Our Latest Travel Blog</h6>
      <Row>
        {blogPosts.map((post, index) => (
          <Col md={4} key={index}>
            <Card className="mb-4">
              <Card.Img variant="top" src={post.image} />
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
