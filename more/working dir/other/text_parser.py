from settings import *
import globals
import sys



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


