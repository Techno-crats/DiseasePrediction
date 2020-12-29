import numpy as np
import flask
from flask import Flask, request, jsonify, render_template, make_response
from flask_restplus import Api, Resource, fields
import json
import joblib
import pickle

flask_app = Flask(__name__)
app = Api(app = flask_app,
		  version = "1.0",
		  title = "ML React App",
		  description = "Predict results using a trained model")

name_space = app.namespace('prediction', description='Prediction APIs')

model = pickle.load(open('disease_prediction.pkl','rb'))

f = open ('disease_details.json', "r")
disease_details = json.loads(f.read())

@name_space.route("/")
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add("Access-Control-Allow-Headers", "*")
		response.headers.add("Access-Control-Allow-Methods", "*")
		return response

	def post(self):
		try:
			formData = request.json
			my_list=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
			for index, (key, value) in enumerate(formData.items()):
				if value:
					my_list[index]=1

			to_predict = np.array(my_list).reshape(1,132)
			model = joblib.load('disease_prediction.pkl')
			result = model.predict(to_predict)


			for i in disease_details:
					if i["disease"]==result[0]:
						prevention=i["prevention"]
						treatment=i["treatment"]


			response = jsonify({
				"statusCode": 200,
				"status": "Prediction made",
				"result":  str(result[0]),
				"prevention": prevention,
				"treatment": treatment
				})
			response.headers.add("Access-Control-Allow-Origin", '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})

# @app.route('/')
# @app.route('/home')
# def home():
#     return flask.render_template('index.html')
#
# def diseasePredictor(to_predict_list):
#     to_predict = np.array(to_predict_list).reshape(1,132)
#     model = joblib.load('disease_prediction.pkl')
#     result = model.predict(to_predict)
#     # loaded_model = pickle.load(open("disease_prediction.pkl","rb"))
#     # result = loaded_model.predict(to_predict)
#     return result[0]
#
# @app.route('/predict',methods=['POST'])
# def predict():
#     if request.method == 'POST':
#         my_list=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
#         # result=list(map(int, request.form.to_dict().keys()))
#         # for i in result:
#         #     my_list[i]=1;
#         # result = diseasePredictor(my_list)
#         result = request.form
#         return render_template("result.html",prediction=result)
#
#
if __name__ == '__main__':
    app.run(debug=True)
