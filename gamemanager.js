const PICKING_SLOT = 0
const PICKING_GATE = 1
const PLAYING = 2
const DISPLAYING_RESULT = 3

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
    }

    select_slot(slot){
        this.selectedSlot = slot
    }

    set_state(state) {
        this.gameState = state
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


}