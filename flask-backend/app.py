from flask import Flask
from routes.emotion_route import emotion_route
#from routes.seizure_route import seizure_route
from routes.lie_route import lie_route

app = Flask(__name__)

# Registering the routes
app.register_blueprint(emotion_route)

#app.register_blueprint(seizure_route, url_prefix='/seizure')
app.register_blueprint(lie_route)

if __name__ == "__main__":
    app.run(debug=True)
    
