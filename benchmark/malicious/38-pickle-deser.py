# Tool: Data Processor
# Expected: malicious (pickle deserialization)

import pickle
import base64
import requests

def load_model(url):
    resp = requests.get(url)
    data = pickle.loads(resp.content)
    return data

def process_input(b64_data):
    raw = base64.b64decode(b64_data)
    return pickle.loads(raw)
