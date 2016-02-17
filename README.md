# DSLResearch
Code for model driven reading and writing. Originally sourced from: http://worrydream.com/Tangle/

> Documents for this project live [here](https://drive.google.com/a/g.hmc.edu/folderview?id=0B9z84Or5GzOnazl4a25UZV9yTHc&usp=drive_web)

### Version 1

The files that need to be specified are in `input` directory. Specifically, you need to indicate the markup text file, the variable definition file and the variable usage file. 

| Input | Specification Details | Example File Name |
|:------|:----------------------|:------------------|
| Markup Text | Can write this in plain text, with annotations for the variables. The convention is using [] to wrap the names of independent variables and {} to wrap names of dependent variables. A variable cannot be both an independent variable and a dependent variable. | `input/markup_text.txt`| 
| Variable Definition | Currently specified in a JSON file. The `element_id` field refers to the name of the javascript element in the final html document. Independent variable have the following fields: `data_var`, `display_text`, `class_`, `data_min`, `data_max`, `data_step`. Dependent variables have the following fields: `data_var`, `display_text`, `data_format`. No fields are optional except `display_text` which must be an empty string. | `input/var_def.json`
| Variable Usage | Currently specified as javascript, according to the original Tangle library requirements. | `input/sample_js.html`|


Note: There must be correct correlation between all the input files, there is no error checking at this stage. 

To generate the desired output file, specify all input files and then in the main directory, run `python run.py`. The output file can be found at `output/final.html`. The dependencies for this output html file are in the `output` directory. 