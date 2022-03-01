/**
 * CommonJS modules exports example
 */

const myCalc = {
  sum(a, b) {
    return a + b;
  }
}

module.exports = myCalc;

/**
 * Alternative exports
 */

// module.exports = {
//   myCalc
// };

// or export it within additonal property
// module.exports.myCalc = myCalc;