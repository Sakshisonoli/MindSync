from scipy.io import loadmat
import joblib

# Load and inspect the .mat file
mat = loadmat(r"c:\Users\Admin\Downloads\1_20161126.mat\1_20161126.mat")  # Adjust path if needed
print("Keys in .mat file:", mat.keys())

# Load and inspect the model
model = joblib.load("flask-backend/models/emotion_model.pkl")
print("Model expects", model.n_features_in_, "features.")
