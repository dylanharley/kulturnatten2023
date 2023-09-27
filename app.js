var gui = new GUI()
var gamemanager = new GameManager();

const s = (sketch)=>{
    let Xgate
    let Igate
    let Hgate


    sketch.setup = ()=>{
        var myCanvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        myCanvas.parent("quantumDiv");     
        console.log("sketch")   
        console.log(sketch)
        //gui = new GUI(sketch)

        gui.set_2d_sketch(sketch)
        gui.init()
    }
    
    sketch.draw = ()=>{

        // background elements
        sketch.background(255)
    
        gui.drawGatesPanel()
        gui.drawCircuitDiagram()
        gui.drawClickables()
    }

    sketch.windowResized = ()=>{
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
        gui.resize()
    }

    sketch.mouseClicked = ()=>{
        // every button should have a function connected to it that is fired when it is clicked.
        // clicking defaults to no action unless explicitly assigned otherwise
        gui.mouseClicked()
    }

}

var firstCanvas = new p5(s)

const s2 = (sketch) => {

    sketch.setup = () => {
        var myCanvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight, sketch.WEBGL);
        myCanvas.parent("coinDiv");        
        gui.set_3d_sketch(sketch)

    }

    sketch.draw = ()=> {
        gui.draw3D()
    }

}

var secondCanvas = new p5(s2)