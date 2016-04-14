var myFunc = "function clickAction() { var value = this.getValue(); console.log(value); alert(JSON.stringify(value, null, "''"));}";
console.log("abcd");
$(document).ready(function() {
    console.log("abcd");
    var data = new Object();
    data.func = myFunc;
    var jsonVal = $.toJSON(data);
    var newObj = $.evalJSON(jsonVal);
    eval(newObj.func);
    clickAction();
});​