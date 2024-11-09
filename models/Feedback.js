const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    facultyId: String,
    studentId: String,
    ratings: [Number],
    comments: String
});

module.exports = mongoose.model('Feedback', feedbackSchema);
