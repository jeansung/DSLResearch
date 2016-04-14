$("#dep_var").alpaca({
    "schema": {
        "title": "Define your dependent variable: ",
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "title": "Name",
                "default": "Total revenue",
            },
            "macrotype": {
              "type": "String",
              "title": "Macrotype",
              "enum": ["dependent variable"]

            },
            "microtype": {
                "type": "String",
                "title": "Microtype",
                "enum": ['NULL', 'TKSwitchPositiveNegative', 'TkSwitch'],
                "required": true 

            },
            "datavar": {
              "type": "string",
              "title": "Variable name",
              "required": true              
            },
            "dataformat": {
              "title": "data format",
              "type": "string"           
            },
            "backingvariable": {
              "type": "string",
              "title": "backing variable",
              "required": true
            },
            "positivetextvalue": {
              "type": "string", 
              "title": "Positive text value", 
              "required": true
              
            },
            "negativetextvalue": {
              "type": "string", 
              "title": "Negative text value", 
              "required": true
              
            },
            "isrecursive": {
              "type": "boolean", 
              "title": "Is recursive?"
            },
            "options": {
              "type": "string", 
              "title": "options to cycle through (list)"
            }
        },
        "dependencies": {
          "dataformat": ["microtype"],
          "backingvariable": ["microtype"],
          "positivetextvalue": ["microtype"],
          "negativetextvalue": ["microtype"], 
          "isrecursive": ["microtype"],
          "options": ["microtype"]
        }
    },
    "options": {
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
        "dataformat": {
          "dependencies": {
            "microtype": "NULL"
          }
        },
        "backingvariable": {
          "dependencies": {
            "microtype": "TKSwitchPositiveNegative"
          }
        },
        "positivetextvalue": {
          "dependencies": {
            "microtype": "TKSwitchPositiveNegative"
          }
        },
        "negativetextvalue": {
          "dependencies": {
            "microtype": "TKSwitchPositiveNegative"
          }
        },
        "isrecursive": {
          "dependencies": {
            "microtype": "TkSwitch"
          }
        },
        "options": {
          "dependencies": {
            "microtype": "TkSwitch"
          }
        }
      }
    }
});


