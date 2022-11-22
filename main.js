let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// INPUTS
let mouseX, mouseY;
let mouseIsPressed = false;

// Event Listeners & Handlers
document.addEventListener("mousemove", mousemoveHandler);
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseUpHandler);
document.addEventListener("keydown", keydownHandler);

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

function keydownHandler(event) {
    if (event.code == "KeyR") {
        circle.x = 400;
        circle.y = 300;
        circle.body = 50;
        circle.r1 = 50;
        circle.r2 = 35;
        circle.r3 = 20;
        circle.r4 = 5;
        score = 0;
    }
}

// CANVAS STUFF
let circle = {
    x: 400,
    y: 300,
    body: 50,
    r1: 50,
    r2: 35,
    r3: 20,
    r4: 5
}
let score = 0;

requestAnimationFrame(animate);
function animate() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    if (mouseX > circle.x - 50 && mouseX < circle.x + 50 && mouseY > circle.y - 50 && mouseY < circle.y + 50 && mouseIsPressed) {
        circle.body = 50;
        circle.r1 = 50;
        circle.r2 = 35;
        circle.r3 = 20;
        circle.r4 = 5;
        circle.x = (Math.random() * 700) + 50;
        circle.y = (Math.random() * 500) + 50;
        score++;
        mouseIsPressed = false;
        setInterval(shrinkCirc, 1000);
    }

    function shrinkCirc() {
        circle.body -= 2;
        circle.r1 -= 2;
        circle.r2 -= 2;
        circle.r3 -= 2;
        circle.r4 -= 2;
        if (circle.body < 0){
            circle.body = 0;
        }
        if (circle.r1 < 0) {
            circle.r1 = 0;
        }
        if (circle.r2 < 0) {
            circle.r2 = 0;
        }
        if (circle.r3 < 0) {
            circle.r3 = 0;
        }
        if (circle.r4 < 0) {
            circle.r4 =0 ;
        }
    }

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

    requestAnimationFrame(animate)
}