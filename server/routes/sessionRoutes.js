const express = require('express');
const { createSession, getSessions } = require('../controllers/sessionController');
const { authMiddleware, instructorMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, instructorMiddleware, createSession);
router.get('/:classId', authMiddleware, getSessions);

module.exports = router;
