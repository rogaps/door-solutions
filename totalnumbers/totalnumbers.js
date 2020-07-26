/**
 * Find total numbers with 6 divisors which is not greater than n
 * Usage: node totalnumbers.js <n>
 */

function sieve(primes, sqrtNum) {
  primes[1] = false;
  for (let i = 2; i * i <= sqrtNum; i++) {
    if(primes[i]) {
      for (let j = 2; j * i <= sqrtNum; j++) {
        primes[i*j] = false;
      }
    }
  }
}

function nDivisors(primes, sqrtNum, num, numOfDivisors) {
  let result = 0;
  const v = [];
  for (let i = 2; i <= sqrtNum; i++) {
    if (primes[i] == true) {
      v.push(i);
    }
  }

  for (let i = 1; i <= num; i++) {
    let temp = i;
    let total = 1;
    let j = 0;

    for (let k = v[j]; k * k <= temp; k = v[++j]) {
      let count = 0;
      while(temp % k == 0) {
        count++;
        temp = temp / k;
      }
      total = total * (count + 1);
    }

    if (temp != 1) {
      total = total * 2;
    }

    if (total == numOfDivisors) {
      result++;
    }
  }
  return result;
}

function countNDivisors(num, numOfDivisors) {
  let sqrtNum = Math.sqrt(num) + 1;

  const primes = Array(Math.floor(sqrtNum)).fill(true);
  sieve(primes, sqrtNum)
  return nDivisors(primes, sqrtNum, num, numOfDivisors);
}

function main() {
  const args = process.argv.slice(2);

  const n = args[0];
  if(!n) {
    process.stderr.write(`Usage: node ${__filename} <n>\n`);
    process.exit(1);
  }

  const result = countNDivisors(parseInt(n), 6);
  process.stdout.write(result + '\n');
}

 main();
