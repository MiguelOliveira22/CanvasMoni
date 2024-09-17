class particle{
    constructor([particle, hSprites, vSprites, sFrames], durationTime, Pos, type){
        this.particles = []
        this.particle = new Sprites(particle, hSprites, vSprites, sFrames)
        this.durationTime = durationTime
        this.hangDurationTime
        this.type = type
        this.particlePos ={
            x: Pos[0],
            y: Pos[1]
        }
    }

    particleHit(x, y, ctx, particles){
        particles.forEach((particle, index) => {
            if(particle.do && particle.durationTime > 0){
                ctx.drawImage(this.sprites.sheet, this.sprites.spriteArray[this.sprites.atual][0], this.sprites.spriteArray[this.sprites.atual][1], this.sprites.wSprites, this.sprites.aSprites, x, y, this.sprites.wSprites, this.sprites.aSprites);
            }

            else if(particle.durationTime > 0){
                this.durationTime --;
            }
        });

    }

    verifyHitParticle(particles){
        particles.forEach((oneParticle, index) => {
            
        })
    }

    doParticles(particles, ctx){
        this.verifyHitParticle(particles)
        
    }
}