import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CustomerForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        email: '',
        state:'',
        city: '',
        pincode: '',
        phoneNumber: '',
        mobileNumber: '',
        creditCardType: '',
        creditCardNumber: '',
        drivingLicenseNumber: '',
        idpNumber: '',
        issuedByDL: '',
        validThroughDL: '',
        passportNumber: '',
        passportValidThrough: '',
        passportIssuedBy: '',
        passportValidFrom: '',
        passportIssueDate: '',
        dateOfBirth: '',
        password: ''
    });
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                window.location.href = "/LoginComponent";
                console.log('Customer data submitted successfully');
                // Reset form after successful submission if needed
                setFormData({
                    firstName: '',
                    lastName: '',
                    addressLine1: '',
                    addressLine2: '',
                    email: '',
                    state: '',
                    city: '',
                    pincode: '',
                    phoneNumber: '',
                    mobileNumber: '',
                    creditCardType: '',
                    creditCardNumber: '',
                    drivingLicenseNumber: '',
                    idpNumber: '',
                    issuedByDL: '',
                    validThroughDL: '',
                    passportNumber: '',
                    passportValidThrough: '',
                    passportIssuedBy: '',
                    passportValidFrom: '',
                    passportIssueDate: '',
                    dateOfBirth: '',
                    password: ''
                });
            } else {
                console.error('Failed to submit customer data');
            }
        } catch (error) {
            console.error('Error submitting customer data:', error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
            <h2>Customer Information Form</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="firstName">
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="lastName">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="addressLine1">
                    <Form.Label>Address Line 1:</Form.Label>
                    <Form.Control type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="addressLine2">
                    <Form.Label>Address Line 2:</Form.Label>
                    <Form.Control type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="state">
                    <Form.Label>State:</Form.Label>
                    <Form.Control type="text" name="state" value={formData.state} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City:</Form.Label>
                    <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="pincode">
                    <Form.Label>Pincode:</Form.Label>
                    <Form.Control type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="phoneNumber">
                    <Form.Label>Phone Number:</Form.Label>
                    <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="mobileNumber">
                    <Form.Label>Mobile Number:</Form.Label>
                    <Form.Control type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="creditCardType">
                    <Form.Label>Credit Card Type:</Form.Label>
                    <Form.Control type="text" name="creditCardType" value={formData.creditCardType} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="creditCardNumber">
                    <Form.Label>Credit Card Number:</Form.Label>
                    <Form.Control type="text" name="creditCardNumber" value={formData.creditCardNumber} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="drivingLicenseNumber">
                    <Form.Label>Driving License Number:</Form.Label>
                    <Form.Control type="text" name="drivingLicenseNumber" value={formData.drivingLicenseNumber} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="idpNumber">
                    <Form.Label>IDP Number:</Form.Label>
                    <Form.Control type="text" name="idpNumber" value={formData.idpNumber} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="issuedByDL">
                    <Form.Label>Issued By (DL):</Form.Label>
                    <Form.Control type="text" name="issuedByDL" value={formData.issuedByDL} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="validThroughDL">
                    <Form.Label>Valid Through (DL):</Form.Label>
                    <Form.Control type="date" name="validThroughDL" value={formData.validThroughDL} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="passportNumber">
                    <Form.Label>Passport Number:</Form.Label>
                    <Form.Control type="text" name="passportNumber" value={formData.passportNumber} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="passportValidThrough">
                    <Form.Label>Passport Valid Through:</Form.Label>
                    <Form.Control type="date" name="passportValidThrough" value={formData.passportValidThrough} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="passportIssuedBy">
                    <Form.Label>Passport Issued By:</Form.Label>
                    <Form.Control type="text" name="passportIssuedBy" value={formData.passportIssuedBy} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="passportValidFrom">
                    <Form.Label>Passport Valid From:</Form.Label>
                    <Form.Control type="date" name="passportValidFrom" value={formData.passportValidFrom} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="passportIssueDate">
                    <Form.Label>Passport Issue Date:</Form.Label>
                    <Form.Control type="date" name="passportIssueDate" value={formData.passportIssueDate} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="dateOfBirth">
                    <Form.Label>Date of Birth:</Form.Label>
                    <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
            </div>
        </div>
      </div>
      </div>

    );
};

export default CustomerForm;
