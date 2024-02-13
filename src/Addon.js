import React, { useState, useEffect } from 'react';
import { Card, Form } from 'react-bootstrap';

const AddonList = () => {
    const [addons, setAddons] = useState([]);

    useEffect(() => {
        fetchAddons();
    }, []);

    const fetchAddons = async () => {
        try {
            const response = await fetch('http://localhost:8080/addon');
            if (response.ok) {
                const data = await response.json();
                setAddons(data);
            } else {
                console.error('Failed to fetch addons');
            }
        } catch (error) {
            console.error('Error fetching addons:', error);
        }
    };

    const handleSelectAddon = (addonId) => {
        // Handle selection of addon with addonId
        console.log('Selected addon:', addonId);
    };

    return (
        <>
       
        <div className="d-flex flex-wrap justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <h1>AddonList</h1>
            {addons.map((addon) => (
                <Card key={addon.addonId} style={{ width: '18rem', margin: '10px' }}>
                    <Card.Body>
                        <Card.Title>{addon.addonName}</Card.Title>
                        <Card.Text>
                            Rate: &#8377;{addon.addonDailyRate.toFixed(2)} per day
                        </Card.Text>
                        <Card.Text>
                            Valid Until: {new Date(addon.rateValidUntil).toLocaleDateString()}
                        </Card.Text>
                        <Form.Check
                            type="radio"
                            id={`addon-${addon.addonId}`}
                            label="Select"
                            onChange={() => handleSelectAddon(addon.addonId)}
                        />
                    </Card.Body>
                </Card>
            ))}
        </div>
        </>
    );
};

export default AddonList;
