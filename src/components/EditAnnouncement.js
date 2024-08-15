import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

function EditAnnouncement() {
    const { id } = useParams();
    const [announcement, setAnnouncement] = useState({ title: '', description: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAnnouncement() {
            try {
                const response = await axios.get(`https://localhost:7201/api/announcements/${id}`);
                setAnnouncement(response.data);
            } catch (err) {
                setError(err);
            }
        }
        fetchAnnouncement();
    }, [id]);

    const handleChange = (e) => {
        setAnnouncement({
            ...announcement,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://localhost:7201/api/announcements/${id}`, announcement);
            navigate(`/details/${id}`);
        } catch (error) {
            setError(error);
        }
    };

    if (error) return <p>Error loading announcement: {error.message}</p>;

    return (
        <div className="container">
            <h2>Edit Announcement</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={announcement.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                />
                <textarea
                    name="description"
                    value={announcement.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                <button type="submit">Update Announcement</button>
            </form>
        </div>
    );
}

export default EditAnnouncement;
