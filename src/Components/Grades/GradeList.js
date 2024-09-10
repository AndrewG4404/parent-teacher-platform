// src/Components/Grades/GradeList.js

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance'; // Update import path as necessary
import { Container, ListGroup, Alert } from 'react-bootstrap';

const GradeList = () => {
    const [grades, setGrades] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const response = await axiosInstance.get('/grades');
                setGrades(response.data);
            } catch (error) {
                console.error('Error fetching grades:', error);
                setError('Error fetching grades. Please try again.');
            }
        };

        fetchGrades();
    }, []);

    return (
        <Container className="bg-base p-4 mt-5 rounded">
            <h2 className="text-brand">Grades</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <ListGroup>
                {grades.map(grade => (
                    <ListGroup.Item key={grade._id} className="bg-base2 text-brand">
                        <p><strong>{grade.student}</strong>: {grade.subject} - {grade.grade}</p>
                        <small>{new Date(grade.date).toLocaleString()}</small>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default GradeList;
