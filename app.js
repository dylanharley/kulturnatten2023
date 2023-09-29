let gamemanager = new GameManager();

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

const s2 = (sketch) => {

    sketch.preload = ()=>{
        sketch.coinBodyParts = [sketch.loadModel("./stl/coin_body.stl")]
        sketch.coinDetails = [sketch.loadModel("./stl/coin_b_p1.stl"),sketch.loadModel("./stl/coin_b_p2.stl"),sketch.loadModel("./stl/coin_b_p3.stl"),sketch.loadModel("./stl/coin_q_p1.stl"),sketch.loadModel("./stl/coin_q_p2.stl"),sketch.loadModel("./stl/coin_q_p3.stl")]
    }

    sketch.setup = () => {
        var myCanvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight, sketch.WEBGL);
        myCanvas.parent("coinDiv");        
        gamemanager.gui.set_3d_sketch(sketch)
    }

    sketch.draw = ()=> {
        //gamemanager.gui.draw3D()
        sketch.clear()
        sketch.scale(-5)
        sketch.rotateX(sketch.frameCount*0.01)
        sketch.rotateY(sketch.frameCount*0.05);

        sketch.fill(220)
        sketch.strokeWeight(0)
        sketch.coinBodyParts.forEach((el)=>{sketch.model(el)})
        sketch.fill("#8d42af")
        sketch.coinDetails.forEach((el)=>{sketch.model(el)})
    }

}

var secondCanvas = new p5(s2)