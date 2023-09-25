class QuantumGate extends Clickable {
    constructor(name, posX, posY, width, height, onclick){
        super(onclick)
        this.name = name
        this.x = posX
        this.y = posY
        this.width = width
        this.height = height

        this.fill = [100,200,200]
    }

    get_matrix(){
        // Returns matrix corresponding to gate, depending on type of gate
        // TODO: IMPLEMENT
        return [[1,0],[0,1]]
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

        // TODO: IMPLEMENT
       return (this.x-this.width/2 <= mouseX && this.x+this.width/2 >= mouseX && this.y-this.height/2 <= mouseY && this.y+this.height/2 >= mouseY)
    }

    draw(){
        // TODO: Better implement
        // remember that rect() from p5 draws rectangle using x,y for upper left corner
        stroke(100)
        fill(this.fill)
        rect(this.x -this.width/2, this.y-this.height/2, this.width, this.height)
    }
}