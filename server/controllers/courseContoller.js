const Lecture = require("../models/Lecture");
const Comment = require("../models/Comment");

// Get lectures for a specific class
exports.getLecturesByClass = async (req, res) => {
  try {
    const lectures = await Lecture.find({ classId: req.params.classId });
    res.json(lectures);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Create a new lecture (Instructor only)
exports.createLecture = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newLecture = new Lecture({
      title,
      content,
      classId: req.params.classId,
      instructor: req.user.id,
    });

    const savedLecture = await newLecture.save();
    res.json(savedLecture);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Add a comment to a lecture (Student & Instructor)
exports.addComment = async (req, res) => {
  const { text } = req.body;

  try {
    const newComment = new Comment({
      text,
      lectureId: req.params.lectureId,
      user: req.user.id,
    });

    const savedComment = await newComment.save();
    res.json(savedComment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get comments for a specific lecture
exports.getCommentsByLecture = async (req, res) => {
  try {
    const comments = await Comment.find({
      lectureId: req.params.lectureId,
    }).populate("user", "username");
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
