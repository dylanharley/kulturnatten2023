let gamemanager = new GameManager();

const ACTUALLY_DRAW_COIN=true;

const s = (sketch)=>{

    sketch.setup = ()=>{
        var myCanvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        myCanvas.parent("quantumDiv");     

        gamemanager.gui.set_2d_sketch(sketch)
        gamemanager.gui.init()
    }
    
    sketch.draw = ()=>{
        sketch.background(255)
    
        gamemanager.gui.drawGatesPanel()
        gamemanager.gui.drawCircuitDiagram()
        gamemanager.gui.drawClickables()
    }

    sketch.windowResized = ()=>{
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
        gamemanager.gui.resize()
    }

    sketch.mouseClicked = ()=>{
        // every button should have a function connected to it that is fired when it is clicked.
        // clicking defaults to no action unlessan action is explicitly assigned
        gamemanager.gui.mouseClicked()
    }

}

var firstCanvas = new p5(s)

const Q_FACE = 0
const CHIP_FACE = 1

const s2 = (sketch) => {

    sketch.preload = ()=>{
        if (ACTUALLY_DRAW_COIN) {
            sketch.coinBodyParts = [sketch.loadModel("./stl/coin_body.stl")]
            sketch.coinDetails = [sketch.loadModel("./stl/coin_b_p1.stl"),sketch.loadModel("./stl/coin_b_p2.stl"),sketch.loadModel("./stl/coin_b_p3.stl"),sketch.loadModel("./stl/coin_q_p1.stl"),sketch.loadModel("./stl/coin_q_p2.stl"),sketch.loadModel("./stl/coin_q_p3.stl")]
        }
    }

    sketch.setup = () => {
        var myCanvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight, sketch.WEBGL);
        myCanvas.parent("coinDiv");        
        gamemanager.gui.set_3d_sketch(sketch)
    }

    sketch.drawCoin = (faceup) => {
        sketch.push()
        sketch.scale(-5)
        sketch.fill(220)
        if (!ACTUALLY_DRAW_COIN) sketch.strokeWeight(1)
        if (faceup == Q_FACE){
            sketch.translate(0,-0.14,0) 
            sketch.rotateX(sketch.PI/2)
            sketch.rotateZ(sketch.PI)   
        } else {
            sketch.translate(0,0.14,0) 
            sketch.rotateX(sketch.PI/2)
            sketch.rotateY(sketch.PI)
            sketch.rotateZ(sketch.PI)

        }
        
        if (ACTUALLY_DRAW_COIN) {
            sketch.coinBodyParts.forEach((el)=>{sketch.model(el)})
            sketch.fill("#8d42af")
            sketch.coinDetails.forEach((el)=>{sketch.model(el)}) 
        } else {
            sketch.noFill();
            sketch.rotateX(sketch.PI/2);
            sketch.cylinder(25,4);
        }
        sketch.pop()
    }

    sketch.draw = ()=> {
        // rather arbitrary camera position.
        sketch.camera(0,-600,1000, 0, -100, 0)
        sketch.clear()
        gamemanager.gui.draw3D()

        //sketch.rotateX(sketch.frameCount*0.01)
        //sketch.rotateY(sketch.frameCount*0.05);
    }

}

var secondCanvas = new p5(s2)