const questionNode = document.getElementById("__question");
const optionNodes = document.querySelectorAll(".options>div");
const priceTillNow = document.getElementById("question__price");
const winnedPrice = document.getElementById('win--price');

let quizz = null;
let ind = 0;
// let isOptionSelected = false;

function timer() {
    const timerCircle = document.querySelector(".progress--bar circle");
    const time = document.querySelector(".bar__time").childNodes[0];
    let seconds = 0;
    let dashArray = 259; // initally the dasharray 0 in css and offset (invisiblity) is 98%, due to this that rotating animation happenning(bug as a feature)

    timerCircle.style.strokeDasharray = 0;

    let t = setInterval(() => {
        timerCircle.style.strokeDasharray = dashArray;

        seconds < 10
            ? (time.innerText = "0" + seconds)
            : (time.innerText = seconds);

        seconds += 1;
        dashArray += 259 / 30;

        if (dashArray > 2 * 259) {
            clearInterval(t);
        }

        if (seconds > 30) {
            setTimeout(() => {
                timeOver();
            }, 500);
        }
    }, 1000);

    return t;
}

let t = timer();

// when time is over say bye to the user and refresh the window
function timeOver() {
    wrongAnswer(priceTillNow, true);
    window.location.reload();
}

// click check on options,
optionNodes.forEach((option) => {
    // console.log(option.children[1].innerText)
    option.addEventListener("click", checkAnswer);
});

// checking the answer is correct or not
function checkAnswer() {
    // isOptionSelected = true;

    //if the correct option clicked change the question
    if (this.innerText.substr(3) === quizz[ind].correct) {
        correctAnswer(priceTillNow);
        if (ind < 12) renderQuiz(quizz, ++ind);
    } else {
        wrongAnswer(priceTillNow);
    }
}

// when the answer is correct, move the prices indicator to next
function correctAnswer(priceNodes) {
    let winMoney = null;
    winnedPrice.innerText =  priceNodes.children[11 - ind].children[0].innerText;    
    if (ind === 12) {
        winMoney = priceNodes.children[11 - ind].children[0].innerText;
        
        clearInterval(t);
        alert("you win the game" + `amount win is ${winMoney}`);
    }
}

// answer is wrong , just say bye to the user and refresh the window
function wrongAnswer(priceNodes, timeup) {
    // const moneyInd = ind - 1;    
    const str = "bye bye your winning money is " + winnedPrice.innerText;
    const message = timeup ? "time up" + str : str;
    alert(message);

    window.location.reload();
}

// render the question with options
function renderQuiz(quizz, index) {
    let currentQuiz = quizz[index];
    questionNode.innerText = currentQuiz.question;
    // isOptionSelected = false;    

    priceTillNow.children[11 - index].style.color = "yellow";
    if (ind > 0) priceTillNow.children[11 - index + 1].style.color = "white";

    clearInterval(t); // clear the previous interval and call the timer for the next question
    t = timer();

    optionNodes.forEach((option, ind) => {
        let option_element = option.children[1];
        option_element.innerText = currentQuiz.options[ind];
    });
}

// fetch the quiz data ->  IIFE
(async function() {

    try{let response = await fetch("http://127.0.0.1:5500/Jan%208,9%20(KBC)/quizz.json");
    let data = await response.json();
    quizz = data.quizz;
    // console.log(quizz)
    renderQuiz(data.quizz, ind);    
    }
    catch(e){
        console.log(e);
        clearInterval(t);
        alert('some error occured while fetching the question');
    }
})();

// fetchQues();
