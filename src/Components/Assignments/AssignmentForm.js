// src/Components/Assignments/AssignmentForm.js

import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const AssignmentForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [subject, setSubject] = useState('');
    const [className, setClassName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const newAssignment = { title, description, dueDate, subject, className };
            await axiosInstance.post('/assignments', newAssignment);
            setTitle('');
            setDescription('');
            setDueDate('');
            setSubject('');
            setClassName('');
            setSuccess(true);
        } catch (error) {
            console.error('Error adding assignment:', error);
            setError('Error adding assignment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="bg-base p-4 mt-5 rounded">
            <h2 className="text-brand">Add an Assignment</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Assignment added successfully!</Alert>}
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
                <Form.Group controlId="formDueDate">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        />
                        </Form.Group>
                        <Form.Group controlId="formSubject">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formClass">
                            <Form.Label>Class</Form.Label>
                            <Form.Control
                                type="text"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={loading} className="btn-brand">
                            {loading ? 'Adding...' : 'Add Assignment'}
                        </Button>
                    </Form>
                </Container>
            );
        };
        
        export default AssignmentForm;
        
               
