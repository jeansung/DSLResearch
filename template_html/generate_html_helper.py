from string import Template


# Input Files 
template_html = "ballot_template.html"


title_template = Template("<title>$name</title>")
body_header_template = Template("<h1> <b>$name</b></h1>")
body_template = Template("<p id='$body_id'> $body_text </p>")
variable_template = Template("<span $variable_tags ></span>")
datavar_template = Template('data-var="$datavar_value"')
class_string = 'class="TKAdjustableNumber"' 
data_min_template = Template('data-min="$datamin_value"')
data_max_template = Template('data-max="$datamax_value"')
data_step_template = Template('data-step=$datastep_value')

javascript_tags = Template('<script type="text/javascript"> $javascript </script>')