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
        this.gateType = -1
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
        if (this.ismouseover(sketch)){
            sketch.fill([100,100,100]);
        } else {
            sketch.fill([100,100,100])
        }

        if (this.selected == 1) {
            sketch.fill([200,100,100]);
            if (gamemanager.selectedgate != -1) {
                this.gateType=gamemanager.selectedgate;
                this.selected = 0;
            }
        }
        sketch.rect(this.x -this.width/2, this.y-this.height/2, this.width, this.height, 15) // remember that rect() from p5 draws rectangle using x,y for upper left corner
        
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