class Entidade extends Sprites{
    constructor([objx, objy] = [0, 0], [width, height, scale] = [0, 0, 1], player = false){
        super("./walkingsheetbro.png", [0, 0], 7, 1, 60);

        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false
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
        this.direction = true;

        this.hp = 100;
        this.timeout = 0;

        this.player = player;
        this.enemy = false;

        this.velocity = 5;
        this.gravity = 2;

        this.inventario = null;
        if(this.player || this.enemy){
            this.inventario = new Inventario();
        }
    }

    update(ctx = CanvasRenderingContext2D, obj = []){
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = "blue";
        ctx.fillRect(this.objPos.x, this.objPos.y, this.size.w, this.size.h)

        if(this.direction){
            ctx.scale(1, 1);
            ctx.drawImage(this.sheet, this.spriteArray[this.atual][0], this.spriteArray[this.atual][1], this.wSprites, this.aSprites, this.objPos.x + this.posImage.x, this.objPos.y + this.posImage.y, this.wSprites * this.size.scale, this.aSprites * this.size.scale);
        }
        else{
            ctx.scale(-1, 1);
            ctx.drawImage(this.sheet, this.spriteArray[this.atual][0], this.spriteArray[this.atual][1], this.wSprites, this.aSprites, this.objPos.x + this.posImage.x, this.objPos.y + this.posImage.y, -(this.wSprites * this.size.scale), this.aSprites * this.size.scale);
        }
        this.clockVal();

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if(this.player){
            ctx.fillStyle = "red";
            ctx.fillRect(10, 10, 5 * this.hp, 20);
        }

        if(this.enemy){
            ctx.fillStyle = "red";
            ctx.fillRect(x, y - 40, 1.5 * this.hp, 20);
        }

        this.objPos.taxaX = 0;
        this.objPos.taxaY = 0;

        if(this.player){
            this.objPos.taxaY = 1;
        }

        if(this.keys.w && this.collided.y){
            this.objPos.taxaY += -100;
        }
        if(this.keys.a){
            this.objPos.taxaX += -1;
        }
        if(this.keys.d){
            this.objPos.taxaX += 1;
        }

        var nextX = this.velocity * this.objPos.taxaX;
        var nextY = this.gravity * this.objPos.taxaY;

        this.collided.x = false;
        this.collided.y = false;
        obj.forEach((objeto) => {
            if(objeto.collidable){
                if(this.objPos.x + nextX < objeto.objPos.x + objeto.size.w &&
                   this.objPos.x + nextX + this.size.w > objeto.objPos.x){
                    this.collided.x = true;
                }
                 
                if(this.objPos.y + nextY < objeto.objPos.y + objeto.size.h &&
                   this.objPos.y + nextY + this.size.h > objeto.objPos.y){
                    this.collided.y = true;
                }
            }

            if(objeto.interactable){
                if(this.objPos.x + nextX < objeto.objPos.x + objeto.size.w &&
                   this.objPos.x + nextX + this.size.w > objeto.objPos.x &&
                   this.objPos.y + nextY < objeto.objPos.y + objeto.size.h &&
                   this.objPos.y + nextY + this.size.h > objeto.objPos.y){
                    this.interacting = true;
                }
            }
        });

        this.objPos.x += nextX;
        this.objPos.y += nextY;

        if(this.inventario != null){
            this.inventario.updateAll(ctx, this.keys);
            console.log(this.collided, this.objPos.x, this.objPos.y)
        }
    }
}