const {getBigestNumber} = require('../src/get-bigest-number');

describe('Get Biggest Number', function() {
    it('result should accept no less than 2 arguments', function() {
        expect(() => {
            getBigestNumber(1);
        }).toThrow('Not enough arguments');
    })
    it('result should accept no more than 10 arguments', function() {
        expect(() => {
            getBigestNumber(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
        }).toThrow('Too many arguments');
    })
    it('result should accept no more than 10 arguments', function() {
        expect(() => {
            getBigestNumber(1, 2, 3, 4, 'k');
        }).toThrow('Wrong argument type');
    })
    it('result should be correct', function() {
        const res1 = getBigestNumber(1, 2, 3);
        const res2 = getBigestNumber(-1, -2, -3, -7);
        const res3 = getBigestNumber(1, 2, 3, 4, 5, 6);
        expect(res1).toBe(3);
        expect(res2).toBe(-1);
        expect(res3).toBe(6);
    })
    });

