import json
from flask import Flask, jsonify, request
from privacysummarizer import get_summary
from flask_cors import CORS


app = Flask(__name__)

CORS(app)
# what we need long term 
    ### way to run analysis on multiple privacy polices ( way to track diffrent quires)
    ### way to ensure this can be run by multiple users (add database or another solution like dictionary or other data structure)

## how run 
##### ensure flask is installed
###### python3 test_flask.py
##### api endpoints that can be accesed 
######   127.0.0.1:5000/sum or 127.0.0.1:5000/sendpolicy (note that the ip address change on  network with computer)
########  use postman as easy way to interact with api endpoints.


PrivacyPolicy= []
# function gets privacy policy
@app.route('/sendpolicy', methods=['POST'])
def get_privacy_policy():
  request_data = request.get_json()
  retrivedPolicy= request_data['privacyPolicy']
  PrivacyPolicy.append(retrivedPolicy)
  print(PrivacyPolicy)
  return PrivacyPolicy

# get request 
@app.route('/sum', methods=['GET'])
def send_summary():
  make_sum= get_summary(PrivacyPolicy.pop(),5)
  return make_sum

if __name__ == '__main__':
  app.run(port=5000)