class Object extends Collision{
    constructor([imageSRC, hSprites, vSprites, sFrames], [objx, objy], collisionPoints, collidable, interectable, bg, paralax, id){
        super(collisionPoints, collidable, interectable);
        this.sprites = new Sprites(imageSRC, hSprites, vSprites, sFrames);
        this.bg = bg;
        this.paralax = paralax;
        this.parala = 0;
        this.objPos = {
            x: objx,
            y: objy
        };
        this.id = id;
        this.children = [];
        this.sizeChildren = 0;
    }

    createItem(obj){
        this.sprites.atual = 7;
        obj.children[this.sizeChildren] = new Item(["../Sprites/pixil-frame-0.png", 1, 1, 1], [400, 500], [[0,0], [100, 100]], 1);
        obj.sizeChildren += 1;
    }

    draw(ctx, canvas){
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.sprites.clockVal();
        if(this.interacting && this.interactable){
            ctx.font = '24px SMW';
            ctx.fillText("Pressione E Para Interagir", 100, 100);
        }
        ctx.translate(this.parala, 0);
        if(this.bg){
            ctx.drawImage(this.sprites.sheet, this.sprites.spriteArray[this.sprites.atual][0], this.sprites.spriteArray[this.sprites.atual][1], this.sprites.wSprites, this.sprites.aSprites, this.objPos.x, this.objPos.y, canvas.width, canvas.height);
            ctx.drawImage(this.sprites.sheet, this.sprites.spriteArray[this.sprites.atual][0], this.sprites.spriteArray[this.sprites.atual][1], this.sprites.wSprites, this.sprites.aSprites, this.objPos.x - canvas.width, this.objPos.y, canvas.width, canvas.height);
        }
        else{
            ctx.drawImage(this.sprites.sheet, this.sprites.spriteArray[this.sprites.atual][0], this.sprites.spriteArray[this.sprites.atual][1], this.sprites.wSprites, this.sprites.aSprites, this.objPos.x, this.objPos.y, this.sprites.wSprites, this.sprites.aSprites);
        }

        this.parala += this.paralax;
        if(this.parala > canvas.width){
            this.parala = 0;
        }
    }

    update(ctx, canvas, jogador, KeyPresses, hitboxshow, action){
        this.draw(ctx, canvas);
        this.collisionTest(jogador, KeyPresses, action);
        if(hitboxshow){
            this.drawCollision(ctx);
        }
        for(let ins = 0; ins < this.sizeChildren; ins ++){
            this.children[ins].update(ctx, jogador, KeyPresses, false);
        }
    }

    drawCollision(ctx){
        this.drawColl(ctx, this.objPos.x, this.objPos.y);
    }

    collisionTest(player, KeyPresses, callback){
        this.collTest(player, KeyPresses, this.objPos.x, this.objPos.y);
        if(this.interactable){
            if(KeyPresses.e && this.interacting){
                this.interactable = false;
                this.interacting = false;
                callback();
            }
        }
    }
}