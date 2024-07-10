import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ViewRaceSeries = () => {
  const [raceSeries, setRaceSeries] = useState([]);

  useEffect(() => {
    api.get('/race_series').then(res => {
      setRaceSeries(res.data);
    });
  }, []);

  return (
    <div>
      <h2>View Race Series</h2>
      <ul>
        {raceSeries.map(series => (
          <li key={series.seriesID}>{series.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewRaceSeries;
