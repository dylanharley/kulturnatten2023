class ManyResultScreen extends Clickable {
    
    constructor() {
        super();
        this.timeWhenIStartedCalculatingLoadsOfGameRuns = -1;
        this.speedAtWhichICalculateLoadsOfGameRuns = 0.001;
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
            // this looks a bit silly
            gamemanager.highlightedGate = Math.round(Math.random()*4-0.5);

            if (this.wins + this.losses >= 1000) {
                gamemanager.set_state(DISPLAYING_MANY_RESULTS);
                gamemanager.highlightedGate = -1;
            }
        }
        if (gamemanager.gameState == CALCULATING_MANY_RESULTS || gamemanager.gameState == DISPLAYING_MANY_RESULTS) {
            // Draw rectangle
            let x = sketch.windowWidth / 2 + 300;
            let y = sketch.windowHeight / 2 + 100;
            let w = 250;
            let h = 100;

            let barHeight = 200;
            let barWidth = 100;

            sketch.strokeWeight(1);
            sketch.stroke(0);
            sketch.fill(200);
            sketch.rect(x-w/2,y-barHeight - h/2,w,barHeight + h,15)


            // Draw bar chart
            sketch.strokeWeight(1);
            sketch.stroke(0);
            sketch.fill(0,200,0);
            sketch.rect(x - barWidth - 10, y - barHeight*(this.wins/1000),barWidth,barHeight*this.wins/1000,0);

            sketch.fill(200,0,0);
            sketch.rect(x + 10, y - barHeight*(this.losses/1000),barWidth,barHeight*this.losses/1000,0);

            // Draw text
            sketch.strokeWeight(0);
            sketch.fill(0);
            sketch.text("Results",x,y-barHeight-h/4);

            sketch.text("Wins: " + this.wins, x - barWidth/2 - 10, y - barHeight*this.wins/1000 - 10);
            sketch.text("Losses: " + this.losses, x + barWidth/2 + 10, y - barHeight*this.losses/1000 - 10);

            if (gamemanager.gameState == DISPLAYING_MANY_RESULTS) {
                sketch.text("You win " + this.wins + "/1000!\nClick anywhere to play again.",x,y+h/4);
            }
        }
        
    }
}