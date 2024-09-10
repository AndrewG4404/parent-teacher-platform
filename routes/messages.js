const express = require('express');
const mongoose = require('mongoose'); // Ensure mongoose is imported
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');

// Start a new chat
router.post('/start-chat', authMiddleware, async (req, res) => {
    const { username } = req.body;

    try {
        const recipient = await User.findOne({ username });
        if (!recipient) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Check if a chat already exists
        const existingChat = await Message.findOne({
            $or: [
                { sender: req.user._id, recipient: recipient._id },
                { sender: recipient._id, recipient: req.user._id }
            ]
        });

        if (existingChat) {
            return res.status(400).send({ error: 'Chat already exists' });
        }

        // Create an initial message to start the chat
        const initialMessage = new Message({
            sender: req.user._id,
            recipient: recipient._id,
            content: 'Hello!'
        });

        await initialMessage.save();

        res.status(201).send({
            user: {
                _id: recipient._id,
                username: recipient.username,
                email: recipient.email
            },
            lastMessage: {
                content: initialMessage.content,
                timestamp: initialMessage.timestamp
            }
        });
    } catch (error) {
        console.error('Error starting chat:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

// Get all messages between two users
router.get('/chat/:userId', authMiddleware, async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user._id, recipient: req.params.userId },
                { sender: req.params.userId, recipient: req.user._id }
            ]
        }).sort({ timestamp: 1 });

        res.send(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

// Send a message
router.post('/send', authMiddleware, async (req, res) => {
    const { recipient, content } = req.body;

    try {
        const message = new Message({
            sender: req.user._id,
            recipient,
            content
        });

        await message.save();
        res.status(201).send(message);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

// Get chat list for the logged-in user
router.get('/chats', authMiddleware, async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id); // Instantiate ObjectId correctly

        const matchStage = {
            $match: {
                $or: [
                    { sender: userId },
                    { recipient: userId }
                ]
            }
        };

        const sortStage = {
            $sort: { timestamp: -1 }
        };

        const groupStage = {
            $group: {
                _id: {
                    $cond: {
                        if: { $eq: ["$sender", userId] },
                        then: "$recipient",
                        else: "$sender"
                    }
                },
                lastMessage: { $first: "$$ROOT" }
            }
        };

        const lookupStage = {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'user'
            }
        };

        const unwindStage = {
            $unwind: "$user"
        };

        const projectStage = {
            $project: {
                _id: 0,
                user: {
                    _id: "$user._id",
                    username: "$user.username",
                    email: "$user.email"
                },
                lastMessage: {
                    content: "$lastMessage.content",
                    timestamp: "$lastMessage.timestamp"
                }
            }
        };

        // Log the match stage
        console.log('Match Stage:', JSON.stringify(matchStage, null, 2));

        const messages = await Message.aggregate([
            matchStage,
            sortStage,
            groupStage,
            lookupStage,
            unwindStage,
            projectStage
        ]);

        // Log the final aggregated messages
        console.log('Aggregated messages:', JSON.stringify(messages, null, 2));

        res.set('Cache-Control', 'no-store');
        res.send(messages);
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

module.exports = router;