# utils/lie_utils.py

import torch
import os

# Load the trained model
model_path = os.path.join('models', 'lie_model.h5')
model = torch.load(model_path, map_location=torch.device('cpu'))
model.eval()

def predict_lie(file_path):
    """
    Predict lie/truth from EEG .csv file.
    Assumes model is internally handling the loading and preprocessing.
    """
    try:
        with torch.no_grad():
            output = model(file_path)  # file_path must be accepted by model's forward()
            predicted_class = torch.argmax(output, dim=1).item()
        return predicted_class
    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return None
