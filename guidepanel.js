class GuidePanel {

    constructor(posX,posY,width,height, gm) {

        this.gamemanager = gm

        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.titleWidth = 2*width/3
        this.titleHeight = 50
        this.margin = 40

        // Colors
        this.bgColor = (255,250)
        this.textColor = "#463F3A"
        this.titleBgColor = "#808A9F"
        this.titleColor = "#FFFFFF"
        // Text
        this.textSize = 15
        this.startText = "De to bokse ovenfor repræsenterer din strategi. Du kan vælge, om du vil vende mønten eller ej, eller om du vil bruge en kvantestrategi.\n\nTryk på en af boksene for at se de mulige træk."
        this.startTitle =  "VÆLG DIN STRATEGI"
        this.displayText = this.startText
        this.boxTitle = this.startTitle
        // State tracking
        this.displayHelp = true
        this.currentState = PICKING_SLOT
        this.hasPickedGate = false
        this.hasShownPlayMessage = false
        this.showArrows = true
    }

    reset(){
        this.displayHelp = true
        this.currentState = this.gamemanager.gameState
        this.hasPickedGate = false
        this.hasShownPlayMessage = false
        this.displayText = this.startText
        this.boxTitle = this.startTitle
    }

    update_state(sketch){
        if (this.gamemanager.gameState != this.currentState){
            // State has changed!
            if (this.gamemanager.gameState != PICKING_SLOT && this.gamemanager.gameState != PICKING_GATE){
                this.displayHelp = false
            }
            if (!this.hasPickedGate){
                // Show help message for selecting gate
                this.posX = sketch.windowWidth-this.posX
                this.displayText = "Tryk på en gate for at vælge din træk."
                this.hasPickedGate = true
            } else {
                if (!this.hasShownPlayMessage){
                    // Show help message for playing
                    this.boxTitle = "NÅR DU ER KLAR"
                    this.displayText = "Når du er færdig med at vælge din strategi, tryk på pilen nedenunder for at spille.\n\nDu kan også se, hvor mange gange du vinder hvis du spiller 1000 gange ved at trykke på 'SPIL 1000'."
                    this.hasShownPlayMessage = true
                } else {
                    this.displayHelp = false
                }
            } 
            this.currentState = this.gamemanager.gameState
        }
    }

    draw_arrow(x,y,angle,fill,stroke,strokeW, scale, sketch){
        sketch.push()
        sketch.fill(fill)
        sketch.stroke(stroke)
        sketch.strokeWeight(strokeW/scale)
        sketch.translate(x,y)
        sketch.rotate(angle)
        sketch.scale(scale)
        sketch.beginShape()
        sketch.vertex(10,30)
        sketch.vertex(10,0)
        sketch.vertex(20,0)
        sketch.vertex(0,-30)
        sketch.vertex(-20,0)
        sketch.vertex(-10,0)
        sketch.vertex(-10,30)
        sketch.endShape(sketch.CLOSE)
        sketch.pop()
    }

    draw(sketch) {
        this.update_state(sketch)

        // Draw arrows
        if (this.displayHelp && this.currentState == PICKING_SLOT && !this.hasPickedGate){
            this.draw_arrow(this.gamemanager.gui.circuitButtonSelectFirstGate.x, this.gamemanager.gui.circuitButtonSelectFirstGate.y-100, Math.PI, 255,0,1, 1.2+0.3*Math.sin(sketch.frameCount/60),sketch)
            this.draw_arrow(this.gamemanager.gui.circuitButtonSelectThirdGate.x, this.gamemanager.gui.circuitButtonSelectThirdGate.y-100, Math.PI, 255,0,1, 1.2+0.3*Math.sin(sketch.frameCount/60),sketch)    
        }
        if (this.displayHelp  && this.currentState == PICKING_GATE){
            this.draw_arrow(this.gamemanager.gui.Xgate.x, this.gamemanager.gui.Xgate.y-150, Math.PI, 255,0,1, 1.2+0.3*Math.sin(sketch.frameCount/60),sketch)
            this.draw_arrow(this.gamemanager.gui.Hgate.x, this.gamemanager.gui.Hgate.y-150, Math.PI, 255,0,1, 1.2+0.3*Math.sin(sketch.frameCount/60),sketch)    
            this.draw_arrow(this.gamemanager.gui.Igate.x, this.gamemanager.gui.Igate.y-150, Math.PI, 255,0,1, 1.2+0.3*Math.sin(sketch.frameCount/60),sketch)

        }

        if (this.displayHelp) {
            sketch.fill(this.bgColor)
            sketch.stroke(this.titleBgColor)
            sketch.strokeWeight(2)
            sketch.rect(this.posX-this.width/2,this.posY-this.height/2, this.width,this.height,10)

            sketch.noStroke()
            sketch.fill(this.titleBgColor)
            sketch.rect(this.posX-this.titleWidth/2, this.posY-this.height/2-this.titleHeight/2,this.titleWidth, this.titleHeight,10)

            sketch.textSize(this.textSize)
            sketch.fill(this.textColor)
            sketch.text(this.displayText,this.posX-this.width/2+this.margin,this.posY-this.height/2+this.titleHeight/3,this.width-this.margin*2, this.height-this.titleHeight/3);

            sketch.fill(this.titleColor)
            sketch.textAlign(sketch.CENTER, sketch.CENTER)
            sketch.text(this.boxTitle, this.posX-this.titleWidth/2, this.posY-this.height/2-this.titleHeight/2,this.titleWidth, this.titleHeight)
        }
    }
}