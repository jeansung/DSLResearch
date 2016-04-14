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
                  console.log(value);
                  alert(JSON.stringify(value, null, "  "));
              }
          }
        }
      },
    }
});
