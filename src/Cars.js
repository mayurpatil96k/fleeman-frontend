import React, { useState, useEffect } from 'react';
import { Form, Card, Button } from 'react-bootstrap';

const Car = () => {
    const [carTypes, setCarTypes] = useState([]);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className="container">
            <h2>Select a Car Type</h2>
            <Form onSubmit={handleSubmit}>
                {error && <div>Error: {error}</div>}
                <div className="card-deck">
                    {carTypes.map((carType) => (
                        <Card key={carType.carTypeId} style={{ marginBottom: '10px' }}>
                            {/* <Card.Img variant="top" src={require(`${carType.imagePath}`).default} /> */}
                            {/* <Card.Img variant="top" src={`${carType.imagePath}`} /> */}
                            <Card.Body>
                                <Card.Title>{carType.carTypeName}</Card.Title>
                                <Card.Text>
                                    Daily Rate: {carType.dailyRate}<br />
                                    Weekly Rate: {carType.weeklyRate}<br />
                                    Monthly Rate: {carType.monthlyRate}<br />
                                </Card.Text>
                                <Button variant="primary">Select</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </Form>
        </div>
    );
};

export default Car;
