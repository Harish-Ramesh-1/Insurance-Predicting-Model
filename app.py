from flask import Flask, request, render_template, jsonify
import joblib
import numpy as np

app = Flask(__name__)

model = joblib.load('insurance_model.pkl')

@app.route('/')
def home():
    return render_template('index.html')  

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    age = int(data['age'])
    gender_num = 0 if data['gender'].lower() == 'female' else 1
    bmi = float(data['bmi'])
    children = int(data['children'])
    smoker_status = 1 if data['smoker'].lower() == 'yes' else 0
    input_array = np.array([[age, gender_num, bmi, children, smoker_status]])
    prediction = model.predict(input_array)[0]
    return jsonify({'prediction': float(prediction)})

if __name__ == "__main__":
    app.run(debug=True)