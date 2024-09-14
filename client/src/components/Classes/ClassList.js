import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ClassList() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('/api/classes');
        setClasses(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClasses();
  }, []);

  return (
    <div>
      <h2>Classes</h2>
      <ul>
        {classes.map((cls) => (
          <li key={cls._id}>{cls.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ClassList;
