class Inimigo extends Collision{
    constructor([imageSRC, hSprites, vSprites, sFrames], collisionPoints, velocidade){
        super(collisionPoints, true, false)
        this.sprites = new Sprites(imageSRC, hSprites, vSprites, sFrames);
        this.velo = velocidade;
        this.gravity = 2;
        this.direction = true;
        this.collided = false;
    }
}