class QuantumGate extends Button {
    constructor(name, posX, posY, width, height,fill){
        super(name, posX, posY, width, height, fill)
        console.log("aah")
    }

    get_matrix(){
        // Returns matrix corresponding to gate, depending on type of gate
        // TODO: IMPLEMENT
        return [[1,0],[0,1]]
    }

}