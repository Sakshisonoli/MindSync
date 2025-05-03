import React, { useState } from 'react';
import './upload.css';

const UploadEmotion = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    const validTypes = ['.mat', '.bdf']; // Allowed file types for Emotion Detection
    if (uploadedFile && validTypes.some(type => uploadedFile.name.endsWith(type))) {
      setFile(uploadedFile);
    } else {
      alert('Only .mat and .bdf files are allowed for Emotion Detection.');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload a valid file.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8080/api/emotion/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert(`File uploaded successfully: ${result.message}`);
      } else {
        const error = await response.text();
        alert(`Error uploading file: ${error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the file.');
    }
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