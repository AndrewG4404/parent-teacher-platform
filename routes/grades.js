// server/routes/grades.js

const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade');
const { authMiddleware } = require('../middleware/auth');

// POST route to create a new grade
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { student, assignment, grade, subject, term, date } = req.body;

        if (!student || !assignment || !grade || !subject || !term || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newGrade = new Grade({
            student,
            assignment,
            grade,
            subject,
            term,
            date
        });

        await newGrade.save();
        res.status(201).json(newGrade);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// GET route to get all grades
router.get('/', authMiddleware, async (req, res) => {
    try {
        const grades = await Grade.find();
        res.status(200).json(grades);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT route to update a grade by ID
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { grade } = req.body;
        const updatedGrade = await Grade.findByIdAndUpdate(req.params.id, { grade }, { new: true });
        res.status(200).json(updatedGrade);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE route to delete a grade by ID
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Grade.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Grade deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
