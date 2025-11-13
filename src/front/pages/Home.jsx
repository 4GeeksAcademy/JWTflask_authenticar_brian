import React, { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { login } from "./../services/fetch.js";
import { useNavigate, Link } from "react-router-dom";

export const Home = () => {

       
	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState ("");
    const [success, setSuccess] = useState ("");
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password, dispatch);
        setError("");
        setSuccess("");


            if (!data.token || !data.user?.id) {
                throw new Error("Invalid login response");
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user.id);
          


            setSuccess("Login successfully ✔");
            console.log("User logued:", data);

            setTimeout(() => {
                navigate("/private");
            },1000);
            
            } catch (err) {
                setError("Wrong Credentials ❌");
            }
        };


    return (
        <div className="text-center justify-content-center mt-5"> 
			<div className="form-container">
                <form className="form-register" onSubmit={handleSubmit}>
                    <p className="form-title">Sign in to your account</p>
                    <div className="input-container">
                        <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <span>
                        </span>
                    </div>
                    <div className="input-container">
                        <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="submit">
                        Sign in
                    </button>
                    <p class="signup-link">
                        No account?
                        <Link to="/register">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};