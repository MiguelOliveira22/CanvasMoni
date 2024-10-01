class Entidade extends Collision{
    constructor([imageSRC, hSprites, vSprites, sFrames], collisionPoints, velocidade, gravity, player = false, id = 1){
        super(collisionPoints, false, false)
        this.sprites = new Sprites(imageSRC, hSprites, vSprites, sFrames);
        this.inventario = new Inventario(0);

        this.player = player;
        this.velo = velocidade;
        this.gravity = gravity;
        this.hp = 100;
        this.bar = new Health();
        this.timeout = 0;
        this.grupo;
        this.id = (this.player) ? 0 : id;

        this.direction = true;
        this.collided = false;
        this.drawable = true;
        this.entidadePos = {
            x: 0,
            y: 0,
            taxaX: 0,
            taxaY: 0,
        };

        this.nextX = this.entidadePos.x + (this.entidadePos.taxaX * this.velo);
        this.nextY = this.entidadePos.y + (this.entidadePos.taxaY * this.velo);
    }

    draw(ctx){
        this.sprites.clockVal();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if(this.player){
            this.bar.drawLifePlayer(ctx, this.hp);
        }
        else{
            this.bar.drawLifeEnemy(ctx, this.hp, this.entidadePos.x, this.entidadePos.y)
        }

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
                if(this.timeout <= 0){
                    this.addItemGroup();
                    this.timeout = 100;
                }
            }
        }
        else{
            if(this.entidadePos != undefined){
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

                if(this.entidadePos.x < 100){
                    this.direction = 1;
                }
                else if(this.entidadePos.x > 900){
                    this.direction = -1;
                }

                this.entidadePos.x = 1 * this.direction;
            }
        }
    }

    addItemGroup(){   
        this.grupo.addElement(new Objeto(["../Sprites/Projetil.png", 1, 1, 100], [this.entidadePos.x, this.entidadePos.y], [[10, 0], [125, 130]], false, true, false, 0, 5 * this.direction, true, this.id));
    }

    update(ctx, a = null, b = null, KeyPresses){
        if(this.entidadePos != undefined){
            this.timeout -= 2;
            this.mov(KeyPresses);
            this.nextX = this.entidadePos.x + (this.entidadePos.taxaX * this.velo);
            this.nextY = this.entidadePos.y + (this.entidadePos.taxaY * this.velo);

            if(this.player){
                this.inventario.updateAll(ctx, KeyPresses);
            }
            
            if(this.nextX > this.entidadePos.x){
                this.direction = true;
            }
            else if(this.nextX < this.entidadePos.x){
                this.direction = false;
            }

            if(this.nextX != this.entidadePos.x){
                this.sprites.moving(this);
            }
            else{
                this.sprites.standard(this);
            }

            if(this.drawable && this.hp > 0){
                this.draw(ctx);
            }

            if(this.hp == 0){
                let keys = Object.keys(this)
                for(let i = 0; i < keys.length; i++){
                    delete this[keys[i]]
                }
            }
        }
    }

    drawCollision(ctx){
        this.drawColl(ctx, this.entidadePos.x, this.entidadePos.y);
    }
}