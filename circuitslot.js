class CircuitSlot extends Clickable {

    constructor(name, posX, posY, width, height,hidden) {
        super()
        this.name = name
        this.x = posX
        this.y = posY
        this.width = width
        this.height = height
        this.hidden=hidden
        this.selected = 0
        this.gateType = "I"
        this.hoverFat = 5
    }

    set_position(newX,newY) {
        this.x = newX
        this.y = newY
    }

    resize(newWidth, newHeight){
        this.width = newWidth
        this.height = newHeight
    }

    ismouseover(sketch){
        // Simple test to see if the cursor is over the button
        // TODO: What about touch?
       return (this.x-this.width/2 <= sketch.mouseX && this.x+this.width/2 >= sketch.mouseX && this.y-this.height/2 <= sketch.mouseY && this.y+this.height/2 >= sketch.mouseY)
    }


    draw(sketch){
        // TODO: Draw nicer buttons        
        sketch.stroke(100)
        sketch.strokeWeight(1)
        let drawWidth = this.width;
        let drawHeight = this.height;
        if (this.ismouseover(sketch) && gamemanager.gameState == 0) {
            drawWidth += this.hoverFat;
            drawHeight += this.hoverFat;
        }
        if (this.selected == 1) {
            // Drawing when selected
            sketch.fill([100+50*Math.sin(sketch.frameCount/8),100+50*Math.cos(sketch.frameCount/8),200]);
            sketch.rect(this.x -drawWidth/2, this.y-drawHeight/2, drawWidth, drawHeight, 15)
            // Check whether a gate was chosen
            if (gamemanager.selectedgate != -1) {
                this.gateType=gamemanager.selectedgate;
                this.selected = 0;
            }
        } else {
            switch (this.gateType) {
                case "I": // Drawing when identity
                    sketch.fill([255,255,255]);
                    sketch.rect(this.x -drawWidth/2, this.y-drawHeight/2, drawWidth, drawHeight, 15)
                    break
                case "X": // Drawing when flipping
                    sketch.fill([200,100,100]);
                    sketch.rect(this.x -drawWidth/2, this.y-drawHeight/2, drawWidth, drawHeight, 15)
                    break
                case "H": // Drawing when hadamarding
                    sketch.fill([100,200,100]);
                    sketch.rect(this.x -drawWidth/2, this.y-drawHeight/2, drawWidth, drawHeight, 15)
                    break
            }
            if (this.ismouseover(sketch) && gamemanager.gameState == 0) {
                sketch.rect(this.x - (this.hoverFat+this.width)/2, this.y-(this.hoverFat+this.height)/2, this.hoverFat+this.width, this.hoverFat+this.height, 15)
            } else {
                sketch.rect(this.x -this.width/2, this.y-this.height/2, this.width, this.height, 15)
            }
        }
        
        sketch.textAlign(sketch.CENTER)
        sketch.strokeWeight(0)
        sketch.fill(0)
        sketch.text(this.gateType, this.x, this.y)
    }

    click(){
        if (this.selected == 1) {
            this.selected = 0;
            gamemanager.set_state(0);
            return
        }
        if (this.hidden == 0 && (gamemanager.gameState == 0)) { // i.e. if you can click it
            this.selected = 1;
            gamemanager.set_gate(-1);
            gamemanager.set_state(1);
        }
    }

}