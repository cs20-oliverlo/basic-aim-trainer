let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// STATES
let state = "title";
let timeoutOnce = 0

window.addEventListener("load", draw);
function draw() {
    if (state === "title") {
        titleScreen();
    } else if (state === "start") {
        runGame();
    } else if (state === "gameover") {
        gameOver();
    }

    requestAnimationFrame(draw);
}

// INPUTS
// Variables
let mouseX, mouseY;
let mouseIsPressed = false;

// Event Listeners & Handlers
document.addEventListener("mousemove", mousemoveHandler);
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseUpHandler);

function mousemoveHandler(event) {
    // Get rectangle info about canvas location
    let cnvRect = cnv.getBoundingClientRect(); 

    // Calc mouse coordinates using mouse event and canvas location info
    mouseX = Math.round(event.clientX - cnvRect.left);
    mouseY = Math.round(event.clientY - cnvRect.top);
}

function mousedownHandler() {
    mouseIsPressed = true;

    if (state === "title") {
        state = "start";
        setTimeout(function stateToGameover() {
            state = "gameover"
        }, 5000);
    }
}

function mouseUpHandler() {
    mouseIsPressed = false;
}

function gameOver() {
    mouseIsPressed = false;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    ctx.font = "50px Arial";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(0, 255, 50)";
    ctx.strokeText(`wow, you got ${score} points`, 0, 300);
    if (i < 1) {
    setTimeout(function stateToTitle() {
        state = "title";
    }, 2000);
    timeoutOnce++;
    }

}

function titleScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    ctx.font = "36px Arial";
    ctx.fillStyle = "rgb(0, 255, 50)";
    ctx.fillText(`Click to Start`, 300, 300);
    reset();
}

function runGame() {
    // Logic
    scoreSystem();

    // Draw/Animate
    drawGame();
}

// CANVAS STUFF
// Variables
let circle = {
    x: 400,
    y: 300,
    body: 50,
    r1: 50,
    r2: 35,
    r3: 20,
    r4: 5,
}
let score = 0;

// Draw/Animate
function drawGame() {
    // Background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    // Circle
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.body, 0, 2 * Math.PI);
    ctx.fill();

    // Rings
    ctx.beginPath;
    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgb(255, 0, 0)";
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r1, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r3, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r4, 0, 2 * Math.PI);
    ctx.fill();

    // Score Tracker
    ctx.font = "36px Arial";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(0, 255, 50)";
    ctx.strokeText(`Score: ${score}`, 10, 590);
}

// Points
function scoreSystem() {
    // Clicking Target and Missing Target
    if (mouseX > circle.x - circle.r4 && mouseX < circle.x + circle.r4 && mouseY > circle.y - circle.r4 && mouseY < circle.y + circle.r4 && mouseIsPressed) {
        circle.x = (Math.random() * 700) + 50;
        circle.y = (Math.random() * 500) + 50;
        score += 5;
        mouseIsPressed = false;
    } else if (mouseX > circle.x - circle.r3 && mouseX < circle.x + circle.r3 && mouseY > circle.y - circle.r3 && mouseY < circle.y + circle.r3 && mouseIsPressed) {
        circle.x = (Math.random() * 700) + 50;
        circle.y = (Math.random() * 500) + 50;
        score += 3;
        mouseIsPressed = false;
    } else if (mouseX > circle.x - circle.r2 && mouseX < circle.x + circle.r2 && mouseY > circle.y - circle.r2 && mouseY < circle.y + circle.r2 && mouseIsPressed) {
        circle.x = (Math.random() * 700) + 50;
        circle.y = (Math.random() * 500) + 50;
        score += 2;
        mouseIsPressed = false;
    } else if (mouseX > circle.x - circle.body && mouseX < circle.x + circle.body && mouseY > circle.y - circle.body && mouseY < circle.y + circle.body && mouseIsPressed) {
        circle.x = (Math.random() * 700) + 50;
        circle.y = (Math.random() * 500) + 50;
        score += 1;
        mouseIsPressed = false;
    } else if (mouseIsPressed) {
        score -= 3;
        mouseIsPressed = false;
    }
}

// Reset Target and Score
function reset() {
    circle.x = (Math.random() * 700) + 50;
    circle.y = (Math.random() * 500) + 50;
    score = 3;
    timeoutOnce = 0;
}
