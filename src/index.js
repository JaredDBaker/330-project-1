(function(){

    "use strict";

    window.onload = init;
    let canvas;
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
    let color = "red";

    function init(){
        console.log("page loaded!");
        
        canvas = document.querySelector("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        canvas.onclick = canvasClicked;

        ctx = canvas.getContext('2d');
        ctx.fillRect(0,0,canvasWidth, canvasHeight);
        setupUI();
        jdbLIB.drawPhyllotaxis(ctx, canvasWidth/2 + xDis, canvasHeight/2 + yDis, divergence, space, size, steps, color);
        jdbLIB.pushPhyllos(ctx, canvasWidth/2 + xDis, canvasHeight/2 + yDis, divergence, space, size, steps, color);
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
        document.querySelector("#printButton").onclick = setUpPrint;

        document.querySelector("#chooserMover").onchange = function(e){
            currentMover= e.target.value;
            document.querySelector("#moveDisplay").innerHTML = `|Movement: ${currentMover}`;
        }

        document.querySelector("#angleChooser").onchange = function(e){
            divergence = parseFloat(e.target.value);
            document.querySelector("#angleDisplay").innerHTML = `Angle: ${divergence}`;
        }
        document.querySelector("#angleSlider").oninput = function(e){
            divergence = parseInt(e.target.value);
            document.querySelector("#angleDisplay").innerHTML = `Angle: ${divergence}`;
        }

        document.querySelector("#trailSlider").onchange = function(e){
            trailLength = e.target.value;
            document.querySelector("#trailDisplay").innerHTML = `|Trail Length: ${trailLength}`;
        }
        document.querySelector("#sizeSlider").oninput = function(e){
            size = parseInt(e.target.value);
            document.querySelector("#sizeDisplay").innerHTML = `|Size: ${size}`;
        }
        document.querySelector("#stepSlider").oninput = function(e){
            steps = parseInt(e.target.value);
            document.querySelector("#stepsDisplay").innerHTML = `|Steps: ${steps}`;
        }
        document.querySelector("#spaceSlider").oninput = function(e){
            space = parseInt(e.target.value);
            document.querySelector("#sizeDisplay").innerHTML = `|Size: ${size}`;
        }
        
        document.querySelector("#colorChooser").onchange = function(e){
            color = e.target.value;
            document.querySelector("#colorDisplay").innerHTML = `|Color: ${color}`;
        }

        document.querySelector("#resetButton").onclick = function(){
            jdbLIB.cls(ctx, canvasWidth, canvasHeight);
            xDis = 0;
            yDis = 0;
            counter = 0;
            jdbLIB.clearPhyllos();
            jdbLIB.drawPhyllotaxis(ctx, canvasWidth/2 + xDis, canvasHeight/2 + yDis, divergence, space, size, steps, color);
            jdbLIB.pushPhyllos(ctx, canvasWidth/2 + xDis, canvasHeight/2 + yDis, divergence, space, size, steps, color);

            pause = true;
        }

    }

    function canvasClicked(e){
        let rect = e.target.getBoundingClientRect();
        let mouseX = e.clientX - rect.x;
        let mouseY = e.clientY - rect.y;
        console.log(mouseX,mouseY);

        jdbLIB.drawPhyllotaxis(ctx, mouseX, mouseY, divergence, space, size, steps, color);
        jdbLIB.pushPhyllos(ctx, mouseX, mouseY, divergence, space, size, steps, color);

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
        else if(currentMover == "sine"){
            xDis = 1;
            counter += .1;
            yDis = Math.cos(counter) * 10;
        }
        else if(currentMover ==  "cosine"){
            xDis = 1;
            counter += .1;
            yDis = Math.sin(counter) * 10;
        }
        else if(currentMover ==  "starFall"){
            xDis = 1;
            yDis = 5;
        }
        else if(currentMover ==  "starRise"){
            xDis = 1;
            yDis = -5;
        }
        if(xDis > canvasWidth) xDis = -canvasWidth/2;
        jdbLIB.updatePhyllos(xDis, yDis, canvasWidth, canvasHeight, currentMover);
        jdbLIB.drawPhyllos();
    }

    function setUpPrint(){
        const data = canvas.toDataURL(); 
        const newWindow = window.open();
        newWindow.document.body.innerHTML = `<iframe src="${data}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`;
    }
})();