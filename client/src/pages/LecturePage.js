import React from "react";
import { useParams } from "react-router-dom";
import Lecture from "../components/Course/Lecture";
import CommentSection from "../components/Course/CommentSection";

function LecturePage() {
  const { lectureId } = useParams();

  return (
    <div>
      <h2>Lecture Details</h2>
      <Lecture lectureId={lectureId} />
      <CommentSection lectureId={lectureId} />
    </div>
  );
}

export default LecturePage;
