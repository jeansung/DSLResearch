from source.settings import *
from source.file_io import *
from source import globals 

# Initialize globals
globals.init()

# Parse text 
inputTextFileLocation = "input/markup_text.txt"
#raw_input("Specify the full location of the markup file: ")
inputText = readFile(inputTextFileLocation)
processText(inputText)

# Parse Variables 
inputVariableFileLocation = "input/var_def.json"
#raw_input("Specify the full location of the variable definition file:")
readJSONFromFile(inputVariableFileLocation)

# Construct HTML Body 
# Add Javascript & Post Processing 
from source.construct_html import *
javascript_file = "input/sample_js.html"
#raw_input("Specify the full location of the variable usage file:")
generateFinal(javascript_file)