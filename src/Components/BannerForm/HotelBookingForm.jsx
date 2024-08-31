import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { countries } from "iso-3166-1-alpha-2";
import { useRouter } from "next/router";

const HotelBookingForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    checkInDate: null,
    checkoutDate: null,
    from: "",
    persons: {
      adults: 1,
      children: 0,
    },
  });

  const [passengerDropdown, setPassengerDropdown] = useState(false);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate =
      date.getUTCFullYear() +
      "-" +
      String(date.getUTCMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getUTCDate() + 1).padStart(2, "0");
    return formattedDate;
  }

  const handlePassengerChange = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      persons: {
        ...prev.persons,
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

  const validateForm = () => {
    const { from, checkInDate, checkoutDate, persons } = formData;
    const totalpersons = Object.values(persons).reduce(
      (acc, val) => acc + val,
      0
    );

    if (!from) {
      toast.error("Please select a stay place.");
      return false;
    }
    if (!checkInDate) {
      toast.error("Please select a check in date.");
      return false;
    }
    if (!checkoutDate) {
      toast.error("Please select a check out date.");
      return false;
    }
    if (totalpersons === 0) {
      toast.error("Please select at least one person.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const searchPayload = {
        CheckIn: formatDate(formData.checkInDate),
        CheckOut: formatDate(formData.checkoutDate),
        GuestNationality: formData.from,
        PaxRooms: [
          {
            Adults: formData.persons.adults,
            Children: formData.persons.children,
            ChildrenAges: new Array(formData.persons.children)
              .fill(0)
              .map(() => 10),
          },
        ],
        ResponseTime: 19,
        IsDetailedResponse: true,
        Filters: {
          Refundable: false,
          No0fRooms: 1,
          MealType: "All",
        },
      };

      try {
        const response = await axios.post("/api/search-hotel", searchPayload);
        const apiResult = response.data;
        if (apiResult && apiResult.Status.Code === 200) {
          router.push({
            query: {
              adults: formData.persons.adults,
              children: formData.persons.children,
              stayplace: formData.from,
              checkin: formatDate(formData.checkInDate),
              checkout: formatDate(formData.checkoutDate),
            },
            pathname: "/hotelsearchresults",
          });
        } else if (
          apiResult &&
          apiResult.Status &&
          apiResult.Status.Description
        ) {
          toast.error(
            `Error: ${
              apiResult.Status.Description || "An unexpected error occurred"
            }`
          );
        } else {
          toast.error("An unexpected error occurred during hotel search.");
        }
      } catch (error) {
        toast.error("Error during hotel search. Please try again.");
        console.error("Error during hotel search:", error);
      }
    }
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
      });
    }
  }, [router]);

  return (
    <section className="booking_form-sec">
      <div className="container">
        <ToastContainer />
        <Form onSubmit={handleSubmit} className="booking_form-mn">
          <Row className="mb-3 trip_select-mn">
            <Col md={3}>
              <Form.Group controlId="from">
                <Form.Label>Stays In</Form.Label>
                <Form.Select
                  name="from"
                  value={formData.from}
                  onChange={handleInputChange}
                >
                  <option value="">Select country</option>
                  {Object.entries(countries).map(([key, value]) => (
                    <option value={key} key={key}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

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

            <Col md={4} className="select_trip">
              <Dropdown
                onToggle={(isOpen) => setPassengerDropdown(isOpen)}
                show={passengerDropdown}
              >
                <Form.Label> People</Form.Label>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="passenger-dropdown"
                >
                  {`Adults: ${formData.persons.adults}, Children: ${formData.persons.children}`}
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
                            formData.persons.adults - 1
                          )
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
                          handlePassengerChange(
                            "adults",
                            formData.persons.adults + 1
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
                Show Results
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </section>
  );
};

export default HotelBookingForm;
