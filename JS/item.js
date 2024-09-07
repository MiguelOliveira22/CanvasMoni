class Item extends Collision{
    constructor([imageSRC, hSprites, vSprites, sFrames], [objx, objy], collisionPoints, id){
        super(collisionPoints, false, true);
        this.sprites = new Sprites(imageSRC, hSprites, vSprites, sFrames);
        this.drawable = true;
        this.objPos = {
            x: objx,
            y: objy
        };
        this.id = id;
    }

    draw(ctx){
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if(this.interacting && this.interactable){
            ctx.font = '24px SMW';
            ctx.fillText("Pressione E Para Coletar", 100, 100);
        }
        this.sprites.clockVal();
        ctx.translate(this.parala, 0);
        ctx.drawImage(this.sprites.sheet, this.sprites.spriteArray[this.sprites.atual][0], this.sprites.spriteArray[this.sprites.atual][1], this.sprites.wSprites, this.sprites.aSprites, this.objPos.x, this.objPos.y, this.sprites.wSprites, this.sprites.aSprites);
    }

    drawCollision(ctx){
        this.drawColl(ctx, this.objPos.x, this.objPos.y);
    }

    update(ctx, jogador, callback = () => {}){
        if(this.drawable){
            this.draw(ctx);
        }
        this.collisionTest(jogador, callback);
    }

    collisionTest(player, KeyPresses = null, callback = () => {}){
        this.collTest(player, this.objPos.x, this.objPos.y);
        if(this.interactable && KeyPresses != null){
            if(KeyPresses.e && this.interacting){
                this.interactable = false;
                this.interacting = false;
                this.drawable = false;
                player.inventario.unlockById(this.id);
                callback();
            }
        }
    }
}