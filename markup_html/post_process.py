# Janky as crap just tyring to get the file to work. 


input_file = "ballot_out_raw.html"
output_file = "ballot_out_final.html"

contents = ""

## Open generated HTML file
with open(input_file, "r") as f:
    contents = f.read()
f.close()

# Fix the _ to -
contents = contents.replace("data_", "data-")

# insert the relevant javascript file, before the close head bracket 
index = contents.find('</head>')
javascript = """
<script type="text/javascript">
function setUpTangle () {
    var element = document.getElementById("ballotExample");

    var tangle = new Tangle(element, {
        initialize: function () {
            this.myHouseValue = 750000;
            this.levyPerHouse = 25;
            this.averageHouseValue = 750000;
            this.numYears = 5;
            this.percentParticipating = 100;

            // Assumed constants 
            this.numHouses = 50000;
            this.perAmount = 1000;
        },
        update: function () {
            this.myPayment = (this.myHouseValue / this.perAmount) * (this.levyPerHouse / 100);
            this.totalAmountRaised = (this.averageHouseValue / this.perAmount) * this.numHouses * (this.percentParticipating / 100) * this.numYears;

        }
    });
}
</script>
"""
final_contents = contents[:index] + javascript + contents[index:]


# Write final file 
with open(output_file, "w") as g:
    g.write(final_contents)
g.close()
