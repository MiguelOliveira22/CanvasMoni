class Projetil extends Collision{
    constructor([imageSRC, hSprites, vSprites, sFrames], [objx, objy], collisionPoints){
        super(collisionPoints, true, false);
        this.sprites = new Sprites(imageSRC, hSprites, vSprites, sFrames);
        this.objPos = {
            x: objx,
            y: objy
        };
    }

    draw(ctx){
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.sprites.clockVal();
        ctx.drawImage(this.sprites.sheet, this.sprites.spriteArray[this.sprites.atual][0], this.sprites.spriteArray[this.sprites.atual][1], this.sprites.wSprites, this.sprites.aSprites, this.objPos.x, this.objPos.y, this.sprites.wSprites, this.sprites.aSprites);
    }

    update(ctx, jogador){
        this.draw(ctx);
        this.collTest(jogador, this.objPos.x, this.objPos.y);
    }

    drawCollision(ctx){
        this.drawColl(ctx, this.objPos.x, this.objPos.y);
    }
}