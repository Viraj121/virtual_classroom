import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentSection from "../Course/CommentSection";

function ClassDetails() {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/classes/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setClassData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchClassDetails();
  }, [id]);

  return (
    <div>
      {classData ? (
        <>
          <h2>{classData.name}</h2>
          <div>
            <h3>Units</h3>
            <ul>
              {classData.units.map((unit) => (
                <li key={unit._id}>{unit.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Sessions</h3>
            <ul>
              {classData.sessions.map((session) => (
                <li key={session._id}>
                  {session.name}
                  <CommentSection lectureId={session._id} />
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ClassDetails;
