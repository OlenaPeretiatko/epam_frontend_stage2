let options = ['Rock', 'Paper', 'Scissors'];
let personChoice, programChoice, text, win;
let personRes = 0, programRes = 0;
let round = 1;
let result = document.getElementById('result');
let game = document.getElementById('game');

reset = () => {
    personRes = 0, programRes = 0;
    round = 1
    document.getElementById('game').innerHTML = '';
    document.getElementById('result').innerHTML = '';
}

countRes = (word) => {
    if (text.indexOf(word) === 0) {
        win = "You've WON!"
        personRes += 1;
    } else {
        win = "You've LOST!"
        programRes += 1;
    }
}

res = (a, b) => {
    return a > b ? "you are winner" : 'program is winner';
}


clickBtn = (id) => {
    if (personRes === 3 || programRes === 3) {
        result.innerText = (res(personRes, programRes))
    } else {
        let p = document.createElement('p');
        let random = Math.floor(Math.random() * 3);
        programChoice = options[random];
        personChoice = document.getElementById(id).textContent;

        text = `${personChoice} vs. ${programChoice}`

        if (text.includes('Paper') && text.includes('Rock')) {
            countRes('Paper')
        } else if (text.includes('Scissors') && text.includes('Paper')) {
            countRes('Scissors')
        } else if (text.includes('Rock') && text.includes('Scissors')) {
            countRes('Rock')
        } else {
            win = "nichya"
        }
        p.append(`Round ${round}, ${text}, ${win}`);
        game.append(p)
        round += 1;
    }
}

