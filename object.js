class Object extends Collision{
    constructor([imageSRC, hSprites, vSprites], collisionPoints){
        super(collisionPoints);
        this.sprites = new Sprites(imageSRC, hSprites, vSprites);
        this.objPos = {
            x: 0,
            y: 0
        };
    }

    draw(ctx){
        ctx.drawImage(this.sprites.spriteArray, this.objPos.x, this.objPos.y, this.vertices[1][0], this.vertices[1][0]);
    }
}