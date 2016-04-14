$("#ind_var").alpaca({
    "schema": {
        "title": "Define your independent variable: ",
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "title": "Name",
                "default": "tax",
            },
            "macrotype": {
              "type": "String",
              "title": "Macrotype",
              "enum": ["independent variable"]

            },
            "microtype": {
                "type": "String",
                "title": "Microtype",
                "enum": ['TkAdjustable number', 'TkToggle TkSwitch'],
                "required": true 

            },
            "datavar": {
              "type": "string",
              "title": "Variable name",
              "required": true              
            },
            "datamin": {
              "title": "data min",
              "type": "integer",
              "required": true,
            
            },
            "datamax": {
              "type": "integer",
              "title": "data max",
              "required": true
            },
            "datastep": {
              "type": "integer", 
              "title": "data step", 
              "default":  1
            },
            "displaytext": {
              "type": "string", 
              "title": "display text",
              "default": ""
            },
            "datavalues": {
              "type": "string", 
              "title": "data values"
            }
        },
        "dependencies": {
          "datamin": ["microtype"],
          "datamax": ["microtype"],
          "datastep": ["microtype"],
          "displaytext": ["microtype"], 
          "datavalues": ["microtype"]
        }
    },
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
      "fields": {
        "name": {
          "disabled":true
        },
        "macrotype": {
          "type": "select",
          "disabled":true,
          "removeDefaultNone":true
        },
        "microtype": {
          "type": "select",
          "removeDefaultNone":false,
          "noneLabel":"--Select--",
          "emptySelectFirst": true
        
        },
        "datavar":{
          "disallowOnlyEmptySpaces": true,
          "helper": "Enter a name for the variable, cannot be empty."
        },
        "datamin": {
          "dependencies": {
            "microtype": "TkAdjustable number"
          }
        },
        "datamax": {
          "dependencies": {
            "microtype": "TkAdjustable number"
          }
        },
        "datastep": {
          "dependencies": {
            "microtype": "TkAdjustable number"
          }
        },
        "displaytext": {
          "disabled":true,
          "dependencies": {
            "microtype": "TkAdjustable number"
          }
        },
        "datavalues": {
          "dependencies": {
            "microtype": "TkToggle TkSwitch"
          }
        }
      }
    }
});
