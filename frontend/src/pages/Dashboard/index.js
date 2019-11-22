import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import socketio from 'socket.io-client';
import api from "../../services/api";

import "./styles.css";

const Dashboard = () => {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem('user');
  const socket = useMemo(() => socketio('http://localhost:3333', {
    query: { user_id },
  }), [user_id]);

  useEffect(() => {
    socket.on('booking_request', data => {
      console.log(data);
      setRequests([...requests,data]);
    })
  },[requests, socket]);

  useEffect(() => {
    const loadSpots = async () => {
      const user_id = localStorage.getItem("user");
      const response = await api.get("/dashboard", {
        headers: { user_id }
      });

      setSpots(response.data);
    };

    loadSpots();
  }, []);

  const handleRequestStatus = async (id, status) => {
    await api.post(`/bookings/${id}/approvals`, {status});
    setRequests(requests.filter(request => request._id !== id));
  }

  return (
    <>
      <ul className="notifications">
        {requests.map(request => (
          <li key={request._id}>
            <p>
              <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
            </p>
            <button className="accept" onClick={() => handleRequestStatus(request._id,true)}>ACEITAR</button>
            <button className="reject" onClick={() => handleRequestStatus(request._id,false)}>REJEITAR</button>
          </li>
        ))}
      </ul>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header
              style={{ backgroundImage: `url(${spot.thumbnail_url})` }}
            ></header>
            <strong>{spot.company}</strong>
            <span>{spot.price ? `${spot.price}€/dia` : "GRATUITO"}</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
        <button className="btn">Registar novo spot</button>
      </Link>
    </>
  );
};

export default Dashboard;
