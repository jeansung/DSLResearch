output = ""
old_file_name = "old.js"
new_file_name = "new.js"
prepend_string = "'<% "
append_string = " %>' + "

# Delete the last newline
    # Find and replace <, > with \< and \>
    

with open(old_file_name, 'r') as f:
    file_lines = [''.join([prepend_string, x.strip(), append_string, '\n']) for x in f.readlines()]

with open(new_file_name, 'w') as f:
    f.writelines(file_lines) 


