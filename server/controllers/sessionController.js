const Session = require('../models/Session');

// Create a new session
exports.createSession = async (req, res) => {
    const { title, classId } = req.body;
    try {
        const newSession = new Session({ title, classId });
        await newSession.save();
        res.status(201).json(newSession);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get sessions for a class
exports.getSessions = async (req, res) => {
    try {
        const sessions = await Session.find({ classId: req.params.classId });
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
