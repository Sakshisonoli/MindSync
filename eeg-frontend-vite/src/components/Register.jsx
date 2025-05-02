import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css'; // adjust if your CSS is in a different path

const Register = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const contactRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/;

    if (!nameRegex.test(name)) {
      alert('Name must contain only alphabets.');
      return false;
    }
    if (!contactRegex.test(contact)) {
      alert('Contact number must be exactly 10 digits.');
      return false;
    }
    if (!passwordRegex.test(password)) {
      alert('Password must be 8-15 characters long and include a capital letter, lowercase letter, number, and at least one special character.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log('Register:', { name, contact, email, dob, password });
    navigate('/login');
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

