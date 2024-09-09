import React from "react";
import { Accordion, Card, Container } from "react-bootstrap";

const index = () => {
  const faqItems = [
    "Can I change my visa while in the country?",
    "How long does a visa change process take?",
    "Do I need to leave the country for a visa change?",
    "Can I apply for a visa change online?",
    "Can my visa change be denied?",
  ];

  return (
    <Container className="my-5">
      <h3 className="mb-4">Frequently asked questions</h3>
      <Accordion defaultActiveKey="0">
        {faqItems.map((item, index) => (
          <Card key={index} className="mb-2">
            <Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
              {item}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={`${index}`}>
              <Card.Body>
                This is where the answer to &quot;{item}&quot; will go. You can
                add the real answers here.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </Container>
  );
};

export default index;
