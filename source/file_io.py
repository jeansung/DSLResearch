from settings import *
import globals
import sys
import json 

def readFile(input_file):
    contents = ""
    with open(input_file, "r") as f:
        contents = f.read()
    return contents

def processText(file_content):
    current_string = ""
    variable_mode = False

    for i in range(len(file_content)):
        current_char = file_content[i]
        if variable_mode:
            current_string += current_char
            if current_char in VARIABLE_END:
                globals.TOTAL_CONTENT.append(current_string)
                brackets = current_string[0] + current_string[-1]
                if brackets == IND_MATCH:
                    globals.IND_VAR.append(current_string)
                elif brackets == DEP_MATCH:
                    globals.DEP_VAR.append(current_string)
                else:
                    print "Error - Brackets Mismatched." 
                    sys.exit()

                #Reset string 
                current_string = ""
                variable_mode = False 
        else:
            if current_char in VARIABLE_BEGIN:
                globals.TOTAL_CONTENT.append(current_string)
                current_string = ""
                current_string += current_char
                variable_mode = True 
            else:
                current_string += current_char
                lastCharacter = i == (len(file_content) -1)
                if lastCharacter:
                    globals.TOTAL_CONTENT.append(current_string)

def readJSONFromFile(input_file):
    contents = ""
    with open(input_file, "r") as f:
        contents = f.read()
    globals.VARIABLE_CONTENT = json.loads(contents)

def generateFinal(javascript_file, output_file):
    contents = ""

    ## Open generated HTML file
    with open(GENERATED_FILE, "r") as f:
        contents = f.read()
    f.close()


    # Fix the _ to -
    contents = contents.replace("data_", "data-")

    # insert the relevant javascript file, before the close head bracket 
    index = contents.find('</head>')
    javascript = open(javascript_file, "r").read()
    final_contents = contents[:index] + javascript + contents[index:]


    # Write final file 
    with open(output_file, "w") as g:
        g.write(final_contents)
    g.close()