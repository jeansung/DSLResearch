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

  console.log("pieces at the end of creation: ", $scope.pieces);



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
  console.log("About to render the form!");
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
              }
          }
        }
      },
  },
});
};


$scope.saveForm = function(newData, variableName, variableType) {
  console.log("pieces when I am saving the form: ", $scope.pieces);
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
  //console.log(result);

  var finalHTML = result.replace("${body}", constructedBody);



  var blob = new Blob([finalHTML], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "hello world.html");

};


$scope.assembleHTMLPage = function() {

  // use the indVardef
  // use the depVarDef
  // use the consts def 

  console.log("ind", $scope.indVarDef);
  console.log("dep", $scope.depVarDef);
  console.log("consts", $scope.constDef);

  console.log("Right before rendering.", $scope.pieces);
  console.log($scope.indVar);


  var data = {
    name: 'Sample page!',
    pieces: $scope.pieces,
    indList: $scope.indVar, 
    indDef: $scope.indVarDef, 
    depList: $scope.depVar,
    depDef: $scope.depVarDef,
    constList: $scope.consts,
    constDef: $scope.constDef,

    createTKAdjustableNumber: function(currentDef) {
      return '<span ' +
              'data-var='    + '\"' + currentDef['data-var'] + '\"' +
              ' class= \"TKAdjustableNumber\"'               +
              ' data-min='   + '\"' + currentDef['data-min'] + '\"' +
              ' data-max='   + '\"' + currentDef['data-max'] + '\"' +
              ' data-step='  + '\"' + currentDef['data-step'] + '\"' +
              ' data-format='+ '\"' + currentDef['data-format'] + '\"' +
              ' ></span>';
    },

    createTKToggleSwitch: function(currentDef) {
      var starterString = "<span "+
      " data-var=" + "\"" + currentDef['data-var'] + '\"' + 
      ' class=\"TKToggle TKSwitch\"';
      var textOptionsString = currentDef['data-values'];
      var textOptionsArray = textOptionsString.split("//");
      var optionsString = "";
      for (var i = 0; i < textOptionsArray.length; i++) {
        var currentTextOption = "<span> " + textOptionsArray[i] + "</span>";
        optionsString = optionsString.concat(currentTextOption);
      }
      var endString = "</span>";
      return starterString.concat(optionsString, endString);
    },

    createTKSwitchPositiveNegative: function(currentDef) {
      return "<span " +
      "data-var=" + "\"" + currentDef['data-var'] + '\"' + 
      'class= \"TKSwitchPositiveNegative\"' +
      ">" + 
      "<span> " + currentDef['positive'] + '</span>' + 
      "<span> " + currentDef['negative'] + '</span>' +
      "</span>"; 
    },

    createTKSwitch: function(currentDef) {
      // TODO: Add recursive support 
      var starterString = "<span " +
      "data-var=" + '\"' + currentDef['data-var'] + '\"' +
      'class= \"TKSwitch\"' +
      ">";
      var textOptionsArray = currentDef['options'].split("//");
      var optionsString = "";
      for (var i = 0; i < textOptionsArray.length; i++) {
        var currentTextOption = "<span> " + textOptionsArray[i] + "</span>";
        optionsString = optionsString.concat(currentTextOption);
      }

      var endString = "</span>";
      return starterString.concat(optionsString, endString);
    },

    createOther: function(currentDef) {
      return '<span ' +
              ' data-var='    + '\"' + currentDef['data-var']   + '\"' +
              ' data-format=' + '\"' + currentDef['data-format']+ '\"' +
              ' ></span>';
    }, 

    parsePieces: function(pieces) {
      var endStringArray = [];
      for (var i=0; i < this.pieces.length; i++) {
        console.log(endStringArray);
        var item = this.pieces[i];
        var lastIndex = item.length;
        var varString = item.substring(1, lastIndex-1);
        console.log("varString:", varString);
        if (this.indList.indexOf(item) >=0) {
          var currentDef = this.indDef[item];
          console.log("Current def: ", currentDef);
          if (currentDef.class === "TKAdjustableNumber") {
            var spanTag = this.createTKAdjustableNumber(currentDef);
            endStringArray.push(spanTag);
          } else if (currentDef.class === "TKToggle TKSwitch") {
            endStringArray.push(this.createTKToggleSwitch(currentDef));
          }
        } else if (this.depList.indexOf(item) >=0) {
          var currentDef = this.depDef[item];
          console.log("Current def: ", currentDef);
          if (currentDef.class === "TKSwitch") {
            endStringArray.push(this.createTKSwitch(currentDef));
          } else if (currentDef.class === "TKSwitchPositiveNegative") {
            endStringArray.push(this.createTKSwitchPositiveNegative(currentDef));
          } else if (currentDef.class === "NULL") {
            endStringArray.push(this.createOther(currentDef));
          } 
        } else if (this.constList.indexOf(item) >=0) {
          endStringArray.push(this.createOther(currentDef));
        } else {
          endStringArray.push(item);
        }
      }

      return endStringArray.join(""); 
    }
  }
  var absurd = Absurd();
  var html = absurd.morph("html").add({
      body: {
          p: "<% this.parsePieces(this.pieces) %>"
      }
  }).compile(function(err, html) {
      console.log("Error: ", err);
      console.log("HTML: ", html);
  }, data);
  return html;
};
}; 