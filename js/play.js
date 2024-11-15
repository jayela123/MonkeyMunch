document.addEventListener('DOMContentLoaded', () => {
    const questionImage = document.getElementById('question-image');
    const answerInput = document.getElementById('answer');
    const submitBtn = document.getElementById('submit-btn');
    const feedback = document.getElementById('feedback');
    const timerText = document.getElementById('timer-text');
    const timerFill = document.getElementById('timer-fill');
    const modal = document.getElementById('modal');
    const retryBtn = document.getElementById('retry-btn');
    const homeBtn = document.getElementById('home-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');

    let solution = '';
    let currentQuestion = null;
    const maxTime = 30;
    let timeLeft = maxTime;
    let timer;

    modal.style.display = 'none';

    // Load a new question
    function loadQuestion() {
        fetch('https://marcconrad.com/uob/banana/api.php?out=json&base64=no')
            .then(response => response.json())
            .then(data => {
                questionImage.src = data.question;
                solution = data.solution.toString().toLowerCase().trim();  // Store the correct answer in lowercase
                currentQuestion = data;
                resetTimer();
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                feedback.textContent = "Error loading quiz. Please try again.";
            });
    }

    // Reset the timer
    function resetTimer() {
        clearInterval(timer);
        timeLeft = maxTime;
        updateTimer();
        timer = setInterval(() => {
            timeLeft--;
            updateTimer();
            if (timeLeft <= 0) {
                clearInterval(timer);
                showModal("Time's up!", "Would you like to try again or go back to the home page?");
            }
        }, 1000);
    }

    // Update the timer UI and color
    function updateTimer() {
        timerText.textContent = `Time left: ${timeLeft}s`;
        timerFill.style.width = `${(timeLeft / maxTime) * 100}%`;

        // Change timer color based on time left
        if (timeLeft > 10) {
            timerFill.style.backgroundColor = 'green'; // Green when time is more than 10 seconds
        } else if (timeLeft > 5) {
            timerFill.style.backgroundColor = 'yellow'; // Yellow when time is between 5-10 seconds
        } else {
            timerFill.style.backgroundColor = 'red'; // Red when time is less than 5 seconds
        }
    }

    // Show modal with dynamic content
    function showModal(title, message) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.style.display = 'flex';
    }

    // Handle Retry and Home Button clicks in the modal
    retryBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        answerInput.value = '';
        feedback.textContent = '';
        resetTimer(); // Keep the same question but reset timer
    });

    homeBtn.addEventListener('click', () => {
        window.location.href = '/';
    });

    // Handle answer submission
    submitBtn.addEventListener('click', () => {
        const userAnswer = answerInput.value.toLowerCase().trim();
        
        if (userAnswer === solution) {
            feedback.textContent = "Correct! Well done!";
            feedback.style.color = "green";
            clearInterval(timer);  // Stop timer on correct answer
            showModal("Correct Answer!", "Next Question or Go Home");
            setTimeout(loadQuestion, 2000);  // Load next question after 2 seconds
        } else {
            feedback.textContent = "Oops! Incorrect.";
            feedback.style.color = "red";
            feedback.classList.add("shake");
            setTimeout(() => feedback.classList.remove("shake"), 500);
            showModal("Incorrect!", "Would you like to try again or go back to the home page?");
        }
    });

    loadQuestion(); // Load the first question
})