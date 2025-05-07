# routes/lie_route.py

from flask import Blueprint, request, jsonify
from utils.lie_utils import predict_lie
import os
import uuid

lie_route = Blueprint('lie_route', __name__)

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads', 'lie')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@lie_route.route('/predict-lie', methods=['POST'])
def predict_lie_api():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save file temporarily
    unique_filename = str(uuid.uuid4()) + "_" + file.filename
    file_path = os.path.join(UPLOAD_FOLDER, unique_filename)
    file.save(file_path)

    # Predict
    prediction = predict_lie(file_path)

    # Remove file after prediction
    os.remove(file_path)

    if prediction is None:
        return jsonify({'error': 'Prediction failed'}), 500

    return jsonify({'predicted_class': prediction})
