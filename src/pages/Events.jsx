import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';

function Events() {
  const [events, setEvents] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/events') // Assuming your json-server is running on port 3000
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleAddEvent = (e) => {
    e.preventDefault();
    const newEvent = {
      title: newTitle,
      date: newDate,
      description: newDescription,
    };

    fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setEvents([...events, data]); // Update state with the newly added event
        setNewTitle('');
        setNewDate('');
        setNewDescription('');
      })
      .catch(error => {
        console.error('Error adding event:', error);
        setError(error);
      });
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error loading events: {error.message}</div>;
  }

  return (
    <div className="events-page">
      <h2>Upcoming Events</h2>
      <div className="event-list">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <h3>Add New Event</h3>
      <form onSubmit={handleAddEvent} className="add-event-form">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default Events;