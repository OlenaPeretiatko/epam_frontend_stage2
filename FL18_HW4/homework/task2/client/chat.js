let clientID = prompt('Please, enter your nickname');

let socket = new WebSocket('ws://localhost:8080');
let chat = document.getElementById('chat');

function sendText() {
    let msgContainer = document.createElement('div');
    msgContainer.className = 'msgContainerSender';
    let msgTxt = document.createElement('span');
    msgTxt.className = 'msgTxt';
    let msgPerson = document.createElement('p');
    msgPerson.className = 'msgPerson';
    let msgTime = document.createElement('p');
    msgTime.className = 'msgTime';
    let msg = {
        text: document.getElementById('input').value,
        id: clientID,
        date: Date.now()
    };

    socket.send(JSON.stringify(msg));
    document.getElementById('input').value = '';

    msgTxt.append(msg.text);
    msgPerson.append(msg.id);
    msgTime.append(new Date(msg.date).toLocaleTimeString());
    msgContainer.append(msgPerson, msgTxt, msgTime)
    chat.append(msgContainer)
}

socket.onmessage = function (event) {
    let msgContainer = document.createElement('div');
    msgContainer.className = 'msgContainerReceiver';
    let msgTxt = document.createElement('span');
    msgTxt.className = 'msgTxt';
    let msgPerson = document.createElement('p');
    msgPerson.className = 'msgPerson';
    let msgTime = document.createElement('p');
    msgTime.className = 'msgTime';
    console.log('event.data', event.data)
    let msg = JSON.parse(event.data);
    let timeStr = new Date(msg.date).toLocaleTimeString();

    msgTxt.append(msg.text);
    msgPerson.append(msg.id);
    msgTime.append(timeStr);
    msgContainer.append(msgPerson, msgTxt, msgTime)
    chat.append(msgContainer)
}

