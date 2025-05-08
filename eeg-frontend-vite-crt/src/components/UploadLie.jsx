/*import React, { useState } from 'react';
import './upload.css';

const UploadLie = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    const validTypes = ['.csv']; // Allowed file types for Lie Detection
    if (uploadedFile && validTypes.some(type => uploadedFile.name.endsWith(type))) {
      setFile(uploadedFile);
    } else {
      alert('Only .csv files are allowed for Lie Detection.');
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
      const response = await fetch('http://localhost:8081/myapp/api/eeg/lie/upload', {
        method: 'POST',
        headers: {
          'userId': userId, // Dynamically set userId
        },
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
      <h2>Upload EEG File for Lie Detection</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadLie;*/

/*import React, { useState } from 'react';
import './upload.css';

const UploadLie = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    const validTypes = ['.csv']; // Allowed file types for Lie Detection
    if (uploadedFile && validTypes.some(type => uploadedFile.name.endsWith(type))) {
      setFile(uploadedFile);
    } else {
      alert('Only .csv files are allowed for Lie Detection.');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload a valid file.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Prediction Result: ${result.result}`);
      } else {
        const error = await response.text();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the file.');
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload EEG File for Lie Detection</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadLie;*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './upload.css';

const UploadLie = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.name.endsWith('.csv')) {
      setFile(uploadedFile);
    } else {
      alert('Only .csv files are allowed for Lie Detection.');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload a valid file.');


    const userId = localStorage.getItem('userId');
    if (!userId) return alert('User not logged in.');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      
        const flaskResponse = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          body: formData,
        });
  
        if (!flaskResponse.ok) {
          const error = await flaskResponse.text();
          throw new Error(`Flask error: ${error}`);
        }
  
        const result = await flaskResponse.json();
        const { result: predictionResult } = result;
  
        

          const response = await fetch('http://localhost:8081/myapp/api/eeg/lie/upload', {
            method: 'POST',
            headers: {
              'userId': userId, // Dynamically set userId
            },
            body: formData,
          });
    
          if (response.ok) {
            const result = await response.json();
            alert(`File uploaded successfully: ${result.message}`);
          } else {
            const error = await response.text();
            alert(`Error uploading file: ${error}`);
          }

            
        // 3. Navigate to result page
        navigate('/result', { state: { result: predictionResult } });

    }
      

     catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the file.');
    }
  };
  return (
    <div className="upload-container">
      <h2>Upload EEG File for Lie Detection</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );}
  export default UploadLie;