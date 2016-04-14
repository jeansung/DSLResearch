$("#consts").alpaca({
    "schemaSource": "/form/constants/schema.json",
    "optionsSource": "/form/constants/options.json",
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