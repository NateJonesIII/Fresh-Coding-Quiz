
var timeElement = document.querySelector("#time");
var mainElement = document.querySelector(".main");
var btnElement = document.querySelector("#start");
var quizContainer = document.querySelector(".quizContainer");
var questionElement = document.querySelector("#question");
var oderListEl = document.querySelector("#q-list");
var finishDiv = document.querySelector(".finish-section");
var finalScore = document.querySelector("#result");
var errMsg = document.querySelector("#errorSmg");
var initialInput = document.querySelector("#inputInitial").value;
var submitEl = document.querySelector(".btn btn-primary mb-2");
var responsDiv = document.querySelector("#response");
var finaPageEl = document.querySelector(".final-page");
var initialAndScore = document.querySelector("#staticEmail");
var firstPageEl = document.querySelector(".first-page");
var timer = 100;
var timeCount;




// Create an  array of questions
var questions = [
    {
        title: "What sound does a programmer make?",
        choices: ["help", "*cries*", "silence", "google google"],
        answer: "*cries*",
    },
    {
        title: "What does 4%2 equal?",
        choices: ["0", "1", "4", "2"],
        answer: "0",
    },
    {
        title: "What is a variable mainly used for?",
        choices: ["Tracking values", "Hiding", "To look cool", "Using data everywhere"],
        answer: "Tracking values",
    },
    {
        title: "How do you declare a basic variable?",
        choices: ["var='';", "var=='';", "var===='';", "var;"],

        answer: "var='';",
    },
    {
        title: "Which is an assignment symbol?",
        choices: ["==", "+",
            "/", "="],
        answer: "=",
    }
]


/* Delclares question array holder to then append buttons to questions value*/
function displayQuestions() {
    var holdQ1Title = questions[i].title
    questionElement.textContent = holdQ1Title
    var holdq1Choice1 = questions[i].choices[0];
    var holdq1Choice2 = questions[i].choices[1];
    var holdq1Choice3 = questions[i].choices[2];
    var holdq1Choice4 = questions[i].choices[3];

    oderListEl.innerHTML = '';
    //first button creation
    var liTag1 = document.createElement("li");
    liTag1.setAttribute("class", "all_li")
    var btn = document.createElement('button');
    btn.setAttribute("class", "all_btn")
    btn.textContent = holdq1Choice1;
    liTag1.appendChild(btn)
    oderListEl.appendChild(liTag1);
    quizContainer.appendChild(oderListEl);
    //Second button creation
    var liTag2 = document.createElement("li");
    liTag2.setAttribute("class", "all_li");
    var btn2 = document.createElement('button');
    btn2.setAttribute("class", "all_btn")
    btn2.textContent = holdq1Choice2;
    liTag2.appendChild(btn2)
    oderListEl.appendChild(liTag2)
    quizContainer.appendChild(oderListEl);
    //Third button creation
    var liTag3 = document.createElement("li");
    liTag3.setAttribute("class", "all_li")
    var btn3 = document.createElement('button');
    btn3.setAttribute("class", "all_btn")
    btn3.textContent = holdq1Choice3;
    liTag3.appendChild(btn3)
    oderListEl.appendChild(liTag3)
    quizContainer.appendChild(oderListEl);
    //Fourth button creation
    var liTag4 = document.createElement("li");
    liTag4.setAttribute("class", "all_li")
    var btn4 = document.createElement('button');
    btn4.setAttribute("class", "all_btn");
    btn4.textContent = holdq1Choice4;
    liTag4.appendChild(btn4);
    oderListEl.appendChild(liTag4);
    quizContainer.appendChild(oderListEl);
    var allBtnEl = document.querySelectorAll(".all_btn")
    allBtnEl.forEach(function (event) {
        event.addEventListener("click", onclickHandler)
    });

}

/*Timer funtion which will start counting as soon as the quiz starts*/
function setupTimer() {
    timeCount = setInterval(function () {
        timer--;
        var timeReset = timeElement.textContent = " " + timer;
        timer = timer;
        if (timer <= 0) {
            clearInterval(timeCount);
            timeElement.textContent = timeReset;

        }
    }, 1000)
}

/* Here is the event listener to start the timer and hide the quiz button and display questions*/
document.addEventListener("click", function (event) {
    if (event.target === btnElement) {
        mainElement.style.display = "none";
        setupTimer()
        displayQuestions();
    }
})


/* declare the index variable for the onclickHandler function**/
var i = 0;

/* Add a function to compare the answers and 
  display each questions as the buttons are clicked.*/
function onclickHandler(event) {
    if (timer <= 0) {
        clearInterval(timeCount);
        quizContainer.style.display = "none";
        displayResult();
    }
    var answerText = event.target.textContent
    if (answerText === questions[i].answer) {
        timer = timer;
        responsDiv.setAttribute("style", "color: green")
        responsDiv.textContent = "Correct";
    }
    else {

        responsDiv.setAttribute("style", "color: red")
        responsDiv.textContent = "Wrong";
        timer = timer - 10;
    }

    if (i < questions.length - 1) {
        i++;
        setTimeout(function () {
            displayQuestions();
            responsDiv.textContent = "";
        }, 1000)
    }
    else {
        setTimeout(function () {
            responsDiv.textContent = "";
            displayResult();
            clearInterval(timeCount);

        }, 500)
        quizContainer.innerHTML = '';
    }

    /* Display users final score then stores it locally */
    function displayResult() {
        finishDiv.style.visibility = "visible";
        timeElement.textContent = "Time:" + " " + timer;
        var HighScores = timer;
        localStorage.getItem(HighScores)
        finalScore.textContent = "Your finally score is: " + HighScores;
        localStorage.setItem("HighScores", HighScores)
    }
}
/* Function to show the last page  */
function renderLastItem() {
    var yourScore = localStorage.getItem("HighScores");
    var yourInitial = localStorage.getItem("Initial");
    if (yourScore && yourInitial === "") {
        return
    }
    finishDiv.textContent = "";
    var finaPageEl = document.querySelector(".final-page");
    finaPageEl.style.visibility = "visible";
    var initialAndScore = document.querySelector("#staticEmail");
    initialAndScore.value = yourInitial + ":" + " " + yourScore;
}

/* This event listner submit the initial and final score to the local storage */
document.addEventListener("submit", function (event) {
    event.preventDefault();
    var initialInput = document.querySelector("#inputInitial").value;
    if (initialInput === "") {
        errMsg.setAttribute("style", "color: red")
        errMsg.textContent = "Initial input field cannot be empty"
    } else {
        errMsg.textContent = "";
        localStorage.getItem(initialInput)
        localStorage.setItem("Initial", initialInput)
        renderLastItem()
    }
})
/* Refreshes the page and send user back to begining page when go back button is clicked */
function init() {
    location.reload();
}
/*Clear initials and score displayed on the last page */
function clearScore() {
    initialAndScore.value = "";
}