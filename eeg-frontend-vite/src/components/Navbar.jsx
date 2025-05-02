import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-end gap-4 fixed top-0 z-10">
      <Link to="/" className="text-purple-700 font-semibold hover:underline">Home</Link>
      <Link to="/about" className="text-purple-700 font-semibold hover:underline">About Us</Link>
      <Link to="/login" className="text-purple-700 font-semibold hover:underline">Login</Link>
      <Link to="/register" className="text-purple-700 font-semibold hover:underline">Register</Link>
    </nav>
  );
};

export default Navbar;