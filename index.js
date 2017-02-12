/*jshint esversion: 6, node: true*/
'use strict';

// put your solution in this method
function solution(toPrint, toRead) {

    let testCase = undefined;
    let testCaseNo = 0;
    let answerFound = false;

    while (testCase = readline()) {

        testCaseNo++;
        answerFound = false;
        const input = testCase.split(' ');
        const x = parseFloat(input[0]);
        const y = parseFloat(input[1]);
        const r = parseInt(input[2]);

        log(`Parsed input x: ${x} y: ${y} r:${r}`);

        let z = new imaginary(0, 0);
        const c = new imaginary(x, y);

        if(c === 0) {
          print(`Case ${testCaseNo}: IN`);
          break;
        }

        for (let i = 0; i < r; i++) {
            // z_(n+1) = z_n^2 + c
            z = z.pow().add(c);

            if (z.mod() > 2) {
                print(`Case ${testCaseNo}: OUT`);
                answerFound = true;
                break;
            }
        }

        if (!answerFound) {
            print(`Case ${testCaseNo}: IN`);
        }
    }
}

class imaginary {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(a) {
        return new imaginary(this.x + a.x, this.y + a.y);
    }

    pow() {
        return new imaginary(this.x * this.x - this.y * this.y, 2 * this.x * this.y);
    }

    mod() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}



// run solution without any params for kattis
if (typeof process === 'undefined' || process.release.name !== 'node') {

    solution();
}

// node js internals below -----------------------------------------------------

function init(toPrint, toRead) {

    // replace global functions with ones for node or tests
    // kattis is using 'print' and 'readline' for standard I/O
    if (typeof global !== 'undefined') {
        global.print = toPrint;
        global.readline = toRead;
    }
}

// interactive mode - input from command line
if (typeof process !== 'undefined' && process.argv[2] === 'i') {

    const Readline = require('readline');
    const input = [];

    const inputProcessor = Readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    inputProcessor.on('line', (line) => {

        input.push(line);

        if (!line) {
            inputProcessor.close();
        }
    });

    inputProcessor.on('close', () => {

        init(console.log, () => input.shift());

        solution();
    });
}

// input from process params
if (typeof process !== 'undefined' && process.argv[2] && process.argv[2] !== 'i') {

    const input = process.argv[2].split('\n');
    init(console.log, () => input.shift());

    solution();
}

function log() {

    if (typeof process !== 'undefined' && process.release.name === 'node') {
        console.log.call(this, ...arguments);
    }
}

if (typeof module !== 'undefined') {
    module.exports.solution = solution;
    module.exports.init = init;
}
