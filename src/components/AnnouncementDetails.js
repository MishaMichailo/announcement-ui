import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/AnnouncementDetails.css'

function AnnouncementDetails() {
    const { id } = useParams();
    const [announcement, setAnnouncement] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAnnouncement() {
            if (id) {
                try {
                    const response = await axios.get(`https://localhost:7201/api/announcements/${id}`);
                    setAnnouncement(response.data);
                } catch (err) {
                    setError(err);
                }
            }
        }
        fetchAnnouncement();
    }, [id]);

    if (error) return <p>Error loading announcement: {error.message}</p>;
    if (!announcement) return <p>Loading...</p>;


    const dateAdded = announcement.dateAdded ? new Date(announcement.dateAdded) : new Date();
    const formattedDate = isNaN(dateAdded.getTime()) ? 'Ivalid Date' : dateAdded.toLocaleDateString();

    return (
        <div className="container announcement-details">
            <h1>{announcement.title}</h1>
            <p>{announcement.description}</p>
            <p>Date Added: {formattedDate}</p>
            <h2>Similar Announcements:</h2>
            <ul>
                {announcement.similarAnnouncements.map(sim => (
                    <li key={sim.id}>{sim.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default AnnouncementDetails;