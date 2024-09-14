const Comment = require('../models/Comment');

// Post a comment
exports.postComment = async (req, res) => {
    const { text, lectureId } = req.body;
    try {
        const newComment = new Comment({
            text,
            user: req.user._id,
            lectureId
        });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Post a reply to a comment
exports.postReply = async (req, res) => {
    const { commentId, text } = req.body;
    try {
        const comment = await Comment.findById(commentId);
        comment.replies.push({ text, user: req.user._id });
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
