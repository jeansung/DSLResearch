# DSLResearch
Code for model driven reading and writing. 

* Originally sourced from: http://worrydream.com/Tangle/
* Documents for this project live [here](https://drive.google.com/a/g.hmc.edu/folderview?id=0B9z84Or5GzOnazl4a25UZV9yTHc&usp=drive_web)

## TODOs and Fixes
* Find a new symbol for constants, cannot overload parentheses because they are too common in text
* Include start value of variables in variable definition file, Start pulling these variables to initialize the javascript script files 
* Implement web interface

## Version 2

* **How to run**: Specify input and output file locations at the top of `run.py`. Put the variable definition, markup text, and javascript file into a directory inside the `input` directory. See the `park_example` or the `ballot_example` for specification of the input files. Run `python run.py` from the main directory. The output file can be found as an `html` file in the `output` directory. It is important to leave this file as well as the `.js` file in the output directory. 
* **Special Notes about this version**:
	* There is no error checking for the input in this version. 
	* There is support for everything described in the original Tangle library, including dependent variables that contain mini "programs", defined as text with nested variables. 


## Version 2: Project Components updates

### Input
* Input files for a given example live under a parent directory. 

### Output
* No changes 

### Source 

| File | Details | 
|:-----|:--------| 
|  `run.py` | Main file to run program. | 
| `source/markup.py` | Markup library used to generate HTML file. | 
| `source/settings.py` | Settings and parameters dealing with parsing and json representation | 
| `source/helper.py` | All helper functions for the main `python` file. Read in input files, process text, construct HTML, generate output files. Written in a way to avoid globals (for the recursive case). |



## Version 1

* *How to run*: Specify a markup text file, the variable definition file, and the variable usage file in the `input` directory. Then, in the main directory run `python run.py`. The output file can be found as an `html` file in the `output` directory. It is important to leave this file in the output directory 
* *Special Notes about this version*:
    * There is no error checking in this version. There must be correct correlation between all the input files. 
    * No support for dependent variables that contain text or nested variables. 


## Version 1: Project Components 

### Input 

| File | Specification Details | Example File Name |
|:------|:----------------------|:------------------|
| Markup Text | Can write this in plain text, with annotations for the variables. The convention is using [] to wrap the names of independent variables and {} to wrap names of dependent variables. A variable cannot be both an independent variable and a dependent variable. | `input/markup_text.txt`| 
| Variable Definition | Currently specified in a JSON file. The `element_id` field refers to the name of the javascript element in the final html document. Independent variable have the following fields: `data_var`, `display_text`, `class_`, `data_min`, `data_max`, `data_step`. Dependent variables have the following fields: `data_var`, `display_text`, `data_format`. No fields are optional except `display_text` which must be an empty string. | `input/var_def.json`
| Variable Usage | Currently specified as javascript, according to the original Tangle library requirements. | `input/ballot.js`|


### Output 

| File | Details | Example File(s) Name |
|:------|:-------|:---------------------|
| Output HTML File + Javascript file | Files necessary to render the final interactive document| `{}.html` and `{}.js` |
| `dependencies/` | Dependencies that need to be in the same directory as the generated HTML file so it can properly render. | `TangleKit/`, `Tangle.js`, and `style.css` | 

### Source 

| File | Details | 
|:-----|:--------| 
|  `run.py` | Main file to run program. If `DEBUG` is set to true, prints information about progress. | 
| `source/markup.py` | Markup library used to generate HTML file. | 
| `source/settings.py` | Settings and parameters dealing with parsing and json representation | 
| `source/globals.py` | Global variables, specifically the list of independent and dependent variables as well as the total content of the text and the json specification. | 
| `source/file_io.py` | Functions to read in text and variable specification files. |
| `source/construct_html.py` | Function to construct the HTML pulling from text and variable specification. Responsible for generating final HTML file. |




