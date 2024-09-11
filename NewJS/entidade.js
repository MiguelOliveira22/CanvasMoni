class Entidade extends Collision{
    constructor([imageSRC, hSprites, vSprites, sFrames], collisionPoints, velocidade, gravity, player = false){
        super(collisionPoints, false, false)
        this.sprites = new Sprites(imageSRC, hSprites, vSprites, sFrames);
        this.inventario = new Inventario(0);

        this.player = player;
        this.velo = velocidade;
        this.gravity = gravity;
        this.hp = 100;
        this.grupo;

        this.direction = true;
        this.collided = false;
        this.drawable = true;
        this.entidadePos = {
            x: 0,
            y: 0,
            taxaX: 0,
            taxaY: 0,
        };
        //this.cooldown = 100

        this.nextX = this.entidadePos.x + (this.entidadePos.taxaX * this.velo);
        this.nextY = this.entidadePos.y + (this.entidadePos.taxaY * this.velo);
    }

    draw(ctx){
        this.sprites.clockVal();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if(!this.direction){
            ctx.scale(-1, 1);
            ctx.drawImage(this.sprites.sheet, this.sprites.spriteArray[this.sprites.atual][0], this.sprites.spriteArray[this.sprites.atual][1], this.sprites.wSprites, this.sprites.aSprites, -this.entidadePos.x, this.entidadePos.y, -this.sprites.wSprites, this.sprites.aSprites);
        }
        else{
            ctx.scale(1, 1);
            ctx.drawImage(this.sprites.sheet, this.sprites.spriteArray[this.sprites.atual][0], this.sprites.spriteArray[this.sprites.atual][1], this.sprites.wSprites, this.sprites.aSprites, this.entidadePos.x, this.entidadePos.y, this.sprites.wSprites, this.sprites.aSprites);
        }
    }

    mov(KeyPresses){
        if(this.player){
            if(this.entidadePos.taxaY < this.gravity){
                this.entidadePos.taxaY += (this.gravity / 2);
            }
            else{
                this.entidadePos.taxaY = this.gravity;
            }

            if(this.collided && this.entidadePos.taxaY > 0){
                this.entidadePos.taxaY = 0;
            }

            this.entidadePos.taxaX = 0;

            if((KeyPresses.w && !KeyPresses.s) && this.collided){
                this.entidadePos.taxaY += -10;
                this.collided = false;
            }
            if(KeyPresses.d && !KeyPresses.a){
                this.entidadePos.taxaX = 1;
            }
            if(KeyPresses.a && !KeyPresses.d){
                this.entidadePos.taxaX = -1;
            }
            if(KeyPresses.q){
                this.addItemGroup(this.grupo);
            }
        }
        else{
            if(this.entidadePos.taxaY < this.gravity){
                this.entidadePos.taxaY += (this.gravity / 2);
            }
            else{
                this.entidadePos.taxaY = this.gravity;
            }

            if(this.collided && this.entidadePos.taxaY > 0){
                this.entidadePos.taxaY = 0;
            }

            this.entidadePos.taxaX = 0;

            if(this.entidadePos.x < 1000){
                this.entidadePos.taxaX = 1;
            }
            else if(this.entidadePos > 1000){
                this.entidadePos.taxaX = -1;
            }
        }
    }

    addItemGroup(){
        this.grupo.addElement(new Objeto(["../Sprites/walkingsheetbro.png", 7, 1, 100], [this.entidadePos.x, this.entidadePos.y], [[10, 0], [125, 130]], false, true, false, 0, 5 * this.direction, true));
    }

    // removeItemGrupo(){
    //     let posicao = 0
    //     this.grupo.elementos.forEach(entidade => {
    //         posicao = this.grupo.elementos.indexOf(entidade)
    //         if(entidade.cooldown == 0){
    //             this.grupo.elementos.splice(posicao, 1)
    //         }
    //     });
    // }

    // diminuirCooldown(){
    //     for(let i = 0; i < this.grupo.elementos.length; i++){
    //         this.grupo.elementos[i].cooldown -= 5
    //     }
    // }

    update(ctx, a = null, b = null, KeyPresses){
        this.mov(KeyPresses);
        this.nextX = this.entidadePos.x + (this.entidadePos.taxaX * this.velo);
        this.nextY = this.entidadePos.y + (this.entidadePos.taxaY * this.velo);
        
        if(this.nextX > this.entidadePos.x){
            this.direction = true;
        }
        else if(this.nextX < this.entidadePos.x){
            this.direction = false;
        }

        if(this.drawable){
            this.draw(ctx);
        }
    }

    drawCollision(ctx){
        this.drawColl(ctx, this.entidadePos.x, this.entidadePos.y);
    }
}