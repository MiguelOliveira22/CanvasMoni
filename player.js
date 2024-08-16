class Player extends Collision{
    constructor(/*String*/ imageSRC, /*Number*/ velocidade, /*Number[]*/ /*collisionPoints*/){
        super();
        this.sprite = new Image();
        this.sprite.src = imageSRC;
        this.velo = velocidade;
        this.gravity = 1;
        this.personagemPos = {
            x: 0,
            y: 0,
            taxaX: 0,
            taxaY: 0
        };
        // this.collision = new Collision(collisionPoints);
    }

    // draw(ctx, width){
    //     // ctx.scale(this.personagemPos.taxaX, 1);
    //     ctx.drawImage(this.sprite, this.personagemPos.x, this.personagemPos.y, this.collision[1][0], this.collision[1][0]);
    // }

    draw(ctx, width){
        // ctx.scale(this.personagemPos.taxaX, 1);
        ctx.drawImage(this.sprite, this.personagemPos.x, this.personagemPos.y);
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
        if(this.gravity < 10){
            this.gravity += 1
        }
        if(this.personagemPos.y < 700){
            this.personagemPos.y += this.gravity;
        }
        else{
            this.gravity = 0
        }
        console.log(this.personagemPos.y)
    }
}