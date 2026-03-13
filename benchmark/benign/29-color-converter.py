# Tool: Color Converter
# Expected: benign (pure computation)

def hex_to_rgb(hex_color: str) -> tuple:
    h = hex_color.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_hex(r: int, g: int, b: int) -> str:
    return f"#{r:02x}{g:02x}{b:02x}"

def rgb_to_hsl(r: int, g: int, b: int) -> tuple:
    r, g, b = r/255, g/255, b/255
    mx, mn = max(r,g,b), min(r,g,b)
    l = (mx+mn)/2
    if mx == mn:
        h = s = 0
    else:
        d = mx - mn
        s = d/(2-mx-mn) if l > 0.5 else d/(mx+mn)
        if mx == r: h = (g-b)/d + (6 if g < b else 0)
        elif mx == g: h = (b-r)/d + 2
        else: h = (r-g)/d + 4
        h /= 6
    return round(h*360), round(s*100), round(l*100)
