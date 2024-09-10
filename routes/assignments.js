// server/routes/assignments.js
const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const Event = require('../models/Event');
const { authMiddleware } = require('../middleware/auth'); // Ensure correct import
const roleMiddleware = require('../middleware/roleMiddleware');
// POST route to create a new assignment
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description, dueDate, subject, className } = req.body;

        const newAssignment = new Assignment({
            title,
            description,
            dueDate,
            subject,
            class: className
        });

        await newAssignment.save();

        // Create a new event with the title and due date of the assignment
        const newEvent = new Event({
            title: newAssignment.title,
            date: newAssignment.dueDate
        });

        await newEvent.save();

        res.status(201).json(newAssignment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET route to get all assignments
router.get('/', authMiddleware, async (req, res) => {
    try {
        const assignments = await Assignment.find({});
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT route to update an assignment by ID (Teacher only)
router.put('/:id', authMiddleware, roleMiddleware('Teacher'), async (req, res) => {
    try {
        const { title, description, dueDate, subject, className } = req.body;

        const updatedAssignment = await Assignment.findByIdAndUpdate(req.params.id, {
            title,
            description,
            dueDate,
            subject,
            class: className
        }, { new: true });

        res.status(200).json(updatedAssignment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE route to delete an assignment by ID (Teacher only)
router.delete('/:id', authMiddleware, roleMiddleware('Teacher'), async (req, res) => {
    try {
        await Assignment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Assignment deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
