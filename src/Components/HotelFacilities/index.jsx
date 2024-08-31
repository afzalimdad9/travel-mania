import React from 'react';

function HotelFacilities({ facilities }) {
  return (
    <div className="container">
      <div className="row">
        <h2 className="mb-2">Facilities</h2>
        {facilities.map((facility, index) => (
          <div key={index} className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{facility}</h5>
                {facility === "Breakfast included" && (
                  <div className="d-flex align-items-center">
                    <i className="fas fa-utensils text-success mr-2"></i>
                    <span>Breakfast included</span>
                    <i className="fas fa-info-circle text-muted ml-2"></i>
                  </div>
                )}
                {facility.startsWith("Protect") && (
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      {facility}
                    </label>
                    <span className="badge badge-pill badge-success ml-3">
                      + £22
                    </span>
                  </div>
                )}
                {facility.startsWith("FREE") && (
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      defaultChecked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      {facility}
                    </label>
                  </div>
                )}
                {facility.startsWith("Pay") && (
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      defaultChecked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      {facility}
                    </label>
                  </div>
                )}
                {(facility === "Non-refundable" ||
                  facility === "Room only") && (
                  <p className="card-text">- {facility}</p>
                )}
                {facility === "Non-refundable" && (
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Book</button>
                    <div className="ml-3">
                      <span className="badge badge-pill badge-success">
                        -40% TODAY
                      </span>
                      <span className="ml-2">
                        $600 <span className="font-weight-bold">$360</span>
                      </span>
                    </div>
                  </div>
                )}
                {facility === "Room only" && (
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Book</button>
                    <div className="ml-3">
                      <span className="badge badge-pill badge-success">
                        -40% TODAY
                      </span>
                      <span className="ml-2">
                        $600 <span className="font-weight-bold">$360</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default HotelFacilities;