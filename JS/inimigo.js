class Inimigo extends Collision{
    constructor([imageSRC, hSprites, vSprites, sFrames], collisionPoints, velocidade){
        super(collisionPoints, true, false)
        this.sprites = new Sprites(imageSRC, hSprites, vSprites, sFrames);
        this.velo = velocidade;
        this.gravity = 2;
        this.direction = true;
        this.collided = false;
        this.hp = 100;
        this.enemyPos = {
            x: Math.floor(Math.random() * 1000),
            y: Math.floor(Math.random() * 300),
            taxaX: 0,
            taxaY: 0
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
        ctx.beginPath();
        this.sprites.clockVal();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.drawCollision(ctx);
        /*
        if(!this.direction){
            ctx.scale(-1, 1);
            ctx.drawImage(this.sprites.sheet, this.sprites.spriteArray[this.sprites.atual][0], this.sprites.spriteArray[this.sprites.atual][1], this.sprites.wSprites, this.sprites.aSprites, -this.personagemPos.x, this.personagemPos.y, -this.sprites.wSprites, this.sprites.aSprites);
        }
        else{
            ctx.scale(1, 1);
            ctx.drawImage(this.sprites.sheet, this.sprites.spriteArray[this.sprites.atual][0], this.sprites.spriteArray[this.sprites.atual][1], this.sprites.wSprites, this.sprites.aSprites, this.personagemPos.x, this.personagemPos.y, this.sprites.wSprites, this.sprites.aSprites);
        }
        */
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
        ctx.fillStyle = "red";
        this.drawColl(ctx, this.enemyPos.x, this.enemyPos.y);
    }
}