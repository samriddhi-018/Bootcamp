import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './API.css';

const AirQuality = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const apiUrl = "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=28.61&longitude=77.23&hourly=pm10,pm2_5,carbon_monoxide,uv_index,european_aqi";

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch air quality data.');
        setLoading(false);
      });
  }, []);

    if (loading) return <p className="loading-message">Loading...</p>;
    if (error) return <p className="error-message">{error}</p>;
    
  return (
    <div className='container'> 
      <h2>Air Quality Data</h2>
      {data && data.hourly && (
        <ul>
          <li>PM10: {data.hourly.pm10[0]}</li>
          <li>PM2.5: {data.hourly.pm2_5[0]}</li>
          <li>CO: {data.hourly.carbon_monoxide[0]}</li>
          <li>UV Index: {data.hourly.uv_index[0]}</li>
          <li>European AQI: {data.hourly.european_aqi[0]}</li>
        </ul>
      )}
    </div>
  );
};

export default AirQuality;