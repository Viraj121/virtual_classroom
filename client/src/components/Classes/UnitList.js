import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UnitList = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { classId } = useParams(); // Assuming the class ID is passed through the route params
  const navigate = useNavigate();

  // Fetch units for the class
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get(`/api/classes/${classId}/units`);
        setUnits(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching units");
        setLoading(false);
      }
    };

    fetchUnits();
  }, [classId]);

  const handleUnitClick = (unitId) => {
    // Navigate to lectures for this unit
    navigate(`/classes/${classId}/units/${unitId}/lectures`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="unit-list">
      <h2>Units for Class</h2>
      <ul>
        {units.map((unit) => (
          <li key={unit._id} onClick={() => handleUnitClick(unit._id)}>
            {unit.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnitList;
