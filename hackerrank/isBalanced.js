'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'isBalanced' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */
function isBalanced(s) {
    if(s.length %2 ==1 || s.length==0){
        return 'NO';
    }
    let stack = [];
    let dict = {')':'(',']':'[','}':'{'}

    let orderCheck =(s) =>{
        let open = dict[s];
        let peek = stack[stack.length -1];
        if(open != peek){
            // console.log('Open',open, 'Peek',peek)
            return 'NO';
        } else {
            return stack.pop();
        }
    }
    for(let i = 0; i < s.length; i++) {
        if(s[i] == '(' || s[i] == '[' || s[i] == '{'){
            stack.push(s[i]);
        }
        if(s[i] == ')' || s[i] == ']' || s[i] == '}'){
            orderCheck(s[i])
            // stack.pop(s[i]);
        }
    }
    
    return stack.length ? "NO": "YES"
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const s = readLine();

        const result = isBalanced(s);

        ws.write(result + '\n');
    }

    ws.end();
}
