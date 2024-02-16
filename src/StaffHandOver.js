import React, { useState } from 'react';

const StaffHandOver = () => {
  const [emailId, setEmailId] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCars, setShowCars] = useState(false);
  const [cars, setCars] = useState([]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/booking/email/${emailId}`);

      if (response.ok) {
        const data = await response.json();
        console.log('API Response - Bookings:', data);
        setBookings(data);
      } else {
        console.error('Failed to fetch bookings:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCars = async (hub, cartype) => {
    try {
      setLoading(true);
      const CarType_ID=cartype;
      const hub_id=hub;
      console.log("hub - ", hub);
      console.log("carTypeId - ", CarType_ID);

      const response = await fetch(`http://localhost:8080/car/${hub_id}/${cartype}`);

      if (response.ok) {
        const data = await response.json();
        console.log('API Response - Cars:', data);
        setCars(data);
        setShowCars(true);
      } else {
        console.error('Failed to fetch cars:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchBookings();
  };

  // const handleBookButtonClick = async (car) => {
  //   if (car.hub && car.hub.hubId && car.carType && car.carType.carTypeId) {
  //     fetchCars(car.hub.hubId, car.carType.carTypeId);
  //   } else {
  //     console.error('Invalid booking data:', car);
  //   }
  // };


  const handleSelectButtonClick = async (selectedCar) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/car/update/${selectedCar.carId}`, {
      // const response = await fetch(`http://localhost:8080/updateCarAvailability/${selectedCar.carId}`, {
        method: 'PUT', // Assuming your API supports the PATCH method for updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_Available: 'N' }), // Update is_Available to 'N'
      });

      if (response.ok) {
        console.log('Car availability updated successfully.');
        // You may want to update the state to reflect the change in real-time
        const updatedCars = cars.map((car) =>
          car.carId === selectedCar.carId ? { ...car, is_Available: 'N' } : car
        );
        setCars(updatedCars);
      } else {
        console.error('Failed to update car availability:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating car availability:', error);
    } finally {
      setLoading(false);
    }
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
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          Submit
        </button>
      </form>
      {loading && <p>Loading...</p>}

      {bookings.length > 0 && (
        <div>
          <h3>Bookings</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Booking Id</th>
                <th>First Name</th>
                <th>Booking Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.bookingId}</td>
                  <td>{booking.firstName}</td>
                  <td>{booking.bookingDate}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => fetchCars(booking.p_hubId,booking.carType.carTypeId)}
                      // onClick={() => handleBookButtonClick(booking)}
                    >
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showCars && (
        <div>
          <h3>Cars</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Car ID</th>
                <th>Car Name</th>
                <th>Select</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.carId}>
                  <td>{car.carId}</td>
                  <td>{car.carName}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSelectButtonClick(car)}
                    >
                      Select
                    </button>
                  </td>
                  {/* Add more cells based on the data structure */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StaffHandOver;
