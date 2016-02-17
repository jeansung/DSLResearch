from settings import *
import json 
import globals

def readJSONFromFile(input_file):
    contents = ""
    with open(input_file, "r") as f:
        contents = f.read()
    globals.VARIABLE_CONTENT = json.loads(contents)
