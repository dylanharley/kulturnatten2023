class GuidePanel {

    constructor(posX,posY,width,height) {

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
        this.displayText = this.startText
        this.boxTitle = "VÆLG DIN STRATEGI"
        // State tracking
        this.displayHelp = true
        this.currentState = PICKING_SLOT
        this.hasPickedGate = false
        this.hasShownPlayMessage = false
    }

    reset(){
        this.displayHelp = true
        this.currentState = gamemanager.gameState
        this.hasPickedGate = false
        this.hasShownPlayMessage = false
    }

    update_state(sketch){
        if (gamemanager.gameState != this.currentState){
            // State has changed!
            if (gamemanager.gameState != PICKING_SLOT && gamemanager.gameState != PICKING_GATE){
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
            this.currentState = gamemanager.gameState
        }
    }

    draw(sketch) {
        this.update_state(sketch)

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