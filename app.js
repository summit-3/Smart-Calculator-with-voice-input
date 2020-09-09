(function () {
let buffer = '';

let screen = document.querySelector('.screen');

document.querySelector('.calc-buttons').addEventListener('click', fun);

function fun(e) {
    if (e.target.innerText == 'C') {
        buffer = '';
        screen.innerText = '0';
    }
    else if (e.target.innerText == '←') {
        if (buffer.length == 1) {
            buffer = '';
            screen.innerText = '0';
        }
        else if (buffer.length == 0) {
            screen.innerText = '0';
        }
        else {
            buffer = buffer.slice(0, buffer.length - 1);
            screen.innerText = buffer;
        }
    }
    else {
        if (buffer.length <= 21) {
            if (e.target.innerText == '=') {
                if (buffer.length == 0) {
                    screen.innerText = '0';
                }
                else {
                    calculate();
                }
            }
            else {
                buffer += e.target.innerText;
                screen.innerText = buffer;
            }
        }
        else {
            buffer = '';
            screen.innerText = '0';
        }
    }
    e.stopImmediatePropagation();
}

function calculate() {
    try {
        screen.innerText = eval(buffer);
        buffer = screen.innerText;
    } catch (e) {
        if (e instanceof SyntaxError) {
            buffer = '';
            screen.innerText = '';
        }
    }
}







var microphone = document.querySelector('.microphone');
microphone.onclick = function () {
    microphone.classList.add("record");
    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();
    operations = {
        "plus": "+",
        "add": "+",
        "minus": "-",
        "multiply": "*",
        "multiplied": "*",
        "into": "*",
        "divide": "/",
        "divided": "/",
        "reminder": "%"
    }

    recognition.onresult = function (event) {
        var input = event.results[0][0].transcript;
        for (property in operations) {
            input = input.replace(property, operations[property]);
        }
        document.querySelector('.screen').innerText = input;
        setTimeout(function () {
            evaluate(input);
        }, 2000);
        microphone.classList.remove("record");
    }
    function evaluate(input) {
        try {
            var result = eval(input);
            document.querySelector('.screen').innerText = result;
        }
        catch (e) {
            console.log(e);
            document.querySelector('.screen').innerText = "";
        }
    }

}
})();
