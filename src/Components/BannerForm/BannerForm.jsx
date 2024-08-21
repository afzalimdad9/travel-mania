import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { authenticate } from "../../pages/api/flight";
import { ToastContainer, toast } from "react-toastify";

const FlightBookingForm = () => {
  const [formData, setFormData] = useState({
    tripType: "round-trip",
    flightMode: "Economy",
    departureDate: null,
    returnDate: null,
    departureTime: "11:00 AM",
    returnTime: "11:00 AM",
    from: "",
    to: "",
    passengers: {
      adults: 1,
      children: 0,
    },
  });

  const [passengerDropdown, setPassengerDropdown] = useState(false);

  const handlePassengerChange = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      passengers: {
        ...prev.passengers,
        [type]: Math.max(0, value),
      },
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date, type) => {
    setFormData((prev) => ({
      ...prev,
      [type]: date,
    }));
  };

  const handleTimeChange = (time, type) => {
    setFormData((prev) => ({
      ...prev,
      [type]: time,
    }));
  };

  const swapLocations = () => {
    setFormData((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  const validateForm = () => {
    const { from, to, departureDate, tripType, returnDate, passengers } =
      formData;
    const totalPassengers = Object.values(passengers).reduce(
      (acc, val) => acc + val,
      0
    );

    if (!from) {
      toast.error("Please select a departure city.");
      return false;
    }
    if (!to) {
      toast.error("Please select a destination city.");
      return false;
    }
    if (!departureDate) {
      toast.error("Please select a departure date.");
      return false;
    }
    if (tripType === "round-trip" && !returnDate) {
      toast.error("Please select a return date.");
      return false;
    }
    if (totalPassengers === 0) {
      toast.error("Please select at least one passenger.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const authResponse = await authenticate();

      if (!authResponse) {
        toast.error("Authentication failed. Cannot proceed with the search.");
        return;
      }

      const { tokenId, trackingId } = authResponse;

      const searchPayload = {
        EndUserIp: "192.168.11.120",
        TokenId: tokenId,
        BookingMode: "5",
        AdultCount: formData.passengers.adults,
        ChildCount: formData.passengers.children,
        InfantCount: 0,
        DirectFlight: false,
        OneStopFlight: false,
        JourneyType: formData.tripType === "round-trip" ? 2 : 1,
        PreferredAirlines: null,
        Segments: [
          {
            Origin: formData.from,
            Destination: formData.to,
            FlightCabinClass:
              formData.flightMode === "Economy"
                ? 2
                : formData.flightMode === "Business"
                ? 3
                : 4,
            PreferredDepartureTime: formData.departureDate,
          },
          formData.tripType === "round-trip" && {
            Origin: formData.to,
            Destination: formData.from,
            FlightCabinClass:
              formData.flightMode === "Economy"
                ? 2
                : formData.flightMode === "Business"
                ? 3
                : 4,
            PreferredDepartureTime: formData.returnDate,
          },
        ].filter(Boolean),
        Sources: null,
        PreferredCurrency: "USD",
      };

      try {
        const response = await axios.post("/api/search", {
          tokenId,
          searchPayload,
        });
        const flightResults = response.data;
        console.log("flightResults", flightResults.Response);
        if (flightResults && flightResults.Response.ResponseStatus === 1) {
          console.log("flightResults", flightResults.Response.Results);
          localStorage.setItem(
            "flightResults",
            JSON.stringify(flightResults.Response.Results)
          );
          window.location.href = "/flightresults";
        } else if (flightResults && flightResults.Error) {
          toast.error(
            `Error: ${
              flightResults.Error.ErrorMessage || "An unexpected error occurred"
            }`
          );
        } else {
          toast.error("An unexpected error occurred during flight search.");
        }
      } catch (error) {
        toast.error("Error during flight search. Please try again.");
        console.error("Error during flight search:", error);
      }
    }
  };

  const today = new Date();

  return (
    <section className="booking_form-sec">
      <div className="container">
        <ToastContainer />
        <Form onSubmit={handleSubmit} className="booking_form-mn">
          <Row className="mb-3 trip_select-mn">
            <Col md={2}>
              <Form.Group controlId="tripType">
                <Form.Label>Trip Type</Form.Label>
                <Form.Select
                  name="tripType"
                  value={formData.tripType}
                  onChange={handleInputChange}
                >
                  <option value="one-way">One-way</option>
                  <option value="round-trip">Round-trip</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group controlId="from">
                <Form.Label>From</Form.Label>
                <Form.Select
                  name="from"
                  value={formData.from}
                  onChange={handleInputChange}
                >
                  <option value="">Select Departure City</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="DEL">Delhi</option>
                  <option value="DXB">Dubai</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={1} className="form_book-swap">
              <Button variant="secondary" className="" onClick={swapLocations}>
                <LiaExchangeAltSolid />
              </Button>
            </Col>

            <Col md={3}>
              <Form.Group controlId="to">
                <Form.Label>To</Form.Label>
                <Form.Select
                  name="to"
                  value={formData.to}
                  onChange={handleInputChange}
                >
                  <option value="">Select Destination City</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="DEL">Delhi</option>
                  <option value="DXB">Dubai</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group controlId="flightMode">
                <Form.Label>Flight Mode</Form.Label>
                <Form.Select
                  name="flightMode"
                  value={formData.flightMode}
                  onChange={handleInputChange}
                >
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                  <option value="First Class">First Class</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3 booking_form-inn">
            <Col md={4} className="form_book-date1 date_field">
              <Form.Group controlId="departureDate">
                <Form.Label>Departure Date</Form.Label>
                <DatePicker
                  selected={formData.departureDate}
                  onChange={(date) => handleDateChange(date, "departureDate")}
                  dateFormat="yyyy/MM/dd"
                  className="form-control"
                  minDate={today}
                />
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  value={formData.departureTime}
                  onChange={(e) =>
                    handleTimeChange(e.target.value, "departureTime")
                  }
                />
              </Form.Group>
            </Col>

            {formData.tripType === "round-trip" && (
              <Col md={4} className="form_book-date2 date_field">
                <Form.Group controlId="returnDate">
                  <Form.Label>Return Date</Form.Label>
                  <DatePicker
                    selected={formData.returnDate}
                    onChange={(date) => handleDateChange(date, "returnDate")}
                    dateFormat="yyyy/MM/dd"
                    className="form-control"
                    minDate={formData.departureDate || today}
                  />
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={formData.returnTime}
                    onChange={(e) =>
                      handleTimeChange(e.target.value, "returnTime")
                    }
                  />
                </Form.Group>
              </Col>
            )}

            <Col md={4} className="select_trip">
              <Dropdown
                onToggle={(isOpen) => setPassengerDropdown(isOpen)}
                show={passengerDropdown}
              >
                <Form.Label> Passengers</Form.Label>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="passenger-dropdown"
                >
                  {`Adults: ${formData.passengers.adults}, Children: ${formData.passengers.children}`}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="p-3">
                    <Form.Label>Adults (18+)</Form.Label>
                    <div className="input-group mb-3">
                      <Button
                        variant="outline-secondary"
                        onClick={() =>
                          handlePassengerChange(
                            "adults",
                            formData.passengers.adults - 1
                          )
                        }
                      >
                        -
                      </Button>
                      <Form.Control
                        type="text"
                        value={formData.passengers.adults}
                        readOnly
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() =>
                          handlePassengerChange(
                            "adults",
                            formData.passengers.adults + 1
                          )
                        }
                      >
                        +
                      </Button>
                    </div>

                    <Form.Label>Children (0-17)</Form.Label>
                    <div className="input-group mb-3">
                      <Button
                        variant="outline-secondary"
                        onClick={() =>
                          handlePassengerChange(
                            "children",
                            formData.passengers.children - 1
                          )
                        }
                      >
                        -
                      </Button>
                      <Form.Control
                        type="text"
                        value={formData.passengers.children}
                        readOnly
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() =>
                          handlePassengerChange(
                            "children",
                            formData.passengers.children + 1
                          )
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          <Row className="mb-3 justify-content-end">
            <Col md="auto">
              <Button variant="outline-primary" className="btn-promo-code">
                + Add Promo Code
              </Button>
            </Col>
            <Col md="auto">
              <Button type="submit" className="btn-show-flights">
                Show Flights
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </section>
  );
};

export default FlightBookingForm;
