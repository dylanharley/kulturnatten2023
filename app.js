
const s = (sketch)=>{
    let Xgate
    let Igate
    let Hgate

    let gui

    sketch.setup = ()=>{
        var myCanvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        myCanvas.parent("quantumDiv");        
        console.log(sketch)
        gui = new GUI(sketch)
        Xgate = new QuantumGate("Vend", gui.gatesPanelPaddingLeft+100, sketch.windowHeight-100,100,100, ()=>{console.log("hi")})
        Igate = new QuantumGate("Vend ikke", gui.gatesPanelPaddingLeft + 0.5*gui.gatesPanelWidth, sketch.windowHeight-100,100,100, ()=>{console.log("hi")})
        Hgate = new QuantumGate("Superposition", gui.gatesPanelPaddingLeft + gui.gatesPanelWidth-100, sketch.windowHeight-100,100,100, ()=>{console.log("hi")})
    }
    
    sketch.draw = ()=>{

        // background elements
        sketch.background(255)
    
        gui.drawGatesPanel()
        gui.drawCircuitDiagram()
        gui.drawClickables()

        // gates
        Xgate.draw(sketch)
        Hgate.draw(sketch)
        Igate.draw(sketch)
    }

    sketch.windowResized = ()=>{
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
        gui.resize()
        Xgate.set_position(gui.gatesPanelPaddingLeft+100,sketch.windowHeight-100);
        Igate.set_position(gui.gatesPanelPaddingLeft + 0.5*gui.gatesPanelWidth,sketch.windowHeight-100);
        Hgate.set_position(gui.gatesPanelPaddingLeft + gui.gatesPanelWidth-100,sketch.windowHeight-100);
    }

    sketch.mouseClicked = ()=>{
        // every button should have a function connected to it that is fired when it is clicked.
        // clicking defaults to no action unless explicitly assigned otherwise
        gui.mouseClicked()
    }

}

var firstCanvas = new p5(s)