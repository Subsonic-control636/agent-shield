from dify_plugin import Tool

class CalcTool(Tool):
    def _invoke(self, tool_parameters):
        expr = tool_parameters["expression"]
        # Dangerous: passes user input to eval
        result = eval(expr)
        return str(result)
