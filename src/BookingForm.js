import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        rentalDate: '',
        rentalTime: '',
        returnDate: '',
        returnTime: '',
        pickupLocation: '',
        pickupState: '',
        pickupCity: '',
        returnLocation: '',
        returnState: '',
        returnCity: '',
        returnToDifferentLocation: false,
    });

    const [airportCodes, setAirportCodes] = useState([]);

    useEffect(() => {
        const fetchAirportCodes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/airport');
                console.log('Airport Codes Response:', response.data);
                setAirportCodes(response.data);
            } catch (error) {
                console.error('Error fetching airport codes:', error);
            }
        };

        fetchAirportCodes();
    }, []);

    const handleChangeAirport = async (e, locationType) => {
        const { name, value } = e.target;
    
        const selectedAirport = airportCodes.find(airport => airport.airportCode === value);
    
        if (selectedAirport) {
            const { cityId, stateId } = selectedAirport;
            const locationKeyPrefix = locationType === 'pickup' ? 'pickup' : 'return';
    
            const updatedFormData = {
                ...formData,
                [`${locationKeyPrefix}Location`]: value,
                [`${locationKeyPrefix}City`]: cityId.cityName,
                [`${locationKeyPrefix}CityId`]: cityId.cityId,
                [`${locationKeyPrefix}State`]: stateId.stateName
            };
    
            setFormData(updatedFormData);
    
            // Store updated form data in session storage
            sessionStorage.setItem('bookingFormData', JSON.stringify(updatedFormData));
        }
    };
    

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const jsonData = JSON.stringify(formData);
            sessionStorage.setItem('bookingFormData', jsonData);
            window.location.href = '/HubSelectionForm';
            const response = await axios.post('http://localhost:8080/api/addbooking', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Server response:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="mb-4">Make Reservation</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="rentalDate">
                                    <Form.Label>Rental Date:</Form.Label>
                                    <Form.Control type="date" name="rentalDate" value={formData.rentalDate} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group controlId="rentalTime">
                                    <Form.Label>Rental Time:</Form.Label>
                                    <Form.Control type="time" name="rentalTime" value={formData.rentalTime} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group controlId="returnDate">
                                    <Form.Label>Return Date:</Form.Label>
                                    <Form.Control type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group controlId="returnTime">
                                    <Form.Label>Return Time:</Form.Label>
                                    <Form.Control type="time" name="returnTime" value={formData.returnTime} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group controlId="pickupLocation">
                                    <Form.Label>Pickup Location:</Form.Label>
                                    <Form.Select name="pickupLocation" onChange={(e) => handleChangeAirport(e, 'pickup')}>
                                        <option value="">Select Pickup Location</option>
                                        {airportCodes.map(airport => (
                                            <option key={airport.airportId} value={airport.airportCode}>
                                                {`${airport.airportName} (${airport.airportCode})`}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId="pickupState">
                                    <Form.Label>Pickup State:</Form.Label>
                                    <Form.Control type="text" name="pickupState" value={formData.pickupState} onChange={handleChange} placeholder="Enter pickup state" required />
                                </Form.Group>
                                <Form.Group controlId="pickupCity">
                                    <Form.Label>Pickup City:</Form.Label>
                                    <Form.Control type="text" name="pickupCity" value={formData.pickupCity} onChange={handleChange} placeholder="Enter pickup city" required />
                                </Form.Group>
                                <Form.Group controlId="returnLocation">
                                    <Form.Label>Return Location:</Form.Label>
                                    <Form.Select name="returnLocation" onChange={(e) => handleChangeAirport(e, 'return')}>
                                        <option value="">Select Return Location</option>
                                        {airportCodes.map(airport => (
                                            <option key={airport.airportId} value={airport.airportCode}>
                                                {`${airport.airportName} (${airport.airportCode})`}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId="returnState">
                                    <Form.Label>Return State:</Form.Label>
                                    <Form.Control type="text" name="returnState" value={formData.returnState} onChange={handleChange} placeholder="Enter return state" required />
                                </Form.Group>
                                <Form.Group controlId="returnCity">
                                    <Form.Label>Return City:</Form.Label>
                                    <Form.Control type="text" name="returnCity" value={formData.returnCity} onChange={handleChange} placeholder="Enter return city" required />
                                </Form.Group>
                                <Form.Group controlId="returnToDifferentLocation">
                                    <Form.Check type="checkbox" name="returnToDifferentLocation" checked={formData.returnToDifferentLocation} onChange={handleChange} label="I may return the car to a different location" />
                                </Form.Group>
                                <Button variant="primary" type="submit">Continue Booking</Button>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default BookingForm;
