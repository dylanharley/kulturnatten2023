var myCanvas = createCanvas(winWidth, winHeight);
myCanvas.parent("quantumDiv");


function setup() {
    createCanvas(windowWidth, windowHeight);
  }
  
function draw() {
if (mouseIsPressed) {
    fill(0);
} else {
    fill(255);
}
ellipse(mouseX, mouseY, 80, 80);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
 }