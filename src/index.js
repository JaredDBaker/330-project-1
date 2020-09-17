(function(){

    "use strict";

    window.onload = init;

    let ctx; 
    const canvasWidth = 640, canvasHeight = 480;

    function init(){
        console.log("page loaded!");
        
        let canvas = document.querySelector("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        ctx = canvas.getContext('2d');
        ctx.fillRect(0,0,canvasWidth, canvasHeight);
    }

})();