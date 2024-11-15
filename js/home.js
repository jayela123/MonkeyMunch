document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play-btn');
    const difficultyModal = document.getElementById('difficulty-modal');

    const easyButton = document.getElementById('easy-btn');
    const mediumButton = document.getElementById('medium-btn');
    const hardButton = document.getElementById('hard-btn');

    playButton.addEventListener('click', () => {
        difficultyModal.style.display = 'flex';
    });
    
    easyButton.addEventListener('click', () => startGame('easy'));
    mediumButton.addEventListener('click', () => startGame('medium'));
    hardButton.addEventListener('click', () => startGame('hard'));

    function startGame(difficulty) {
        difficultyModal.style.display = 'none';
        console.log(`Starting game with difficulty: ${difficulty}`);
        window.location.href = `play.php?difficulty=${difficulty}`;
    }
});
