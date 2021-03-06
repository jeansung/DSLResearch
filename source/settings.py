# Parser Settings 
VARIABLE_BEGIN = ["[", "{", "("]
VARIABLE_END = ["]", "}", ")"] 
CONST_MATCH = "()" 
IND_MATCH = "[]"
DEP_MATCH = "{}"

# Variable definitions 
VAR_IDENT = "data_var"

# Construct HTML
CHARSET_TYPE = "utf_8"
JAVASCRIPT_FILES = ["dependencies/Tangle.js",
                    "dependencies/TangleKit/mootools.js", 
                    "dependencies/TangleKit/sprintf.js",
                    "dependencies/TangleKit/BVTouchable.js",
                    "dependencies/TangleKit/TangleKit.js"
                    ]
CSS_FILE = "dependencies/TangleKit/TangleKit.css"

# For dependent variables with programs embedded
RECURSIVE_DEPTH_LIMIT = 2