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

        // Hardcoded colors and stuff
        this.titleBgColor = "#808A9F"
        this.titleColor = "#FFFFFF"
        this.bgColor = (255,250)
        this.textColor = "#463F3A"

        this.titleWidth = this.width*2/3
        this.titleHeight = 50
        this.barHeight = this.height/2;
        this.barWidth = (this.width - 80)/2;



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

            
            // Draw main rectangle
            sketch.strokeWeight(2);
            sketch.stroke(this.titleBgColor);
            sketch.fill(this.bgColor);
            sketch.rect(this.posX-this.width/2,this.posY - this.height/2,this.width, this.height,10)
            // Draw title rectangle
            sketch.noStroke()
            sketch.fill(this.titleBgColor)
            sketch.rect(this.posX-this.titleWidth/2, this.posY-this.height/2-this.titleHeight/2, this.titleWidth, this.titleHeight, 10)
            // Draw title text
            sketch.noStroke();
            sketch.fill(this.titleColor);
            sketch.text("RESULTATER",this.posX-this.titleWidth/2,this.posY-this.titleHeight/2-this.height/2, this.titleWidth, this.titleHeight);
            // Draw bottom text
            if (gamemanager.gameState == DISPLAYING_MANY_RESULTS) {
                sketch.noStroke()
                sketch.fill(this.textColor)
                sketch.text("Du har vundet " + this.wins + " ud af 1000 spil!\nTryk hvor som helst for at starte forfra",this.posX,this.posY+this.height/3+15);
            }

            // Draw bar chart
            sketch.strokeWeight(1);
            sketch.stroke(this.titleBgColor);
            sketch.fill(100,200,100);
            sketch.rect(this.posX - this.barWidth - 10, this.posY-this.barHeight*this.wins/1000+this.height/4, this.barWidth,this.barHeight*this.wins/1000,0);

            sketch.fill(200,100,100);
            sketch.rect(this.posX + 10, this.posY-this.barHeight*this.losses/1000+this.height/4,this.barWidth,this.barHeight*this.losses/1000,0);


            sketch.noStroke()
            sketch.fill(this.textColor)
            sketch.text("'Q': " + this.wins, this.posX - this.barWidth/2 - 10, this.posY +this.height/4- this.barHeight*this.wins/1000 - 10);
            sketch.text("'#': " + this.losses, this.posX + this.barWidth/2 + 10, this.posY +this.height/4-this.barHeight*this.losses/1000 - 10);

        }
        
    }
}