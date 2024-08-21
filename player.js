class Player{
    constructor([imageSRC, hSprites, vSprites], /*Number*/ velocidade){
        this.sprites = new Sprites(imageSRC, hSprites, vSprites);
        this.velo = velocidade;
        this.personagemPos = {
            x: 0,
            y: 0,
            taxaX: 0,
            taxaY: 0
        };
        this.direction = 1;
    }

    draw(ctx){
        if(this.direction == 0){
            ctx.scale(-1, 1);
            ctx.drawImage(this.sprites.sheet, this.sprites.spriteArray[0][0][0], this.sprites.spriteArray[0][0][1], this.sprites.spriteArray[0][1][0], this.sprites.spriteArray[0][1][1], -this.personagemPos.x, this.personagemPos.y, (this.personagemPos.x + this.sprites.wSprites), (this.personagemPos.y + this.sprites.aSprites));
        }
        else{
            ctx.scale(1, 1);
            ctx.drawImage(this.sprites.sheet, this.sprites.spriteArray[0][0][0], this.sprites.spriteArray[0][0][1], this.sprites.spriteArray[0][1][0], this.sprites.spriteArray[0][1][1], this.personagemPos.x, this.personagemPos.y, (this.personagemPos.x + this.sprites.wSprites), (this.personagemPos.y + this.sprites.aSprites));
        }
    }

    mov(KeyPresses){
        this.personagemPos.taxaY = 0;
        this.personagemPos.taxaX = 0;

        if(KeyPresses.w){
            this.personagemPos.taxaY = -1;
        }
        if(KeyPresses.s){
            this.personagemPos.taxaY = 1;
        }
        if(KeyPresses.d){
            this.personagemPos.taxaX = 1;
        }
        if(KeyPresses.a){
            this.personagemPos.taxaX = -1;
        }
    }

    update(){
        this.nextX = this.personagemPos.x + (this.personagemPos.taxaX * this.velo);
        this.nextY = this.personagemPos.y + (this.personagemPos.taxaY * this.velo);
    }
}