// server/models/Event.js

const mongoose = require('mongoose');

// Define the schema for events
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        trim: true
    },
    attendees: [
        {
            type: mongoose.Schema.Types.ObjectId,  // Reference to User model
            ref: 'User'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the Event model
module.exports = mongoose.model('Event', eventSchema);
