import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/AnnouncementList.css';

function AnnouncementList() {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        async function fetchAnnouncements() {
            try {
                const response = await axios.get('https://localhost:7201/api/announcements');
                setAnnouncements(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchAnnouncements();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7201/api/announcements/${id}`);
            setAnnouncements(announcements.filter(announcement => announcement.id !== id));
        } catch (err) {
            console.error("Error deleting announcement:", err);
        }
    };

    return (
        <div className="container announcement-list">
            <h2>Announcements</h2>
            <ul>
                {announcements.map(announcement => (
                    <li key={announcement.id}>
                        <span>{announcement.title}</span>
                        <Link to={`/details/${announcement.id}`} className="butt view-button">View</Link>
                        <Link to={`/edit/${announcement.id}`} className="butt edit-button">Edit</Link>
                        <button onClick={() => handleDelete(announcement.id)} className="butt delete-button">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AnnouncementList;
