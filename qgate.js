class QuantumGate extends Button {
    constructor(name, posX, posY, width, height,fill,gateType){
        super(name, posX, posY, width, height, fill)
        this.gateType = gateType
    }

    get_matrix(){
        // Returns matrix corresponding to gate, depending on type of gate
        // TODO: IMPLEMENT
        return [[1,0],[0,1]]
    }

    onclick() {
        if (gamemanager.gameState == 1) {
            gamemanager.set_gate(this.gateType)
            gamemanager.set_state(0)
        }
    }

}