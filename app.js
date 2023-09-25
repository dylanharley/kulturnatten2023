var Xgate
var Ygate
var Zgate
var Hgate
var measurement

var gui
function setup() {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent("quantumDiv");

    Xgate = new QuantumGate("X", 150, windowHeight-100,100,100, ()=>{console.log("hi")})
    Ygate = new QuantumGate("Y", 300, windowHeight-100,100,100, ()=>{console.log("hi")})
    Zgate = new QuantumGate("Z", 450, windowHeight-100,100,100, ()=>{console.log("hi")})
    Hgate = new QuantumGate("H", 600, windowHeight-100,100,100, ()=>{console.log("hi")})
    measurement = new QuantumGate("M", 750, windowHeight-100,100,100, ()=>{console.log("hi")})

    gui = new GUI(myCanvas)
}
  
function draw() {

    // background elements
    background(255)
 
    gui.drawGatesPanel()
    gui.drawClickables()
    // gates
    Xgate.draw()
    Ygate.draw()
    Zgate.draw()
    Hgate.draw()
    measurement.draw()
    fill(255)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
 }

 function mouseClicked(){
    // every button should have a function connected to it that is fired when it is clicked.
    // clicking defaults to no action unless explicitly assigned otherwise
    gui.mouseClicked()
}