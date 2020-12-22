import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, render_template
import pickle

app = Flask(__name__)
model = pickle.load(open('disease_prediction.pkl','rb'))

@app.route('/')
@app.route('/home')
def home():
    return render_template('index.html')

@app.route('/predict',methods=['POST'])
def predict():
    
    features = [x for x in request.form.values()]     
    features = [np.array(features)]  

    column_names=[]
    final_features=pd.DataFrame(features,columns=column_names)
    prediction= model.predict(final_features)

    return jsonify(prediction[0])

if __name__ == '__main__':
    app.run(debug=True)