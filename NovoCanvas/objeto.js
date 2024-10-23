class Objeto extends Sprites{
    constructor([path, nwSprite, nhSprite, fps] = ["../Sprites/walkingsheetbro.png", 7, 1, 60], [objx, objy] = [0, 0], [width, height, scale, direction] = [0, 0, 1, true], [collidable, interactable, spawned] = [true, false, undefined], [maxTimeout, move, moveable] = [0, 0, false]){
        super([path, [0, 0], nwSprite, nhSprite, fps]);

        this.objPos = {
            x: objx,
            y: objy,
        };

        this.size = {
            w: width,
            h: height,
            scale: scale
        }

        this.drawable = true;
        this.direction = direction;
        this.spawned = spawned;

        this.collidable = collidable;
        this.interactable = interactable;

        this.timeout = 0;
        this.maxTimeout = maxTimeout;
        this.move = move;
        this.moveable = moveable;

        this.dead = false;
    }

    update(ctx = CanvasRenderingContext2D){
        /* ctx.fillStyle = "blue";
        ctx.fillRect(this.objPos.x, this.objPos.y, this.size.w, this.size.h);*/

        if(this.moveable){
            console.log(this.move * this.direction ? 1 : -1)
            this.objPos.x += (this.move * this.direction ? 1 : -1);
            this.timeout ++;
            if(this.timeout > this.maxTimeout){
                this.dead = true;
            }
        }
        
        ctx.drawImage(this.sheet, this.spriteArray[this.atual][0], this.spriteArray[this.atual][1], this.wSprites, this.aSprites, this.objPos.x + this.posImage.x, this.objPos.y + this.posImage.y, this.wSprites * this.size.scale, this.aSprites * this.size.scale)
        this.clockVal();
    }

    interacaoFuncao(){
        console.log(1)
    }
}