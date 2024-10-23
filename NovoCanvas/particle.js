class Particle extends Sprites{
    constructor([particle, hSprites, vSprites, sFrames], [x, y] = [0, 0], durationTime = 0, direction = false, type = 0){
        super([particle, [0, 0], hSprites, vSprites, sFrames]);
        this.durationTime = durationTime;
        this.type = type;
        this.objPos = {
            x: x,
            y: y
        };
        this.direction = direction;
        this.dead = false;
    }

    particleHit(ctx){
        if(this.durationTime > 0){
            this.clockVal();
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            if(this.direction){
                ctx.scale(1, 1);
                ctx.drawImage(this.sheet, this.spriteArray[this.atual][0], this.spriteArray[this.atual][1], this.wSprites, this.aSprites, this.objPos.x, this.objPos.y, -this.wSprites, this.aSprites);    
            }
            else{
                ctx.scale(-1, 1);
                ctx.drawImage(this.sheet, this.spriteArray[this.atual][0], this.spriteArray[this.atual][1], this.wSprites, this.aSprites, -this.objPos.x, this.objPos.y, -this.wSprites, this.aSprites);
            }
            this.durationTime -= 12;
        }
        else{
            this.dead = true;
        }
    }

    particleWalk(ctx){
        if(this.durationTime > 0){
            this.clockVal();
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            if(this.direction){
                ctx.scale(1, 1);
                ctx.drawImage(this.sheet, this.spriteArray[this.atual][0], this.spriteArray[this.atual][1], this.wSprites, this.aSprites, this.objPos.x + 40, this.objPos.y + 80, -this.wSprites, this.aSprites);    
            }
            else{
                ctx.scale(-1, 1);
                ctx.drawImage(this.sheet, this.spriteArray[this.atual][0], this.spriteArray[this.atual][1], this.wSprites, this.aSprites, -this.objPos.x - 70, this.objPos.y + 80, -this.wSprites, this.aSprites);
            }
            this.durationTime -= 50;
        }
        else{
            this.dead = true;
        }
    }

    particleDeath(ctx){
        if(this.durationTime > 0){
            this.clockVal();
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            ctx.drawImage(this.sheet, this.spriteArray[this.atual][0], this.spriteArray[this.atual][1], this.wSprites, this.aSprites, this.objPos.x, this.objPos.y, this.wSprites, this.aSprites);    
            this.durationTime -= 12;
        }
        else{
            this.dead = true;
        }
    }

    update(ctx = CanvasRenderingContext2D){
        if(this.type == 0){
            this.particleWalk(ctx);
        }
        if(this.type == 1){
            this.particleHit(ctx);
        }
        if(this.type == 2){
            this.particleDeath(ctx);
        }
    }
}