class GUI {
    constructor(canvas){
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
        this.runOnceButtonCenterX = 100
        this.runOnceButtonCenterY = 100
        this.runOnceButtonWidth = 150
        this.runOnceButtonHeight = 50
        this.runOnceButtonColor = [255,100,100]
        this.runOnceButton = new Button("SPIL",this.runOnceButtonCenterX,this.runOnceButtonCenterY,this.runOnceButtonWidth, this.runOnceButtonHeight,this.runOnceButtonColor)
        this.runOnceButton.onclick(()=>{console.log("Run simulation once pressed")}) // For debug purposes
        this.clickables.push(this.runOnceButton)

        // "Run 1000 times" button
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

}