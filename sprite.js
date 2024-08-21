class Sprites{
    constructor(path, h, v){
        this.sheet = new Image();
        this.sheet.src = path;
        this.spriteArray = []
        this.hSprites = h;
        this.vSprites = v;
        this.wSprites = this.sheet.width / this.hSprites;
        this.aSprites = this.sheet.height / this.vSprites;
        for(let i = 0; i < this.hSprites; i ++){
            for(let j = 0; j < this.vSprites; j ++){
                this.spriteArray.push([[(i * (this.wSprites)), j * (this.aSprites)], [(i + 1) * this.wSprites, (j + 1) * this.aSprites]]);
            }
        }
    }
}