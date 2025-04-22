import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/events/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading event details...</div>;
  }

  if (error) {
    return <div>Error loading event details: {error.message}</div>;
  }

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (
    <div className="event-detail-page">
      <h2>{event.title}</h2>
      <p>Date: {event.date}</p>
      <p>Description: {event.description}</p>
      {/* Add more details or actions here */}
    </div>
  );
}

export default EventDetail;
