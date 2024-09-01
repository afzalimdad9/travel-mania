import React from "react";

import { Card, Col, Container, ListGroup, Row, Table } from "react-bootstrap";

const BookingInfo = ({ data }) => {
  const hotel = data?.HotelResult?.[0];
  const room = hotel?.Rooms?.[0];

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <Card>
            <Card.Header as="h5">Hotel Information</Card.Header>
            <Card.Body>
              <Card.Title>{`Hotel Code: ${hotel?.HotelCode}`}</Card.Title>
              <Card.Text>
                <strong>Currency:</strong> {hotel?.Currency}
              </Card.Text>
              <hr />
              <Card.Title>Room Information</Card.Title>
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
              <Card.Title>Cancel Policies</Card.Title>
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
              <Card.Title>Amenities</Card.Title>
              <ListGroup variant="flush">
                {(room?.Amenities || []).map((amenity, index) => (
                  <ListGroup.Item key={index}>{amenity}</ListGroup.Item>
                ))}
              </ListGroup>
              <hr />
              <Card.Title>Day Rates</Card.Title>
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
              <Card.Title>Rate Conditions</Card.Title>
              <ListGroup variant="flush">
                {hotel?.RateConditions.map((condition, index) => (
                  <ListGroup.Item key={index}>{condition}</ListGroup.Item>
                ))}
              </ListGroup>
              <hr />
              <Card.Title>Credit Card Billing Options</Card.Title>
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default BookingInfo;
