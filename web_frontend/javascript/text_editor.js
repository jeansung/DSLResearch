var editor = new Quill('#editor-container', {});
var readyToRender = false;

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

  // Initialize ready to render as false
  readyToRender = false;


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
    optionsSourceLink ="/form/dependent_variable/options.json";
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
              "title": "Save",
              "click": function() {
                  var value = this.getValue();
                  $scope.saveForm(value, variableName, variableType);
                  //alert(JSON.stringify(value, null, " "));
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

  var isReady = $scope.checkReadyToRender();
  if (isReady) {
    $('#downloadHTML').show('slow');
  }
  
};

$scope.checkReadyToRender = function() {
  var minLength = 2;

  for (var i = 0, len = $scope.indVar.length; i < len; i++) {
    var itemIndex = $scope.indVar[i];
    var internalObject = $scope.indVarDef[itemIndex]
    var objectLength = Object.keys(internalObject).length;
    if (objectLength <= minLength) {
      // empty case
      return false;
    }
  }

  for (var j = 0, len = $scope.depVar.length; j < len; j++) {
    var itemIndex = $scope.depVar[j];
    var internalObject = $scope.depVarDef[itemIndex]
    var objectLength = Object.keys(internalObject).length;
    if (objectLength <= minLength) {
      // empty case
      return false;
    }
  }

  for (var k = 0, len = $scope.consts.length; k < len; k++) {
    var itemIndex = $scope.consts[k];
    var internalObject = $scope.constDef[itemIndex]
    var objectLength = Object.keys(internalObject).length;
    if (objectLength <= minLength) {
      // empty case
      return false;
    }
  }

  return true;
};

// Assemble the HTML option
$scope.renderHTMLOption = function () {

  var constructedBody = $scope.assembleHTMLPage();



  var result="";   
  //jQuery.ajaxSetup({async:false});  
  //$.get(").done(function(data) {result=data});
  $.ajax({
  url: "output_template.html",
  success: function(data) {result=data},
  dataType: "html",
  async: false,
  });
  console.log(result);

  var finalHTML = result.replace("${body}", constructedBody);



  var blob = new Blob([finalHTML], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "hello world.html");

};


$scope.assembleHTMLPage = function() {
  var data = {
    name: 'AbsurdJS',
    features: ['CSS preprocessor', 'HTML preprocessor', 'Organic CSS'],
    link: function() {
        return '<a href="http://absurdjs.com">' + this.name + '</a>';
    }
  }

  var absurd = Absurd();
  var html = absurd.morph("html").add({
      body: {
          h1: 'I\'m <% this.name %>!',
          section: {
              ul: [
                  '<% for(var i=0; i<this.features.length; i++) { %>',
                  { li: '<% this.features[i] %>' },
                  '<% } %>'
              ]
          },
          footer: 'Checkout my website at <% this.link() %>'
      }
  }).compile(function(err, html) {
      console.log(html);
  }, data);

  return html;
};
}; 