import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; // adjust the path if needed

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ initialize the hook here

  const validateForm = () => {
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/;

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }
    if (!passwordRegex.test(password)) {
      alert('Password must be 8-15 characters long and include a capital letter, lowercase letter, number, and a special character.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log('Login:', { email, password });

    
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
