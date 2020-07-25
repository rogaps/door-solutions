/**
 * Generate a string with unique characters by first occurence
 * and a string with unique characters by lexicographical order
 * Usage: node dedupestring.js <input file>
 */
const fs = require('fs');

function dedupeFirstOccurence(str) {
  const seen = new Set();
  let result = ''
  for(let i = 0; i < str.length; i++) {
    if(!seen.has(str[i])) {
      result += str[i];
      seen.add(str[i]);
    }
  }
  return result;
}

function dedupeLexOrdered(str) {
  var lastPosition = {};
  var seen = new Set();
  var resultStack = [];

  for(var i = 0; i < str.length; i++) {
    lastPosition[str[i]] = i;
  }

  for(var i = 0; i < str.length; i++) {
    if(!seen.has(str[i])) {
      while(resultStack[resultStack.length - 1] > str[i] && lastPosition[resultStack[resultStack.length - 1]] > i) {
        seen.delete(resultStack.pop());
      }
      resultStack.push(str[i]);
      seen.add(str[i]);
    }
  }

  return resultStack.join("");
}

function dedupeFirstAndLexOrdered(str) {
  const results = [];
  results[0] = dedupeFirstOccurence(str);
  results[1] = dedupeLexOrdered(str);
  return results;
}

function main() {
  const args = process.argv.slice(2);

  const inputFile = args[0];
  if(!inputFile) {
    process.stderr.write(`Usage: node ${__filename} <input file>\n`);
    process.exit(1);
  }
  const inputStr = fs.readFileSync(inputFile).toString('utf-8');

  const results = dedupeFirstAndLexOrdered(inputStr.trim());
  results.forEach(result => {
    process.stdout.write(result + '\n');
  })
}

 main();
