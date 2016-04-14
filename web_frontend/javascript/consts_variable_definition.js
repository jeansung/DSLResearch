$("#consts").alpaca({
    "schema": {
        "title": "Define your constants: ",
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
              "enum": ["constant"]

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
            "datavalue": {
              "type": "integer",
              "title": "data value",
              "required": true
            }
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
        "datavar":{
          "disallowOnlyEmptySpaces": true,
          "helper": "Enter a name for the variable, cannot be empty."
        }
      }
    }
});