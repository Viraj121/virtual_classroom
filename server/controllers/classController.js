const Class = require('../models/Class');

// Create a new class
exports.createClass = async (req, res) => {
    const { title, description, units, sessions } = req.body;
    try {
        const newClass = new Class({
            title,
            description,
            units,
            sessions,
            instructor: req.user._id
        });
        await newClass.save();
        res.status(201).json(newClass);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all classes for a user
exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.find({ students: req.user._id });
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
