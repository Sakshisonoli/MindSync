from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import pywt
import joblib
import json

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load model and configs
lda = joblib.load('models/lda_model.pkl')
scaler = joblib.load('models/scaler.pkl')

with open('models/config.json') as f:
    config = json.load(f)

def segment_data(df, window_size, overlap):
    segments = []
    for start in range(0, len(df) - window_size, overlap):
        segment = df[start:start + window_size, :]
        segments.append(segment)
    return np.array(segments)

def extract_dwt_features(segments, wavelet, level):
    features = []
    for segment in segments:
        segment_features = []
        for channel in range(segment.shape[1]):
            coeffs = pywt.wavedec(segment[:, channel], wavelet, level=level)
            energy = [np.sum(c**2) for c in coeffs]
            entropy = [-np.sum((c**2 / np.sum(c**2)) * np.log2(c**2 / np.sum(c**2) + 1e-12)) for c in coeffs]
            segment_features.extend(energy + entropy)
        features.append(segment_features)
    return np.array(features)

@app.route('/health', methods=['GET'])
def health_check():
    try:
        # Try loading model and scaler
        _ = lda.predict([[0] * lda.coef_.shape[1]])  # dummy prediction
        return jsonify({'status': 'ok', 'model': 'LDA model is loaded'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['file']
    df = pd.read_csv(file)

    X = scaler.transform(df)
    segments = segment_data(X, config['window_size'], config['overlap'])
    features = extract_dwt_features(segments, config['wavelet'], config['level'])
    X_transformed = lda.transform(features)

    # Majority voting: if mean > 0.5, then 'Truth'
    prediction = 'Truth' if np.mean(X_transformed) > 0 else 'Lie'

    return jsonify({'result': prediction})

if __name__ == '__main__':
    app.run(debug=True)
