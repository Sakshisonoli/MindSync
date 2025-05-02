import React, { useState } from 'react';
import './upload.css';

const UploadEmotion = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    const validTypes = ['.mat', '.bdf'];
    if (uploadedFile && validTypes.some(type => uploadedFile.name.endsWith(type))) {
      setFile(uploadedFile);
    } else {
      alert('Only .mat and .bdf files are allowed for Emotion Detection.');
      setFile(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload a valid file.');
    console.log('Submitting emotion file:', file);
    // Send to backend API here
  };

  return (
    <div className="upload-container">
      <h2>Upload EEG File for Emotion Detection</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input type="file" accept=".mat,.bdf" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadEmotion;