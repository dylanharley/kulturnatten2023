class Clickable {
    constructor(){
    }
    
    onclick(onclick){
        this.onclick=onclick // Kinda love this method...
        //console.log("game state is " + gamemanager.gameState)
        return this.onclick
    }

    ismouseover(sketch){
        return false
    }

    draw(sketch){
        return false
    }

}