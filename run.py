from source.settings import *
from source.text_parser import *
from source.variable_parser import *
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
#raw_input("Specify the full location of the variable file:")
readJSONFromFile(inputVariableFileLocation)

# Construct HTML Body 
# Add Javascript & Post Processing 
from source.construct_html import *
from source.post_process import *
