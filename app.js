var test_gate = new QuantumGate("X", 50,150,150,80, ()=>{console.log("hi")})
console.log(test_gate)


function setup() {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent("quantumDiv");
}
  
function draw() {

    test_gate.draw()

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
 }