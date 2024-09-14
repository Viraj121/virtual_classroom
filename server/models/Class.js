const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    units: [{ type: String }],
    sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
