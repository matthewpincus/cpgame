let score = 0;
let gameInterval;
let captainPlanet;
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score-value');
const startButton = document.getElementById('start-button');

function moveCaptainPlanet(e) {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const captainRect = captainPlanet.getBoundingClientRect();
    const newX = e.clientX - gameAreaRect.left - captainRect.width / 2;
    
    if (newX >= 0 && newX <= gameAreaRect.width - captainRect.width) {
        captainPlanet.style.left = newX + 'px';
    }
}

function createTrash() {
    const trash = document.createElement('div');
    trash.classList.add('trash');
    trash.style.left = Math.random() * (gameArea.offsetWidth - 30) + 'px';
    trash.style.top = '0px'; // Start from the top
    gameArea.appendChild(trash);

    const fallInterval = setInterval(() => {
        const trashRect = trash.getBoundingClientRect();
        const captainRect = captainPlanet.getBoundingClientRect();

        // Check for collision
        if (trashRect.bottom >= captainRect.top &&
            trashRect.left < captainRect.right &&
            trashRect.right > captainRect.left) {
            score++;
            scoreDisplay.textContent = score;
            gameArea.removeChild(trash);
            clearInterval(fallInterval);
        } else if (trashRect.top >= gameArea.offsetHeight) {
            // If trash reaches the bottom, end the game
            endGame();
            clearInterval(fallInterval);
        } else {
            // Move the trash down
            trash.style.top = (parseFloat(trash.style.top) + 5) + 'px'; // Increase speed
        }
    }, 100); // Check every 100ms
}

function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    startButton.disabled = true;
    gameArea.innerHTML = '<div id="captain-planet"></div>'; // Reset game area
    captainPlanet = document.getElementById('captain-planet');
    gameArea.addEventListener('mousemove', moveCaptainPlanet);
    gameInterval = setInterval(createTrash, 1000); // Create trash every second
}

function endGame() {
    clearInterval(gameInterval);
    gameArea.removeEventListener('mousemove', moveCaptainPlanet);
    alert(`Game Over! Your score: ${score}`);
    startButton.disabled = false;
}

startButton.addEventListener('click', startGame);
