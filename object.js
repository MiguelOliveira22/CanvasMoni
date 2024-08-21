class Object /*extends Collision*/{
    constructor([imageSRC, hSprites, vSprites], [objx, objy], collisionPoints, collidable){
        // super(collisionPoints);
        this.sprites = new Sprites(imageSRC, hSprites, vSprites);
        this.collidable = collidable;
        this.objPos = {
            x: objx,
            y: objy
        };
    }

    draw(ctx){
        ctx.drawImage(this.sprites.sheet, this.sprites.spriteArray[0][0][0], this.sprites.spriteArray[0][0][1], this.sprites.spriteArray[0][1][0], this.sprites.spriteArray[0][1][1], this.objPos.x, this.objPos.y, this.sprites.wSprites, this.sprites.aSprites);
    }
}