import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";

const HotelBookingForm = ({ formData, setFormData }) => {
  const router = useRouter();

  const [passengerDropdown, setPassengerDropdown] = useState(false);

  const handlePassengerChange = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      persons: {
        ...prev.persons,
        [type]: Math.max(0, value),
      },
    }));
  };

  const handleDateChange = (date, type) => {
    setFormData((prev) => ({
      ...prev,
      [type]: date,
    }));
  };

  const today = new Date();

  useEffect(() => {
    const { adults, children, stayplace, checkin, checkout } = router.query;
    if (adults && children && stayplace && checkin && checkout) {
      setFormData({
        checkInDate: new Date(checkin).toISOString(),
        checkoutDate: new Date(checkout).toISOString(),
        from: stayplace,
        persons: {
          children: Number(children),
          adults: Number(adults),
        },
        rooms: 1,
      });
    }
  }, [router, setFormData]);

  return (
    <Row className="mb-3 w-100 trip_select-mn">
      <Col md={4} className="form_book-date1 date_field">
        <Form.Group controlId="checkInDate">
          <Form.Label>Check In</Form.Label>
          <DatePicker
            selected={formData.checkInDate}
            onChange={(date) => handleDateChange(date, "checkInDate")}
            dateFormat="yyyy/MM/dd"
            className="form-control"
            minDate={today}
          />
        </Form.Group>
      </Col>

      <Col md={4} className="form_book-date2 date_field">
        <Form.Group controlId="checkoutDate">
          <Form.Label>Check Out</Form.Label>
          <DatePicker
            selected={formData.checkoutDate}
            onChange={(date) => handleDateChange(date, "checkoutDate")}
            dateFormat="yyyy/MM/dd"
            className="form-control"
            minDate={formData.checkInDate || today}
          />
        </Form.Group>
      </Col>

      <Col md={4} className="select_trip guests">
        <Dropdown
          onToggle={(isOpen) => setPassengerDropdown(isOpen)}
          show={passengerDropdown}
        >
          <Form.Label>Guests</Form.Label>
          <Dropdown.Toggle variant="outline-secondary" id="passenger-dropdown">
            {`Rooms: ${formData?.rooms}, Adults: ${formData.persons.adults}, Children: ${formData.persons.children}`}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div className="p-3">
              <Form.Label>Adults (18+)</Form.Label>
              <div className="input-group mb-3">
                <Button
                  variant="outline-secondary"
                  onClick={() =>
                    handlePassengerChange("adults", formData.persons.adults - 1)
                  }
                >
                  -
                </Button>
                <Form.Control
                  type="text"
                  value={formData.persons.adults}
                  readOnly
                />
                <Button
                  variant="outline-secondary"
                  onClick={() =>
                    handlePassengerChange("adults", formData.persons.adults + 1)
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
                      formData.persons.children - 1
                    )
                  }
                >
                  -
                </Button>
                <Form.Control
                  type="text"
                  value={formData.persons.children}
                  readOnly
                />
                <Button
                  variant="outline-secondary"
                  onClick={() =>
                    handlePassengerChange(
                      "children",
                      formData.persons.children + 1
                    )
                  }
                >
                  +
                </Button>
              </div>

              <Form.Label>Rooms</Form.Label>
              <div className="input-group mb-3">
                <Button
                  variant="outline-secondary"
                  onClick={() => handleDateChange(formData.rooms - 1, "rooms")}
                >
                  -
                </Button>
                <Form.Control type="text" value={formData.rooms} readOnly />
                <Button
                  variant="outline-secondary"
                  onClick={() => handleDateChange(formData.rooms + 1, "rooms")}
                >
                  +
                </Button>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default HotelBookingForm;
