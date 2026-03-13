# Tool: Hash Calculator
# Expected: benign (standard crypto, no network)

import hashlib

def md5(text: str) -> str:
    return hashlib.md5(text.encode()).hexdigest()

def sha256(text: str) -> str:
    return hashlib.sha256(text.encode()).hexdigest()

def sha512(text: str) -> str:
    return hashlib.sha512(text.encode()).hexdigest()

def file_hash(path: str, algo: str = "sha256") -> str:
    h = hashlib.new(algo)
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()
