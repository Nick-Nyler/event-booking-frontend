import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Events from './pages/Events';
import Bookings from './pages/Bookings';
import Contact from './pages/Contact';
import EventDetail from './pages/EventDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/bookings">Bookings</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/events" element={<Events />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/" element={<Events />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;