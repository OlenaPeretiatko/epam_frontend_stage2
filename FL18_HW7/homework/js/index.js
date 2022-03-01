let calculations = $('#calculations');

let screenVal;

function clickNumber(id) {
    let screen = $('#screen');
    screenVal = screen.val();
    if (id === '0' && screenVal[screenVal.length - 1] === '/') {
        screen.attr('value', 'ERROR');
        console.log(screen.val())
        if(screen.val() === 'ERROR'){
            screen.css('color', 'red');
        }
    } else {
        screenVal += id;
        screen.attr('value', screenVal)
    }
}


let oldValue, newValue;

function clickOperator(id) {
    let screen = $('#screen');
    screenVal = screen.val();
    console.log(screenVal)
    if (['+', '-', '*', '/'].some((el) => screenVal.includes(el)) === false) {
        oldValue = $(`#${id}`).text();
        screenVal += oldValue;
        screen.attr('value', screenVal);

    } else {
        newValue = $(`#${id}`).text();
        screen.attr('value', screenVal.replace(oldValue, newValue))
        oldValue = newValue;
    }
}

function clickClean() {
    let screen = $('#screen');
    screen.attr('value', '');
    screen.css('color', 'black');
}

function getResult() {
    let screen = $('#screen');
    if (screen.val().includes('ERROR') || screen.val().includes('NaN') || screen.val().length === 0){
        clickClean();
    } else {
        let iLeft = document.createElement('i');
        iLeft.className = 'fa fa-circle-o left';

        let iRight = document.createElement('i');
        iRight.className = 'fa fa-times right';
        let p = document.createElement('p');
        let span = document.createElement('span');


        screenVal = screen.val();
        let num1 = Number(screenVal.split(oldValue)[0]);
        let num2 = Number(screenVal.split(oldValue)[1]);
        let res;
        switch (oldValue) {
            case '+':
                res = num1 + num2;
                break;
            case '-':
                res = num1 - num2;
                break;
            case '*':
                res = num1 * num2;
                break;
            case '/':
                res = num1 / num2;
                break;
        }
        screen.attr('value', res)

        span.innerText = `${screenVal} = ${res}`
        if (span.innerText.includes('48')){
            $(span).addClass('underline');
        }
        p.append(iLeft, span, iRight)
        calculations.append(p)


        $(iLeft).click(function () {
            console.log('clicked')
            if (iLeft.className.includes('fa-circle-o')) {
                $(this).toggleClass('fa-circle');
            } else {
                $(this).toggleClass('fa-circle-o');
            }

        })

        $(iRight).click(function () {
            $(this).parents('p').remove();

        })
    }
}

$(calculations).scroll(function () {
    console.log(`Scroll Top: ${calculations.scrollTop()}`)
});
