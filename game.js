
//listeners
document.addEventListener('keydown', keyPush);

//canvas
const canvas = document.querySelector('canvas');
const title = document.querySelector('h1');
const ctx = canvas.getContext("2d");

//game
let gameIsRunning = true;

let fps = 10;
const tileSize = 25;
const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

let score = 0;

//player
let snakeSpeed = 25;
let snakePosX = 0;
let snakePosY = canvas.height / 2;

let velocityX = 1;
let velocityY = 0;

tail = [ ];
let snakeLenght = 5;       

//food
let foodPosX = 0;
let foodPosY = 0;



//loop
function gameLoop() {
    if (gameIsRunning) {

        drawStuff();
        moveStuff();
    
    //requestAnimationFrame(gameLoop);
    setTimeout(gameLoop, 1000 / fps)
    }

}
    resetFood();
    gameLoop();

// move everything
function moveStuff() {

    snakePosX += snakeSpeed * velocityX;
    snakePosY += snakeSpeed * velocityY;

    // wall collision
    if (snakePosX > ( canvas.width - tileSize)) {
        snakePosX = 0;
    }

    if (snakePosX < 0) {
        snakePosX = canvas.width;
    }

    if (snakePosY > ( canvas.height - tileSize)) {
        snakePosY = 0;
    }

    if (snakePosY < 0) {
        snakePosY = canvas.height;
    }

    // tail collision
    tail.forEach( (snakePart) => {
        if (snakePosX === snakePart.x && snakePosY === snakePart.y) {
            gameOver();
        }
    });

    //tail
    tail.push({x: snakePosX, y: snakePosY});

    //forget previous parts of snake
    tail = tail.slice(-1 * snakeLenght);

    // food collision
    if (snakePosX == foodPosX && snakePosY == foodPosY) {
/*                     score++;
        title.textContent = score; */
        title.textContent = ++score;
        snakeLenght++;
        fps++;
        resetFood();
    }

}

// Draw everything
function drawStuff() {

    // background
    rectangle('#ffbf00', 0, 0, canvas.width, canvas.height);

    // grid
    drawGrid();

    // food
    rectangle('green', foodPosX, foodPosY, tileSize, tileSize)

    //tail
    tail.forEach( snakePart => {

        rectangle('grey', snakePart.x, snakePart.y, tileSize, tileSize)
        
    });

    // snake
    rectangle('black', snakePosX, snakePosY, tileSize, tileSize);

}


// draw rectangle
function rectangle(color, x, y, width, height) {

    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);

}

// randomize food position
function resetFood() {

    if ( snakeLenght == tileCountX * tileCountY) {
        gameOver();
    }

    foodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
    foodPosY = Math.floor(Math.random() * tileCountY) * tileSize;
    
    //dont spawn food on head
    if (foodPosX === snakePosX && foodPosY === snakePosY) {
        resetFood();
    }

    //dont spawn food on tail
    if (tail.some( snakePart => snakePart.x === foodPosX && snakePart.y === foodPosY
    )) {
        resetFood();
    }
}

// GAME OVER
// Keaboard restart game
function gameOver() {
    title.innerHTML = `<strong> &#129324 ${score}  &#129324 </strong>`;
    gameIsRunning = false;
}

// Keyboard
function keyPush() {

    switch(event.key) {

        case 'ArrowLeft':
            if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;                       
            }
            break;
            
        case 'ArrowUp':
            if (velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;
            
        case 'ArrowRight':
            if (velocityX !== -1) {
                velocityX = +1;
                velocityY = 0;       
            }
            break;

        case 'ArrowDown':
            if (velocityY !== -1) {
                velocityX = 0;
                velocityY = +1;
            }
            break;


        default:
            if( ! gameIsRunning ) location.reload();
            break;

    }

}
function drawGrid() {

    for (let i = 0; i < tileCountX ; i++) {
            for (let j = 0; j < tileCountY ; j++) {
            rectangle('white', tileSize * i, tileSize * j, tileSize - 1 , tileSize - 1);
            }
        }
}