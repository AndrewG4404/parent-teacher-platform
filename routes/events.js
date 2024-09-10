// server/routes/events.js

const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// POST route to create a new event
router.post('/', async (req, res) => {
    try {
        const { title, description, date, location, attendees } = req.body;

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            attendees
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;

// GET route to get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().populate('attendees');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT route to update an event by ID
router.put('/:id', async (req, res) => {
    try {
        const { title, description, date, location, attendees } = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {
            title,
            description,
            date,
            location,
            attendees
        }, { new: true });
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE route to delete an event by ID
router.delete('/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Event deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

