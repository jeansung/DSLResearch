from source.settings import *
from source.file_io import *
from source.construct_html import *
from source import globals 
from shutil import copyfile
import os

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


javascript_file = "input/ballot.js"
#raw_input("Specify the full location of the variable usage file: ")
output_file = "output/ballot.html"
#raw_input("Specifc the location of the output file: ")

# copy the input javascript file to the correct location
# generate the output html
javascript_file_name = os.path.basename(javascript_file)
javascript_file_out = "output/" + javascript_file_name
copyfile(javascript_file, javascript_file_out)


if DEBUG:
    print "Integrating the mathematical model and generating output html file . . ."

generatePage(javascript_file_name, output_file)

if DEBUG:
    print "Finished. Find the output file in the output directory."