import EventCard from "../components/EventCard";

export default function Events({ events }) {
  return (
    <div>
      <h1>Upcoming Events</h1>
      <div className="grid">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}