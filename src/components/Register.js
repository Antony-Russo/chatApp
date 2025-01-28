import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                'https://chatapp-backend-1-j2pl.onrender.com/api/auth/register',
                { username, password, avatar }
            );
            alert('Registration successful');
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert('Failed to register. Please try again.');
        }
    };

    return (
        <div className="register-content">
            <div className="register-container">
                <h1 className="reg-head">Register</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        className="reg-input"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        className="reg-input"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="avatar">Avatar</label>
                    <input
                        type="text"
                        id="avatar"
                        placeholder="Enter avatar URL (optional)"
                        value={avatar}
                        className="reg-input"
                        onChange={(e) => setAvatar(e.target.value)}
                    />
                    <button type="submit" className="reg-btn">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
