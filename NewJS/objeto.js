class Objeto extends Collision{
    constructor([imageSRC, hSprites, vSprites, sFrames], [objx, objy], collisionPoints, collidable, interectable, bg, paralax, id, item = false){
        super(collisionPoints, collidable, interectable);
        this.sprites = new Sprites(imageSRC, hSprites, vSprites, sFrames);
        this.isItem = item;
        if(!this.isItem){
            this.getter = new RandomItem(12345);
        }

        this.bg = bg;
        this.paralax = paralax;
        this.parala = 0;
        this.drawable = true;
        this.objPos = {
            x: objx,
            y: objy
        };
        
        this.childrens = [];
        this.sizeChildren = 0;

        this.id = id;
    }

    createItem(){
        this.sprites.atual = 7;
        this.childrens[this.sizeChildren] = this.getter.getItem();
        this.sizeChildren += 1;
    }

    addInventory(player){
        this.drawable = false;
        player[0].inventario.unlockById(this.id);
        callback();
    }

    talk(ctx){
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.beginPath();
        ctx.fillStyle = "#1305FF";
        ctx.font = '24px SMW';
        ctx.fillText("Meu Nome Rafael Ser", 300, 100);
        this.interactable = true;
    }

    draw(ctx, canvas){
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.sprites.clockVal();
        if(this.interacting && this.interactable){
            ctx.beginPath()
            ctx.fillStyle = "#1305FF";
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

        if(this.interacting && this.interactable){
            ctx.font = '24px SMW';
            ctx.fillText("Pressione E Para Coletar", 100, 100);
        }

        this.parala += this.paralax;
        if(this.parala > canvas.width){
            this.parala = 0;
        }
    }

    update(ctx, canvas, jogador, KeyPresses){
        if(this.drawable){
            this.draw(ctx, canvas);
        }

        this.childrens.forEach((childuse) => {
            childuse.update(ctx, jogador, KeyPresses, false);
        });
    }

    drawCollision(ctx){
        this.drawColl(ctx, this.objPos.x, this.objPos.y);
    }

    collisionTest(player, KeyPresses, callback = () => {}){
        this.collTest(player, this.objPos.x, this.objPos.y);
        if(this.interactable){
            if(KeyPresses.e && this.interacting){
                this.interactable = false;
                this.interacting = false;
                callback();
            }
        }
    }
}