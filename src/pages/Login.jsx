import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      onLogin({ 
        name, 
        email, 
        location: city && pincode ? `${city} ${pincode}` : "Pune 411015" 
      });
      navigate("/");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/019/136/319/small/amazon-logo-amazon-icon-free-free-vector.jpg"
          alt="Amazon"
          className="login-logo"
        />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>City</label>
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Pune" />
          <label>Pincode</label>
          <input value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="e.g. 411015" />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
