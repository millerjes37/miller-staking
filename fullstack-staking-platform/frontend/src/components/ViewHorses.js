import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ViewHorses = () => {
  const [horses, setHorses] = useState([]);

  useEffect(() => {
    api.get('/horses').then(res => {
      setHorses(res.data);
    });
  }, []);

  return (
    <div>
      <h2>View Horses</h2>
      <ul>
        {horses.map(horse => (
          <li key={horse.horseID}>{horse.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewHorses;
