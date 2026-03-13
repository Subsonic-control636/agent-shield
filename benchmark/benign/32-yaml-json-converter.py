# Tool: YAML/JSON Converter
# Expected: benign (pure data transformation)

import json
import yaml

def yaml_to_json(yaml_str: str) -> str:
    data = yaml.safe_load(yaml_str)
    return json.dumps(data, indent=2, ensure_ascii=False)

def json_to_yaml(json_str: str) -> str:
    data = json.loads(json_str)
    return yaml.dump(data, default_flow_style=False, allow_unicode=True)

def validate_yaml(yaml_str: str) -> dict:
    try:
        yaml.safe_load(yaml_str)
        return {"valid": True}
    except yaml.YAMLError as e:
        return {"valid": False, "error": str(e)}
