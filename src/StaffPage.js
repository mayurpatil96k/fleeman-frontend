
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StaffPage = () => {
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState(null); // Add this line to define the state

  const handleCancel = () => {
    const shouldCancel = window.confirm("Are you sure you want to cancel?");
    if (shouldCancel) {
      navigate("/CancelBookingByStaff");
    }
  };

  const handleEmailSubmit = (customer) => {
    setCustomerDetails(customer);
  };

  const handleBooking = () => {
    navigate("/BookingByStaff");
  };

  const handleReturn = () => {
    navigate("/return");
  };

  const handleHandover = () => {
    navigate("/handover");
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Staff Page</h2>
      <div className="mt-3" role="group" aria-label="Basic example">
        <button className="btn btn-outline-primary me-4 mb-2" onClick={handleCancel}>Cancel</button>
        <button className="btn btn-outline-success mb-2" onClick={handleBooking}>Booking</button>
        <br />
        <button className="btn btn-outline-danger mt-2 me-4 mb-2" onClick={handleReturn}>Return</button>
        <button className="btn btn-outline-info mt-2 mb-2" onClick={handleHandover}>Handover</button>
      </div>
    </div>
  );
};

export default StaffPage;
