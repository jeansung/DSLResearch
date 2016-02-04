from __future__ import print_function
import markup

output_file = "ballot_out_raw.html"
title_text = "ballot example"
charset_type = "utf_8"

# "ballot.js",
javascript_files = ["Tangle.js",
                    "TangleKit/mootools.js", 
                    "TangleKit/sprintf.js",
                    "TangleKit/BVTouchable.js",
                    "TangleKit/TangleKit.js",
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

# Meat of the text.
page.p(id="ballotExample")
page.add("My house is valued at $ ")
page.span("",
          data_var="myHouseValue",
          class_="TKAdjustableNumber",
          data_min="100000",
          data_max="10000000",
          data_step="500000")

page.add(". If the levy is")
page.span("",
          data_var="levyPerHouse",
          class_="TKAdjustableNumber",
          data_min="1",
          data_max="50")

page.add("cents per $1000, then I pay $")
page.span("",
          data_var="myPayment", 
          data_format="%0.2f")

page.add("annually. The average house value in this district is $")
page.span("",
          data_var="averageHouseValue",
          class_="TKAdjustableNumber",
          data_min="100000",
          data_max="10000000",
          data_step="500000")
        
page.add(", and with a levy of ")
page.span("",
          data_var="levyPerHouse",
          class_="TKAdjustableNumber",
          data_min="1",
          data_max="50")

page.add("cents per $1000 on ")
page.span("",
          data_var="percentParticipating",
          class_="TKAdjustableNumber",
          data_min="0",
          data_max="100")

page.add("%% of houses, if we collect for") 
page.span("",
          data_var="numYears",
          class_="TKAdjustableNumber",
          data_min="0",
          data_max="5")

page.add(", we can raise") 
page.span("",
          data_var="totalAmountRaised", 
          data_format="%0.2f")

page.add("in total to help the school districts.")

page.p.close()
page.br()
page.br()

page.a( "This is based on the assumption that there are approximately 50,000 households in the school district.",  href='https://en.wikipedia.org/wiki/Seattle_Public_Schools">https://en.wikipedia.org/wiki/Seattle_Public_Schools' )

page.br()
page.br()

page.a("Original Ballot Measure", href="http://www.kingcounty.gov/depts/elections/how-to-vote/ballots/whats-on-the-ballot/ballot-measures/february-special/list-of-measures/seattle-prop2.aspx" )

with open(output_file, "wb+") as f:
    print(page, file=f)

f.close()


