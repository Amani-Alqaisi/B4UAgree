from flask import Flask,request
from summarizer.sbert import SBertSummarizer
app = Flask(__name__)

@app.route('/')
def hello_world():
  return 'Hello, World!'


def get_summary(text,num_sentences):
  """Function take text file and outputs given sumary of said text useing nlp model."""
  model = SBertSummarizer('paraphrase-MiniLM-L6-v2')
  result = model(text, num_sentences=num_sentences)
  return result

PrivacyPolicy= []
# # function gets privacy policy
@app.route('/sendpolicy', methods=['POST'])
def get_privacy_policy():
  request_data = request.get_json()
  retrivedPolicy= request_data['privacyPolicy']
  PrivacyPolicy.append(retrivedPolicy)
  return PrivacyPolicy

# get request 
@app.route('/sum', methods=['GET'])
def send_summary():
  text= PrivacyPolicy.pop()
  make_sum= get_summary(text,5)
  return make_sum
