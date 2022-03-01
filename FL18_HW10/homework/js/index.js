let players = ['Player 1', 'Player 2']
let startId = Math.floor(Math.random() * 2)
let whoSTurn = players[startId]
let text;
let allX = [], allO = []
let res = [], myClass = ''

let changeTurn = () => {
    if (startId === 0) {
        startId = 1
    } else {
        startId = 0
    }
    return players[startId]
}
window.changeTurn = changeTurn;
document.getElementById('players').innerText = `It's ${whoSTurn}'s turn`

let checkRes = (array) => {
    array.sort((a, b) => a - b)
    let diagonal1 = [1, 12, 23];
    let diagonal2 = [3, 12, 21];

    for (let i = 0; i < array.length - 1; i++) {
        if (Math.abs(array[i + 1] - array[i]) === 10 && Math.abs(array[i] - array[i - 1]) === 10) {
            res.push(array[i - 1], array[i], array[i + 1])
            myClass = 'vertical'
        }
        if (Math.abs(array[i + 1] - array[i]) === 1 && Math.abs(array[i] - array[i - 1]) === 1) {
            res.push(array[i - 1], array[i], array[i + 1])
            myClass = 'horizontal'
        } else {
            if (diagonal1.every(el => array.includes(el))) {
                res = diagonal1
                myClass = 'diagonal1';
            }
            if (diagonal2.every(el => array.includes(el))) {
                res = diagonal2
                myClass = 'diagonal2';
            }
        }
    }
    for (let el of res ){
        document.getElementById(`td${el}`).className = myClass
    }
    return res;
}
window.checkRes = checkRes;

let winner, score1 = 0, score2 = 0;
let clickedCell = (id) => {
    console.log(document.getElementById(`${id}`))
    if (document.getElementById(`${id}`).innerText.length === 0 && res.length === 0) {
        if (startId === 0) {
            text = 'X'
            allX.push(parseInt(id.split('td')[1]))
        } else {
            text = 'O'
            allO.push(parseInt(id.split('td')[1]))
        }
        document.getElementById(`${id}`).innerText = text
        whoSTurn = changeTurn()
        document.getElementById('players').innerText = `It's ${whoSTurn}'s turn`
    }
    if ((allX.length >= 3 || allO.length >= 3) && res.length === 0) {
        checkRes(allX)
        checkRes(allO)
    }

    if ((allX.length >= 5 || allO.length >= 5) && res.length === 0) {
        score1 += 1
        score2 += 1
        document.getElementById('players').innerText = `Draw!`
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
        document.getElementById('players').innerText = ``
        document.getElementById('winner').innerText = `${winner} won!`
        document.getElementById('score').innerText = `Player 1: ${score1}, Player 2: ${score2}`
    }
}
window.clickedCell = clickedCell;

let startNewGame = () => {
    allX = []
    allO = []
    res = [];
    document.getElementById('players').innerText = `It's ${whoSTurn}'s turn`
    for (let el of document.getElementsByTagName('td')) {
        el.textContent = ''
        el.className = ''
    }
    document.getElementById('winner').innerText = ``
    document.getElementById('score').innerText = `Player 1: ${score1}, Player 2: ${score2}`
}
window.startNewGame = startNewGame;

let clickToClear = () => {
    score1 = 0
    score2 = 0;
    startNewGame()
    document.getElementById('score').innerText = ``
}
window.clickToClear = clickToClear;