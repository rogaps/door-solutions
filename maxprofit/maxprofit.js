/**
 * Max profit for buying and selling once
 * Usage: node maxprofit.js <input file>
 */
const fs = require('fs');

function maxProfit(prices) {
  let curMin = Infinity;
  let maxDiff = 0;
  for(let i = 0; i < prices.length; i++) {
    curMin = Math.min(curMin, prices[i]);
    maxDiff = Math.max(maxDiff, prices[i] - curMin);
  }
  return maxDiff;
}

function main() {
  const args = process.argv.slice(2);

  const inputFile = args[0];
  if(!inputFile) {
    process.stderr.write(`Usage: node ${__filename} <input file>\n`);
    process.exit(1);
  }
  const inputStr = fs.readFileSync(inputFile).toString('utf-8');

  const input = inputStr.split(' ').map(i => +i);
  const result = maxProfit(input);
  process.stdout.write(result + '\n');
}

 main();
