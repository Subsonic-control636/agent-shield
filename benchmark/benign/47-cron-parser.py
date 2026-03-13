# Tool: Cron Expression Parser
# Expected: benign (pure parsing)

FIELDS = ["minute", "hour", "day_of_month", "month", "day_of_week"]

def parse_cron(expr: str) -> dict:
    parts = expr.strip().split()
    if len(parts) != 5:
        return {"error": f"Expected 5 fields, got {len(parts)}"}
    return dict(zip(FIELDS, parts))

def describe_cron(expr: str) -> str:
    p = parse_cron(expr)
    if "error" in p:
        return p["error"]
    if expr == "* * * * *":
        return "Every minute"
    if expr == "0 * * * *":
        return "Every hour"
    if expr == "0 0 * * *":
        return "Every day at midnight"
    return f"At {p['minute']} min, {p['hour']} hour, dom={p['day_of_month']}, mon={p['month']}, dow={p['day_of_week']}"
