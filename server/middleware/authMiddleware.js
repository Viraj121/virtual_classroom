const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authenticate user and attach to request object
exports.authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: 'Unauthorized' });

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Check if the user is an instructor
exports.instructorMiddleware = (req, res, next) => {
    if (req.user.role !== 'instructor') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};
