import React from 'react';
import { Link } from 'react-router-dom';

function EventCard({ event }) {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>Date: {event.date}</p>
      <p>{event.description}</p>
      <Link to={`/events/${event.id}`}>View Details</Link>
      <button onClick={() => alert(`Booking for ${event.title} initiated!`)}>Book</button>
    </div>
  );
}

export default EventCard;