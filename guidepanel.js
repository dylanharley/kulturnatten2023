class GuidePanel {

    constructor(posX,posY,width,height) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
    }

    draw(sketch) {
        switch (gamemanager.gameState) {
            case PICKING_SLOT:
                sketch.text("Click on a slot above to place a gate.\n\nWhen you are ready to play, press the button on the right.",this.posX-this.width/2,this.posY,this.width);
                break;
            case PICKING_GATE:
                sketch.text("Click on a gate below to place it in the slot.",this.posX-this.width/2,this.posY,this.width);
                break;
        }
    }
}