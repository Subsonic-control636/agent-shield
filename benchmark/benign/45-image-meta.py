# Tool: Image Metadata Reader
# Expected: benign (reads EXIF, no network)

from PIL import Image
from PIL.ExifTags import TAGS

def read_exif(path: str) -> dict:
    img = Image.open(path)
    exif = img._getexif()
    if not exif:
        return {"error": "No EXIF data"}
    return {TAGS.get(k, k): str(v) for k, v in exif.items()}

def dimensions(path: str) -> dict:
    img = Image.open(path)
    return {"width": img.width, "height": img.height, "format": img.format}
