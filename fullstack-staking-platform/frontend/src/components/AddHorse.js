import React, { useState } from 'react';
import api from '../services/api';

const AddHorse = () => {
  const [name, setName] = useState('');
  const [ownerID, setOwnerID] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/horses', { name, ownerID });
      alert('Horse added successfully');
    } catch (error) {
      console.error('Failed to add horse:', error);
      alert('Failed to add horse');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Horse</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Horse Name"
        required
      />
      <input
        type="text"
        value={ownerID}
        onChange={(e) => setOwnerID(e.target.value)}
        placeholder="Owner ID"
        required
      />
      <button type="submit">Add Horse</button>
    </form>
  );
};

export default AddHorse;
