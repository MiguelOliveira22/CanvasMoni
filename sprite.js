class Sprites{
    constructor(path, h, v){
        this.spriteArray = new Image();
        this.spriteArray.src = path;
        this.hSprites = h;
        this.vSprites = v;
        console.log(this.spriteArray.width / this.hSprites);
        for(let i = 0; i < this.hSprites; i ++){
            console.log(1);
        }
    }
}