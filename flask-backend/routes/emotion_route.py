# routes/emotion_route.py

from flask import Blueprint, request, jsonify
from utils.emotion_utils import predict_emotion
import os
import uuid

emotion_route = Blueprint('emotion_route', __name__)

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads', 'emotion')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@emotion_route.route('/predict-emotion', methods=['POST'])
def predict_emotion_api():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save file temporarily
    unique_filename = str(uuid.uuid4()) + "_" + file.filename
    file_path = os.path.join(UPLOAD_FOLDER, unique_filename)
    file.save(file_path)

    # Pass file to prediction function
    prediction = predict_emotion(file_path)

    # Optional: delete the file after prediction
    os.remove(file_path)

    if prediction is None:
        return jsonify({'error': 'Prediction failed'}), 500

    return jsonify({'predicted_class': prediction})
