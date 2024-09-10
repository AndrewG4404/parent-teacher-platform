// server/models/Assignment.js

const mongoose = require('mongoose');

// Define the schema for assignments
const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    class: {
        type: String,  // e.g., 'Math 101'
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the Assignment model
module.exports = mongoose.model('Assignment', assignmentSchema);
