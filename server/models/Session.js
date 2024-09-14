const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
