class ManyResultScreen extends Clickable {
    
    constructor() {
        super();
        this.timeWhenIStartedCalculatingLoadsOfGameRuns = -1;
        this.speedAtWhichICalculateLoadsOfGameRuns = 0.01;
        this.wins = 0;
        this.losses = 0;
    }

    click(gamemanager) {
        if (gamemanager.gameState == DISPLAYING_MANY_RESULTS) {
            gamemanager.reset();
            this.timeWhenIStartedCalculatingLoadsOfGameRuns = -1;
        }
    }
    ismouseover(sketch) {return true}

    draw(sketch) {
        if (gamemanager.gameState == CALCULATING_MANY_RESULTS) {
            if (this.timeWhenIStartedCalculatingLoadsOfGameRuns == -1) {
                this.wins = 0;
                this.losses = 0;
                this.timeWhenIStartedCalculatingLoadsOfGameRuns = sketch.millis();
            }
            let numberOfRunsToSimulate = Math.min(1000 - this.wins - this.losses,(sketch.millis() - this.timeWhenIStartedCalculatingLoadsOfGameRuns)*this.speedAtWhichICalculateLoadsOfGameRuns);
            for (let i = 0; i < numberOfRunsToSimulate; i++) {
                let win = (Math.random() < gamemanager.probability_of_win());
                if (win) this.wins++;
                else this.losses++;
            }
            if (this.wins + this.losses >= 1000) gamemanager.set_state(DISPLAYING_MANY_RESULTS);
        }
        sketch.text("wins: " + this.wins + ", losses: " + this.losses,100,100);
    }
}