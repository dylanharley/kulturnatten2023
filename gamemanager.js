const PICKING_SLOT = 0
const PICKING_GATE = 1
const PLAYING = 2
const DISPLAYING_RESULT = 3
const CALCULATING_MANY_RESULTS = 4;
const DISPLAYING_MANY_RESULTS = 5;
const LOSE = 0
const WIN = 1

class GameManager {
    // Game states:
    // 0 -- Picking circuit slot
    // 1 -- Picking a gate, i.e. cannot click "play", can click on gate buttons
    // 2 -- Playing. I.e. nothing is clickable, animation is in progress
    // 3 -- Displaying results. Only clickable object should be some thing to go back to state 0 or 2.

    // "selectedSlot" controls which array element gets changed.
    // "circuitSlots" contains the current picked elements.
    constructor () {
        this.gameState = PICKING_SLOT;
        this.gui = new GUI(this)
        this.circuitSlots = ["I", null, "I"]
        this.selectedSlot = 0
        this.vectorState = [[1],[0]]
        this.lastResult = WIN
        this.highlightedGate = -1; // if between 0 and 2 then a gate should be highlighted


        this.animations = {"I": ()=>{this.gui.wait()}, "X": ()=>{this.gui.flipCoin()}, "H": ()=>{if(!this.gui.coinSuperposition){this.gui.splitCoin()}else{this.gui.desplitCoin()}}, "Wait": ()=>{this.gui.wait()}}
    }

    select_slot(slot){
        this.selectedSlot = slot
    }

    set_state(state) {
        this.gameState = state
        console.log("state changed to " + state)
    }

    set_gate(gate) {
        this.circuitSlots[this.selectedSlot] = gate
        switch (this.selectedSlot) 
        {
            case 0:
                this.gui.circuitButtonSelectFirstGate.select_gate(gate)
                break
            case 1:
                this.gui.circuitButtonSelectSecondGate.select_gate(gate)
                break
            case 2:
                this.gui.circuitButtonSelectThirdGate.select_gate(gate)
                break

        }
    }

    play_once(){
        // Reset state of game
        this.vectorState = [[1],[0]]
        this.gui.coinSuperposition = false
        this.gui.coinFaceUp = Q_FACE
        // Select the opponent's gate
        if (Math.random()>0.5){
            this.circuitSlots[1] = "I"
            this.gui.circuitButtonSelectSecondGate.select_gate("I")
        } else {
            this.circuitSlots[1] = "X" 
            this.gui.circuitButtonSelectSecondGate.select_gate("X")
        }
        this.set_state(PLAYING)

        // Find out what the final state of the game is
        let mat_mul = (A,B)=>{
            let outDim1 = A.length
            let outDim2 = B[0].length
            let multDim = A[0].length

            let C = []
            for (let i = 0; i< outDim1; i++){
                let tmpRow = []
                // build up rows of mat one at the time
                for (let k = 0; k < outDim2; k++){
                    // multiply row of A and col of B 
                    let tmpTotal = 0
                    for (let l = 0; l < multDim; l++){
                        tmpTotal = tmpTotal + A[i][l]*B[l][k]
                    }
                    tmpRow.push(tmpTotal)
                }
                C.push(tmpRow)
            }
            return C
        }
        this.vectorState = mat_mul(this.gui.circuitButtonSelectFirstGate.get_matrix(),this.vectorState)
        this.vectorState = mat_mul(this.gui.circuitButtonSelectSecondGate.get_matrix(),this.vectorState)
        this.vectorState = mat_mul(this.gui.circuitButtonSelectThirdGate.get_matrix(),this.vectorState)

        // Cheat: sample a probability distribution and see if player wins or not.
        if (Math.random()<Math.pow(Math.abs(this.vectorState[0][0]),2)){
            console.log("You win!")
            this.lastResult = WIN
        } else {
            console.log("You lose :/")
            this.lastResult = LOSE
        }
        
        // Queue the animations. If there are two H gates, we need to both split and desplit.
        this.gui.queueAnimation(this.animations[this.circuitSlots[0]])
        this.gui.queueAnimation(this.animations[this.circuitSlots[1]])
        this.gui.queueAnimation(this.animations[this.circuitSlots[2]])
        // Hacky way to wait till animations are all done before showing results
        this.gui.queueAnimation(this.animations["Wait"])

        
        //this.set_state(PICKING_SLOT)

    }

    probability_of_win() {
        if (this.circuitSlots[0] == "H" && this.circuitSlots[2] == "H") {return 1}
        else {
            return 0.5
        }
    }

    play_many() {
        this.set_state(CALCULATING_MANY_RESULTS);
    }

    reset() {
        this.set_state(PICKING_SLOT);
        this.highlightedGate = -1;
    }

    highlight_next_gate() {
        this.highlightedGate += 1;
    }

    display_result(){
        this.set_state(DISPLAYING_RESULT);
    }


}