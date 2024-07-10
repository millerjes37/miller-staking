import React, { useState } from 'react';
import api from '../services/api';

const AutomateRaceData = () => {
  const [rawRaceData, setRawRaceData] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/races/automate-input', { rawRaceData });
      alert('Race data input automated successfully');
    } catch (error) {
      console.error('Failed to automate race data input:', error);
      alert('Failed to automate race data input');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Automate Race Data Input</h2>
      <textarea
        value={rawRaceData}
        onChange={(e) => setRawRaceData(e.target.value)}
        placeholder="Enter raw race data here"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AutomateRaceData;
