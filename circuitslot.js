class CircuitSlot extends Button {

    constructor(name, posX, posY, width, height, slot) {
        super(name, posX, posY, width, height, [0,0,0])

        this.hidden = false
        this.selected = false
        this.gateType = "I"
        this.slot = slot
    }

    get_matrix(){
        // Returns matrix corresponding to gate, depending on type of gate
        // TODO: IMPLEMENT

        if (this.gateType == "I"){
            return [[1,0],[0,1]]
        }
        if (this.gateType == "H"){
            return [[Math.sqrt(2)/2, Math.sqrt(2)/2],[Math.sqrt(2)/2,-Math.sqrt(2)/2]]
        }
        if (this.gateType == "X"){
            return [[0,1],[1,0]]
        }
    }

    toggle_hide(){
        this.hidden = !this.hidden
    }

    deselect(){
        if (this.selected){
            this.selected = false
        }
    }

    select_gate(gate){
        this.gateType = gate
    }

    draw(sketch){
        // TODO: Draw nicer buttons        
        sketch.stroke(100)
        sketch.strokeWeight(1)
        let drawWidth = this.width;
        let drawHeight = this.height;

        // Draw thicker button when the mouse is hovering over it
        if (this.ismouseover(sketch) && (!this.hidden)) {
            drawWidth += this.hoverFat;
            drawHeight += this.hoverFat;
        }
        
        // Check if the button has been selected
        if (this.selected) {
            // Rainbow!
            sketch.fill([100+50*Math.sin(sketch.frameCount/8),100+50*Math.cos(sketch.frameCount/8),200]);
            
/*            // Check whether a gate was chosen
            if (gamemanager.selectedgate != -1) {
                this.gateType=gamemanager.selectedgate;
                this.selected = 0;
            }*/
        } else {
            switch (this.gateType) {
                case "I": // Drawing when identity
                    sketch.fill([255,255,255]);
                    break
                case "X": // Drawing when flipping
                    sketch.fill([200,100,100]);
                    break
                case "H": // Drawing when hadamarding
                    sketch.fill([100,200,100]);
                    break
                case "?": // Drawing when hadamarding
                    sketch.fill([100,100,200]);
                    break
            }
        }
        sketch.rect(this.x -drawWidth/2, this.y-drawHeight/2, drawWidth, drawHeight, 15)
        sketch.textAlign(sketch.CENTER)
        sketch.strokeWeight(0)
        sketch.fill(0)
        sketch.text(this.gateType, this.x, this.y)
    }

    click(){
        if (arguments.length > 0){
            gamemanager = arguments[0]
        }
        if (this.selected) {
            this.selected = false;
            gamemanager.set_state(PICKING_SLOT);
            return
        }
        if (this.hidden == false && (gamemanager.gameState == PICKING_SLOT)) { // i.e. if you can click it
            this.selected = true;
            gamemanager.select_slot(this.slot);
            gamemanager.set_state(PICKING_GATE);
        }
    }
}