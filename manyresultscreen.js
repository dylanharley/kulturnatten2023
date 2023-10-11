class ManyResultScreen extends Clickable {
    
    constructor(posX,posY,width,height,barHeight) {
        super();
        this.timeWhenIStartedCalculatingLoadsOfGameRuns = -1;
        this.speedAtWhichICalculateLoadsOfGameRuns = 0.001;
        this.wins = 0;
        this.losses = 0;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.barHeight = barHeight;
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

            let barWidth = (this.width - 30)/2;

            sketch.strokeWeight(1);
            sketch.stroke(0);
            sketch.fill(200);
            sketch.rect(this.posX-this.width/2,this.posY-this.barHeight - this.height/2,this.width,this.barHeight + this.height,15)


            // Draw bar chart
            sketch.strokeWeight(1);
            sketch.stroke(0);
            sketch.fill(0,200,0);
            sketch.rect(this.posX - barWidth - 10, this.posY - this.barHeight*(this.wins/1000),barWidth,this.barHeight*this.wins/1000,0);

            sketch.fill(200,0,0);
            sketch.rect(this.posX + 10, this.posY - this.barHeight*(this.losses/1000),barWidth,this.barHeight*this.losses/1000,0);

            // Draw text
            sketch.strokeWeight(0);
            sketch.fill(0);
            sketch.text("Results",this.posX,this.posY-this.barHeight-this.height/4);

            sketch.text("Wins: " + this.wins, this.posX - barWidth/2 - 10, this.posY - this.barHeight*this.wins/1000 - 10);
            sketch.text("Losses: " + this.losses, this.posX + barWidth/2 + 10, this.posY - this.barHeight*this.losses/1000 - 10);

            if (gamemanager.gameState == DISPLAYING_MANY_RESULTS) {
                sketch.text("You win " + this.wins + "/1000!\nClick anywhere to play again.",this.posX,this.posY+this.height/4);
            }
        }
        
    }
}