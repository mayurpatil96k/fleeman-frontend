import React, { useState, useEffect } from 'react';

import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import SessionStorage from './SessionStorage';

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
        // Fetch distinct airport codes from your database
        const fetchAirportCodes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/airport/code');
                // console.log('Airport Codes Response:', response.data);
                setAirportCodes(response.data);
            } catch (error) {
                console.error('Error fetching airport codes:', error);
            }
        };

        fetchAirportCodes();


    }, []); // This useEffect runs only once when the component mounts


    // useEffect(() => {
    //     // Fetch distinct airport codes from your database
    //     const fetchAirportCodes = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:8080/airport/code');
    //             console.log('Airport Codes Response:', response.data);
    //             setAirportCodes(response.data);
    //         } catch (error) {
    //             console.error('Error fetching airport codes:', error);
    //         }
    //     };

    //     fetchAirportCodes();
    // }, []); // This useEffect runs only once when the component mounts



    // const handleChangeAirport = async (e) => {
    //     const { name, value, type, checked } = e.target;

    //     if (name === 'pickupLocation') {
    //         // Find the airport data based on the selected code
    //         const selectedAirport = airportCodes.find(airport => airport.airportCode === value);

    //         // If the airport is found, extract state and city from the nested structure
    //         if (selectedAirport && selectedAirport.cityId && selectedAirport.cityId.state) {
    //             const { stateName } = selectedAirport.cityId.state;
    //             const cityName = selectedAirport.cityId.cityName;

    //             setFormData(prevState => ({
    //                 ...prevState,
    //                 pickupState: stateName,
    //                 pickupCity: cityName,
    //                 [name]: type === 'checkbox' ? checked : value,
    //             }));

    //         }
    //     } else {
    //         // For other fields, handle as before
    //         setFormData(prevState => ({
    //             ...prevState,
    //             [name]: type === 'checkbox' ? checked : value,
    //         }));
    //     }
    // };
    const handleChangeAirport = async (e) => {
        const { name, value } = e.target;
    
        if (name === 'pickupLocation') {
            // Update pickupLocation with the selected airport code
            setFormData(prevState => ({
                ...prevState,
                pickupLocation: value
            }));
            
            // Find the airport data based on the selected code
            const selectedAirport = airportCodes.find(airport => airport.airportCode === value);
    
            // If the airport is found, extract state and city from the nested structure
            if (selectedAirport && selectedAirport.cityId && selectedAirport.cityId.state) {
                const { stateName } = selectedAirport.cityId.state;
                const cityName = selectedAirport.cityId.cityName;
    
                setFormData(prevState => ({
                    ...prevState,
                    pickupState: stateName,
                    pickupCity: cityName
                }));
    
            }
        } else {
            // For other fields, handle as before
            setFormData(prevState => ({
                ...prevState,
                [name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
            }));
        }
    };
    




    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const jsonData = JSON.stringify(formData);
    //         console.log('JSON Format:', jsonData);

    //         const response = await axios.post('http://localhost:8080/api/addbooking', formData, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         console.log('Server response:', response.data);
    //     } catch (error) {
    //         console.error('Error submitting form:', error);
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const jsonData = JSON.stringify(formData);
            // console.log('JSON Format:', jsonData);

            // Save the entire form data in session storage
            sessionStorage.setItem('bookingFormData', jsonData);

            // Make the axios post request
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
                                    <Form.Select name="pickupLocation" onChange={handleChangeAirport} >
                                        <option value="">Select Pickup Location</option>
                                        {airportCodes.map(airport => (
                                            <option key={airport} value={airport}>
                                                {`${airport}`}
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


                                {/* <Form.Group controlId="returnLocation">
                                    <Form.Label>Return Location:</Form.Label>
                                    <Form.Control type="text" name="returnLocation" value={formData.returnLocation} onChange={handleChange} placeholder="Enter return location" required />
                                </Form.Group> */}


                                <Form.Group controlId="returnLocation">
                                    <Form.Label>Return Location:</Form.Label>
                                    <Form.Select name="returnLocation" onChange={handleChangeAirport} >
                                        <option value="">Select Return Location</option>
                                        {airportCodes.map(airport => (
                                            <option key={airport} value={airport}>
                                                {`${airport}`}
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