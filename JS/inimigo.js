class Inimigo extends Collision{
    constructor([imageSRC, hSprites, vSprites, sFrames], collisionPoints, velocidade){
        super(collisionPoints, true, false)
        this.sprites = new Sprites(imageSRC, hSprites, vSprites, sFrames);
        this.velo = velocidade;
        this.gravity = 2;
        this.direction = true;
        this.collided = false;
        this.enemyPos = {
            x:Math.floor(Math.random() * 1000),
            y:Math.floor(Math.random() * 300),
            taxaX:0,
            taxaY:0
        }
        this.update()
    }

    mov(){
        if(this.enemyPos.taxaY < this.gravity){

            this.enemyPos.taxaY += (this.gravity / 2);
        }
        else{
            this.enemyPos.taxaY = this.gravity;
        }

        if(this.collided && this.enemyPos.taxaY > 0){
            this.enemyPos.taxaY = 0;
        }

        this.enemyPos.taxaX = 0;

        if(this.direction){
            this.enemyPos.taxaX = 1;
        }
        if(!this.direction){
            this.enemyPos.taxaX = -1;
        }
    }

    draw(ctx){
        ctx.beginPath()
        this.sprites.clockVal();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = "red"
        ctx.fillRect(this.enemyPos.x, this.enemyPos.y, 60, 60)
    }

    update(){
        this.nextX = this.enemyPos.x + (this.enemyPos.taxaX * this.velo);
        this.nextY = this.enemyPos.y + (this.enemyPos.taxaY * this.velo);
        
        if(this.nextX <= 0){
            this.direction = true;
        }
        else if(this.nextX >= 1200){
            this.direction = false;
        }
    }

    drawCollision(ctx){
        this.drawColl(ctx, this.enemyPos.x, this.enemyPos.y);
    }
}