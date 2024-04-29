const handle = document.querySelector('.volume-handle');
handle.addEventListener('mousedown', () => {
    let isDragging = true;
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const x = e.clientX;
            handle.style.left = `${x}px`;
        }
    });
    document.addEventListener('mouseup', () => {
        isDragging = false;
        const volumeLevel = Math.floor(Math.random() * 101);
        alert(`Congratulations! You've set the volume to ${volumeLevel}%. Enjoy the cacophony.`);
    });
});

const ball = document.querySelector('.ball');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

let ballX = 390;
let ballY = 190;
let ballSpeedX = 5;
let ballSpeedY = 3;

function updateBallPosition() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    // Handle collisions with walls
    if (ballX <= 0 || ballX >= 780) {
        ballSpeedX *= -1;
    }
    if (ballY <= 0 || ballY >= 380) {
        ballSpeedY *= -1;
    }
}

function gameLoop() {
    updateBallPosition();
    requestAnimationFrame(gameLoop);
}

gameLoop();