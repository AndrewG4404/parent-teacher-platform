// src/Components/Events/EventForm.js

import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance'; // Update import path as necessary
import { Form, Button, Container, Alert } from 'react-bootstrap';

const EventForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const newEvent = { title, description, date };
            await axiosInstance.post('/events', newEvent);
            setTitle('');
            setDescription('');
            setDate('');
            setSuccess(true);
        } catch (error) {
            console.error('Error adding event:', error);
            setError('Error adding event. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="bg-base p-4 mt-5 rounded">
            <h2 className="text-brand">Add an Event</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Event added successfully!</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading} className="btn-brand">
                    {loading ? 'Adding...' : 'Add Event'}
                </Button>
            </Form>
        </Container>
    );
};

export default EventForm;
