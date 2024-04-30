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
}});
});
// Pong 
const ball = document.querySelector('.ball');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

//
player1.addEventListener('mousedown', handlePaddleMouseDown);
player2.addEventListener('mousedown', handlePaddleMouseDown);

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

//track mouse move
document.addEventListener('mousedown', (e) => {
    if (isPaddleDragging)
    {
        //find position of player 1
        const deltaY = e.clientY - startY;
        const newPosition = parseInt(e.target.style.top) + deltaY;

            //keep paddle in bounds of box
        const minTop = 0;
        const maxTop = 400;

        e.target.style.top = Math.max(minTop, Math.min(maxTop, newPosition)) + 'px';
        //update StartY for the next mouse move
        startY = e.clientY;
        }
    });

// Event listener for mouse up
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });


    
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

function handlePaddleMouseDown(e) {
    isPaddleDragging = true;
    startY = e.clientY;
}

function gameLoop() {
    updateBallPosition();
    requestAnimationFrame(gameLoop);
}

function startPongGame() {
    const gameBoard = document.querySelector('.game-board');
    gameBoard.style.display = 'flex';
    gameLoop();
}