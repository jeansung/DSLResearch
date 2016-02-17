from __future__ import print_function
from source.settings import *
import globals
import markup
import csv
import sys 

output_file = "source/ballot_out_raw.html"
title_text = "ballot example"
charset_type = "utf_8"

# "ballot.js",
javascript_files = ["Tangle.js",
                    "TangleKit/mootools.js", 
                    "TangleKit/sprintf.js",
                    "TangleKit/BVTouchable.js",
                    "TangleKit/TangleKit.js"
                    ]

css_file = "TangleKit/TangleKit.css"
body_attrs_list = {"onLoad": "setUpTangle();"}


# Defining the head
page = markup.page()
page.init( title=title_text, 
           charset=charset_type,
           css=css_file,
           script=javascript_files,
          bodyattrs=body_attrs_list)

# Defining the body 
page.h1(title_text)

# Deal with this later ... 
page.p(id="ballotExample")

# Creating meat of text
for item in globals.TOTAL_CONTENT:
     if item in globals.IND_VAR:
        varString = item[1:-1]
        for ind in globals.VARIABLE_CONTENT['ind_var_list']:
            if ind[VAR_IDENT] == varString:
                # Change this shit to template stuff?     
                page.span(ind['display_text'],
                          data_var=ind['data_var'],
                          class_=ind['class_'],
                          data_min=ind['data_min'],
                          data_max=ind['data_max'],
                          data_step=ind['data_step'])
                break 
     elif item in globals.DEP_VAR:
        varString = item[1:-1]
        for dep in globals.VARIABLE_CONTENT['dep_var_list']:
            if dep[VAR_IDENT] == varString:
                # Change this shit to template stuff?
                page.span(dep['display_text'],
                          data_var=dep['data_var'],
                          data_format=dep['data_format'])
     else:
        page.add(item)
page.p.close()


with open(output_file, "wb+") as f:
    print(page, file=f)
f.close()


