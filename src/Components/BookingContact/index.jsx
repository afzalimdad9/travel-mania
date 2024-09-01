import { countries } from "iso-3166-1-alpha-2";
import React from "react";

const BookingContact = ({ contactDetails, handleChange }) => {
  return (
    <div className="passenger-contact-dtl passenger-detail-inn">
      <h6>Contact Details</h6>
      <p>
        Please provide your contact details so that we can notify you the
        updates on your flight
      </p>
      <div className="row">
        <div className="col-md-6 col-12">
          <div className="field">
            <select>
              <option value="" selected>
                Select Primary Contact
              </option>
            </select>
          </div>
        </div>

        <div className="col-md-6 col-12">
          <div className="field">
            <select
              value={contactDetails?.nationality}
              onChange={handleChange}
              name="nationality"
            >
              <option value="">Select Country</option>
              {Object.keys(countries).map((k, id) => (
                <option value={k} key={id}>
                  {k}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-6 col-12">
          <div className="field">
            <input
              value={contactDetails?.phone}
              onChange={handleChange}
              name="phone"
              type="tel"
              placeholder="Phone Number"
            />
          </div>
        </div>

        <div className="col-md-6 col-12">
          <div className="field">
            <input
              type="email"
              value={contactDetails?.email}
              onChange={handleChange}
              name="email"
              placeholder="Email"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingContact;
