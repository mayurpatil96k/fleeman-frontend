import React, { useState } from 'react';

const BookingByStaff = ({ onEmailSubmit }) => {
  const [email, setEmail] = useState('');
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/customer/${email}`);
      if (response.ok) {
        const data = await response.json();
        setCustomerData(data);
        sessionStorage.setItem('customerData', JSON.stringify(data));
        onEmailSubmit(data); // Pass the customer details to the parent component
      } else {
        alert(`Failed to fetch customer details: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching customer details:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleNextPage = () => {
    window.location.href = '/BookingFormRitik';
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Enter Customer's Email</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>Submit</button>
      </form>
      {loading && <p>Loading...</p>}
      {customerData && (
        <div>
          <h3>Customer Details</h3>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Customer Id:</td>
                <td>{customerData.customerId}</td>
              </tr>
              <tr>
                <td>First Name:</td>
                <td>{customerData.firstName}</td>
              </tr>
              <tr>
                <td>Last Name:</td>
                <td>{customerData.lastName}</td>
              </tr>
              <tr>
                <td>Address Line 1:</td>
                <td>{customerData.addressLine1}</td>
              </tr>
              <tr>
                <td>Address Line 2:</td>
                <td>{customerData.addressLine2}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{customerData.email}</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>{customerData.city}</td>
              </tr>
              <tr>
                <td>Pincode:</td>
                <td>{customerData.pincode}</td>
              </tr>
              <tr>
                <td>Phone Number:</td>
                <td>{customerData.phoneNumber}</td>
              </tr>
              <tr>
                <td>Mobile Number:</td>
                <td>{customerData.mobileNumber}</td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={handleNextPage}>Continue</button>
        </div>
      )}
    </div>
  );
};

export default BookingByStaff;
