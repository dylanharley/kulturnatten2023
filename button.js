class Button extends Clickable {
    constructor(name, posX, posY, width, height, fill){
        super()
        this.name = name
        this.x = posX
        this.y = posY
        this.width = width
        this.height = height

        this.fill = fill
        this.hoverFill = []
        for (let i = 0; i < this.fill.length; i++){
            this.hoverFill.push(0.9*fill[i])
        }
        this.hoverFat = 5; // makes hovering induce fattening
    }

    set_fill(newFill){
        this.fill = newFill
    }

    set_hover_fill(newFill){
        this.hoverFill = newFill
    }

    set_position(newX, newY) {
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
            sketch.fill(this.hoverFill);
            sketch.rect(this.x -this.width/2 - this.hoverFat/2, this.y-this.height/2 - this.hoverFat/2, this.width + this.hoverFat, this.height + this.hoverFat, 15) // remember that rect() from p5 draws rectangle using x,y for upper left corner
        } else {
            sketch.fill(this.fill)
            sketch.rect(this.x -this.width/2, this.y-this.height/2, this.width, this.height, 15) // remember that rect() from p5 draws rectangle using x,y for upper left corner
        }

        sketch.textAlign(sketch.CENTER, sketch.CENTER)
       // sketch.strokeWeight(1)
     //   sketch.stroke(0)
        sketch.fill(0)
        sketch.noStroke()
 //       sketch.textFont("Helvetica",20)
        sketch.text(this.name, this.x-this.width/2, this.y-this.height/2, this.width, this.height)
    }

    click(){
        // Execute click action
        this.onclick()
    }
}