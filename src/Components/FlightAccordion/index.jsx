import React from "react";
import { Accordion, Card, Form } from "react-bootstrap";

const FilterAccordion = () => {
  return (
    <div className="container">
      <Accordion defaultActiveKey="2">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Stops</Accordion.Header>
          <Accordion.Body>{/* Content for Stops */}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Departure times</Accordion.Header>
          <Accordion.Body>{/* Content for Departure times */}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Journey duration</Accordion.Header>
          <Accordion.Body>
            {/* Slider for Journey duration */}
            <Form.Label>2.5 hours - 30.5 hours</Form.Label>
            <Form.Range />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Airlines</Accordion.Header>
          <Accordion.Body>{/* Content for Airlines */}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>Airports</Accordion.Header>
          <Accordion.Body>{/* Content for Airports */}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>Flight emissions</Accordion.Header>
          <Accordion.Body>{/* Content for Flight emissions */}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default FilterAccordion;
