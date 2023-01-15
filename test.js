let string = "Showing 1 to 59 of 59 entries";
let start = string.indexOf("to") + 3; // add 3 to skip the word "to"
let end = string.indexOf("of");
let substring = parseInt(string.substring(start, end));
console.log(substring);
