input_file = "ballot_out_raw.html"
javascript_file = "../input/sample_js.html"
output_file = "../output/ballot_out_final.html"

contents = ""

## Open generated HTML file
with open(input_file, "r") as f:
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
