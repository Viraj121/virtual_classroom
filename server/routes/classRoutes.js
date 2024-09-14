const express = require('express');
const { createClass, getClasses } = require('../controllers/classController');
const { authMiddleware, instructorMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, instructorMiddleware, createClass);
router.get('/', authMiddleware, getClasses);

module.exports = router;
