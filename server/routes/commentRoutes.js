const express = require('express');
const { postComment, postReply } = require('../controllers/commentController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, postComment);
router.post('/reply', authMiddleware, postReply);

module.exports = router;
