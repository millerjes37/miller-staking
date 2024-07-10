import React, { useState } from 'react';
import api from '../services/api';

const AddRaceSeries = () => {
  const [name, setName] = useState('');
  const [stakeDueDate, setStakeDueDate] = useState('');
  const [stakeMailInDate, setStakeMailInDate] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/race_series', { name, stakeDueDate, stakeMailInDate, stakeAmount });
      alert('Race Series added successfully');
    } catch (error) {
      console.error('Failed to add race series:', error);
      alert('Failed to add race series');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Race Series</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Series Name"
        required
      />
      <input
        type="date"
        value={stakeDueDate}
        onChange={(e) => setStakeDueDate(e.target.value)}
        placeholder="Stake Due Date"
        required
      />
      <input
        type="date"
        value={stakeMailInDate}
        onChange={(e) => setStakeMailInDate(e.target.value)}
        placeholder="Stake Mail-In Date"
        required
      />
      <input
        type="number"
        value={stakeAmount}
        onChange={(e) => setStakeAmount(e.target.value)}
        placeholder="Stake Amount"
        required
      />
      <button type="submit">Add Race Series</button>
    </form>
  );
};

export default AddRaceSeries;
