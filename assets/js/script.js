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
var playerData = {
    name: "",
    score: 0
}

//values
var quizStatusCount = 0;
var secondsLeft = 10;
var numOfAnswers = 4;
var playerScore = 0;
var timerRanOut = false;

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
]

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
]

function renderNewQuestion() {
    //display question problem in h1
    questionEl.textContent = quizQuestions[quizStatusCount];
    
    //display question answers by creating new list items
    for (var i = 0; i < numOfAnswers; i++) {
        //Create answer list item
        answerListEl.children[i].textContent = quizAnswers[quizStatusCount][i];
    }
}

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
// check if selected (clicked) answer is correct
function checkAnswer(event) {
    let answer = event.target.textContent;
    console.log(quizStatusCount);
    if (answer === correctAnswers[quizStatusCount]) {
        //show correct feedback
        feedbackEl.textContent = correctStr;
        //update score
        playerScore += 5;
    } else {
        //show wrong feedback
        feedbackEl.textContent = wrongStr;
        secondsLeft -= 5;
    }

    quizStatusCount++;

    //Check if end of questions is reached, if not go to next question
    if (quizStatusCount > 4)    {
        renderGameOver();
    } else {
        //Iterate quiz status to next set of questions, choices, and answer; 
        renderNewQuestion();    
    }
}
// Stores player data (initials, score) to local storage
function storePlayerData() {
    enterInitsButtonEl.preventDefault;

    var newPlayer = playerData;
    newPlayer.name = initialsEl.value;
    newPlayer.score = playerScore;
    localStorage.setItem("PlayerData", JSON.stringify(newPlayer));

    renderHighScores();
}

// Clears the High Score table values
function clearHighScores() {
    
    localStorage.clear();
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
    while (answerListEl.firstChild) {
        answerListEl.removeChild(answerListEl.firstChild);
    }
    //Display stats
    timerEl.textContent = "Time Left: " + secondsLeft;
    playerScoreEl.innerHTML = "Score: " + playerScore;
    feedbackEl.innerHTML = "Thanks for playing";
    initialsEl.setAttribute("class", "");
    enterInitsButtonEl.setAttribute("class", "");

    renderHighScores();
   
}

//Display high score table
function renderHighScores() {
    highScoresEl.setAttribute("class", "");
    var newPlayerEl = document.createElement("h4");
    var playerData = JSON.parse(localStorage.getItem("PlayerData"));

    if (playerData === null)    {
        newPlayerEl.textContent = "Name: " + " Score: ";
    } else { 
       newPlayerEl.textContent = "Name: " + playerData.name + " Score: " + playerData.score; 
    }
        highScoresEl.appendChild(newPlayerEl);
        clearHighScoresEl.setAttribute("class", ""); 
}

function setTime() {
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timerEl.textContent = "Timer: " + secondsLeft + "s";
        
        if (secondsLeft <= 0 || quizStatusCount > 4) {
            clearInterval(timerInterval);
            //reset secondsLeft to 0 if docked points go into the negatives
            if (secondsLeft < 0) {
                secondsLeft = 0;
            }
            timerRanOut = true;

            renderGameOver();
           // storePlayerData();
        }
    }, 1000)
}

answerListEl.addEventListener("click", checkAnswer);
startQuizButtonEl.addEventListener("click", startQuiz);
enterInitsButtonEl.addEventListener("click", storePlayerData);
clearHighScoresEl.addEventListener("click", clearHighScores)
