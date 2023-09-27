class GUI {
    constructor(){
            
        }
    
    init(){
        
        this.clickables = []

        // add rule if screen is too small?
        this.padding = 20

        // GATES BOTTOM PANEL SETTINGS
        // TODO: Make this update when window is resized
        this.gatesPanelPaddingBottom = 20
        this.gatesPanelPaddingLeft = 50
        this.gatesPanelWidth = 2/3*this.sketch.windowWidth
        this.gatesPanelHeight = 160

        this.gatesPanelFill = this.sketch.color(255,255,255)
        this.gatesPanelStroke = this.sketch.color(0,0,0)
        this.gatesPanelStrokeWeight = 1
        this.gatesPanelCornerRadius = 15

        // "Run simulation once" button
        this.runOnceButtonCenterX = this.sketch.windowWidth-150/2-50
        this.runOnceButtonCenterY = this.sketch.windowHeight-50/2-120
        this.runOnceButtonWidth = 150
        this.runOnceButtonHeight = 50
        this.runOnceButtonColor = [255,100,100]
        this.runOnceButton = new Button("SPIL",this.runOnceButtonCenterX,this.runOnceButtonCenterY,this.runOnceButtonWidth, this.runOnceButtonHeight,this.runOnceButtonColor)
        this.runOnceButton.onclick(()=>{console.log("Run simulation once pressed")}) // For debug purposes
        this.clickables.push(this.runOnceButton)

        // "Run 1000 times" button
        this.runThousandButtonCenterX = this.sketch.windowWidth-150/2-50
        this.runThousandButtonCenterY = this.sketch.windowHeight-50/2-50
        this.runThousandButtonWidth = 150
        this.runThousandButtonHeight = 50
        this.runThousandButtonColor = [255,100,100]
        this.runThousandButton = new Button("SPIL x1000",this.runThousandButtonCenterX,this.runThousandButtonCenterY,this.runThousandButtonWidth, this.runThousandButtonHeight,this.runThousandButtonColor)
        this.runThousandButton.onclick(()=>{console.log("Run simulation 1000 times pressed")}) // For debug purposes
        this.clickables.push(this.runThousandButton)
     
        // CIRCUIT DIAGRAM SETTINGS
        this.circuitLineStrokeWeight = 1
        this.circuitLineStroke = this.sketch.color(0)
        this.circuitLineStartX = 50
        this.circuitLineEndX = this.sketch.windowWidth - 50
        this.circuitLineY = 150
        this.circuitLineFirstGateX = (this.circuitLineEndX-this.circuitLineStartX)/4+this.circuitLineStartX
        this.circuitLineSecondGateX = 2*(this.circuitLineEndX-this.circuitLineStartX)/4+this.circuitLineStartX
        this.circuitLineThirdGateX = 3*(this.circuitLineEndX-this.circuitLineStartX)/4+this.circuitLineStartX

        this.circuitButtonSelectFirstGate = new CircuitSlot("First gate", this.circuitLineFirstGateX, this.circuitLineY, 100, 100,0)
        this.clickables.push(this.circuitButtonSelectFirstGate)
        this.circuitButtonSelectFirstGate = new CircuitSlot("Second gate", this.circuitLineSecondGateX, this.circuitLineY, 100, 100,0)
        this.clickables.push(this.circuitButtonSelectFirstGate)
        this.circuitButtonSelectFirstGate = new CircuitSlot("Third gate", this.circuitLineThirdGateX, this.circuitLineY, 100, 100,0)
        this.clickables.push(this.circuitButtonSelectFirstGate)

        this.Xgate = new QuantumGate("Vend", this.gatesPanelPaddingLeft+100, this.sketch.windowHeight-100,100,100, [100,100,100])
        this.clickables.push(this.Xgate)
        this.Igate = new QuantumGate("Vend ikke", this.gatesPanelPaddingLeft + 0.5*this.gatesPanelWidth, this.sketch.windowHeight-100,100,100, [100,100,100])
        this.clickables.push(this.Igate)
        this.Hgate = new QuantumGate("Superposition", this.gatesPanelPaddingLeft + this.gatesPanelWidth-100, this.sketch.windowHeight-100,100,100, [100,100,100])
        this.clickables.push(this.Hgate)
    }

    set_2d_sketch(sketch){
        this.sketch = sketch
    }

    set_3d_sketch(sketch){
        this.sketch3D = sketch
    }

    resize(){
        this.init(this.sketch)
    }

    mouseClicked(){
        // This does not take anything into account (Z order and such)
        this.clickables.forEach((element)=>{
            if (element.ismouseover(this.sketch)) {
                element.click()
            }
        })
    }

    drawGatesPanel(){
        this.sketch.fill(this.gatesPanelFill)
        this.sketch.strokeWeight(this.gatesPanelStrokeWeight)
        this.sketch.stroke(this.gatesPanelStroke)
        this.sketch.rect(this.gatesPanelPaddingLeft, this.sketch.windowHeight-this.gatesPanelPaddingBottom-this.gatesPanelHeight, this.gatesPanelWidth, this.gatesPanelHeight, this.gatesPanelCornerRadius)
    }

    drawClickables(){
        this.clickables.forEach((element)=>{element.draw(this.sketch)})
    }    

    drawCircuitDiagram(){
        //Draw horizontal line
        this.sketch.strokeWeight(this.circuitLineStrokeWeight)
        this.sketch.stroke(this.circuitLineStroke)
        this.sketch.line(this.circuitLineStartX,this.circuitLineY,this.circuitLineEndX,this.circuitLineY)
    }

    draw3D(){
        this.sketch3D.clear();
        this.sketch3D.rotateX(this.sketch3D.frameCount*0.01)
        this.sketch3D.rotateY(this.sketch3D.frameCount*0.5);
        this.sketch3D.cylinder(100,10)
    }
}