const getBigestNumber = (...args) => {
    for (let el of args) {
        if (typeof el !== 'number') {
            throw 'Wrong argument type';
        }
    }
    if (args.length < 3) {
        throw 'Not enough arguments'
    }
    if (args.length > 10) {
        throw 'Too many arguments'
    } else {
        return Math.max.apply(null, args)
    }
}
module.exports = {getBigestNumber}