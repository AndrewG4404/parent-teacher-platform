// src/Components/Events/EventList.js

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { Container, ListGroup, Alert } from 'react-bootstrap';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axiosInstance.get('/events');
                setEvents(response.data);
            } catch (error) {
                setError('Error fetching events. Please try again.');
            }
        };

        fetchEvents();
    }, []);

    return (
        <Container className="bg-base p-4 mt-5 rounded">
            <h2 className="text-brand">Events</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <ListGroup>
                {events.map(event => (
                    <ListGroup.Item key={event._id} className="bg-base2 text-brand">
                        <h5>{event.title}</h5>
                        <p>{event.description}</p>
                        <small>{new Date(event.date).toLocaleDateString()}</small>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default EventList;
