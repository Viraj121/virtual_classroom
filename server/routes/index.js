const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/classes', require('./classRoutes'));
router.use('/sessions', require('./sessionRoutes'));
router.use('/comments', require('./commentRoutes'));

module.exports = router;
