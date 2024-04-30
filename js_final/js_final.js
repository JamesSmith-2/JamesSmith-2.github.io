const ball = document.querySelector('.ball');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

//
player1.addEventListener('mousedown', handlePaddleMouseDown);
player2.addEventListener('mousedown', handlePaddleMouseDown);

// volume
const handle = document.querySelector('.volume-handle');
let isAlertShown = false; // track if alert has been shown

handle.addEventListener('mousedown', () => {
    let isDragging = true;
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const x = e.clientX;
            handle.style.left = `${x}px`;
        }
    });
    document.addEventListener('mouseup', () => {
        if (!isAlertShown) 
        {
            // Show the alert only if it hasn't been shown before
            isAlertShown = true;
            const volumeLevel = Math.floor(Math.random() * 101);
            alert(`In order to change your volume level to ${volumeLevel}%, you must beat me in a game of pong!`);
            startPongGame(); // Begin the pong game after closing the alert
        }
    isDragging = false;
    });
});
// Pong 
function handlePaddleMouseDown(e)
{
    isPaddleDragging = true;
    startY = e.clientY;
}

let ballX = 390;
let ballY = 190;
let ballSpeedX = 5;
let ballSpeedY = 3;
let isDragging = false;

//track the mouse
let isPaddleDragging = false;
let startY = 0;

//event listener for mouse down (click on paddle)
// player1.addEventListener('mousedown', (e) => {
//     isPaddleDragging = true;
//     startY = e.clientY;
// });

function handlePaddleMouseDown(e) {
    isPaddleDragging = true;
    startY = e.clientY;
}

player1.addEventListener('mousedown', (e) => 
{
    isPaddleDragging = true;
    startY = e.clientY;
    e.preventDefault();
});

//track mouse move
document.addEventListener('mousedown', (e) => {
    if (isPaddleDragging)
    {
        //find position of player 1
        const deltaY = e.clientY - startY;
        const newPosition = parseInt(player1.style.top) + deltaY;

            //keep paddle in bounds of box
        const minTop = 0;
        const maxTop = 400;

        player1.style.top = Math.max(minTop, Math.min(maxTop, newPosition)) + 'px';
        //update StartY for the next mouse move
        startY = e.clientY;
        }
    });

// Event listener for mouse up
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
//---

    // Event listener for each frame
    function updateAI() {
        // Calculate the difference between the ball's y-position and the player2 paddle's current y-position
        const deltaY = ball.getBoundingClientRect().top - player2.getBoundingClientRect().top;
    
        const minTop = 0;
        const maxTop = 400;
        // Adjust the paddle's position toward the ball's y-position
        const speed = 0.1; // Adjust this value as needed
        player2.style.top = (player2.offsetTop + deltaY * speed) + 'px';
    }
//--

// Check for collision between ball and player1 paddle
function checkCollisionP1() {
    const ballRect = ball.getBoundingClientRect();
    const player1Rect = player1.getBoundingClientRect();

    const ballCenterX = ballRect.left + ballRect.width / 2;
    const ballCenterY = ballRect.top + ballRect.height / 2;

    const player1CenterX = player1Rect.left + player1Rect.width / 2;
    const player1CenterY = player1Rect.top + player1Rect.height / 2;

    const distance = Math.sqrt(
        (ballCenterX - player1CenterX) ** 2 +
        (ballCenterY - player1CenterY) ** 2
    );

    const totalRadius = ballRect.width / 2 + player1Rect.width / 2;

    if (distance <= ballRect.width / 2 + player1Rect.width / 2) {
        // Handle collision
        ballSpeedX *= -1; // Example: Reverse ball's horizontal direction
    }
}

function checkCollisionP2() {
    const ballRect = ball.getBoundingClientRect();
    const player2Rect = player2.getBoundingClientRect();

    const ballCenterX = ballRect.left + ballRect.width / 2;
    const ballCenterY = ballRect.top + ballRect.height / 2;

    const player2CenterX = player2Rect.left + player2Rect.width / 2;
    const player2CenterY = player2Rect.top + player2Rect.height / 2;

    const distance = Math.sqrt(
        (ballCenterX - player2CenterX) ** 2 +
        (ballCenterY - player2CenterY) ** 2
    );

    const totalRadius = ballRect.width / 2 + player2Rect.width / 2;

    if (distance <= ballRect.width / 2 + player2Rect.width / 2) {
        // Handle collision
        ballSpeedX *= -1; // Example: Reverse ball's horizontal direction
    }
}

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
    updateAI();
    checkCollision();
    requestAnimationFrame(gameLoop);
    }

function checkCollision() {
    checkCollisionP1();
    checkCollisionP2();
}

function startPongGame() {
    const gameBoard = document.querySelector('.game-board');
    gameBoard.style.display = 'flex';
    gameLoop();
}