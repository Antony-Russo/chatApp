import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "https://chatapp-backend-1-j2pl.onrender.com/api/auth/login",
                { username, password }
            );
            localStorage.setItem("token", res.data.token);
            navigate("/chat");
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    const handleRegisterRedirect = () => {
        navigate("/register");
    };

    return (
        <div className="login-main-container">
            <form onSubmit={handleSubmit} className="field-container">
                <h2 className="login-heading">Login</h2>
                <label htmlFor="username" className="login-label">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    className="login-input text-field"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password" className="login-label">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="login-input text-field"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="login-btn">
                    Login
                </button>
                <p className="register-link">
                    Don't have an account?{" "}
                    <button
                        type="button"
                        onClick={handleRegisterRedirect}
                        className="register-btn"
                    >
                        Register
                    </button>
                </p>
            </form>

        </div>


    );
}

export default Login;
