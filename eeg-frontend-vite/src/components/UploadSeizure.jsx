import React, { useState } from 'react';
import './upload.css';

const UploadSeizure = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    const validTypes = ['.edf', '.csv', '.parquet']; // Allowed file types for Seizure Detection
    if (uploadedFile && validTypes.some(type => uploadedFile.name.endsWith(type))) {
      setFile(uploadedFile);
    } else {
      alert('Only .edf, .csv, and .parquet files are allowed for Seizure Detection.');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload a valid file.');

    const formData = new FormData();
    formData.append('file', file);

    // Retrieve userId from local storage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return alert('User is not logged in. Please log in to upload files.');
    }

    try {
      const response = await fetch('http://localhost:8080/myapp/api/eeg/seizure/upload', {
        method: 'POST',
        headers: {
          'userId': userId, // Dynamically set userId
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert(`File uploaded successfully: ${result.message}`);
        setFile(null); // Reset file input after successful upload
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
      <h2>Upload EEG File for Seizure Detection</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="file"
          accept=".edf,.csv,.parquet"
          onChange={handleFileChange}
        />
        <button type="submit" disabled={!file}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadSeizure;
