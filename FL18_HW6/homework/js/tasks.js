// 1.
function getMaxEvenElement(arr){
    let res = arr.map(Number).filter(el => el%2 === 0);
    return Math.max.apply(null, res);
}

// 2.
let a = 3;
let b = 5;

[a, b] = [b, a];

// 3.
const getValue = (value) => {
        return value ?? '-';
}
// 4.
function getObjFromArray(array){
    return Object.fromEntries(array);
}
// 5.
function addUniqueId(originalObj){
    let newObj = Object.assign({}, originalObj);
    newObj.id = Symbol();
    return newObj;
}

// 6.
function getRegroupedObject(objOld){
    let {name: name, details: {id: id, age: age, university: univ}} = objOld;
    return {university: univ, user: {age: age, firstName: name, id: id}};
}

// 7.
function getArrayWithUniqueElements(array){
    return Array.from(new Set(array))

}
// 8.
function hideNumber(number){
    return number.slice(-4).padStart(number.slice(0, -4).length+4, '*');
}

// 9.
function required(param) {
    throw new Error(`${param} is required. `);
}

function add(a = required('a'), b = required('b')){
    return a+b
}
// 10.
function* generateIterableSequence() {
    yield 'I';
    yield 'love';
    yield 'EPAM';
}
const generatorObject = generateIterableSequence()
for (let value of generatorObject){
    console.log(value)
}
