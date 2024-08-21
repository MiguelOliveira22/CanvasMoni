class Sprites{
    constructor(path, h, v, sFrames){
        this.sheet = new Image();
        this.sheet.src = path;
        this.spriteArray = [];
        this.hSprites = h;
        this.vSprites = v;
        this.wSprites = this.sheet.width / this.hSprites;
        this.aSprites = this.sheet.height / this.vSprites;
        this.atual = 0;
        this.clock = 0;
        this.fps = 1000 / sFrames;
        for(let i = 0; i < this.hSprites; i ++){
            for(let j = 0; j < this.vSprites; j ++){
                this.spriteArray.push([[(i * (this.wSprites)), j * (this.aSprites)], [(i + 1) * this.wSprites, (j + 1) * this.aSprites]]);
            }
        }
    }

    clockVal(){
        this.clock += 1;
        if(this.clock > this.fps){
            this.clock = 0;
            this.atual += 1;
        }

        if(this.atual >= this.spriteArray.length){
            this.atual = 0;
        }
    }
}