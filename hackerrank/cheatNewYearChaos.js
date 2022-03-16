'use strict';

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
 * Complete the 'minimumBribes' function below.
 *
 * The function accepts INTEGER_ARRAY q as parameter.
 */

function minimumBribes(q) {
    // Write your code here
    let totalSwaps = 0, tooChaotic=false
    
    for(let i=0; i<q.length;i++){
        if(tooChaotic)break;
        let bribes = q[i]-(i+1);
        let maxSwaps = q[i]-2>0?q[i]-2:0;
        if(bribes>2)
            tooChaotic = true;
        
        for(let j = maxSwaps;j<i;j++){
            if(q[j]>q[i])totalSwaps++;
        }
    }
    
    console.log(tooChaotic?"Too chaotic":totalSwaps)

}

function main() {
    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const q = readLine().replace(/\s+$/g, '').split(' ').map(qTemp => parseInt(qTemp, 10));

        minimumBribes(q);
    }
}
