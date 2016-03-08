from source.settings import *
from source.helper import *
from shutil import copyfile
import os

# File locations 
inputDirectory = "input/park_example/"
inputTextFile = "park_markup.txt"
inputVariableFile = "park_variables.json"
inputJSFile = "park_math.js"
outputDirectory = "output/"
outputHTMLFile = "park.html"


# Copy Javascript from input to correct location 
baseJSFile = os.path.basename(inputJSFile)
outputJSFile = outputDirectory + baseJSFile
copyfile(inputDirectory+inputJSFile, outputJSFile)

# File Contents
textContents = getTextFromFile(inputDirectory+inputTextFile)
jsonContents = getJSONFromFile(inputDirectory+inputVariableFile)

# Text / Variable Processing 
pieces, indVarList, depVarList, constsList = processText(textContents)
indVarDef = jsonContents['ind_var_list']
depVarDef = jsonContents['dep_var_list']
constsDef = jsonContents['consts_list']
pageID = jsonContents['element_id']

# Generate HTML Page  
page = startHTMLPage(inputJSFile, pageID)
page = populateHTML(page, pieces, indVarList, depVarList, constsList,
                                  indVarDef, depVarDef, constsDef, 
                                  RECURSIVE_DEPTH_LIMIT)
closeHTMLPage(page, outputDirectory+outputHTMLFile)