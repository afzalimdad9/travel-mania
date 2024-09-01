import React from "react";
import PaymentLayout from "../../Components/PaymentLayout";

const FlightPayment = () => {
  function handlePayment(e) {}
  return (
    <PaymentLayout onSubmit={handlePayment}>
      <div className="book-sum-dv">
        <p>Booking summary</p>
        <h6>Dubai - London </h6>
        <p>Thu, 30 May - Sat, 15 Jun - Return trip (2 adults)</p>
        <h5>Total : PKR 56809.00</h5>
      </div>
    </PaymentLayout>
  );
};

export default FlightPayment;
