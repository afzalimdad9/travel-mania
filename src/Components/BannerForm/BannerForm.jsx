import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Button, Row, Col, Dropdown } from 'react-bootstrap';
import { LiaExchangeAltSolid } from "react-icons/lia";
import { CiCalendarDate } from "react-icons/ci";


const FlightBookingForm = () => {
    const [formData, setFormData] = useState({
        tripType: 'one-way',
        flightMode: 'Economy',
        departureDate: null,
        returnDate: null,
        from: '',
        to: '',
        passengers: {
            adults: 1,
            students: 0,
            seniors: 0,
            youths: 0,
            children: 0,
            toddlers: 0,
            infants: 0,
        }
    });


    const [passengerDropdown, setPassengerDropdown] = useState(false);

    const handlePassengerChange = (type, value) => {
        setFormData((prev) => ({
            ...prev,
            passengers: {
                ...prev.passengers,
                [type]: Math.max(0, value),
            }
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
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
        const { from, to, departureDate, tripType, returnDate, passengers } = formData;
        const totalPassengers = Object.values(passengers).reduce((acc, val) => acc + val, 0);

        if (!from) {
            alert('Please select a departure city.');
            return false;
        }
        if (!to) {
            alert('Please select a destination city.');
            return false;
        }
        if (!departureDate) {
            alert('Please select a departure date.');
            return false;
        }
        if (tripType === 'round-trip' && !returnDate) {
            alert('Please select a return date.');
            return false;
        }
        if (totalPassengers === 0) {
            alert('Please select at least one passenger.');
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          console.log("formData",formData)
            alert('Form submitted successfully!');
        }
    };

    const today = new Date();

    return (
      <section className='booking_form-sec'>
        <div className="container  ">
            <Form onSubmit={handleSubmit} className='booking_form-mn'>
                <Row className="mb-3 trip_select-mn">
                    <div className='select_trip'>
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
                    </div>

                    <div className='select_trip'>
                        <Dropdown onToggle={(isOpen) => setPassengerDropdown(isOpen)} show={passengerDropdown}>
                        <Form.Label> Passengers</Form.Label>
                            <Dropdown.Toggle variant="outline-secondary" id="passenger-dropdown">
                                Passengers
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <div className="p-3">
                                    <Form.Label>Adults (18-64)</Form.Label>
                                    <div className="input-group mb-3">
                                        <Button variant="outline-secondary" onClick={() => handlePassengerChange('adults', formData.passengers.adults - 1)}>-</Button>
                                        <Form.Control type="text" value={formData.passengers.adults} readOnly />
                                        <Button variant="outline-secondary" onClick={() => handlePassengerChange('adults', formData.passengers.adults + 1)}>+</Button>
                                    </div>
                                    <Form.Label>Students (18+)</Form.Label>
                                    <div className="input-group mb-3">
                                        <Button variant="outline-secondary" onClick={() => handlePassengerChange('students', formData.passengers.students - 1)}>-</Button>
                                        <Form.Control type="text" value={formData.passengers.students} readOnly />
                                        <Button variant="outline-secondary" onClick={() => handlePassengerChange('students', formData.passengers.students + 1)}>+</Button>
                                    </div>
                                    <Form.Label>Seniors (65+)</Form.Label>
                                    <div className="input-group mb-3">
                                        <Button variant="outline-secondary" onClick={() => handlePassengerChange('seniors', formData.passengers.seniors - 1)}>-</Button>
                                        <Form.Control type="text" value={formData.passengers.seniors} readOnly />
                                        <Button variant="outline-secondary" onClick={() => handlePassengerChange('seniors', formData.passengers.seniors + 1)}>+</Button>
                                    </div>
                                    <Form.Label>Youths (12-17)</Form.Label>
                                    <div className="input-group mb-3">
                                        <Button variant="outline-secondary" onClick={() => handlePassengerChange('youths', formData.passengers.youths - 1)}>-</Button>
                                        <Form.Control type="text" value={formData.passengers.youths} readOnly />
                                        <Button variant="outline-secondary" onClick={() => handlePassengerChange('youths', formData.passengers.youths + 1)}>+</Button>
                                    </div>
                                    <Form.Label>Children (2-11)</Form.Label>
                                    <div className="input-group mb-3">
                                        <Button variant="outline-secondary" onClick={() => handlePassengerChange('children', formData.passengers.children - 1)}>-</Button>
                                        <Form.Control type="text" value={formData.passengers.children} readOnly />
                                        <Button variant="outline-secondary" onClick={() => handlePassengerChange('children', formData.passengers.children + 1)}>+</Button>
                                    </div>
                                    <Form.Label>Toddlers in own seat</Form.Label>
                                    <div className="input-group mb-3">
                                        <Button variant="outline-secondary" onClick={() => handlePassengerChange('toddlers', formData.passengers.toddlers - 1)}>-</Button>
                                        <Form.Control type="text" value={formData.passengers.toddlers} readOnly />
                                        <Button variant="outline-secondary" onClick={() => handlePassengerChange('toddlers', formData.passengers.toddlers + 1)}>+</Button>
                                    </div>
                                    <Form.Label>Infants on lap</Form.Label>
                                    <div className="input-group mb-3">
                                        <Button variant="outline-secondary" onClick={() => handlePassengerChange('infants', formData.passengers.infants - 1)}>-</Button>
                                        <Form.Control type="text" value={formData.passengers.infants} readOnly />
                                        <Button variant="outline-secondary" onClick={() => handlePassengerChange('infants', formData.passengers.infants + 1)}>+</Button>
                                    </div>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className='select_trip'>
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
                    </div>
                </Row>
                <Row className="mb-3 booking_form-inn">
                    <div className='form_book-form'>
                        <Form.Group controlId="from">
                            <Form.Label>From</Form.Label>
                            <Form.Select name="from" value={formData.from} onChange={handleInputChange}>
                                <option value="">Select Departure City</option>
                                <option value="Karachi">Karachi</option>
                                <option value="Lahore">Lahore</option>
                                <option value="Islamabad">Islamabad</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className='form_book-swap'>
                        <Button variant="secondary" className="" onClick={swapLocations}>
                        <LiaExchangeAltSolid />
                        </Button>
                    </div>
                    <div className='form_book-form'>
                        <Form.Group controlId="to">
                            <Form.Label>To</Form.Label>
                            <Form.Select name="to" value={formData.to} onChange={handleInputChange}>
                                <option value="">Select Destination City</option>
                                <option value="Karachi">Karachi</option>
                                <option value="Lahore">Lahore</option>
                                <option value="Islamabad">Islamabad</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                 
                    <div className='form_book-date1 date_field'>
                        <Form.Group controlId="departureDate">
                            <Form.Label>Departure Date</Form.Label>
                            <CiCalendarDate />
                            <DatePicker
                                selected={formData.departureDate}
                                onChange={(date) => setFormData((prev) => ({ ...prev, departureDate: date }))}
                                dateFormat="yyyy/MM/dd" 
                                className="form-control"
                                minDate={today}
                            />
                        </Form.Group>
                    </div>
                    {formData.tripType === 'round-trip' && (
                        <div className='form_book-date2 date_field'>
                            <Form.Group controlId="returnDate">
                                <Form.Label>Return Date</Form.Label>
                                <CiCalendarDate />
                                <DatePicker
                                    selected={formData.returnDate}
                                    onChange={(date) => setFormData((prev) => ({ ...prev, returnDate: date }))}
                                    dateFormat="yyyy/MM/dd"
                                    className="form-control" 
                                    minDate={formData.departureDate || today}
                                />
                            </Form.Group>
                        </div>
                    )}
                <Button type="submit" className='btn10' >Search</Button>
                </Row> 
            </Form>
        </div>
      </section>
    );
};

export default FlightBookingForm;
