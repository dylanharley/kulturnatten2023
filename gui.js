class GUI {
    constructor(gm){
            this.gamemanager = gm
        }
    
    init(){
        
        this.clickables = []

        // add rule if screen is too small?
        this.padding = 20

        // GATES BOTTOM PANEL SETTINGS
        // TODO: Make this update when window is resized
        this.gatesPanelPaddingBottom = 20
        this.gatesPanelPaddingLeft = 50
        this.gatesPanelWidth = 2/3*this.sketch.windowWidth
        this.gatesPanelHeight = 160

        this.gatesPanelFill = this.sketch.color(255,250)
        this.gatesPanelStroke = "#808A9F"
        this.gatesPanelStrokeWeight = 1
        this.gatesPanelCornerRadius = 15

        // "Run simulation once" button
        this.runOnceButtonCenterX = this.sketch.windowWidth-150/2-50
        this.runOnceButtonCenterY = this.sketch.windowHeight-50/2-120
        this.runOnceButtonWidth = 150
        this.runOnceButtonHeight = 50
        this.runOnceButtonColor = [255,100,100]
        this.runOnceButton = new Button("SPIL",this.runOnceButtonCenterX,this.runOnceButtonCenterY,this.runOnceButtonWidth, this.runOnceButtonHeight,this.runOnceButtonColor)
        this.runOnceButton.onclick(()=>{if (this.gamemanager.gameState == PICKING_SLOT) this.gamemanager.play_once()})
        this.clickables.push(this.runOnceButton)

        // "Run 1000 times" button
        this.runThousandButtonCenterX = this.sketch.windowWidth-150/2-50
        this.runThousandButtonCenterY = this.sketch.windowHeight-50/2-50
        this.runThousandButtonWidth = 150
        this.runThousandButtonHeight = 50
        this.runThousandButtonColor = [255,100,100]
        this.runThousandButton = new Button("SPIL x1000",this.runThousandButtonCenterX,this.runThousandButtonCenterY,this.runThousandButtonWidth, this.runThousandButtonHeight,this.runThousandButtonColor)
        this.runThousandButton.onclick(()=>{if (this.gamemanager.gameState == PICKING_SLOT) this.gamemanager.play_many()})
        this.clickables.push(this.runThousandButton)
        
        // Coordinates for single result popup
        this.resultX = this.sketch.windowWidth/2;
        this.resultY = this.sketch.windowHeight/2+25;
        this.resultWidth = 400;
        this.resultHeight = 300;

        // Coordinates for multiple results popup
        this.resultsX = this.sketch.windowWidth-300
        this.resultsY = this.sketch.windowHeight/2
        this.resultsWidth = 400
        this.resultsHeight = 350
        this.resultsBarHeight = 150;

        // Coordinates for guide popup -> note that they are changed for other messages
        this.guideX = 200;
        this.guideY = this.sketch.windowHeight/2;
        this.guideWidth = 300;
        this.guideHeight = 200;


        // Result screen:
        this.resultScreen = new ResultScreen(this.resultX,this.resultY,this.resultWidth,this.resultHeight);
        this.clickables.push(this.resultScreen);

        // Many result screen:
        this.manyResultScreen = new ManyResultScreen(this.resultsX,this.resultsY,this.resultsWidth,this.resultsHeight,this.resultsBarHeight);
        this.clickables.push(this.manyResultScreen);

        // Guide panel
        this.guidePanel = new GuidePanel(this.guideX,this.guideY,this.guideWidth,this.guideHeight, this.gamemanager);

        // CIRCUIT DIAGRAM SETTINGS
        this.circuitLineStrokeWeight = 1

        this.circuitLineStroke = this.sketch.color(0)
        this.circuitLineStartX = 50
        this.circuitLineEndX = this.sketch.windowWidth - 50
        this.circuitLineY = 150
        this.circuitLineFirstGateX = (this.circuitLineEndX-this.circuitLineStartX)/4+this.circuitLineStartX
        this.circuitLineSecondGateX = 2*(this.circuitLineEndX-this.circuitLineStartX)/4+this.circuitLineStartX
        this.circuitLineThirdGateX = 3*(this.circuitLineEndX-this.circuitLineStartX)/4+this.circuitLineStartX

        // Circuit diagram buttons
        this.circuitButtonSelectFirstGate = new CircuitSlot("First gate", this.circuitLineFirstGateX, this.circuitLineY, 100, 100, 0)
        this.circuitButtonSelectSecondGate = new CircuitSlot("Second gate", this.circuitLineSecondGateX, this.circuitLineY, 100, 100, 1)
        this.circuitButtonSelectThirdGate = new CircuitSlot("Third gate", this.circuitLineThirdGateX, this.circuitLineY, 100, 100, 2)
        this.circuitButtonSelectSecondGate.toggle_hide()
        this.circuitButtonSelectSecondGate.select_gate("?")
        this.clickables.push(this.circuitButtonSelectFirstGate)
        this.clickables.push(this.circuitButtonSelectSecondGate)
        this.clickables.push(this.circuitButtonSelectThirdGate)

        // Gate buttons
        this.Xgate = new QuantumGate("VEND", this.gatesPanelPaddingLeft+100, this.sketch.windowHeight-100,150,100, [200,100,100], "X")
        this.Igate = new QuantumGate("VEND EJ", this.gatesPanelPaddingLeft + 0.5*this.gatesPanelWidth, this.sketch.windowHeight-100,150,100, [255,255,255],"I")
        this.Hgate = new QuantumGate("SUPERPOSITION", this.gatesPanelPaddingLeft + this.gatesPanelWidth-100, this.sketch.windowHeight-100,150,100, [100,200,100], "H")
        this.clickables.push(this.Xgate)
        this.clickables.push(this.Igate)
        this.clickables.push(this.Hgate)


        // COIN FLIPPING
        // Should also be able to work in the case where two coins have to be shown
        this.coinAnimating = false
        this.coinStartAnimation = 0
        this.coinFaceUp = Q_FACE
        this.coinSuperposition = false
        this.coinAnimatingSuperposition = false

        // ANIMATION
        this.animating = false
        this.animationQueue = []
    }

    set_2d_sketch(sketch){
        this.sketch = sketch
    }

    set_3d_sketch(sketch){
        this.sketch3D = sketch
    }

    resize(){
        this.init(this.sketch)
    }

    mouseClicked(){
        // This does not take anything into account (Z order and such)
        this.clickables.forEach((element)=>{
            if (element.ismouseover(this.sketch)) {
                element.click(this.gamemanager)
            }
        })
    }

    // 3D animations

    flipCoin(){
        if (!this.coinAnimating){
            this.coinStartAnimation = this.sketch3D.millis()
            this.coinAnimating = true
        }
    }

    splitCoin(){
        if (!this.coinAnimating && !this.coinSuperposition){
            this.coinStartAnimation = this.sketch3D.millis()
            this.coinAnimating= true
            this.coinSuperposition = true
            this.coinAnimatingSuperposition = true
        }
    }

    desplitCoin(){
        if (!this.coinAnimating && this.coinSuperposition){
            this.coinStartAnimation = this.sketch3D.millis()
            this.coinAnimating = true
            this.coinSuperposition = false
            this.coinAnimatingSuperposition = true
        }

    }

    wait(){
        this.coinStartAnimation = this.sketch3D.millis()
    }


    // Queue management

    advanceQueue(){
        if (this.animationQueue.length > 0 && !this.animating){
            this.animating = true
            let newAnimation = this.animationQueue.shift()
            newAnimation()
            this.gamemanager.highlight_next_gate();
//            console.log("thing happening, gate " + this.gamemanager.highlightedGate + "highlighted");
        } else if (this.animationQueue.length == 0 && this.gamemanager.gameState == PLAYING){
        // if queue is empty, and we are playing, game is over.
            this.circuitButtonSelectSecondGate.select_gate("?")
            this.gamemanager.display_result()
        }
    }

    queueAnimation(animation){
        this.animationQueue.push(animation)
    }

    // 3D drawing stuff

    animateCoin(){
        var x = 0
        var y = 0
        var z = 0
        var rot = 0
        var coinSeparation = 300
        var alphaFirstCoin = 128
        var alphaSecondCoin = 127


        const oscillation = (t)=>{
            return 50*Math.sin(t)
        }

        const movementHomotopy = (t)=>{
            // t is between 0 and 1
            return -300*4*t*(1-t)
        }

        const rotationHomotopy = (t)=>{
            var nonRotatingBit = 1/10;
            if (t<nonRotatingBit){return 0}
            else if (t<1-nonRotatingBit) {return 0.5*Math.PI*(1-Math.cos(Math.PI*(t-nonRotatingBit)/(1-2*nonRotatingBit)))}
            else {return Math.PI}
        }

        const separationHomotopy = (t)=>{
            return 300*t
        }

        const reunionHomotopy = (t)=>{
            return separationHomotopy(1-t)
        }

        if (this.animating){
            var dt = (this.sketch3D.millis()-this.coinStartAnimation)/1000
            if (dt > 1){            
                if (!this.coinAnimatingSuperposition && this.coinAnimating && !this.coinSuperposition){
                    this.coinFaceUp = 1-this.coinFaceUp
                }
                this.animating = false
                this.coinAnimating = false
                this.coinAnimatingSuperposition = false

            }

            if (this.coinAnimating){
                if (this.coinAnimatingSuperposition){
                    y = movementHomotopy(dt)
    
                    if (this.coinSuperposition){
                        coinSeparation = separationHomotopy(dt)
                    } else {
                        coinSeparation = reunionHomotopy(dt)
                    }
                } else {
                    y = movementHomotopy(dt)
                    rot = rotationHomotopy(dt)
        
                }
            }
        }


        // Draw one or two coins depending on the state
        // To simulate transparency, overlay a white cylinder with transparency instead
        if (this.coinSuperposition || this.coinAnimatingSuperposition) {
            if (this.coinAnimatingSuperposition){
                var dt = (this.sketch3D.millis()-this.coinStartAnimation)/1000
                alphaFirstCoin = dt*180/Math.sqrt(2)
                alphaSecondCoin = dt*180/Math.sqrt(2)
            } else {
                // Quite messy: this.CoinStartAnimation resets after each gate, so rn making sure that one full cycle happens before that
                alphaFirstCoin = 180 * Math.abs(Math.sin(Math.PI/4+Math.PI*(this.sketch3D.millis()-this.coinStartAnimation)/1000))
                alphaSecondCoin = 180 * Math.abs(Math.cos(Math.PI/4+Math.PI*(this.sketch3D.millis()-this.coinStartAnimation)/1000))
            }
            this.sketch3D.translate(x, y, z)
            this.sketch3D.push()
            this.sketch3D.translate(coinSeparation/2,0,0)
            this.sketch3D.rotateZ(rot)

            this.sketch3D.drawCoin(1-this.coinFaceUp)
            this.sketch3D.fill(255,alphaFirstCoin)
            this.sketch3D.noStroke()
            this.sketch3D.cylinder(75.5,22)

        

            this.sketch3D.rotateZ(-rot)
            this.sketch3D.pop()

            this.sketch3D.translate(-coinSeparation/2,-1,0)
            this.sketch3D.rotateZ(rot)
            this.sketch3D.drawCoin(this.coinFaceUp)
            this.sketch3D.fill(255,alphaSecondCoin)
            this.sketch3D.noStroke()
            this.sketch3D.cylinder(75.5,22)
            
        } else {
            this.sketch3D.translate(x, y, z)
            this.sketch3D.rotateZ(rot)
            this.sketch3D.drawCoin(this.coinFaceUp)
        }
/*        // Draw shadow coin first.
        this.sketch3D.fill([200,200,100,50])
        this.sketch3D.noStroke()
        this.sketch3D.cylinder(400,10,30)*/
        

    }

    draw3D(){
        this.sketch3D.clear();
        this.animateCoin()
        this.advanceQueue();
    }

    // 2D Drawing stuff

    drawGatesPanel(){
        this.sketch.fill(this.gatesPanelFill)
        this.sketch.strokeWeight(this.gatesPanelStrokeWeight)
        this.sketch.stroke(this.gatesPanelStroke)
        this.sketch.rect(this.gatesPanelPaddingLeft, this.sketch.windowHeight-this.gatesPanelPaddingBottom-this.gatesPanelHeight, this.gatesPanelWidth, this.gatesPanelHeight, this.gatesPanelCornerRadius)
    }

    drawClickables(){
        this.clickables.forEach((element)=>{element.draw(this.sketch)})
    }    

    drawCircuitDiagram(){
        //Draw horizontal line
        this.sketch.strokeWeight(this.circuitLineStrokeWeight)
        this.sketch.stroke(this.circuitLineStroke)
        this.sketch.line(this.circuitLineStartX,this.circuitLineY,this.circuitLineEndX,this.circuitLineY)
    }

    drawGuidePanel() {
        this.guidePanel.draw(this.sketch);
    }
}