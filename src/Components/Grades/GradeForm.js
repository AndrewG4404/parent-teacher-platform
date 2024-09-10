// src/Components/Grades/GradeForm.js
import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const GradeForm = () => {
    const [student, setStudent] = useState('');
    const [assignment, setAssignment] = useState('');
    const [grade, setGrade] = useState('');
    const [subject, setSubject] = useState('');
    const [term, setTerm] = useState('');
    const [date, setDate] = useState(''); // Ensure date field is included
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const newGrade = { student, assignment, grade, subject, term, date }; // Ensure date is included
            await axiosInstance.post('/grades', newGrade);
            setStudent('');
            setAssignment('');
            setGrade('');
            setSubject('');
            setTerm('');
            setDate(''); // Reset date field
            setSuccess(true);
        } catch (error) {
            console.error('Error adding grade:', error);
            setError('Error adding grade. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="bg-base p-4 mt-5 rounded">
            <h2 className="text-brand">Add a Grade</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Grade added successfully!</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formStudent">
                    <Form.Label>Student</Form.Label>
                    <Form.Control
                        type="text"
                        value={student}
                        onChange={(e) => setStudent(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formAssignment">
                    <Form.Label>Assignment</Form.Label>
                    <Form.Control
                        type="text"
                        value={assignment}
                        onChange={(e) => setAssignment(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formGrade">
                    <Form.Label>Grade</Form.Label>
                    <Form.Control
                        type="text"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
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
                <Form.Group controlId="formTerm">
                    <Form.Label>Term</Form.Label>
                    <Form.Control
                        type="text"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
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
                    {loading ? 'Adding...' : 'Add Grade'}
                </Button>
            </Form>
        </Container>
    );
};

export default GradeForm;
