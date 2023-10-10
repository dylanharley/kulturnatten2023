class ResultScreen extends Clickable {

    click(gamemanager) {
        if (gamemanager.gameState == DISPLAYING_RESULT) {
            gamemanager.reset();
        }
    }
    ismouseover(sketch) {return true}
}