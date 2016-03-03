from __future__ import print_function
from source.settings import *
import globals
import markup
from markup import oneliner as e
import csv
import sys 

def generatePage(javacript_filepath, output_file):

  # Add javascript file to list of imports
  JAVASCRIPT_FILES.append(javacript_filepath)
  # Defining the head
  page = markup.page()
  page.init( title="Placeholder title", 
             charset=CHARSET_TYPE,
             css=CSS_FILE,
             script=JAVASCRIPT_FILES)

  # Defining the body 
  page.p(id=globals.VARIABLE_CONTENT['element_id'])
  # Creating meat of text
  for item in globals.TOTAL_CONTENT:
       if item in globals.IND_VAR:
          varString = item[1:-1]
          for ind in globals.VARIABLE_CONTENT['ind_var_list']:
              if ind[VAR_IDENT] == varString:
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
         
       elif item in globals.DEP_VAR:
          varString = item[1:-1]
          for dep in globals.VARIABLE_CONTENT['dep_var_list']:
              if dep[VAR_IDENT] == varString:
                if "class_" in dep and dep['class_'] == "TKSwitchPositiveNegative":
                  nested_spans = e.span(dep["positive"]), e.span(dep["negative"])
                  nested_spans_text = str(" ").join(nested_spans)
                  page.span(nested_spans_text,
                            data_var=dep['backing_variable'],
                            class_=dep['class_'])
                else:
                  page.span("",
                            data_var=dep['data_var'],
                            data_format=dep['data_format'])
       elif item in globals.CONST:
          varString = item[1:-1]
          for const in globals.VARIABLE_CONTENT['const_list']:
              if const[VAR_IDENT] == varString:
                page.span("",
                          data_var=const["data_var"],
                          data_format=const["data_format"])
       else:
          page.add(item)
  page.p.close()

  # Write page to html file 
  with open(output_file, "wb+") as f:
      print(page, file=f)
  f.close()

  # Open & Do replacement of _ for - 
  contents = ""
  ## Open generated HTML file
  with open(output_file, "r") as g:
      contents = g.read()
  g.close()

  # Fix the _ to -
  contents = contents.replace("data_", "data-")

  # Write final file 
  with open(output_file, "w") as h:
      h.write(contents)
  h.close()



def extractDisplayValues(dict_list):
  display_values = []
  for dicts in dict_list:
    for key in dicts:
      display_values.append(dicts[key])
  return display_values


