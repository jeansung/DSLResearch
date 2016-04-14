$("#dep_var").alpaca({
    "dataSource": "/form/dependent_variable/data.json",
    "schemaSource": "/form/dependent_variable/schema.json",
    "optionsSource": "/form/dependent_variable/options.json",
    "options": {
        "form": {
        "buttons": {
          "submit": {
              "title": "Serialize",
              "click": function() {
                  var value = this.getValue();
                  console.log(value);
                  alert(JSON.stringify(value, null, "  "));
              }
          }
        }
      },
  }
});


