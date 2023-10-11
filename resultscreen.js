class ResultScreen extends Clickable {

    constructor(posX,posY,width,height) {
        super();
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
    }

    click(gamemanager) {
        if (gamemanager.gameState == DISPLAYING_RESULT) {
            gamemanager.reset();
        }
    }
    ismouseover(sketch) {return true}

    draw(sketch) {
        if (gamemanager.gameState != DISPLAYING_RESULT) return false;

        sketch.stroke(100);
        sketch.strokeWeight(1);
        sketch.fill(200,200,200);
        sketch.rect(this.posX - this.width/2, this.posY - this.height/2, this.width, this.height, 15)
        sketch.textAlign(sketch.CENTER)
        sketch.strokeWeight(0)
        sketch.fill(0)
        let message = "Du vinter! :)"
        if (gamemanager.lastResult == LOSE) message = "Du taber :(";
        sketch.text(message + "\n" + "Click anywhere to play again!",this.posX,this.posY);
    }
}