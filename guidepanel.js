class GuidePanel {

    draw(sketch) {
        let x = sketch.windowWidth / 4;
        let y = sketch.windowHeight / 2;
        let width = 200;
        switch (gamemanager.gameState) {
            case PICKING_SLOT:
                sketch.text("Click on a slot above to place a gate.\n\nWhen you are ready to play, press the button on the right.",x-width/2,y,width);
                break;
            case PICKING_GATE:
                sketch.text("Click on a gate below to place it in the slot.",x-width/2,y,width);
                break;
        }
    }
}