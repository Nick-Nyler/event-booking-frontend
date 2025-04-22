import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EventDetail({ events, addBooking }) {
  const { id } = useParams();
  const event = events.find((e) => e.id === parseInt(id));
  const [form, setForm] = useState({ name: "", tickets: 1 });
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newBooking = {
      eventId: event.id,
      userName: form.name,
      numTickets: parseInt(form.tickets),
    };

    fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    })
      .then((r) => r.json())
      .then((data) => {
        addBooking(data);
        fetch(`http://localhost:3000/events/${event.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tickets: event.tickets - data.numTickets }),
        });
        navigate("/bookings");
      });
  }

  if (!event) return <h2>Event not found</h2>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Tickets Remaining: {event.tickets}</p>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="tickets"
          type="number"
          min="1"
          max={event.tickets}
          value={form.tickets}
          onChange={handleChange}
        />
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}
