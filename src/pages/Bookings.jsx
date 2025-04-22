export default function Bookings({ bookings, events }) {
    return (
      <div>
        <h1>My Booked Events</h1>
        {bookings.map((booking) => {
          const event = events.find((e) => e.id === booking.eventId);
          return (
            <div key={booking.id} className="card">
              <h3>{event?.title}</h3>
              <p>Tickets Booked: {booking.numTickets}</p>
              <p>Name: {booking.userName}</p>
            </div>
          );
        })}
      </div>
    );
  }