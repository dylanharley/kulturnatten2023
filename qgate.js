class QuantumGate extends Button {
    constructor(name, posX, posY, width, height, fill, gateType){
        super(name, posX, posY, width, height, fill)
        this.gateType = gateType
    }



    click() {
        if (arguments.length > 0){
            gamemanager = arguments[0]
            // Check that we are picking a gate. In that case, select the right gate.
            if (gamemanager.gameState == PICKING_GATE) {
                gamemanager.set_gate(this.gateType)
                gamemanager.set_state(PICKING_SLOT)
                gamemanager.gui.circuitButtonSelectFirstGate.deselect()
                gamemanager.gui.circuitButtonSelectSecondGate.deselect()
                gamemanager.gui.circuitButtonSelectThirdGate.deselect()
            }    
        } 
    }

}