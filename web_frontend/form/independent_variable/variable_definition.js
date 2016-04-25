$("#ind_var").alpaca({
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
                  alert(strValue);
              }
          }
        }
      }, 
    }
});
