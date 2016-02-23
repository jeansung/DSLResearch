from source.settings import *

javascript_file = "input/sample_js.html"
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
with open(OUTPUT_FILE, "w") as g:
    g.write(final_contents)
g.close()
