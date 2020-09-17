(function(){
    "use strict";
    const jdbLIB = {
        drawPhyllotaxis(ctx, centerX, centerY, divergence, space, size, steps){
            for(let n = 0; n < steps; n++){
                let a = n * this.dtr(divergence);
                let r = space * Math.sqrt(n);

                let x = r * Math.cos(a) + centerX;
                let y = r * Math.sin(a) + centerY;

                let aDegrees = (n * divergence) % 256;
                let color = `rgb(${aDegrees},20,50)`;

                this.drawCircle(ctx, x, y, size, color);
                space += .001;
                size += .001;
            }
        },

        dtr(degrees){
            return degrees * (Math.PI/180);
        },

        drawCircle(ctx,x,y,radius,color){
            ctx.save();
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x,y,radius,0,Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },

        cls(ctx, canvasWidth, canvasHeight){
            //ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.fillStyle = "black";
            ctx.fillRect(0,0,canvasWidth, canvasHeight);
        }

    };

    window["jdbLIB"] = jdbLIB;

})();
