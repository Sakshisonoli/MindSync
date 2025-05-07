# utils/emotion_utils.py

import torch
import os

# Load the trained model and force mapping to CPU
model_path = os.path.join('models', 'emotion_model.pkl')
model = torch.load(model_path, map_location=torch.device('cpu'), weights_only=False)
model.eval()

def predict_emotion(file_path):
    """
    Predict emotion from an EEG file.
    Assumes the model handles all preprocessing internally.
    """
    try:
        # If model expects file path directly (e.g., loads it inside forward method)
        with torch.no_grad():
            output = model(file_path)  # assumes model(file_path) is valid
            predicted_class = torch.argmax(output, dim=1).item()
        return predicted_class
    except Exception as e:
        print("Prediction error:", str(e))
        return None
