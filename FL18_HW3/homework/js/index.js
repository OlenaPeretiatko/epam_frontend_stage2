'use strict';

/**
 * Class
 * @constructor
 * @param size - size of pizza
 * @param type - type of pizza
 * @throws {PizzaException} - in case of improper use
 */
function Pizza(size, type) {
    if (arguments.length !== 2) {
        throw new PizzaException(`Required two arguments, given: ${arguments.length}`);
    }
    if (Pizza.allowedSizes.includes(size) === false || Pizza.allowedTypes.includes(type) === false) {
        throw new PizzaException(`Invalid type`);
    }
    this.size = size;
    this.type = type;
    this.ingradients = [];

    this.getSize = () => {
        return this.size.size;
    }
    this.addExtraIngredient = (extra) => {
        if (this.ingradients.includes(extra.extra)) {
            throw new PizzaException(`Duplicate ingredient`);
        }
        if (Pizza.allowedExtraIngredients.includes(extra) === false) {
            throw new PizzaException(`Invalid ingredient`);
        }
        this.type.price += extra.price;
        this.ingradients.push(extra.extra);
        return (extra.price);

    }
    this.removeExtraIngredient = (extra) => {
        this.type.price -= extra.price;
        for (let el of this.ingradients) {
            if (el === extra.extra) {
                this.ingradients.splice(this.ingradients.indexOf(el), 1);
            }
        }
        return (extra.price);
    }
    this.getExtraIngredients = () => {
        return this.ingradients;
    }
    this.getPrice = () => {
        return (this.size.price + this.type.price);
    }
    this.getPizzaInfo = () => {
        return (`Size: ${this.getSize()}, type: ${this.type.type}; extra ingredients: ${this.ingradients}; price: ${this.getPrice()}UAH.`)
    }
}

/* Sizes, types and extra ingredients */
Pizza.SIZE_S = {size: 'SMALL', price: 50};
Pizza.SIZE_M = {size: 'MEDIUM', price: 75};
Pizza.SIZE_L = {size: 'LARGE', price: 100};

Pizza.TYPE_VEGGIE = {type: 'VEGGIE', price: 50};
Pizza.TYPE_MARGHERITA = {type: 'MARGHERITA', price: 60};
Pizza.TYPE_PEPPERONI = {type: 'PEPPERONI', price: 70};

Pizza.EXTRA_TOMATOES = {extra: 'TOMATOES', price: 5};
Pizza.EXTRA_CHEESE = {extra: 'CHEESE', price: 7};
Pizza.EXTRA_MEAT = {extra: 'MEET', price: 9};

/* Allowed properties */
Pizza.allowedSizes = [Pizza.SIZE_S, Pizza.SIZE_M, Pizza.SIZE_L];
Pizza.allowedTypes = [Pizza.TYPE_VEGGIE, Pizza.TYPE_MARGHERITA, Pizza.TYPE_PEPPERONI]
Pizza.allowedExtraIngredients = [Pizza.EXTRA_TOMATOES, Pizza.EXTRA_CHEESE, Pizza.EXTRA_MEAT];


/**
 * Provides information about an error while working with a pizza.
 * details are stored in the log property.
 * @constructor
 */
function PizzaException(log) {
    this.log = log;
    return this.log;
}


/* It should work */
// small pizza, type: veggie
// let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// // add extra meat
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT);
// // check price
// console.log(`Price: ${pizza.getPrice()} UAH`); //=> Price: 109 UAH
// // add extra corn
// pizza.addExtraIngredient(Pizza.EXTRA_CHEESE);
// // add extra corn
// pizza.addExtraIngredient(Pizza.EXTRA_TOMATOES);
// // check price
// console.log(`Price with extra ingredients: ${pizza.getPrice()} UAH`); // Price: 121 UAH
// // check pizza size
// console.log(`Is pizza large: ${pizza.getSize() === Pizza.SIZE_L}`); //=> Is pizza large: false
// // remove extra ingredient
// pizza.removeExtraIngredient(Pizza.EXTRA_CHEESE);
// console.log(`Extra ingredients: ${pizza.getExtraIngredients().length}`); //=> Extra ingredients: 2
// console.log(pizza.getPizzaInfo()); //=> Size: SMALL, type: VEGGIE; extra ingredients: MEAT,TOMATOES; price: 114UAH.
//
//

// // examples of errors
// let pizza = new Pizza(Pizza.SIZE_S); // => Required two arguments, given: 1
//
// let pizza = new Pizza(Pizza.SIZE_S, Pizza.SIZE_S); // => Invalid type
// //
// let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT);
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT); // => Duplicate ingredient
// let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// pizza.addExtraIngredient(Pizza.SIZE_S); // => Invalid ingredient
