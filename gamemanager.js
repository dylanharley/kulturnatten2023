class GameManager {
    // Game states:
    // 0 -- Picking circuit slot
    // 1 -- Picking a gate, i.e. cannot click "play", can click on gate buttons
    // 2 -- Playing. I.e. nothing is clickable, animation is in progress
    // 3 -- Displaying results. Only clickable object should be some thing to go back to state 0 or 2.
    constructor () {
        this.gameState = 0;
        this.selectedgate = 0;
    }

    set_state(state) {
        this.gameState = state
    }

    set_gate(gate) {
        this.selectedgate = gate
    }

}