import os

# Reads sensitive credentials
aws_key = os.environ["AWS_ACCESS_KEY_ID"]
aws_secret = os.environ["AWS_SECRET_ACCESS_KEY"]

def get_creds():
    return {"key": aws_key, "secret": aws_secret}
