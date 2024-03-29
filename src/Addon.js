import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const AddonList = () => {
    const [addons, setAddons] = useState([]);
    const [selectedAddons, setSelectedAddons] = useState([]);

    useEffect(() => {
        fetchAddons();
    }, []);

    const fetchAddons = async () => {
        try {
            const response = await fetch('http://localhost:8080/addon');
            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('addons', JSON.stringify(data));
                setAddons(data);
            } else {
                console.error('Failed to fetch addons');
            }
        } catch (error) {
            console.error('Error fetching addons:', error);
        }
    };

    const handleSelectAddon = (addonId) => {
        // Toggle selection of addon with addonId
        if (selectedAddons.includes(addonId)) {
            setSelectedAddons(selectedAddons.filter(id => id !== addonId));
        } else {
            setSelectedAddons([...selectedAddons, addonId]);
        }
    };

    // Add form data to session storage
    useEffect(() => {
        sessionStorage.setItem('selectedAddons', JSON.stringify(selectedAddons));
    }, [selectedAddons]);

    const handleContinue = () => {
        // Handle continue button click
        console.log('Selected addons:', selectedAddons);
        window.location.href = '/StaffBookingForm';
    };

    return (
        <>
            <h1 className="mb-4">Addon List</h1>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
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
                                type="checkbox"
                                id={`addon-${addon.addonId}`}
                                label="Select"
                                checked={selectedAddons.includes(addon.addonId)}
                                onChange={() => handleSelectAddon(addon.addonId)}
                            />
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <div className="text-center">
                <Button variant="primary" onClick={handleContinue}>Continue</Button>
            </div>
        </>
    );
};

export default AddonList;