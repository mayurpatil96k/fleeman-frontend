import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
const ConfirmBooking = () => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Retrieve data from session storage
    const bookingData = sessionStorage.getItem('bookingFormData');
    if (bookingData) {
      setFormData(JSON.parse(bookingData));
    }
  }, []);


  const handleModify = () => {
    // Pass the form data as a query parameter when navigating back
    const queryParam = encodeURIComponent(JSON.stringify(formData));
    window.location.href = `/BookingFormRitik?data=${queryParam}`;
  };

  const postDataToServer = async () => {
    try {
      // Retrieve data from session storage and parse it
      const customerData = JSON.parse(sessionStorage.getItem('customerData'));
      const selectedCar = JSON.parse(sessionStorage.getItem('selectedCar'));
      const bookingFormData = JSON.parse(sessionStorage.getItem('bookingFormData'));
      const customerFormData = JSON.parse(sessionStorage.getItem('customerFormData'));
      const selectedHub = JSON.parse(sessionStorage.getItem('selectedHub'));
      const selectedReturnHub = JSON.parse(sessionStorage.getItem('selectedReturnHub'));
      const currentDate = new Date();

// Format current date to YYYY-MM-DD format
const formattedCurrentDate = currentDate.toISOString().split('T')[0];

  
      // Create the formatted data object
      const postData = {
        "bookingDate": formattedCurrentDate,
        "customer": {
          customerId: customerData.customerId,
          firstName: customerData.firstName,
          lastName: customerData.lastName,
          addressLine1: customerData.addressLine1,
          addressLine2: customerData.addressLine2,
          email: customerData.email,
          city: customerData.city,
          pincode: customerData.pincode,
          phoneNumber: customerData.phoneNumber,
          mobileNumber: customerData.mobileNumber,
          creditCardType: customerData.creditCardType,
          creditCardNumber: customerData.creditCardNumber,
          drivingLicenseNumber: customerData.drivingLicenseNumber,
          idpNumber: customerData.idpNumber,
          issuedByDL: customerData.issuedByDL,
          validThroughDL: customerData.validThroughDL,
          passportNumber: customerData.passportNumber,
          passportValidThrough: customerData.passportValidThrough,
          passportIssuedBy: customerData.passportIssuedBy,
          passportValidFrom: customerData.passportValidFrom,
          passportIssueDate: customerData.passportIssueDate,
          dateOfBirth: customerData.dateOfBirth,
          password: customerData.password
        },
        "startDate": bookingFormData.rentalDate,
        "endDate": bookingFormData.returnDate,
        "carType": {
          carTypeId: selectedCar.carTypeId,
          carTypeName: selectedCar.carTypeName,
          dailyRate: selectedCar.dailyRate,
          weeklyRate: selectedCar.weeklyRate,
          monthlyRate: selectedCar.monthlyRate,
          imagePath: selectedCar.imagePath
        },
        "firstName": customerFormData.r_firstName,
        "lastName": customerFormData.r_lastName,
        "address": customerFormData.r_addressLine1 + ' ' + customerFormData.r_addressLine2,
        "state": customerFormData.r_city,
        "pin": "111111",
        "dailyRate": selectedCar.dailyRate,
        "weeklyRate": selectedCar.weeklyRate,
        "monthlyRate": selectedCar.monthlyRate,
        "emailId": customerFormData.r_email,
        "p_hubId": selectedHub.hubId,
        "r_hubId": selectedReturnHub.hubId
    }
  
      // Make a POST request to the specified link with the formatted data
      const response = await axios.post('http://localhost:8080/api/addbooking', postData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      sessionStorage.setItem('bookingResponseData', JSON.stringify(response.data));
      alert("booking Successful");
      sendSelectedAddonsToDatabase();
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
  
  const handleConfirm = async () => {
    try {
      // Make an axios post request to store data in the database
      const response = await axios.post('http://localhost:8080/api/addbooking', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };

  function sendSelectedAddonsToDatabase() {
    // Retrieve addon objects from session storage
    var addons = JSON.parse(sessionStorage.getItem('addons'));

    // Retrieve selected addon IDs from session storage
    var selectedAddonIds = JSON.parse(sessionStorage.getItem('selectedAddons'));
    var bookingnew = JSON.parse(sessionStorage.getItem('bookingResponseData'));

    // Iterate over each selected addon ID
    selectedAddonIds.forEach(function(addonId) {
        // Find the addon object corresponding to the addonId
        var selectedAddon = addons.find(function(addon) {
            return addon.addonId === addonId;
        });

        // Prepare data to be sent to the database
        var data = {
          booking: bookingnew,
          addonId: selectedAddon.addonId,
          addonRate: selectedAddon.addonDailyRate
      };

        // Make a POST request to the database endpoint
        fetch('http://localhost:8080/bookingdetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                console.log('Addon with ID ' + addonId + ' sent to the database successfully.');
            } else {
                console.error('Failed to send addon with ID ' + addonId + ' to the database. Status code:', response.status);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    });
}


  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <div className="card">
            <div className="card-body">
              <h2 className="mb-4">Confirm Booking</h2>
              <dl className="row">
                <dt className="col-sm-4">Rental Date:</dt>
                <dd className="col-sm-8">{formData.rentalDate}</dd>

                <dt className="col-sm-4">Rental Time:</dt>
                <dd className="col-sm-8">{formData.rentalTime}</dd>

                <dt className="col-sm-4">Return Date:</dt>
                <dd className="col-sm-8">{formData.returnDate}</dd>

                <dt className="col-sm-4">Return Time:</dt>
                <dd className="col-sm-8">{formData.returnTime}</dd>

                <dt className="col-sm-4">Pickup Location:</dt>
                <dd className="col-sm-8">{formData.pickupLocation}</dd>

                <dt className="col-sm-4">Pickup State:</dt>
                <dd className="col-sm-8">{formData.pickupState}</dd>

                <dt className="col-sm-4">Pickup City:</dt>
                <dd className="col-sm-8">{formData.pickupCity}</dd>

                <dt className="col-sm-4">Return Location:</dt>
                <dd className="col-sm-8">{formData.returnLocation}</dd>

                <dt className="col-sm-4">Return State:</dt>
                <dd className="col-sm-8">{formData.returnState}</dd>

                <dt className="col-sm-4">Return City:</dt>
                <dd className="col-sm-8">{formData.returnCity}</dd>

                <dt className="col-sm-4">Return to Different Location:</dt>
                <dd className="col-sm-8">{formData.returnToDifferentLocation ? 'Yes' : 'No'}</dd>


               
              <Row className="mt-3">
                <Col>
                  <Button variant="secondary" onClick={handleModify}>
                    Modify
                  </Button>
                </Col>
                <Col>
                  <Button variant="primary" onClick={postDataToServer}>
                    Confirm
                  </Button>
                </Col>
              </Row>
              </dl>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmBooking;
