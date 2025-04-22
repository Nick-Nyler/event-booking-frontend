import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Bookings from "./pages/Bookings";
import Contact from "./pages/Contact";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((r) => r.json())
      .then(setEvents);

    fetch("http://localhost:3000/bookings")
      .then((r) => r.json())
      .then(setBookings);
  }, []);

  function addBooking(newBooking) {
    setBookings([...bookings, newBooking]);
  }

  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Events</Link>
        <Link to="/bookings">My Bookings</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Events events={events} />} />
        <Route
          path="/events/:id"
          element={<EventDetail events={events} addBooking={addBooking} />}
        />
        <Route
          path="/bookings"
          element={<Bookings bookings={bookings} events={events} />}
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;