class Button extends Clickable {
    constructor(name, posX, posY, width, height, fill){
        super()
        this.name = name
        this.x = posX
        this.y = posY
        this.width = width
        this.height = height

        this.fill = fill
        this.hoverFill = 150 
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

    ismouseover(){
        // Simple test to see if the cursor is over the button
        // TODO: What about touch?
       return (this.x-this.width/2 <= mouseX && this.x+this.width/2 >= mouseX && this.y-this.height/2 <= mouseY && this.y+this.height/2 >= mouseY)
    }


    draw(){
        // TODO: Draw nicer buttons        
        stroke(100)
        strokeWeight(1)
        if (this.ismouseover()){
            fill(this.hoverFill)
        } else {
            fill(this.fill)
        }
        rect(this.x -this.width/2, this.y-this.height/2, this.width, this.height, 15) // remember that rect() from p5 draws rectangle using x,y for upper left corner

        textAlign(CENTER)
        strokeWeight(0)
        fill(0)
        text(this.name, this.x, this.y)
    }

    click(){
        // Execute click action
        this.onclick()
    }
}