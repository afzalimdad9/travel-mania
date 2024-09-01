import React from "react";
import { Accordion, Col, Row } from "react-bootstrap";

const FAQ = ({ hotelData }) => {
  return (
    <Row>
      <Col md={6}>
        <h4 className="mb-3">Frequently asked questions</h4>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              What time is check in and check out?
            </Accordion.Header>
            <Accordion.Body>
              Checkin time {hotelData?.CheckInTime}. And Check Out time{" "}
              {hotelData?.CheckOutTime}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              Is breakfast included with the stay?
            </Accordion.Header>
            <Accordion.Body>
              {(hotelData?.HotelFacilities || [])?.some((d) =>
                d.toLowerCase().includes("breakfast")
              )
                ? "Yes"
                : "No"}
              , Breakfast{" "}
              {(hotelData?.HotelFacilities || [])?.some((d) =>
                d.toLowerCase().includes("breakfast")
              )
                ? "is"
                : "is not"}{" "}
              included with stay
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Do you offer free WiFi?</Accordion.Header>
            <Accordion.Body>
              {(hotelData?.HotelFacilities || [])?.some((d) =>
                d.toLowerCase().includes("wifi")
              )
                ? "Yes"
                : "No"}
              , we{" "}
              {(hotelData?.HotelFacilities || [])?.some((d) =>
                d.toLowerCase().includes("wifi")
              )
                ? "offer"
                : "do not offer"}{" "}
              free wifi.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              Reporting available at the hotel?
            </Accordion.Header>
            <Accordion.Body>
              {(hotelData?.HotelFacilities || [])?.some((d) =>
                d.toLowerCase().includes("reporting")
              )
                ? "Yes"
                : "No"}
              , Reporing{" "}
              {(hotelData?.HotelFacilities || [])?.some((d) =>
                d.toLowerCase().includes("reporting")
              )
                ? "is"
                : "is not"}{" "}
              available at the hotel.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Do you have a fitness center?</Accordion.Header>
            <Accordion.Body>
              {(hotelData?.HotelFacilities || [])?.includes(
                "Fitness facilities"
              )
                ? "Yes"
                : "No"}
              , we{" "}
              {(hotelData?.HotelFacilities || [])?.includes(
                "Fitness facilities"
              )
                ? ""
                : "Don't"}{" "}
              a have finess center
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </Row>
  );
};

export default FAQ;
