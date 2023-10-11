class ResultScreen extends Clickable {

    click(gamemanager) {
        if (gamemanager.gameState == DISPLAYING_RESULT) {
            gamemanager.reset();
        }
    }
    ismouseover(sketch) {return true}

    draw(sketch) {
        if (gamemanager.gameState != DISPLAYING_RESULT) return false;
        
        gamemanager.lastResult;

    }
}