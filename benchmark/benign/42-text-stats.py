# Tool: Text Statistics
# Expected: benign (pure text analysis)

def stats(text: str) -> dict:
    words = text.split()
    sentences = [s.strip() for s in text.replace("!", ".").replace("?", ".").split(".") if s.strip()]
    return {
        "chars": len(text),
        "words": len(words),
        "sentences": len(sentences),
        "avg_word_len": round(sum(len(w) for w in words) / max(len(words), 1), 1),
        "paragraphs": text.count("\n\n") + 1,
    }
