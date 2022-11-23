let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// STATES
let state = "title";

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
}

function mouseUpHandler() {
    mouseIsPressed = false;
}

function titleScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    ctx.font = "36px Arial";
    ctx.fillStyle = "rgb(0, 255, 50)";
    ctx.fillText(`Click to Start`, 300, 300);

    if (mouseIsPressed) {
        state = "start";
        setTimeout(function stateOver() {
            state = "gameover"
        }, 10000);
    }
    reset();
}

function runGame() {
    drawGame();
    scoreSystem();
}

function gameOver() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    ctx.font = "13.5px Arial";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(0, 255, 50)";
    ctx.strokeText(`wow, you got ${score} points, try not to click on anything other than the target because that reduces the number of points you have by 1.`, 0, 300);

    setTimeout(function startAgain() {
        state = "title";
    }, 5000);
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
    shrink: -2
}
let score = 0;

// Draw/Animate
function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    // Background
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.body, 0, 2 * Math.PI);
    ctx.fill();

    // Target
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
    if (mouseX > circle.x - circle.body && mouseX < circle.x + circle.body && mouseY > circle.y - circle.body && mouseY < circle.y + circle.body && mouseIsPressed) {
        circle.body = 50;
        circle.r1 = 50;
        circle.r2 = 35;
        circle.r3 = 20;
        circle.r4 = 5;
        circle.x = (Math.random() * 700) + 50;
        circle.y = (Math.random() * 500) + 50;
        score++;
        shrinker();
        mouseIsPressed = false;
    } else if (mouseIsPressed) {
        score--;
        mouseIsPressed = false;
    }
}

// Circle Smaller
function shrinker() {
    if (circle.body = 50) {
        setTimeout(shrinkCirc, 500);
    }
}

function shrinkCirc() {
    if (circle.body > 5){
        circle.body += circle.shrink;
    }
    if (circle.r1 > 5) {
        circle.r1 += circle.shrink;
    }
    if (circle.r2 > 5) {
        circle.r2 += circle.shrink;
    }
    if (circle.r3 > 5) {
    circle.r3 += circle.shrink;
        }
    if (circle.r4 > 5) {
        circle.r4 += circle.shrink;
    }
}

// Reset Target and Score
function reset() {
    circle.x = 400;
    circle.y = 300;
    circle.body = 50;
    circle.r1 = 50;
    circle.r2 = 35;
    circle.r3 = 20;
    circle.r4 = 5;
    score = 1;
}
