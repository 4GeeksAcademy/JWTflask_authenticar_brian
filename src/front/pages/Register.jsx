import { useState } from "react";
import { register } from "./../services/fetch.js";
import { Link, useNavigate } from "react-router-dom";




export const Register = () => {
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState ("");
    const [success, setSuccess] = useState (""); 
    const navigate = useNavigate();
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@@#$%^&*])(?=.{8,})/;



    const handleSubmit = async (e) => {
            e.preventDefault();
            setError("");
            setSuccess("");

            if (!passwordRegex.test(password)) {
                alert("⚠️La contraseña debe tener al menos 8 caracteres, incluir una mayúscula y un símbolo especial (!@#$%^&*).⚠️");
                return; 
            }

            try{
                const data = await register(email, password);
                setSuccess("Register completed successfully ✅");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } catch (err) {
                setError("Error trying to register❌"); 
            }
        };

        return (
        <div className="container-register">
            <div className="heading">SignIn to your account</div>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-field">
                        <input required=""autoComplete="off" type="text" name="text" id="username"/>
                        <label htmlFor="username">Full Name</label>
                    </div>
                    <div className="input-field">
                        <input autoComplete="off" type="email" name="email" id="email" value={email}onChange={(e) => setEmail(e.target.value)} required/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <input autoComplete="off" type="password" name="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        <label htmlFor="username">Password</label>
                     </div>
                    <div className="btn-container">
                        <button className="btn">Submit</button>
                        <div className="acc-text">
                            New here ?
                            <span style={{ color : '#0000ff', cursor : 'pointer'}}><Link to="/">Create Account</Link></span>
                        </div>
                    </div>
                </form>
        </div>   
        );
    };