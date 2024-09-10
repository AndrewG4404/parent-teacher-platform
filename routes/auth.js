// server/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { authMiddleware } = require('../middleware/auth'); // Import authMiddleware correctly

// Registration route
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!['Teacher', 'Parent'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        const user = new User({ username, email, password, role });
        await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByCredentials(email, password);
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get current user details
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user.toJSON());
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
});

module.exports = router;
