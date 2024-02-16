import React, { useState, useEffect } from 'react';
import { Form, Card, Button } from 'react-bootstrap';

const Car = () => {
    const [carTypes, setCarTypes] = useState([]);
    const [selectedCarType, setSelectedCarType] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCarTypes();
    }, []);

    const fetchCarTypes = async () => {
        try {
            const response = await fetch('http://localhost:8080/cartype');
            if (response.ok) {
                const data = await response.json();
                setCarTypes(data);
            } else {
                setError('Failed to fetch car types');
            }
        } catch (error) {
            setError('Error fetching car types:', error.message);
        }
    };

    const handleSelectCarType = (carType) => {
        setSelectedCarType(carType);
    };

    const handleNextButtonClick = () => {
        if (selectedCarType) {
            const selectedCarJson = JSON.stringify(selectedCarType);
            sessionStorage.setItem('selectedCar', selectedCarJson);
            window.location.href = "/AddonList";
        } else {
            setError('Please select a car type');
        }
    };

    return (
        <div className="container">
            <h2>Select a Car Type</h2>
            <Form>
                {error && <div>Error: {error}</div>}
                <div className="card-deck">
                    {carTypes.map((carType) => (
                        <Card key={carType.carTypeId} style={{ marginBottom: '10px' }}>
                            <Card.Body>
                                <Card.Title>{carType.carTypeName}</Card.Title>
                                <Card.Text>
                                    Daily Rate: {carType.dailyRate}<br />
                                    Weekly Rate: {carType.weeklyRate}<br />
                                    Monthly Rate: {carType.monthlyRate}<br />
                                </Card.Text>
                                <Form.Check
                                    type="radio"
                                    name="carType"
                                    id={`carType-${carType.carTypeId}`}
                                    label="Select"
                                    onChange={() => handleSelectCarType(carType)}
                                />
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                <Button variant="primary" onClick={handleNextButtonClick}>Next</Button>
            </Form>
        </div>
    );
};

export default Car;
