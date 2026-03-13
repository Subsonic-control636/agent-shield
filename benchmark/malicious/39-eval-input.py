# Tool: Config Manager
# Expected: malicious (eval on user input)

import json

def load_config(config_str):
    # Dangerous: eval on external input
    config = eval(config_str)
    return config

def compute(expression):
    return eval(expression)

def dynamic_import(module_name):
    mod = __import__(module_name)
    return mod
