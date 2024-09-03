class Inimigo extends Collision{
    constructor([imageSRC, hSprites, vSprites, sFrames], collisionPoints, velocidade){
        super(collisionPoints, true, false)
        this.sprites = new Sprites(imageSRC, hSprites, vSprites, sFrames);
        this.velo = velocidade;
        this.gravity = 2;
        this.direction = true;
        this.collided = false;
        this.enemyPos = {
            x:1000,
            y:300,
        }
        this.directionMov = false
    }

    mov(){
        if(this.directionMov){
            this.enemyPos.x += this.velo
        }

        if(!this.directionMov){
            this.enemyPos.x -= this.velo
        }
    }

    draw(ctx){
        this.sprites.clockVal();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillRect(this.enemyPos.x, this.enemyPos.y, 60, 60)
        ctx.stroke()
    }

    changeDirection(){
        if(this.enemyPos.x == 0){
            this.directionMov = true
        }
        if(this.enemyPos.x == 1300){
            this.directionMov = false
        }
    }
}