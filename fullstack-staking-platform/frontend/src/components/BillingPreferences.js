import React, { useState, useEffect } from 'react';
import api from '../services/api';

const BillingPreferences = () => {
  const [preference, setPreference] = useState('');
  const ownerID = 1; // Replace with actual ownerID from context or props

  useEffect(() => {
    api.get(`/billing-preferences/${ownerID}`).then(res => {
      if (res.data) {
        setPreference(res.data.preference);
      }
    });
  }, [ownerID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/billing-preferences', { ownerID, preference });
    // Handle post-submission logic
  };

  return (
    <div>
      <h2>Billing Preferences</h2>
      <form onSubmit={handleSubmit}>
        <select value={preference} onChange={(e) => setPreference(e.target.value)}>
          <option value="">Select Billing Preference</option>
          <option value="mail">Mail</option>
          <option value="direct-deposit">Direct Deposit</option>
        </select>
        <button type="submit">Save Preferences</button>
      </form>
    </div>
  );
};

export default BillingPreferences;
