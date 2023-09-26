class GUI {
    constructor(canvas){

        this.init()
            
        }
    
    init(){
        this.canvas = canvas
        
        this.clickables = []

        // add rule if screen is too small?
        this.padding = 20

        // GATES BOTTOM PANEL SETTINGS
        // TODO: Make this update when window is resized
        this.gatesPanelPaddingBottom = 20
        this.gatesPanelPaddingLeft = 50
        this.gatesPanelWidth = 2/3*windowWidth
        this.gatesPanelHeight = 160

        this.gatesPanelFill = color(255,255,255)
        this.gatesPanelStroke = color(0,0,0)
        this.gatesPanelStrokeWeight = 1
        this.gatesPanelCornerRadius = 15

        // "Run simulation once" button
        this.runOnceButtonCenterX = windowWidth-150/2-50
        this.runOnceButtonCenterY = windowHeight-50/2-120
        this.runOnceButtonWidth = 150
        this.runOnceButtonHeight = 50
        this.runOnceButtonColor = [255,100,100]
        this.runOnceButton = new Button("SPIL",this.runOnceButtonCenterX,this.runOnceButtonCenterY,this.runOnceButtonWidth, this.runOnceButtonHeight,this.runOnceButtonColor)
        this.runOnceButton.onclick(()=>{console.log("Run simulation once pressed")}) // For debug purposes
        this.clickables.push(this.runOnceButton)

        // "Run 1000 times" button
        this.runThousandButtonCenterX = windowWidth-150/2-50
        this.runThousandButtonCenterY = windowHeight-50/2-50
        this.runThousandButtonWidth = 150
        this.runThousandButtonHeight = 50
        this.runThousandButtonColor = [255,100,100]
        this.runThousandButton = new Button("SPIL x1000",this.runThousandButtonCenterX,this.runThousandButtonCenterY,this.runThousandButtonWidth, this.runThousandButtonHeight,this.runThousandButtonColor)
        this.runThousandButton.onclick(()=>{console.log("Run simulation 1000 times pressed")}) // For debug purposes
        this.clickables.push(this.runThousandButton)
     
        // CIRCUIT DIAGRAM SETTINGS
        this.circuitLineStrokeWeight = 1
        this.circuitLineStroke = color(0)
        this.circuitLineStartX = 50
        this.circuitLineEndX = windowWidth - 50
        this.circuitLineY = 150
        this.circuitLineFirstGateX = (this.circuitLineEndX-this.circuitLineStartX)/4+this.circuitLineStartX
        this.circuitLineSecondGateX = 2*(this.circuitLineEndX-this.circuitLineStartX)/4+this.circuitLineStartX
        this.circuitLineThirdGateX = 3*(this.circuitLineEndX-this.circuitLineStartX)/4+this.circuitLineStartX

        this.circuitButtonSelectFirstGate = new Button("First gate", this.circuitLineFirstGateX, this.circuitLineY, 100, 100, color(100,255,100))
        this.clickables.push(this.circuitButtonSelectFirstGate)
        this.circuitButtonSelectFirstGate = new Button("Second gate", this.circuitLineSecondGateX, this.circuitLineY, 100, 100, color(100,255,100))
        this.clickables.push(this.circuitButtonSelectFirstGate)
        this.circuitButtonSelectFirstGate = new Button("Third gate", this.circuitLineThirdGateX, this.circuitLineY, 100, 100, color(100,255,100))
        this.clickables.push(this.circuitButtonSelectFirstGate)
    }

    resize(){
        this.init()
    }

    mouseClicked(){
        // This does not take anything into account (Z order and such)
        this.clickables.forEach((element)=>{
            if (element.ismouseover()) {
                element.click()
            }
        })
    }

    drawGatesPanel(){
        fill(this.gatesPanelFill)
        strokeWeight(this.gatesPanelStrokeWeight)
        stroke(this.gatesPanelStroke)
        rect(this.gatesPanelPaddingLeft, windowHeight-this.gatesPanelPaddingBottom-this.gatesPanelHeight, this.gatesPanelWidth, this.gatesPanelHeight, this.gatesPanelCornerRadius)
    }

    drawClickables(){
        this.clickables.forEach((element)=>{element.draw()})
    }    

    drawCircuitDiagram(){
        //Draw horizontal line
        strokeWeight(this.circuitLineStrokeWeight)
        stroke(this.circuitLineStroke)
        line(this.circuitLineStartX,this.circuitLineY,this.circuitLineEndX,this.circuitLineY)
    }

}