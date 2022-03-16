'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin)
{
    inputString += inputStdin;
});

process.stdin.on('end', function ()
{
    inputString = inputString.split('\n');

    main();
});

function readLine()
{
    return inputString[currentLine++];
}



/*
 * Complete the 'palindromeIndex' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function isPalindrome(s)
{
    return s === s.split("").reverse().join("");
}

function palindromeIndex(s)
{
    if (isPalindrome(s)) return -1;

    let i, j, aux;
    for (i = 0, j = s.length - 1; i < s.length && j >= 0; i++, j--) {
        if (s[i] === s[j]) continue
        aux = s.split("")
        aux.splice(i, 1)
        aux = aux.join("")

        if (isPalindrome(aux)) return i

        aux = s.split('')
        aux.splice(j, 1)
        aux = aux.join('')

        return isPalindrome(aux) ? j : -1
    }


}

function main()
{
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        const result = palindromeIndex(s);

        ws.write(result + '\n');
    }

    ws.end();
}
