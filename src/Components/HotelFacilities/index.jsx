import React from "react";

function HotelFacilities({ facilities }) {
  return (
    <div className="container mb-3">
      <div className="row">
        <h2 className="mb-2">Facilities</h2>
        {facilities.map((facility, index) => (
          <div key={index} className="col-md-4">
            <div className="mb-3">
              <h6>{facility}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelFacilities;
