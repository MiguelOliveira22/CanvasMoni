class Object extends Collision{
    constructor([imageSRC, hSprites, vSprites], [objx, objy], collisionPoints, collidable, bg, paralax){
        super(collisionPoints, collidable);
        this.sprites = new Sprites(imageSRC, hSprites, vSprites);
        this.bg = bg;
        this.paralax = paralax;
        this.objPos = {
            x: objx,
            y: objy
        };
    }

    draw(ctx, canvas){
        if(this.bg){
            ctx.drawImage(this.sprites.sheet, this.sprites.spriteArray[0][0][0], this.sprites.spriteArray[0][0][1], this.sprites.spriteArray[0][1][0], this.sprites.spriteArray[0][1][1], this.objPos.x, this.objPos.y, canvas.width, canvas.height);
        }
        else{
            ctx.drawImage(this.sprites.sheet, this.sprites.spriteArray[0][0][0], this.sprites.spriteArray[0][0][1], this.sprites.spriteArray[0][1][0], this.sprites.spriteArray[0][1][1], this.objPos.x, this.objPos.y, this.sprites.wSprites, this.sprites.aSprites);
        }
    }
}