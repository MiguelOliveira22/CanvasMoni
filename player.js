class Player{
    constructor([imageSRC, hSprites, vSprites], /*Number*/ velocidade, /*Number[]*/ collisionPoints, /*Number*/ gravity){
        this.sprites = new Sprites(imageSRC, hSprites, vSprites);
        this.velo = velocidade;
        this.personagemPos = {
            x: 0,
            y: 0,
            taxaX: 0,
            taxaY: 0
        };
        this.collision = new Collision(collisionPoints, gravity);
    }

    draw(ctx){
        // ctx.scale(this.personagemPos.taxaX, 1);
        ctx.drawImage(this.sprites.spriteArray, this.personagemPos.x, this.personagemPos.y, this.collision.vertices[1][0], this.collision.vertices[1][0]);
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
        this.personagemPos.x += this.personagemPos.taxaX * this.velo;
        this.personagemPos.y += this.personagemPos.taxaY * this.velo;

        // Colisão com o chão improvisado
        if(this.collision.gravity < 10){
            this.collision.gravity += 1
        }

        if(this.personagemPos.y < 650){
            this.personagemPos.y += this.collision.gravity;
        }
        else{
            this.collision.gravity = 0
        }
    }
}