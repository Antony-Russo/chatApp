import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Register.css"

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://chatapp-backend-1-j2pl.onrender.com/api/auth/register', { username, password, avatar });
            alert('Registration successful');
            navigate('/login'); 
            if (!response.ok){
                alert("Falid To Fetch")
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='register-content'>
        <div className='register-container'>
            <h1 className='reg-head'>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">USERNAME</label>
                <input 
                    type="text" 
                    id='username'
                    placeholder="Username" 
                    value={username} 
                    className='reg-input'
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <label htmlFor="password">PASSWORD</label>
                <input 
                    type="password" 
                    id='password'
                    placeholder="Password" 
                    value={password} 
                    className='reg-input'
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <label htmlFor="avatar">AVATAR</label>
                <input 
                    type="text" 
                    id='avatar'
                    placeholder="Avatar URL (optional)" 
                    value={avatar} 
                    className='reg-input'
                    onChange={(e) => setAvatar(e.target.value)} 
                />
                <button type="submit" className='reg-btn'>Register</button>
            </form>
            </div>
        </div>
    );
}

export default Register;
