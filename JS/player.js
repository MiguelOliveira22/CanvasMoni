class Player{
    constructor([imageSRC, hSprites, vSprites, sFrames], velocidade){
        this.sprites = new Sprites(imageSRC, hSprites, vSprites, sFrames);
        this.velo = velocidade;
        this.veloY = 0;
        this.gravity = 3;
        this.personagemPos = {
            x: 0,
            y: 0,
            taxaX: 0,
            taxaY: 0
        };
        this.direction = 1;
        this.collided = false;

        this.update()
    }

    draw(ctx){
        this.sprites.clockVal();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if(this.direction == 0){
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
            this.personagemPos.taxaY += this.gravity / 2;
        }
        else{
            this.personagemPos.taxaY = this.gravity;
        }
        this.personagemPos.taxaX = 0;

        if((KeyPresses.w && !KeyPresses.s) && this.collided){
            this.personagemPos.taxaY += -10;
        }
        if(KeyPresses.s && !KeyPresses.w){
            // this.personagemPos.taxaY = 1;
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
            this.direction = 1;
        }
        else if(this.nextX < this.personagemPos.x){
            this.direction = 0;
        }
    }
}