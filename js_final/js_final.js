const ball = document.querySelector('.ball');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

document.addEventListener('DOMContentLoaded', (event) => {
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

    // let player1 = document.querySelector('#player1');
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
    document.addEventListener('mousemove', (e) => {
        if (isPaddleDragging)
        {
            //find position of player 1
            const deltaY = e.clientY - startY;
            const newPosition = parseInt(player1.style.top) + deltaY;

            console.log('New Position:', newPosition);

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

        if (ballRect.left < player1Rect.right &&
            ballRect.right > player1Rect.left &&
            ballRect.top < player1Rect.bottom &&
            ballRect.bottom > player1Rect.top) {
            // Handle collision
            ballSpeedX *= -1; // Reverse ball's horizontal direction
        }
    }

    function checkCollisionP2() {
        const ballRect = ball.getBoundingClientRect();
        const player2Rect = player2.getBoundingClientRect();

        if (ballRect.left < player2Rect.right &&
            ballRect.right > player2Rect.left &&
            ballRect.top < player2Rect.bottom &&
            ballRect.bottom > player2Rect.top) {
            // Handle collision
            ballSpeedX *= -1; // Reverse ball's horizontal direction
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
});