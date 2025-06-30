import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from './axiosInstance';

function useAllEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosInstance.get('/api/events');
        setEvents(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
}

export default useAllEvents;
