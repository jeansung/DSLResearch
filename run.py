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

from source.construct_html import *


# Construct HTML body


# Add Headers + Java script + Post Processing 


# Final output