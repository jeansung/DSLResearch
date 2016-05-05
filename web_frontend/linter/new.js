'<% for (var i=0; i \< this.pieces.length; i++) { %>' + 
'<% var item = pieces[i]; %>' + 
'<% var lastIndex = item.length; %>' + 
'<% var varString = item.substring(1, lastIndex-1); %>' + 
'<% if (indList.indexOf(item) \>=0) { %>' + 
'<% var currentDef = indDef[varString]; %>' + 
'<% if (currentDef["class"] === "TKAdjustableNumber") { %>' + 
'<% this.createTKAdjustableNumber(currentDef) %>' + 
'<% } %>' + 
'<% } %>' + 
'<% else { %>' + 
'<% item %>' + 
'<% } %>' + 
'<% } %>'
