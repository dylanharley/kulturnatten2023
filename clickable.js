class Clickable {
    constructor(){
    }
    
    onclick(onclick){
        this.onclick=onclick // Kinda love this method...
        return this.onclick
    }

    ismouseover(sketch){
        return false
    }

    draw(sketch){
        return false
    }

}