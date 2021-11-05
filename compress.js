const fs = require('fs');
const fspath = require('path');

const positions = {
  "000" : 0,
  "001" : 2,
  "010" : 3,
  "100" : 4,
  "011" : 5,
  "101" : 6,
  "110" : 7,
  "111" : 9
};

const associations = {
  0 : "a",
  2 : "b",
  3 : "c",
  4 : "d",
  5 : "e",
  6 : "f",
  7 : "g",
  9 : "h"
};

function checkPosition(char,chunk) {
  let position = "";
  chunk.split("").forEach(c => position += c == char ? "1" : "0");
  if (position.length < 3) {
    for (i=position.length;i<3;i++) {
      position += "0";
    }
  }
  return positions[position];
}

const target = fs.readFileSync(fspath.join(__dirname, 'sample.txt'),'utf8');

let characters = [];
for (i=0;i<target.length;i++) {
  if (characters.indexOf(target[i]) < 0) {
    characters.push(target[i]);
  }
}
characters.sort();

const chunks = target.match(/.{1,3}/g);

const table = [];

chunks.forEach(chunk => {
  const column = [];
  characters.forEach((char, index) => {
    if ((index + 1) != characters.length) column.push(checkPosition(char,chunk));
  });
  table.push(column);
});

table.forEach(column => {
  let sum = 0;
  column.forEach((item, index) => {
    sum += item;
    if (sum == 9) {
      column.splice(index+1,column.length);
    }
  });
});

let string = table.toString().replace(/\,/g,"");

for (let [key, value] of Object.entries(associations)) {
  let re = new RegExp(key,"g");
  string = string.replace(re,value);
}

console.log(string);
console.log(target.length);
console.log(string.length)