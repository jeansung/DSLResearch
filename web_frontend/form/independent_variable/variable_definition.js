$("#ind_var").alpaca({
    "dataSource": "/form/independent_variable/data.json",
    "schemaSource": "/form/independent_variable/schema.json",
    "optionsSource": "/form/independent_variable/options.json",
    "options": {
        "form": {
        "buttons": {
          "submit": {
              "title": "Serialize",
              "click": function() {
                  var value = this.getValue();
                  var strValue = JSON.stringify(value, null, "  ");
                  var file = "/form/independent_variable/data.json";
                  var jsonfile = require('jsonfile');
                  var util = require('util');
                  console.log(value);
                  jsonfile.writeFile(file, value, function (err) {
                    console.error(err)
                  });                  
                  console.log("wrote to file");
                  alert(strValue);
              }
          }
        }
      },
    }
});
