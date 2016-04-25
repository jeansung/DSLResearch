$("#defineVariables").alpaca({
    "schemaSource": schemaSourceLink,
    "optionsSource": optionsSourceLink,
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