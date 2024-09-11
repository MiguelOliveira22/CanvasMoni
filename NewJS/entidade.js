class Entidade extends Collision{
    constructor([imageSRC, hSprites, vSprites, sFrames], collisionPoints, velocidade, gravity){
        super(collisionPoints, false, false)
        this.sprites = new Sprites(imageSRC, hSprites, vSprites, sFrames);
        this.inventario = new Inventario(0);

        this.player = true;
        this.velo = velocidade;
        this.gravity = gravity;
        // this.id = id;
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

            if(this.direction){
                this.entidadePos.taxaX = 1;
            }
            if(!this.direction){
                this.entidadePos.taxaX = -1;
            }
        }
    }

    addItemGroup(){
        this.grupo.addElement(new Entidade(["../Sprites/walkingsheetbro.png", 7, 1, 100], [[10, 0], [125, 130]], 5, 2));
    }

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