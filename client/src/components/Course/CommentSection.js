import React, { useState, useEffect } from "react";
import api from "../../api/api";


function CommentSection({ lectureId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [reply, setReply] = useState({});
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    // Fetch comments when component mounts
    async function fetchComments() {
      try {
        const response = await api.get(`/comments/${lectureId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
    fetchComments();
  }, [lectureId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/comments", {
        lectureId,
        content: newComment,
      });
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleReplySubmit = async (e, parentCommentId) => {
    e.preventDefault();
    try {
      const response = await api.post(`/comments/${parentCommentId}/reply`, {
        content: replyContent,
      });
      const updatedComments = comments.map((comment) =>
        comment._id === parentCommentId
          ? { ...comment, replies: [...comment.replies, response.data] }
          : comment
      );
      setComments(updatedComments);
      setReply({}); // Clear the reply state
      setReplyContent(""); // Clear the reply input
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        {comments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.content}</p>
            <button onClick={() => setReply({ parentCommentId: comment._id })}>
              Reply
            </button>
            {reply.parentCommentId === comment._id && (
              <form onSubmit={(e) => handleReplySubmit(e, comment._id)}>
                <textarea
                  placeholder="Add a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
                <button type="submit">Submit Reply</button>
              </form>
            )}
            {comment.replies && comment.replies.length > 0 && (
              <div style={{ marginLeft: "20px" }}>
                {comment.replies.map((reply) => (
                  <div key={reply._id}>
                    <p>{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
