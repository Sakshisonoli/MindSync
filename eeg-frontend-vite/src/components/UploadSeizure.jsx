import React, { useState } from 'react';
import './upload.css'; // ✅ Import your existing upload.css

const UploadSeizure = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file!");
      return;
    }
    const allowedExtensions = ['edf', 'csv', 'parquet'];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      alert('Only .edf, .csv, or .parquet files are allowed for Seizure Detection.');
      return;
    }

    console.log("Uploading for Seizure Detection:", file.name);
    // Later you will connect this to backend API
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit} className="upload-box">
        <h2>Upload EEG for Seizure Detection</h2>
        <input
          type="file"
          accept=".edf,.csv,.parquet"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadSeizure;
