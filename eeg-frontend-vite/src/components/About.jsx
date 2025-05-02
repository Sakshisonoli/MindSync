import React from 'react';
import './about.css'; 

const About = () => {
  return (
    <div className="about-container">
      <h1>About MindSync</h1>
      <p>
        MindSync is an AI-powered platform that analyzes EEG signals to detect seizures, emotions, and deception in real-time.
        By integrating React, Spring Boot, Flask, and MongoDB, the platform bridges brain-computer interfaces with real-world
        applications in healthcare and security. Our mission is to provide accessible, intelligent neuro-assistive tools
        aligned with global health and innovation goals.
      </p>
    </div>
  );
};

export default About;
