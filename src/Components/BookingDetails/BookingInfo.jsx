import React from "react";

import { Card, Col, Container, ListGroup, Row, Table } from "react-bootstrap";

const BookingInfo = ({ data }) => {
  const hotel = data?.HotelResult?.[0];
  const room = hotel?.Rooms?.[0];

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h5 className="mb-3">Room Information</h5>
          <Card.Text>
            <strong>Name:</strong> {room?.Name?.[0]}
          </Card.Text>
          <Card.Text>
            <strong>Booking Code:</strong> {room?.BookingCode}
          </Card.Text>
          <Card.Text>
            <strong>Inclusion:</strong> {room?.Inclusion}
          </Card.Text>
          <Card.Text>
            <strong>Meal Type:</strong> {room?.MealType}
          </Card.Text>
          <Card.Text>
            <strong>Total Fare:</strong> ${room?.TotalFare}
          </Card.Text>
          <Card.Text>
            <strong>Total Tax:</strong> ${room?.TotalTax}
          </Card.Text>
          <hr />
          <h5 className="mb-3">Cancel Policies</h5>
          <ListGroup variant="flush">
            {(room?.CancelPolicies || [])?.map((policy, index) => (
              <ListGroup.Item key={index}>
                <strong>From Date:</strong> {policy.FromDate} <br />
                <strong>Charge Type:</strong> {policy.ChargeType} <br />
                <strong>Cancellation Charge:</strong>{" "}
                {policy.CancellationCharge}%
              </ListGroup.Item>
            ))}
          </ListGroup>
          <hr />
          {(room?.Amenities || []).length > 0 && (
            <>
              <h5 className="mb-3">Amenities</h5>
              <ListGroup variant="flush">
                {(room?.Amenities || []).map((amenity, index) => (
                  <ListGroup.Item key={index}>{amenity}</ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
          <hr />
          <h5 className="mb-3">Day Rates</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Day</th>
                <th>Base Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              {room?.DayRates[0].map((rate, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>${rate.BasePrice}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <hr />
          <h5 className="mb-3">Rate Conditions</h5>
          <ListGroup variant="flush">
            {hotel?.RateConditions.map((condition, index) => (
              <ListGroup.Item key={index}>{condition}</ListGroup.Item>
            ))}
          </ListGroup>
          <h5 className="mb-3">Credit Card Billing Options</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Currency</th>
                <th>Convenience Charges</th>
              </tr>
            </thead>
            <tbody>
              {hotel?.CreditCardBillingOptions.map((option, index) => (
                <tr key={index}>
                  <td>${option.Amount}</td>
                  <td>{option.Currency}</td>
                  <td>{option.ConvenienceCharges}%</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default BookingInfo;
