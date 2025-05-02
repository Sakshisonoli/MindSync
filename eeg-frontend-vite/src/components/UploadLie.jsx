import React, { useState } from 'react';
import './upload.css'; // ✅ Import your existing upload CSS

const UploadLie = () => {
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
    const allowedExtensions = ['csv'];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      alert('Only CSV files are allowed for Lie Detection.');
      return;
    }

    console.log("Uploading for Lie Detection:", file.name);
    // Later: You will connect this to your backend upload API
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit} className="upload-box">
        <h2>Upload EEG for Lie Detection</h2>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadLie;
