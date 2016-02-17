# Parser Settings 
VARIABLE_BEGIN = ["[", "{"]
VARIABLE_END = ["]", "}"] 
IND_MATCH = "[]"
DEP_MATCH = "{}"

# Variable definitions 
VAR_DEF_FILE = "../input/var_def.json"
IND_VAR_ATTRS = ["data_var", "display_text", "class_", "data_min", "data_max", "data_step"]
DEP_VAR_ATTRS = ["data_var", "display_text", "data_format"]
VAR_IDENT = "data_var"

# Construct HTML

GENERATED_FILE = "../output/postprocessing.html"
PAGE_TITLE = "SAMPLE"
