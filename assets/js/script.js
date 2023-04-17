// elements
var startQuizButtonEl = document.getElementById("startQuiz");
var questionEl = document.querySelector(".title");
var answerListEl = document.querySelector(".answerList");
var answerEl = document.querySelectorAll(".answer");
var mainEl = document.querySelector("main");
var feedbackEl = document.getElementById("feedback");
var timerEl = document.getElementById("timer");
var playerScoreEl = document.getElementById("playerScore");
var initialsEl = document.getElementById("initials");
var highScoresEl = document.getElementById("highScores");
var enterInitsButtonEl = document.getElementById("enterInits");
var clearHighScoresEl = document.getElementById("clearHighScores");


//values
var quizStatusCount = 0;
const numOfChoices = 4;
var secondsLeft = 30;
var playerScore = 0;
var timerRanOut = false;
var playerData = [];


var correctStr = "Correct";
var wrongStr = "Wrong Answer";
var quizQuestions = [
    //Question 1
    "What data type is returned with the following line of code?\n" + "var dataType = typeof(\"1\");",
    //Question 2
    "HTML stands for: ",
    //Question 3
    "Javascript is primarily used for:",
    //Question 4
    "Fill in what's missing in the following github workflow: make changes in local, git add, ______, git push origin [branch name]",
    //Question 5
    "CSS selectors can be used to target: "
];

var quizAnswers = [
    //Question 1 Multiple Choices
    ["undefined", "boolean", "string", "number"],
    //Question 2 MCs
    ["HyperText Markup Language", "HyperTension Malleability Language", "He Took My Lasagna!", "Hexagonal Treasury for Master Linguists"],
    //Question 3 MCs
    ["Object-oriented programming", "Styling", "Browser functionality/interactibility", "Creating a server"],
    //Question 4 MCs
    ["gid gud -m", "git rekt -m", "git revert", "git commit -m"],
    //Question 5 MCs
    ["html elements", "ids", "classes", "all of the above"]
];

var correctAnswers = [
    //Question 1 Answer
    "string", 
    //Question 2 Answer
    "HyperText Markup Language",
    //Question 3 Answer
    "Browser functionality/interactibility",
    //Question 4 Answer
    "git commit -m",
    //Question 5 Answer
    "all of the above"
];

//initialize function
function startQuiz(event) {
    event.preventDefault;
    //remove startQuiz button element
    startQuizButtonEl.remove();
    //display new question
    renderNewQuestion();
    //display timer default
    timerEl.textContent = "Timer: " + secondsLeft + "s";
    //start timer
    setTime();
}

function renderNewQuestion() {
    //display question problem
    questionEl.textContent = quizQuestions[quizStatusCount];
    
    //display question answers by creating new list items
    for (var i = 0; i < numOfChoices; i++) {
        answerListEl.children[i].textContent = quizAnswers[quizStatusCount][i];
    }
}

// check if selected (clicked) answer is correct
function checkAnswer(event) {
    let answer = event.target.textContent;
    //use quizStatusCount value to get correct answer index
    if (answer === correctAnswers[quizStatusCount]) {
        //show correct feedback
        feedbackEl.textContent = correctStr;
        //update score
        playerScore += 5;
    } else {
        //show wrong feedback
        feedbackEl.textContent = wrongStr;
        //deduct time
        secondsLeft -= 5;
    }
    //update quiz status to be used as index for questions and answers array
    quizStatusCount++;

    //Check if end of questions is reached, if not go to next question
    if (quizStatusCount > 4)    {
        renderGameOver();
    } else { 
        renderNewQuestion();    
    }
}

// Clears the High Score table values
function clearHighScores() {
    localStorage.clear();
    clearHighScoreEls();
    playerData = [];
}
function clearHighScoreEls() {
    while (highScoresEl.firstChild) {
        highScoresEl.removeChild(highScoresEl.firstChild);
    }
}

// Game Over Screen
function renderGameOver() {
   
    if(timerRanOut) {
        questionEl.innerHTML = "Time's Up!";
    }
    else {
        questionEl.innerHTML = "Quiz End!";
    }
    //remove answer choices
    while (answerListEl.firstChild) {
        answerListEl.removeChild(answerListEl.firstChild);
    }

    //Display plater stats
    timerEl.textContent = "Time Left: " + secondsLeft + "s";
    playerScoreEl.innerHTML = "Score: " + playerScore;
    feedbackEl.innerHTML = "Thanks for playing";
    initialsEl.setAttribute("class", "");
    enterInitsButtonEl.setAttribute("class", "");

    renderHighScores();
}

function storePlayerData() {
    var newPlayerData = {
        name: initialsEl.value.trim(),
        score: playerScore
    }
    clearHighScoreEls();
    playerData.unshift(newPlayerData);
    localStorage.setItem("PlayerData", JSON.stringify(playerData));
    renderHighScores();
}

//Display high score table
function renderHighScores() {
    highScoresEl.setAttribute("class", "");
    clearHighScoresEl.setAttribute("class", ""); 
    playerData = JSON.parse(localStorage.getItem("PlayerData"));
    if (playerData === null) {
        playerData = [];
        return;
    }
    for (var i = 0; i < playerData.length; i++) {   
            var newPlayerEl = document.createElement("h4");
            newPlayerEl.textContent = "Name: " + playerData[i].name + " Score: " + playerData[i].score; 
            highScoresEl.appendChild(newPlayerEl);
    }   
}

function setTime() {
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timerEl.textContent = "Timer: " + secondsLeft + "s";
        
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
        
            //reset secondsLeft to 0 if docked points go into the negatives
            if (secondsLeft < 0) {
                secondsLeft = 0;
                timerRanOut = true;
                renderGameOver();
            }
        } else if (quizStatusCount > 4) {
            clearInterval(timerInterval);
            return;
        }   
    }, 1000)
}
answerListEl.addEventListener("click", checkAnswer);
startQuizButtonEl.addEventListener("click", startQuiz);
enterInitsButtonEl.addEventListener("click", storePlayerData);
clearHighScoresEl.addEventListener("click", clearHighScores);
