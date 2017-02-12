/*jshint esversion: 6, node: true*/
'use strict';

const Index = require('../index');
const assert = require('assert');

function testSolution(input) {

    const result = [];

    Index.init((ans) => result.push(ans), () => input.shift());
    Index.solution();

    return result;
}

describe('Solution', function() {

    describe('program', function() {

        [{
                input: ['0 0 100',
                    '1.264 -1.109 100',
                    '1.264 -1.109 10',
                    '1.264 -1.109 1',
                    '-2.914 -1.783 200',
                    '0.124 0.369 200'
                ],
                result: ['Case 1: IN',
                    'Case 2: OUT',
                    'Case 3: OUT',
                    'Case 4: IN',
                    'Case 5: OUT',
                    'Case 6: IN'
                ]
            },
            {
                input: ['1000 -987 0'],
                result: ['Case 1: IN']
            }
        ].forEach((testCase) => {

            it('should solve for ' + testCase.input, function() {

                // Arrange
                const input = testCase.input;

                // Act
                const result = testSolution(input);

                // Assert
                assert.deepEqual(result, testCase.result);
            });

        })
    });
});
