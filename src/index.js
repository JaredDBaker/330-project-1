(function(){

    "use strict";

    window.onload = init;

    let ctx; 
    const canvasWidth = 640, canvasHeight = 480;
    let divergence = 147.5;
    let space = 2;
    let size = 2
    let steps = 140;
    let xDis = 0, yDis = 0;
    let pause = true;
    let drawTrail = true;
    let currentMover = "line";
    let trailLength = 50;
    let counter = 0;

    function init(){
        console.log("page loaded!");
        
        let canvas = document.querySelector("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        canvas.onclick = canvasClicked;

        ctx = canvas.getContext('2d');
        ctx.fillRect(0,0,canvasWidth, canvasHeight);
        setupUI();
        jdbLIB.drawPhyllotaxis(ctx, canvasWidth/2 + xDis, canvasHeight/2 + yDis, divergence, space, size, steps);
        jdbLIB.pushPhyllos(ctx, canvasWidth/2 + xDis, canvasHeight/2 + yDis, divergence, space, size, steps);
        playing();
    }

    function setupUI(){
        document.querySelector("#trailCB").onchange = function(){
            drawTrail = !drawTrail;
        }
        document.querySelector("#playButton").onclick = function(){
            if(pause == false) return;
            pause = false;
            playing();
        }
        document.querySelector("#pauseButton").onclick = function(){
            pause = true;
        }

        document.querySelector("#chooserMover").onchange = function(){
            currentMover= this.value;
        }

        document.querySelector("#trailSlider").onchange = function(){
            trailLength = this.value;
        }
        document.querySelector("#sizeSlider").onchange = function(){
            size = this.value;
        }
        document.querySelector("#stepSlider").onchange = function(){
            steps = this.value;
        }
        

        document.querySelector("#resetButton").onclick = function(){
            jdbLIB.cls(ctx, canvasWidth, canvasHeight);
            xDis = 0;
            yDis = 0;
            counter = 0;
            jdbLIB.clearPhyllos();
            jdbLIB.drawPhyllotaxis(ctx, canvasWidth/2 + xDis, canvasHeight/2 + yDis, divergence, space, size, steps);
            jdbLIB.pushPhyllos(ctx, canvasWidth/2 + xDis, canvasHeight/2 + yDis, divergence, space, size, steps);

            pause = true;
        }

    }

    function canvasClicked(e){
        let rect = e.target.getBoundingClientRect();
        let mouseX = e.clientX - rect.x;
        let mouseY = e.clientY - rect.y;
        console.log(mouseX,mouseY);

        jdbLIB.drawPhyllotaxis(ctx, mouseX, mouseY, divergence, space, size, steps);
        jdbLIB.pushPhyllos(ctx, mouseX, mouseY, divergence, space, size, steps);

    }

    function playing(){
        if(pause) return;
        requestAnimationFrame(playing);

        if(drawTrail == true){
            if(trailLength <= 199){
                ctx.globalAlpha = 1/trailLength;
                jdbLIB.cls(ctx, canvasWidth, canvasHeight);
                ctx.globalAlpha = 1;
            }

        }
        else{
            jdbLIB.cls(ctx, canvasWidth, canvasHeight);
        } 
        //jdbLIB.drawPhyllotaxis(ctx, canvasWidth/2 + xDis, canvasHeight/2 + yDis, divergence, space, size, steps);

        if(currentMover == "line"){
            xDis = 1;
            yDis = 0;
        }
        else if(currentMover = "sine"){
            xDis = 1;
            counter += .1;
            yDis = canvasHeight/2 + Math.sin(counter) * 10;
        }
        else if(currentMover = "cos"){
            xDis = 1;
            counter += .1;
            yDis = canvasHeight/2 + Math.cos(counter) * 10;
        }
        if(xDis > canvasWidth) xDis = -canvasWidth/2;
        jdbLIB.updatePhyllos(xDis, yDis, canvasWidth, canvasHeight);
        jdbLIB.drawPhyllos(ctx);


        //yDis++;
    }
})();