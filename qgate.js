class QuantumGate extends Button {
    constructor(name, posX, posY, width, height){
        super(name, posX, posY, width, height, [100,200,200])
    }

    get_matrix(){
        // Returns matrix corresponding to gate, depending on type of gate
        // TODO: IMPLEMENT
        return [[1,0],[0,1]]
    }

}