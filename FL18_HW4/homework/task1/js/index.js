let i = 0, j = 0;
let input = `<input type="text">`;
let buttonEdit;
let buttonDelete;
const spinner = document.getElementById('spinner');

function loadDoc() {
    spinner.removeAttribute('hidden');
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            spinner.setAttribute('hidden', '');
            let output = '';
            for (let user in users) {
                buttonDelete = `<button id= buttonDelete${i + 1} onclick="makeDELETErequest(this.id)">DELETE</button>`;
                output += `<div id=user${i + 1}>`;
                output += `<p> User ${parseInt(user) + 1} ${buttonDelete}</p>`;
                for (let el1 in users[user]) {
                    if (typeof users[user][el1] === 'object') {
                        for (let el2 in users[user][el1]) {
                            if (typeof users[user][el1][el2] === 'object') {
                                for (let el3 in users[user][el1][el2]) {
                                    buttonEdit = `<button id= buttonEdit${j + 1} 
                                                  onclick="btnClick(${i}, this.id)">EDIT</button>`
                                    output += `<li id=li${j += 1}><span id=span${j}>${el1} 
                                               ${el2} ${el3}: ${users[user][el1][el2][el3]} </span> ${buttonEdit}</li>`;
                                }
                            } else {
                                buttonEdit = `<button id= buttonEdit${j + 1} onclick="btnClick(${i}, this.id)">
                                              EDIT</button>`
                                output += `<li id=li${j += 1}> <span id=span${j}>${el1} ${el2}: 
                                           ${users[user][el1][el2]} </span> ${buttonEdit}</li>`;
                            }
                        }
                    } else {
                        buttonEdit = `<button id= buttonEdit${j + 1} onclick="btnClick(${i}, this.id)">EDIT</button>`
                        output += `<li id=li${j += 1}> <span id=span${j}>${el1}: ${users[user][el1]} 
                                   </span> ${buttonEdit}</li>`;
                    }
                }
                output += `</div>`;
                i++
            }
            document.getElementById('demo').innerHTML += output;
        });
}


let sendEdit = document.createElement('button');
sendEdit.innerHTML = 'Send edit';

function btnClick(userId, id) {
    let btn = document.getElementById(`${id}`);
    let input = document.createElement('input');
    let simpleId = id.split('buttonEdit')[1];
    sendEdit.id = `sendEdit${simpleId}`;
    input.id = `input${simpleId}`;
    input.innerHTML = btn.innerHTML;
    btn.parentNode.insertBefore(sendEdit, btn.nextSibling);
    btn.parentNode.insertBefore(input, btn);
    btn.parentNode.removeChild(btn);

    fetch(`https://jsonplaceholder.typicode.com/users/${userId + 1}`)
        .then((response) => {
            return response.json();
        })
        .then((myUser) => {
            document.getElementById(sendEdit.id).onclick = function makePUTrequest() {
                let key = document.getElementById(`span${simpleId}`).textContent.split(':')[0];
                let newVal = document.getElementById(input.id).value;
                let keySplit = key.split(' ');

                if (keySplit.length === 1) {
                    document.getElementById(`span${simpleId}`).innerText = key + ': ' + newVal;
                    myUser[key] = newVal;
                } else if (keySplit.length === 2) {
                    document.getElementById(`span${simpleId}`).innerText =
                        keySplit[0] + ' ' + keySplit[1] + ': ' + newVal;
                    myUser[keySplit[0]][keySplit[1]] = newVal;
                } else {
                    document.getElementById(`span${simpleId}`).innerText =
                        keySplit[0] + ' ' + keySplit[1] + ' '
                        + keySplit[2] + ': ' + newVal;
                    myUser[keySplit[0]][keySplit[1]][keySplit[2]] = newVal;
                }
            };
        });
}

function makeDELETErequest(id) {
    let user = document.getElementById(`user${id.split('buttonDelete')[1]}`);
    fetch(`https://jsonplaceholder.typicode.com/users/${user}`, {
        method: 'DELETE'
    })
        .then(res =>
            res.text('deleted')) // or res.json()
        .then(() => {
            user.parentNode.removeChild(user);
        })
}
