<?php session_start();
if(!isset($_SESSION['un'])){
  header('Location:login.html');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MonkeyMunch</title>
    <link rel="stylesheet" href="./css/play.css">
    <link rel="stylesheet" href="./css/btn.css">
    <link rel="stylesheet" href="./css/navBar.css">
</head>
<body>
<?php 
  include_once "./navbar.php";
  ?>
 
    <div id="timer-container">
        <p id="timer-text">Time left: 30s</p>
        <div id="timer-fill"></div>
    </div>


    <div class="quiz-image-container">
        <img id="question-image" class="quiz-image" alt="Loading question...">
    </div>


    <div class="quiz-container">
        <div class="answer-container">
            <img src="./assert/images/inputBoard.png" alt="Wood Texture" class="input-board-image">
            <input type="text" id="answer" class="wood-input" placeholder="Enter your answer">
            <button id="submit-btn" class="game-button green">Submit Answer</button>
        </div>
        <p id="feedback" class="feedback"></p>
    </div>


    <div id="modal" class="modal">
        <div class="modal-content">
            <h2 id="modal-title">Incorrect!</h2>
            <p id="modal-message">Would you like to try again or go back to the home page?</p>
            <button id="retry-btn" class="game-button orange">Try Again</button>
            <button id="home-btn" class="game-button red">Home</button>
        </div>
    </div>

    <script src="./js/play.js"></script>
</body>
</html>
