class ResultScreen extends Clickable {

    constructor(posX,posY,width,height) {
        super();
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.titleWidth = 250
        this.titleHeight = 50

        this.winningTitle = "DU  HAR  VUNDET!"
        this.losingTitle = "DU  HAR  TABT..."
        this.titleBgColor = "#808A9F"
        this.titleColor = "#FFFFFF"
        this.bgColor = "#FFFFFF"
        this.textColor = "#000000"
        this.winningText = "Mønten blev observeret i 'Q' tilstanden!"
        this.losingText = "Mønten blev observeret i '#' tilstanden!"
        this.superpositionText = "Mønten var i superposition af 'Q' og '#', og derfor var der 50% sandsynlighed for, at observere 'Q'."
        this.deterministicText = "Mønten var ikke i superposition, og udfaldet af observationen er deterministisk."
    }


    click(gamemanager) {
        if (gamemanager.gameState == DISPLAYING_RESULT) {
            gamemanager.reset();
        }
    }
    ismouseover(sketch) {return true}

    draw(sketch) {
        if (gamemanager.gameState == DISPLAYING_RESULT){

            // Frame for text
            sketch.strokeWeight(2);
            sketch.stroke(this.titleBgColor)
            sketch.fill(this.bgColor);
            sketch.rect(this.posX - this.width/2, this.posY - this.height/2, this.width, this.height, 10)

            // Frame around title
            sketch.noStroke();
            sketch.fill(this.titleBgColor);
            sketch.rect(this.posX - this.titleWidth/2, this.posY - this.height/2-this.titleHeight/2, this.titleWidth, this.titleHeight, 10)

            //Title
            sketch.push()
            sketch.textAlign(sketch.CENTER, sketch.CENTER)
            sketch.textSize(20)
            sketch.strokeWeight(0)
            sketch.fill(this.titleColor)
            if (gamemanager.lastResult == LOSE){
                sketch.text(this.losingTitle, this.posX - this.titleWidth/2, this.posY - this.height/2-this.titleHeight/2, this.titleWidth, this.titleHeight)
            } else {
                sketch.text(this.winningTitle, this.posX - this.titleWidth/2, this.posY - this.height/2-this.titleHeight/2, this.titleWidth, this.titleHeight)
            }
            sketch.pop()
            // Text
            sketch.push()
            sketch.textAlign(sketch.CENTER, sketch.CENTER)
            sketch.textSize(20)
            sketch.strokeWeight(0)
            sketch.fill(this.textColor)
            if (gamemanager.lastResult == LOSE){
                sketch.text(this.losingText, this.posX - this.width/2, this.posY - this.height/2, this.width, this.height/3)
            } else {
                sketch.text(this.winningText, this.posX - this.width/2, this.posY - this.height/2, this.width, this.height/3)
            }
            if (Math.pow(Math.abs(gamemanager.vectorState[0][0]),2) < 0.6){
                sketch.text(this.superpositionText, this.posX - this.width/2, this.posY + this.height/6, this.width, this.height/3)
            } else {
                sketch.text(this.deterministicText, this.posX - this.width/2, this.posY + this.height/6, this.width, this.height/3)

            }
            sketch.pop()

        }
    }
}