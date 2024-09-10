// src/Components/Assignments/AssignmentList.js

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { Container, ListGroup, Alert } from 'react-bootstrap';

const AssignmentList = () => {
    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axiosInstance.get('/assignments'); // Correct endpoint
                setAssignments(response.data);
            } catch (error) {
                setError('Error fetching assignments. Please try again.');
            }
        };

        fetchAssignments();
    }, []);

    return (
        <Container className="bg-base p-4 mt-5 rounded">
            <h2 className="text-brand">Assignments</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <ListGroup>
                {assignments.map(assignment => (
                    <ListGroup.Item key={assignment._id} className="bg-base2 text-brand">
                        <h5>{assignment.title}</h5>
                        <p>{assignment.description}</p>
                        <small>Due: {new Date(assignment.dueDate).toLocaleDateString()}</small>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default AssignmentList;
