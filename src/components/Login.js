import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css"

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://chatapp-backend-1-j2pl.onrender.com/api/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            navigate('/chat');
        } catch (err) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className='login-container'>
            <div className='login-page'>
                <h1 className='login-head'>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='username'>USERNAME</label>
                    <input 
                    type="text"
                    id='username'
                    className='login-input' 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    />
                    <label htmlFor='password'>PASSWORD</label>
                    <input 
                    type="password" 
                    id='password'
                    className='login-input' 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button type="submit" className='login-btn'>Login</button>
                </form>
                <p className='reg-details'>Don't have an account? <a href="/register">Register</a></p>
            </div>
        </div>
    );
}

export default Login;
