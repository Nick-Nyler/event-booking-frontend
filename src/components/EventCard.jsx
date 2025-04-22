import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div className="card">
      <h3>{event.title}</h3>
      <p>{event.date}</p>
      <p>Tickets Remaining: {event.tickets}</p>
      <Link to={`/events/${event.id}`}><button>Book</button></Link>
    </div>
  );
}