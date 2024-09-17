class particle{
    constructor([particle, hSprites, vSprites, sFrames], durationTime, Pos, type){
        this.particle = new Sprites(particle, hSprites, vSprites, sFrames)
        this.durationTime = durationTime
        this.hangDurationTime
        this.type = type
        this.particlePos ={
            x: Pos[0],
            y: Pos[1]
        }
    }

    particleHit(ctx, oneParticle){
        console.log(oneParticle)
        this.particle.clockVal()
            if(oneParticle.durationTime > 0){
                ctx.setTransform(1, 0, 0, 1, 0, 0)
                console.log(this.particle.sheet)
                ctx.drawImage(this.particle.sheet, this.particle.spriteArray[this.particle.atual][0], this.particle.spriteArray[this.particle.atual][1], this.particle.wSprites, this.particle.aSprites, this.particlePos.x, this.particlePos.y, this.particle.wSprites, this.particle.aSprites);
                this.durationTime -= 10;
            }
            return this.durationTime
    }
}