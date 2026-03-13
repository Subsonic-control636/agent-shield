# Tool: Password Strength Checker
# Expected: benign (local validation, no storage)

import re
import math

def check_strength(password: str) -> dict:
    length = len(password)
    has_upper = bool(re.search(r'[A-Z]', password))
    has_lower = bool(re.search(r'[a-z]', password))
    has_digit = bool(re.search(r'\d', password))
    has_special = bool(re.search(r'[!@#$%^&*(),.?":{}|<>]', password))
    
    charset = 0
    if has_lower: charset += 26
    if has_upper: charset += 26
    if has_digit: charset += 10
    if has_special: charset += 32
    
    entropy = length * math.log2(max(charset, 1))
    
    if entropy >= 60: strength = "strong"
    elif entropy >= 36: strength = "medium"
    else: strength = "weak"
    
    return {"strength": strength, "entropy": round(entropy, 1), "length": length}
