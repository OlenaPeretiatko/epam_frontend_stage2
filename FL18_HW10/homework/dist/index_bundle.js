/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./homework/js/functions.js":
/*!**********************************!*\
  !*** ./homework/js/functions.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hello": () => (/* binding */ hello)
/* harmony export */ });
function hello(){
    console.log("hello")
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./homework/js/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./homework/js/functions.js");


let players = ['Player 1', 'Player 2']
let startId = Math.floor(Math.random() * 2)
let whoSTurn = players[startId]
let text;
let allX = [], allO = []
let res = []

let changeTurn = () => {
    if (startId === 0) {
        startId = 1
    } else {
        startId = 0
    }
    return players[startId]
}
window.changeTurn = changeTurn;
$('#players').text(`It's ${whoSTurn}'s turn`)

let checkRes = (array) => {
    array.sort((a, b) => a - b)
    let diagonal1 = [1, 12, 23];
    let diagonal2 = [3, 12, 21];

    for (let i = 0; i < array.length - 1; i++) {
        if (Math.abs(array[i + 1] - array[i]) === 10 && Math.abs(array[i] - array[i - 1]) === 10) {
            res.push(array[i - 1], array[i], array[i + 1])
            res.map(x => $(`#td${x}`).addClass('vertical'));
        }
        if (Math.abs(array[i + 1] - array[i]) === 1 && Math.abs(array[i] - array[i - 1]) === 1) {
            res.push(array[i - 1], array[i], array[i + 1])
            res.map(x => $(`#td${x}`).addClass('horizontal'));
        } else {
            if (diagonal1.every(el => array.includes(el))) {
                res = diagonal1.map(x => $(`#td${x}`).addClass('diagonal1'));
            }
            if (diagonal2.every(el => array.includes(el))) {
                res = diagonal2.map(x => $(`#td${x}`).addClass('diagonal2'));
            }
        }
    }
    return res;
}
window.checkRes = checkRes;

let winner, score1 = 0, score2 = 0;
let clickedCell = (id) => {
    (0,_functions__WEBPACK_IMPORTED_MODULE_0__.hello)()
    if ($(`#${id}`).text().length === 0 && res.length === 0) {
        if (startId === 0) {
            text = 'X'
            allX.push(parseInt(id.split('td')[1]))
        } else {
            text = 'O'
            allO.push(parseInt(id.split('td')[1]))
        }
        $(`#${id}`).text(text)
        whoSTurn = changeTurn()
        $('#players').text(`It's ${whoSTurn}'s turn`)
    }
    if ((allX.length >= 3 || allO.length >= 3) && res.length === 0) {
        checkRes(allX)
        checkRes(allO)
    }

    if ((allX.length >= 5 || allO.length >= 5) && res.length === 0) {
        score1 += 1
        score2 += 1
        $('#players').text(`Draw!`)
    }
    if (res.length !== 0 && document.getElementById('winner').innerText === '') {
        if (text === 'X') {
            winner = players[0]
            score1 += 1
        }
        if (text === 'O') {
            winner = players[1]
            score2 += 1
        }
        $('#players').text(``)
        $('#winner').text(`${winner} won!`)
        $('#score').text(`Player 1: ${score1}, Player 2: ${score2}`)
    }
}
window.clickedCell = clickedCell;

let startNewGame = () => {
    allX = []
    allO = []
    res = [];
    $('#players').text(`It's ${whoSTurn}'s turn`)
    for (let el of $('td')) {
        el.textContent = ''
        el.className = ''
    }
    $('#winner').text(``)
}
window.startNewGame = startNewGame;

let clickToClear = () => {
    score1 = 0
    score2 = 0;
    startNewGame()
    $('#score').text(``)
}
window.clickToClear = clickToClear;

})();

/******/ })()
;
//# sourceMappingURL=index_bundle.js.map