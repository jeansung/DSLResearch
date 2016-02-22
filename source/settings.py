# Parser Settings 
VARIABLE_BEGIN = ["[", "{"]
VARIABLE_END = ["]", "}"] 
IND_MATCH = "[]"
DEP_MATCH = "{}"

# Variable definitions 
VAR_IDENT = "data_var"

# Construct HTML
GENERATED_FILE = "source/postprocessing.html"
CHARSET_TYPE = "utf_8"
JAVASCRIPT_FILES = ["Tangle.js",
                    "TangleKit/mootools.js", 
                    "TangleKit/sprintf.js",
                    "TangleKit/BVTouchable.js",
                    "TangleKit/TangleKit.js"
                    ]
CSS_FILE = "TangleKit/TangleKit.css"
BODY_ATTRS_LIST = {"onLoad": "setUpTangle();"}

# Post processing 
OUTPUT_FILE = "output/final.html"