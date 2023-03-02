import { readFileSync } from 'fs';
import { search } from 'jmespath';
import { R } from './src/vendor/deno.land/x/ahh@v0.11.0/mod';
import readline from 'readline';

const args = process.argv;
const jsonPath = args[2];

if (!jsonPath) {
  console.error('Please provide a file to parse');
  process.exit(1);
}

const file = readFileSync(jsonPath).toString();
const json = R.fn(() => JSON.parse(file) as object);

if (R.isErr(json)) {
  console.error(json);
  process.exit(1);
}

// create a readline-sync instant feedback REPL (the user doesn't need to press enter)
const repl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

function question() {
  repl.question('jmespath> ', replCallback);
}

// create a function that will be called every time the user types something
const replCallback = (query: string) => {
  const result = R.fn(() => search(json, query));

  if (R.isErr(result)) {
    console.error('Invalid query');
    question();
    return;
  }

  console.log(result);
  question();
};

// start the REPL
console.clear();
question();
