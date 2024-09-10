// server/models/Grade.js

const mongoose = require('mongoose');

// Define the schema for grades
const gradeSchema = new mongoose.Schema({
    student: {
        type: String,
        required: true
    },
    assignment: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    term: {
        type: String,
        required: true
    },
    date: {  // Ensure this field is present in the schema
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the Grade model
module.exports = mongoose.model('Grade', gradeSchema);
