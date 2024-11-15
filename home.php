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
        <title>Monkey Munch</title>
        <link rel="stylesheet" href="./css/home.css">
        <link rel="stylesheet" href="./css/btn.css">
        <link rel="stylesheet" href="./css/navBar.css">
    </head>
    <body>

    <?php 
  include_once "./navbar.php";
  ?>

        <div class="container">
            <div class="topic-image">
                <img src="./assert/images/topic.png" alt="Monkey Image">
                <header>
                    <h1>Menu</h1>
                </header>
            </div>

            <div class="menu">
                <button class="game-button" id="play-btn">Play Game</button>
                <button class="game-button green" onclick="window.location.href='./leaderboard.php'">Leaderboard</button>
                <button class="game-button red" onclick="window.location.href='./handlers/logout.php'">Logout</button>
            </div>
        </div>

      
        <div id="difficulty-modal" class="modal" style="display: none;">
            <div class="modal-content">
                <h2>Choose Difficulty</h2>
                <img src="./assert/images/oops.png" alt="Quiz Image" class="quiz-start-image">
                <button id="easy-btn" class="game-button green">Easy</button>
                <button id="medium-btn" class="game-button orange">Medium</button>
                <button id="hard-btn" class="game-button red">Hard</button>
            </div>
        </div>

        <script src="./js/home.js"></script>
    </body>
</html>
