class particle{
    constructor([particle, hSprites, vSprites, sFrames], durationTime, Pos, direction, type){
        this.particle = new Sprites(particle, hSprites, vSprites, sFrames);
        this.durationTime = durationTime;
        this.hangDurationTime;
        this.type = type;
        this.particlePos ={
            x: Pos[0],
            y: Pos[1]
        };
        this.direction = direction;
    }

    particleHit(ctx, oneParticle){
        this.particle.clockVal()
            if(oneParticle.durationTime > 0){
                ctx.setTransform(1, 0, 0, 1, 0, 0)
                console.log(this.direction)
                if(!this.direction){
                    ctx.scale(-1, 1)
                    ctx.drawImage(this.particle.sheet, this.particle.spriteArray[this.particle.atual][0], this.particle.spriteArray[this.particle.atual][1], this.particle.wSprites, this.particle.aSprites, -this.particlePos.x, this.particlePos.y, -this.particle.wSprites, this.particle.aSprites);
                }
                else if(this.direction){
                    ctx.scale(-1, 1)
                    ctx.drawImage(this.particle.sheet, this.particle.spriteArray[this.particle.atual][0], this.particle.spriteArray[this.particle.atual][1], this.particle.wSprites, this.particle.aSprites, this.particlePos.x, this.particlePos.y, this.particle.wSprites, this.particle.aSprites);    
                }
                this.durationTime -= 5;
            }
            return this.durationTime
    }

    particleWalk(ctx, oneParticle){
        this.particle.clockVal()
        if(oneParticle.durationTime > 0){
            ctx.setTransform(1, 0, 0, 1, 0, 0)
            console.log(this.direction)
            if(!this.direction){
                ctx.scale(-1, 1)
                ctx.drawImage(this.particle.sheet, this.particle.spriteArray[this.particle.atual][0], this.particle.spriteArray[this.particle.atual][1], this.particle.wSprites, this.particle.aSprites, -this.particlePos.x - 70, this.particlePos.y, -this.particle.wSprites, this.particle.aSprites);
            }
            else if(this.direction){
                ctx.scale(1, 1)
                ctx.drawImage(this.particle.sheet, this.particle.spriteArray[this.particle.atual][0], this.particle.spriteArray[this.particle.atual][1], this.particle.wSprites, this.particle.aSprites, this.particlePos.x + 35, this.particlePos.y, this.particle.wSprites, this.particle.aSprites);    
            }
            this.durationTime -= 50;
        }
        return this.durationTime
    }
}