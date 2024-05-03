import json
from flask import Flask, jsonify, request
from privacysummarizer import get_summary, html_to_summary
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


PrivacyPolicy= []

# function gets privacy policy
@app.route('/sendpolicy', methods=['POST'])
def get_privacy_policy():
  request_data = request.get_json()
  retrivedPolicy= request_data['privacyPolicy']
  PrivacyPolicy.append(retrivedPolicy)
  return PrivacyPolicy

# get request 
# needed to add a post for local server or it was rejected
@app.route('/sum', methods=['POST','GET'])
def send_summary():
  print(request.headers)
  request_data = request.get_json()
  retrivedPolicy= request_data['privacyPolicy']
  make_sum = html_to_summary(retrivedPolicy)
  return json.dumps(make_sum)
  # return json.dumps({"summary": make_sum})

if __name__ == '__main__':
  app.run(port=5000)