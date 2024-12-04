document.addEventListener("DOMContentLoaded", () => {
  const questionImage = document.getElementById("question-image");
  const answerInput = document.getElementById("answer");
  const submitBtn = document.getElementById("submit-btn");
  const feedback = document.getElementById("feedback");
  const timerText = document.getElementById("timer-text");
  const timerFill = document.getElementById("timer-fill");
  const modal = document.getElementById("modal");
  const retryBtn = document.getElementById("retry-btn");
  const homeBtn = document.getElementById("home-btn");
  const modalTitle = document.getElementById("modal-title");
  const modalMessage = document.getElementById("modal-message");

  let solution = "";
  let currentQuestion = null;
  let score = 0;
  let timeLeft;
  let timer;
  let maxTime;
  let pointsPerQuestion;

  // get difficulty from url
  const urlParams = new URLSearchParams(window.location.search);
  const difficulty = urlParams.get("difficulty");

  if (difficulty === "easy") {
    maxTime = null; // No timer easy mode
    pointsPerQuestion = 2;
    timerText.style.display = "none";
    timerFill.style.display = "none";
  } else if (difficulty === "medium") {
    maxTime = 15;
    pointsPerQuestion = 5;
  } else if (difficulty === "hard") {
    maxTime = 10;
    pointsPerQuestion = 10;
  } else {
    maxTime = 15;
    pointsPerQuestion = 5;
  }

  modal.style.display = "none";

  //new q
  function loadQuestion() {
    fetch("https://marcconrad.com/uob/banana/api.php?out=json&base64=no")
      .then((response) => response.json())
      .then((data) => {
        questionImage.src = data.question;
        solution = data.solution.toString().toLowerCase().trim();
        currentQuestion = data;
        resetTimer();
        feedback.textContent = "";
        answerInput.value = "";
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        feedback.textContent = "Error loading quiz. Please try again.";
      });
  }

  function getQuote() {
    fetch("https://api.realinspire.tech/v1/quotes/random?maxLength=100")
      .then((response) => response.json())
      .then((data) => {
        const quoteContent =
          data[0]?.content || "Stay positive! Every step counts.";
        showModal("Incorrect!", quoteContent, false);
      })
      .catch((error) => {
        console.error("Error fetching motivational quote:", error);
        showModal(
          "Incorrect!",
          "Don't worry, try again and you'll succeed!",
          false
        );
      });
  }

  function resetTimer() {
    clearInterval(timer);
    timeLeft = maxTime;

    if (maxTime) {
      updateTimer();
      timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
          clearInterval(timer);
          showModal(
            "Time's up!",
            "Would you like to try again or go back to the home page?"
          );
        }
      }, 1000);
    }
  }

  // timer ui
  function updateTimer() {
    timerText.textContent = `Time left: ${timeLeft}s`;
    timerFill.style.width = `${(timeLeft / maxTime) * 100}%`;

    if (timeLeft > 10) {
      timerFill.style.backgroundColor = "green";
    } else if (timeLeft > 5) {
      timerFill.style.backgroundColor = "yellow";
    } else {
      timerFill.style.backgroundColor = "red";
    }
  }

  function showModal(title, message, isCorrect = false) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = "flex";

    if (isCorrect) {
      retryBtn.textContent = "Next";
      retryBtn.className = "game-button";
    } else {
      retryBtn.textContent = "Try Again";
      retryBtn.className = "game-button orange";
    }
  }

  retryBtn.addEventListener("click", () => {
    modal.style.display = "none";
    if (retryBtn.textContent === "Try Again") {
      resetTimer();
      feedback.textContent = "";
      answerInput.value = "";
    } else {
      loadQuestion();
    }
  });

  homeBtn.addEventListener("click", () => {
    window.location.href = "./home.php";
  });

  submitBtn.addEventListener("click", () => {
    const userAnswer = answerInput.value.toLowerCase().trim();

    if (userAnswer === solution) {
      score += pointsPerQuestion;

      const userData = {
        score: pointsPerQuestion,
      };

      fetch("./handlers/updateLeaderboard.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            console.log(data.message);
          } else {
            console.error(data.message);
          }
        })
        .catch((error) => console.error("Error updating leaderboard:", error));

      feedback.textContent = `Correct! Well done! Score: ${score}`;
      feedback.style.color = "green";
      clearInterval(timer);
      showModal("Correct Answer!", "Next Question or Go Home", true);
    } else {
      feedback.textContent = "Oops! Incorrect.";
      feedback.style.color = "red";
      feedback.classList.add("shake");
      setTimeout(() => feedback.classList.remove("shake"), 500);
      clearInterval(timer);
      getQuote();
    }
  });

  loadQuestion();
});
