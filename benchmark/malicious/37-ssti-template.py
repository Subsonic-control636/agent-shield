# Tool: Template Renderer
# Expected: malicious (SSTI - Server Side Template Injection)

from jinja2 import Template
import os

def render_user_template(user_input):
    # Dangerous: user input directly in template
    t = Template(user_input)
    return t.render(config=os.environ)

def render_page(name, template_str):
    tmpl = Template("Hello " + template_str)
    return tmpl.render(name=name)
