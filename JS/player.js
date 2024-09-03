class Player extends Collision{
    constructor([imageSRC, hSprites, vSprites, sFrames], collisionPoints, velocidade){
        super(collisionPoints, false, false)
        this.sprites = new Sprites(imageSRC, hSprites, vSprites, sFrames);
        this.inventario = new Inventario();
        this.velo = velocidade;
        this.gravity = 2;
        this.direction = true;
        this.collided = false;

        this.personagemPos = {
            x: 0,
            y: 0,
            taxaX: 0,
            taxaY: 0
        };

        this.update();
    }

    draw(ctx){
        this.sprites.clockVal();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if(!this.direction){
            ctx.scale(-1, 1);
            ctx.drawImage(this.sprites.sheet, this.sprites.spriteArray[this.sprites.atual][0], this.sprites.spriteArray[this.sprites.atual][1], this.sprites.wSprites, this.sprites.aSprites, -this.personagemPos.x, this.personagemPos.y, -this.sprites.wSprites, this.sprites.aSprites);
        }
        else{
            ctx.scale(1, 1);
            ctx.drawImage(this.sprites.sheet, this.sprites.spriteArray[this.sprites.atual][0], this.sprites.spriteArray[this.sprites.atual][1], this.sprites.wSprites, this.sprites.aSprites, this.personagemPos.x, this.personagemPos.y, this.sprites.wSprites, this.sprites.aSprites);
        }
    }

    mov(KeyPresses){
        if(this.personagemPos.taxaY < this.gravity){

            this.personagemPos.taxaY = 0/*(this.gravity / 2)*/;
        }
        else{
            this.personagemPos.taxaY = this.gravity;
        }

        this.personagemPos.taxaX = 0;

        if(KeyPresses.w && !KeyPresses.s){
            this.personagemPos.taxaY = -1;
        }
        if(KeyPresses.s && !KeyPresses.w){
            this.personagemPos.taxaY = 1;
        }
        if(KeyPresses.d && !KeyPresses.a){
            this.personagemPos.taxaX = 1;
        }
        if(KeyPresses.a && !KeyPresses.d){
            this.personagemPos.taxaX = -1;
        }
    }

    update(){
        this.nextX = this.personagemPos.x + (this.personagemPos.taxaX * this.velo);
        this.nextY = this.personagemPos.y + (this.personagemPos.taxaY * this.velo);
        
        if(this.nextX > this.personagemPos.x){
            this.direction = true;
        }
        else if(this.nextX < this.personagemPos.x){
            this.direction = false;
        }
    }

    drawCollision(ctx){
        this.drawColl(ctx, this.personagemPos.x, this.personagemPos.y);
    }
}