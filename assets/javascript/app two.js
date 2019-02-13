var gameName = [];
var correctAnswer;
var gameCounter = 0;
var gameTimeLeft;
var mySelection = "";
var totalWin = 0;
var totalLose = 0;
var totalUnAnswer = 0;

/* initializing array. 1st element is question. last element is the correct answer.  */
gameName[0] = ["What was the first hit of Michael Jackson?", "AAA1", "AAA2", "AAA3", "AAA4", "AAA1"];
gameName[1] = ["What was the first movie of whitney houston?", "BBB1", "BBB2", "BBB3", "BBB4", "BBB2"];
gameName[2] = ["What is the name of the song with David Bowie & Mick Jagger?", "CCC1", "CCC2", "CCC3", "CCC4", "CCC3"];
gameName[3] = ["When was the song Hotel California released?", "DDD1", "DDD2", "DDD3", "DDD4", "DDD4"];
gameName[4] = ["This is a test", "zzz1", "zzz2", "zzz3", "zzz5", "zzz5"];
gameName[5] = ["This is a demo ONE", "XXX1", "XXX2", "XXX3", "XXX5", "XXX3"];
gameName[6] = ["This is a demo TWO", "MMM1", "MMM2", "MMM3", "MMM5", "MMM1"];
gameName[7] = ["This is a demo THREE", "SSS1", "SSS2", "SSS3", "SSS4", "SSS1"];



// opening screen of the game
var openingScreen = function () {
    if (gameCounter < 8) {
        alert( "entry: " + gameCounter);
        $("#start").hide();
        $(".gen-style, .sub-style, img").hide();
        $(".time-count-down, .game-question, ul, li").show();
        gameTimeLeft = 10;
        $("#time-left").text(gameTimeLeft);
        var gameTime = setInterval(function () {
            $("#time-left").text(gameTimeLeft);
            gameTimeLeft--;
            if (gameTimeLeft <= 0) {
                $("#time-left").text(gameTimeLeft);
                clearInterval(gameTime);
            }
        }, 1000); // timer for count down

        $(".game-question").text(gameName[gameCounter][0]);
        for (let j = 1; j < 5; j++) {
            $("#ans-" + (j).toString().trim()).text(gameName[gameCounter][j]);
        }
        correctAnswer = gameName[gameCounter][5];
        gameCounter++;
        alert( "exit: " + gameCounter);
        optSelect();
    }
}
// action after selecting an option
var optSelect = function () {
    $("li").on('click', function () {
        mySelection = $(this).text();
        alert( "Correct Answer: " + correctAnswer+ " MySelection: " + mySelection + " gameCounter: " + gameCounter);
        if (correctAnswer === mySelection) { // if the answer was correct
            alert( "it is correct");
            mySelection = "";
            $(".winer-result, #winner").show();
           // clearInterval(gameTime1);
            totalWin++;
            // go to the next question
            setTimeout(openingScreen, 1000);
        } else if (correctAnswer !== mySelection) {
            alert( "it is wrong");
            $("#correct1").text(correctAnswer);
            $(".loser-result, .correct-answer1, #loser").show(); // if the answer was wrong
           // clearInterval(gameTime1);
            totalLose++;
            // go to the next question
            setTimeout(openingScreen, 1000);
        }
    });
}
// script starts here
$(document).ready(function () {
    $(".gen-style, .sub-style, img").hide();

    $("#start").on('click', function () {
        openingScreen();
    });
});