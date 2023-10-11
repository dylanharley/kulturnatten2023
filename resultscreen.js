class ResultScreen extends Clickable {

    click(gamemanager) {
        if (gamemanager.gameState == DISPLAYING_RESULT) {
            gamemanager.reset();
        }
    }
    ismouseover(sketch) {return true}

    draw(sketch) {
        if (gamemanager.gameState != DISPLAYING_RESULT) return false;
        
        let x = sketch.windowWidth / 2;
        let y = sketch.windowHeight / 2 - 100;
        let w = 200;
        let h = 100;

        sketch.stroke(100);
        sketch.strokeWeight(1);
        sketch.fill(200,200,200);
        sketch.rect(x - w/2, y - h/2, w, h, 15)
        sketch.textAlign(sketch.CENTER)
        sketch.strokeWeight(0)
        sketch.fill(0)
        let message = "Du vinter! :)"
        if (gamemanager.lastResult == LOSE) message = "Du taber :(";
        sketch.text(message + "\n" + "Click anywhere to play again!",x,y);
    }
}