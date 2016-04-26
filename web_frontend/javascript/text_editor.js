var editor = new Quill('#editor-container', {});

function textDisplayControl($scope) {
$scope.getParseText = function() {
  var rawText = editor.getText();

  // Constants for processing text
  const MATH_BEGIN = ["(", "[", "{"];
  const MATH_END = [")", "]", "}"];
  const CONST_MATCH = "()";
  const IND_MATCH = "[]";
  const DEP_MATCH = "{}";

  // Variables for processing text
  var currentChar = "";
  var currentString = "";
  var variableMode = false;

  // Variables that contain the pieces after processing
  $scope.pieces = [];
  $scope.indVar = [];
  $scope.depVar = []; 
  $scope.consts = [];

  $scope.indVarDef = {};
  $scope.depVarDef = {};
  $scope.constDef = {};


  for (var i = 0, len = rawText.length; i < len; i++) {
    currentChar = rawText[i];
    if (variableMode) {
      currentString = currentString.concat(currentChar);
      var isEndVariable = MATH_END.indexOf(currentChar) > -1;
      if (isEndVariable) {
        $scope.pieces.push(currentString);
        var beginBracket = currentString[0];
        var endBracket = currentString[currentString.length-1];
        var brackets = beginBracket.concat(endBracket);
        if (brackets === IND_MATCH) {
          $scope.indVar.push(currentString);
        } else if (brackets === DEP_MATCH) {
          $scope.depVar.push(currentString);
        } else if (brackets === CONST_MATCH) {
          $scope.consts.push(currentString);
        } else {
          console.log("Error -- Bracket Mismatched.");
        }
        // Reset string 
        currentString = ""
        variableMode = false;
      } 
    } else {
      var isBeginVariable = MATH_BEGIN.indexOf(currentChar) > -1;
      if (isBeginVariable) {
        $scope.pieces.push(currentString);
        currentString = "";
        currentString = currentString.concat(currentChar);
        variableMode = true;
      } else {
        currentString = currentString.concat(currentChar);
        var isLastChar = (i === (len -1));
        if (isLastChar) {
          $scope.pieces.push(currentString);
        }
      }
    }
  }



  // Variables to display pieces, need to INIT object as null
  // List of names : {object definition} 

    for (var i = 0, len = $scope.indVar.length; i < len; i++)  {
    var currentObject = {
      "name": $scope.indVar[i],
      "object": {}
    };
    $scope.indVarDef[$scope.indVar[i]] = currentObject;
  }

  for (var j = 0, len = $scope.depVar.length; j < len; j++)  {
    var currentObject = {
      "name": $scope.depVar[j],
      "object": {}
    };
    $scope.depVarDef[$scope.depVar[j]] = currentObject;
  }

    for (var k = 0, len = $scope.consts.length; k < len; k++)  {
    var currentObject = {
      "name": $scope.consts[k],
      "object": {}
    };
    $scope.constDef[$scope.consts[k]] = currentObject;
  }


  // Show the variables
  $('#variableResults').show('slow');


};

$scope.loadForVariable = function(variableName, variableType) {
  var schemaSourceLink = "";
  var optionsSourceLink = "";
  var dataObject = {};

  
  if (variableType === "ind") {
    schemaSourceLink = "/form/independent_variable/schema.json";
    optionsSourceLink = "/form/independent_variable/options.json";
    dataObject = $scope.indVarDef[variableName];

  } else if (variableType == "dep") {
    schemaSourceLink = "/form/dependent_variable/schema.json";
    optionsSourceLink ="/form/independent_variable/options.json";
    dataObject = $scope.depVarDef[variableName];

  } else {
    schemaSourceLink = "/form/constants/schema.json";
    optionsSourceLink = "/form/constants/options.json";
    dataObject = $scope.constDef[variableName];
  }

  // Remove old form values before new forms 
  $("#defineVariables").alpaca("destroy");
  $scope.loadForm(dataObject, schemaSourceLink, optionsSourceLink, variableName, variableType);
  $('#defineVariables').show('slow');

};


$scope.loadForm = function (dataObject, schemaSourceLink, optionsSourceLink,
                            variableName, variableType) {
  $("#defineVariables").alpaca({
    "schemaSource": schemaSourceLink,
    "optionsSource": optionsSourceLink,
    "data": dataObject,
    "options": {
        "form": {
        "buttons": {
          "submit": {
              "title": "Serialize",
              "click": function() {
                  var value = this.getValue();
                  $scope.saveForm(value, variableName, variableType);
                  alert(JSON.stringify(value, null, "  "));
              }
          }
        }
      },
  },
});
};


$scope.saveForm = function(newData, variableName, variableType) {
  if (variableType === "ind") {
    $scope.indVarDef[variableName] = newData;
  } else if (variableType == "dep") {
    $scope.depVarDef[variableName] = newData;
  } else {
    $scope.constDef[variableName] = newData;
  }
};

}; 