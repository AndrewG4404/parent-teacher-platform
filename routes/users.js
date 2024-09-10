// server/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { authMiddleware } = require('../middleware/auth'); // Import authMiddleware

// Get list of users
router.get('/', authMiddleware, async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user._id } }).select('_id username');
        res.send(users);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching users' });
    }
});

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        if (!['Teacher', 'Parent'].includes(role)) {
            return res.status(400).send({ error: 'Invalid role specified' });
        }

        const user = new User({ username, email, password, role });
        await user.save();

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '24h',
        });

        res.status(201).send({ user: user.toJSON(), token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Login an existing user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ error: 'Invalid login credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid login credentials.' });
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '24h',
        });

        res.send({ user: user.toJSON(), token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;
