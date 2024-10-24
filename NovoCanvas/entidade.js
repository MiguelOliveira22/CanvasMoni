class Entidade extends Sprites{
    constructor([path, [xv, yv], nwSprite, nhSprite, fps] = ["../Sprites/walkingsheetbro.png", [0, 0], 7, 1, 60], [objx, objy] = [0, 0], [width, height, scale, direction] = [0, 0, 1, true], player = false){
        super([path, [xv, yv], nwSprite, nhSprite, fps]);

        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false,
            e: false,
            q: false
        };

        this.objPos = {
            x: objx,
            y: objy,
            taxaX: 0,
            taxaY: 0
        };

        this.size = {
            w: width,
            h: height,
            scale: scale
        };

        this.collided = {
            x: false,
            y: false
        };
        this.drawable = true;
        this.direction = direction;

        this.hp = 100;
        this.dead = false;
        this.timeout = 0;

        this.player = player;
        this.enemy = !player;

        this.velocity = 5;
        this.gravity = 2;
        this.spawn = [];

        this.inventario = null;
        if(this.player || this.enemy){
            this.inventario = new Inventario();
        }

        this.timeout = 0;
        this.animacoes = [["../Sprites/pixil-frame-0(1).png", [this.posImage.x, this.posImage.y], 1, 1, 100], ["../Sprites/walkingsheetbro.png", [this.posImage.x, this.posImage.y], 7, 1, 100]];
    }

    update(ctx = CanvasRenderingContext2D, obj = []){
        this.spawn = [];

        if(this.inventario != null){
            this.inventario.updateAll(ctx, this.keys);
        }

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        /*ctx.fillStyle = "blue";
        ctx.fillRect(this.objPos.x, this.objPos.y, this.size.w, this.size.h)*/

        if(this.hp <= 0){
            this.dead = true;
            this.spawn.push(new Particle(["../Sprites/Boom.png", [-10, -10], 3, 1, 100], [this.objPos.x, this.objPos.y, 10], 100, this.direction, 1));
        }

        if(this.direction){
            ctx.scale(1, 1);
            ctx.drawImage(this.sheet, this.spriteArray[this.atual][0], this.spriteArray[this.atual][1], this.wSprites, this.aSprites, this.objPos.x + this.posImage.x, this.objPos.y + this.posImage.y, this.wSprites * this.size.scale, this.aSprites * this.size.scale);
        }
        else{
            ctx.scale(-1, 1);
            ctx.drawImage(this.sheet, this.spriteArray[this.atual][0], this.spriteArray[this.atual][1], this.wSprites, this.aSprites, -(this.objPos.x + this.posImage.x), this.objPos.y + this.posImage.y, -(this.wSprites * this.size.scale), this.aSprites * this.size.scale);
        }
        this.clockVal();

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if(this.player){
            ctx.fillStyle = "red";
            ctx.fillRect(10, 10, 5 * this.hp, 20);
        }

        if(this.enemy){
            ctx.fillStyle = "red";
            ctx.fillRect(this.objPos.x - (this.size.w / 2), this.objPos.y - 40, 1.5 * this.hp, 20);
            if(this.timeout > 100){
                this.timeout = 0;
                this.spawn.push(new Objeto(["../Sprites/Projetil.png", [-35, -30], 1, 1, 60] , [this.objPos.x, this.objPos.y + (this.size.h / 2)], [32, 32, 0.7, !this.direction], [false, true, this], [100, 5, true], 0));
            }
        }

        this.objPos.taxaX = 0;
        if(this.objPos.taxaY > -25 && this.objPos.taxaY < 2){
            this.objPos.taxaY += 1;
        }
        else{
            this.objPos.taxaY = 2;
        }

        if(this.player){
            if(this.keys.w && this.collided.y){
                this.objPos.taxaY -= 17;
            }
            if(this.keys.a){
                this.objPos.taxaX += -1;
            }
            if(this.keys.d){
                this.objPos.taxaX += 1;
            }

            if(this.timeout > 100 && this.keys.q){
                this.timeout = 0;
                this.spawn.push(new Objeto(["../Sprites/Projetil.png", [-30, -30], 1, 1, 60] , [this.objPos.x, this.objPos.y + (this.size.h / 2)], [35, 35, 0.7, this.direction], [false, true, this], [100, 5, true], 0));
            }
        }

        var nextX = this.velocity * this.objPos.taxaX;
        var nextY = this.gravity * this.objPos.taxaY;

        if(this.objPos.x + nextX > this.objPos.x){
            this.direction = true;
            this.moving();
            if(this.collided.y){
                this.spawn.push(new Particle(["../Sprites/dirt.png", [-10, -10], 6, 1, 60], [this.objPos.x, this.objPos.y, 1], 100, this.direction, 0));
            }
        }
        else if(this.objPos.x + nextX < this.objPos.x){
            this.direction = false;
            this.moving();
            if(this.collided.y){
                this.spawn.push(new Particle(["../Sprites/dirt.png", [-10, -10], 6, 1, 60], [this.objPos.x + 57, this.objPos.y, 1], 100, !this.direction, 0));
            }
        }
        else{
            this.standard();
        }

        this.collided.x = false;
        this.collided.y = false;
        obj.forEach((objeto) => {
            if(objeto.collidable){
                if(this.objPos.x + nextX < objeto.objPos.x + objeto.size.w &&
                   this.objPos.x + nextX + this.size.w > objeto.objPos.x &&
                   this.objPos.y < objeto.objPos.y + objeto.size.h &&
                   this.objPos.y + this.size.h > objeto.objPos.y){
                    this.collided.x = true;
                }
                 
                if(this.objPos.y + nextY < objeto.objPos.y + objeto.size.h &&
                   this.objPos.y + nextY + this.size.h > objeto.objPos.y &&
                   this.objPos.x < objeto.objPos.x + objeto.size.w &&
                   this.objPos.x + this.size.w > objeto.objPos.x){
                    this.collided.y = true;
                }
            }

            if(objeto.interactable && objeto.spawned != this){
                if(this.objPos.x < objeto.objPos.x + objeto.size.w &&
                   this.objPos.x + this.size.w > objeto.objPos.x &&
                   this.objPos.y < objeto.objPos.y + objeto.size.h &&
                   this.objPos.y + this.size.h > objeto.objPos.y){
                    this.interacting = true;
                    objeto.interacaoFuncao(this);
                }
            }
        });

        if(!this.collided.x){
            this.objPos.x += nextX;
        }
        if(!this.collided.y){
            this.objPos.y += nextY;
        }

        this.timeout ++;
    }

    moving(){
        if(this.player){
            let newPath = this.animacoes[1];
            if(this.path != newPath[0]){
                this.reconstruct(newPath);
            }
        }
        else{
            let newPath = this.animacoes[1];
            if(this.path != newPath[0]){
                this.reconstruct(newPath);
            }
        }
    }

    standard(){
        if(this.player){
            let newPath = this.animacoes[0];
            if(this.path != newPath[0]){
                this.reconstruct(newPath);
            }
        }
        else{
            let newPath = this.animacoes[0];
            if(this.path != newPath[0]){
                this.reconstruct(newPath);
            }
        }
    }
}