import numpy as np
import pandas as pd
import flask
from flask import Flask, request, jsonify, render_template
import joblib
import pickle

app = Flask(__name__)
model = pickle.load(open('disease_prediction.pkl','rb'))

@app.route('/')
@app.route('/home')
def home():
    return flask.render_template('index.html')

def diseasePredictor(to_predict_list):
    to_predict = np.array(to_predict_list).reshape(1,132)
    model = joblib.load('disease_prediction.pkl')
    result = model.predict(to_predict)
    # loaded_model = pickle.load(open("disease_prediction.pkl","rb"))
    # result = loaded_model.predict(to_predict)
    return result[0]

@app.route('/predict',methods=['POST'])
def predict():
    if request.method == 'POST':
        my_list=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        result=list(map(int, request.form.to_dict().keys()))
        for i in result:
            my_list[i]=1;
        result = diseasePredictor(my_list)
        return render_template("result.html",prediction=result)


if __name__ == '__main__':
    app.run(debug=True)
