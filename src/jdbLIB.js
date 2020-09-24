(function(){
    "use strict";
    let Phyllos = [];
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
        },

        pushPhyllos(ctx, centerX, centerY, divergence, space, size, steps){
            Phyllos.push(new Phyllotaxis(ctx, centerX, centerY, divergence, space, size, steps));
        },

        updatePhyllos(xDis, yDis, canvasWidth, canvasHeight, moveType){
            for(let i = 0; i < Phyllos.length; i++){
                Phyllos[i].centerX += xDis;
                Phyllos[i].centerY += yDis;
                if(Phyllos[i].centerX >= canvasWidth + 40) Phyllos[i].centerX = 0;
                //if(Phyllos[i].centerY >= canvasHeight) Phyllos[i].centerY = 0;
            }
        },

        drawPhyllos(ctx){
            for(let i = 0; i < Phyllos.length; i++){
                this.drawPhyllotaxis(Phyllos[i].ctx, Phyllos[i].centerX, Phyllos[i].centerY, Phyllos[i].divergence, Phyllos[i].space, Phyllos[i].size, Phyllos[i].steps);
            }

        },

        clearPhyllos(){
            Phyllos.length = 0;
        }

    };

    let Phyllotaxis = class {
        constructor(ctx, centerX, centerY, divergence, space, size, steps){
            this.ctx = ctx;
            this.centerX = centerX;
            this.centerY = centerY;
            this.divergence = divergence;
            this.space = space;
            this. size = size;
            this.steps = steps;
        }
    }

    window["jdbLIB"] = jdbLIB;
    window["Phyllotaxis"] = Phyllotaxis;

})();
