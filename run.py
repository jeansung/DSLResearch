from source.settings import *
from source.file_io import *
from source import globals 

# Print statement settings
DEBUG = True 

# Initialize globals
globals.init()

# Parse text 
inputTextFileLocation = "input/markup_text.txt"
#raw_input("Specify the full location of the markup file: ")
if DEBUG:
    print "Parsing the input text . . ."
inputText = readFile(inputTextFileLocation)
processText(inputText)

# Parse Variables 
inputVariableFileLocation = "input/var_def.json"
#raw_input("Specify the full location of the variable definition file: ")
if DEBUG:
    print "Parsing the variable definition file . . ."
readJSONFromFile(inputVariableFileLocation)

# Construct HTML Body 
# Add Javascript & Post Processing 
if DEBUG:
    print "Constructing the HTML file  . . ."
from source.construct_html import *
javascript_file = "input/sample_js.html"
#raw_input("Specify the full location of the variable usage file: ")
output_file = "output/ballot.html"
if DEBUG:
    print "Integrating the mathematical model and generating output html file . . ."
#raw_input("Specifc the location of the output file: ")
generateFinal(javascript_file, output_file)

if DEBUG:
    print "Finished. Find the output file in the output directory."