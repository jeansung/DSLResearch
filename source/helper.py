# File containing all helper functions called in run.py 
from __future__ import print_function
import markup
from markup import oneliner as e
from settings import *
import sys
import json 


# Conventions for naming
# mixedCase for function names and parameters
# UPPERCASE for global constants 
# lower_case for internal variables in functions 


## Top Level Functions

def getTextFromFile(inputFile):
    contents = ""
    with open(inputFile, "r") as f:
        contents = f.read()
    return contents

def getJSONFromFile(inputFile):
    contents = ""
    with open(inputFile, "r") as f:
        contents = f.read()
    return json.loads(contents)

def processText(fileContent):
    pieces = []
    ind_var = []
    dep_var = []
    consts = []

    current_string = ""
    variable_mode = False

    for i in range(len(fileContent)):
        current_char = fileContent[i]
        if variable_mode:
            current_string += current_char
            if current_char in VARIABLE_END:
                pieces.append(current_string)
                brackets = current_string[0] + current_string[-1]
                if brackets == IND_MATCH:
                    ind_var.append(current_string)
                elif brackets == DEP_MATCH:
                    dep_var.append(current_string)
                elif brackets == CONST_MATCH:
                    consts.append(current_string)
                else:
                    print ("Error - Brackets Mismatched.") 
                    sys.exit()

                #Reset string 
                current_string = ""
                variable_mode = False 
        else:
            if current_char in VARIABLE_BEGIN:
                pieces.append(current_string)
                current_string = ""
                current_string += current_char
                variable_mode = True 
            else:
                current_string += current_char
                lastCharacter = i == (len(fileContent) -1)
                if lastCharacter:
                    pieces.append(current_string)
    return pieces, ind_var, dep_var, consts 

def startHTMLPage(jsFile, pageID):
  # Add javascript file to list of imports
  JAVASCRIPT_FILES.append(jsFile)
  page = markup.page()
  page.init( title="Placeholder title", 
             charset=CHARSET_TYPE,
             css=CSS_FILE,
             script=JAVASCRIPT_FILES)
  page.p(id=pageID)
  return page 

def populateHTML(page, pieces, indVarList, depVarList, constsList,
                               indVarDef, depVarDef, constsDef, depthLimit):
    # Check max recursive depth first  
    if depthLimit > RECURSIVE_DEPTH_LIMIT:
        print ("Error: Maximum Recursive Depth Exceeded.")
        sys.exit()


    for item in pieces:
        var_string = item[1:-1]
        if item in indVarList:
          for ind in indVarDef:
              if ind[VAR_IDENT] == var_string:
                  if ind["class_"] == "TKAdjustableNumber":
                    
                    page.span(ind['display_text'],
                              data_var=ind['data_var'],
                              class_=ind['class_'],
                              data_min=ind['data_min'],
                              data_max=ind['data_max'],
                              data_step=ind['data_step'])
                  elif ind["class_"] == "TKToggle TKSwitch":

                    # Collect text options
                    text_options = extractDisplayValues(ind['data_values'])
                    nested_spans = [e.span(i) for i in text_options]
                    nested_spans_text = str(" ".join(nested_spans))

                    page.span(nested_spans_text,
                              data_var=ind['data_var'],
                              class_=ind['class_']                        
                              )
         
        elif item in depVarList:
          for dep in depVarDef:
             if dep[VAR_IDENT] == var_string:
                if "class_" in dep and dep['class_'] == "TKSwitchPositiveNegative":
                    nested_spans = e.span(dep["positive"]), e.span(dep["negative"])
                    nested_spans_text = str(" ").join(nested_spans)
                    page.span(nested_spans_text,
                              data_var=dep['backing_variable'],
                              class_=dep['class_'])
                elif "class_" in dep and dep['class_'] == "TKSwitch":
                    #Need to add a case for text and not programs I'm not checking right now
                    # Recursive call for each object in list? 
                    nested_spans = []
                    for textSnippet in dep['options']:
                        subPage = markup.page()
                        new_pieces, new_ind_var, new_dep_var, new_consts = processText(textSnippet)
                        subPage = populateHTML(subPage, new_pieces, new_ind_var, new_dep_var, new_consts,
                               indVarDef, depVarDef, constsDef, depthLimit-1)
                        nested_spans.append(e.span(str(subPage)))

                    nested_spans_text = str(" ").join(nested_spans)
                    page.span(nested_spans_text,
                              data_var=dep['data_var'],
                              class_=dep['class_'])
                else:
                    page.span("",
                           data_var=dep['data_var'],
                           data_format=dep['data_format'])
        elif item in constsList:
            var_string = item[1:-1]
            for const in constsDef:
                if const[VAR_IDENT] == var_string:
                    page.span("",
                          data_var=const["data_var"],
                          data_format=const["data_format"])
        else:
            page.add(item)
    return page

def closeHTMLPage(page, outputFile):
    # Write page object to HTML file 
    page.p.close()
    with open(outputFile, "wb+") as f:
      print(page, file=f)
    f.close()

    # Open generated HTML & Do replacement of _ for - 
    contents = ""
    ## Open generated HTML file
    with open(outputFile, "r") as g:
      contents = g.read()
    g.close()

    # Fix the _ to -
    contents = contents.replace("data_", "data-")

    # Write final file 
    with open(outputFile, "w") as h:
      h.write(contents)
    h.close()


## Sub Helper Functions
# Helper for populateHTML
def extractDisplayValues(dictList):
  display_values = []
  for dicts in dictList:
    for key in dicts:
      display_values.append(dicts[key])
  return display_values


