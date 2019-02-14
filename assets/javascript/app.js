var gameName = [];
var correctAnswer;
var gameCounter = 0;
var timeLeft = 5;
var pauseLeft = 3;
var gamePauseCounter;
var timeCounter;
var mySelection = "";
var totalWin = 0;
var totalLose = 0;
var totalUnanswer = 0;
var isClicked = false;

/* initializing array. 1st element is question. last element is the correct answer.  */
gameName[0] = ["What was the first hit of Michael Jackson?", "Beat It", "The Girl Is Mine", "Thriller", "Bad", "The Girl Is Mine"];
gameName[1] = ["What was the first movie of whitney houston?", "The Bodyguard", "Whitney", "Waiting to Exhale", "The Preacher's Wife", "The Bodyguard"];
gameName[2] = ["What is the name of the song with David Bowie & Mick Jagger?", "Under Pressure", "Paint It Black", "Space Oddity", "Dancing in the Street", "Dancing in the Street"];
gameName[3] = ["When was the song Hotel California released?", "1977", "1982", "1975", "1984", "1977"];

// count down clock for question
function decrement() {
    timeLeft--;
    $("#time-left").text(timeLeft);
    if (timeLeft <= 0) {
        if (!isClicked) {
            $("#correct2").text(correctAnswer);
            $(".timeout-result, .correct-answer2, #timeout").show();
            totalUnanswer++;
        }
        clearInterval(timeCounter);
        $("#time-left").text(timeLeft);
        gamePauseCounter = setTimeout(gamePause, 1000 * 3);
    }
}
// count down clock for "time in between questions"
function gamePause() {
    clearInterval(timeCounter);
    clearTimeout(gamePauseCounter);
    if (gameCounter < 4) {
        timeLeft = 5;
        gameCounter++;
        timeCounter = setInterval(decrement, 1000);
        openingScreen();
    } else {
        resetGame();
    }
}
// display scoreboard and offer to replay
var resetGame = function () {
    $("#start").hide();
    $(".time-count-down, .game-question, #start, .winer-result, .loser-result, .correct-answer1, .Interval-result, .timeout-result, .correct-answer2, li, img").hide();
    $(".final-result, .correct, .incorrect, .unanswered, #restart").show();
    $("#correct-no").text(totalWin);
    $("#incorrect-no").text(totalLose);
    $("#unanswered-no").text(totalUnanswer);

    $("#restart").on('click', function () {
        timeLeft = 5;
        pauseLeft = 3;
        totalWin = 0;
        totalLose = 0;
        totalUnanswer = 0;
        isClicked = false;
        gameCounter = 0;
        timeCounter = setInterval(decrement, 1000);
        openingScreen();
    });
}
// opening screen of the game
var openingScreen = function () {
    $("#time-left").text(timeLeft);
    $("#start").hide();
    $(".gen-style, .sub-style, img").hide();
    $(".time-count-down, .game-question, ul, li").show();

    $(".game-question").text(gameName[gameCounter][0]);
    for (let j = 1; j < 5; j++) {
        $("#ans-" + (j).toString().trim()).text(gameName[gameCounter][j]);
    }
    correctAnswer = gameName[gameCounter][5];
    //gameCounter++;
    optSelect();
}
// action after selecting an option
var optSelect = function () {
    isClicked = false;
    $("li").on('click', function () {
        isClicked = true;
        mySelection = $(this).text();
        if (correctAnswer === mySelection) { // if the answer was correct
            $(".winer-result, #winner").show();
            totalWin++;
            // go to the next question
            $("#time-left").text(timeLeft);
            gamePauseCounter = setTimeout(gamePause, 1000 * 3);
        } else if (correctAnswer !== mySelection) {
            $("#correct1").text(correctAnswer);
            $(".loser-result, .correct-answer1, #loser").show(); // if the answer was wrong
            totalLose++;
            // go to the next question
            $("#time-left").text(timeLeft);
            gamePauseCounter = setTimeout(gamePause, 1000 * 3);
        }
    });
}
// script starts after the document is loaded
$(document).ready(function () {
    $(".gen-style, .sub-style, img").hide();

    $("#start").on('click', function () {
        timeCounter = setInterval(decrement, 1000);
        openingScreen();
    });
});