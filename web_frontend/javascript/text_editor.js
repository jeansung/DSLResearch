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
  var pieces = [];
  var indVar = [];
  var depVar = [];
  var consts = [];

  for (var i = 0, len = rawText.length; i < len; i++) {
    currentChar = rawText[i];
    if (variableMode) {
      currentString = currentString.concat(currentChar);
      var isEndVariable = MATH_END.indexOf(currentChar) > -1;
      if (isEndVariable) {
        pieces.push(currentString);
        var beginBracket = currentString[0];
        var endBracket = currentString[currentString.length-1];
        var brackets = beginBracket.concat(endBracket);
        if (brackets === IND_MATCH) {
          indVar.push(currentString);
        } else if (brackets === DEP_MATCH) {
          depVar.push(currentString);
        } else if (brackets === CONST_MATCH) {
          consts.push(currentString);
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
        pieces.push(currentString);
        currentString = "";
        currentString = currentString.concat(currentChar);
        variableMode = true;
      } else {
        currentString = currentString.concat(currentChar);
        var isLastChar = (i === (len -1));
        if (isLastChar) {
          pieces.push(currentString);
        }
      }
    }
  }

  console.log("pieces: ", pieces);
  console.log("ind var list: ", indVar);
  console.log("dep var list: ", depVar);
  console.log("consts list: ",consts);

  // Variables to display pieces, need to INIT object as null 
  $scope.piecesList = pieces;
  $scope.indVarList = indVar;
  $scope.depVarList = depVar;
  $scope.constsList = consts;

  // Show the variables
  $('#variableResults').show('slow');


};
}; 