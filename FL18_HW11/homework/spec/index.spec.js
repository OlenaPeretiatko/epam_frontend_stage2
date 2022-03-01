/**
 * To import any module use require('./relative path to the module') function
 */

// import module `module.exports = myCalc;`
const myLocalVariable1 = require('../src/index');

// import module `module.exports.someProperty = myCalc;`
// const myLocalVariable2 = require('./../src/index');

describe('CommonJS modules', () => {
  it('should import whole module using module.exports = myCalc;', async () => {
    const result = myLocalVariable1.sum(1, 2);
    expect(result).toBe(3);
  });

  // it('should import whole module in additional property using module.exports.myCalc = myCalc;', () => {
  //   const result = myLocalVariable2.myCalc.sum(2, 2);
  //   expect(result).toBe(4);
  // });
});
