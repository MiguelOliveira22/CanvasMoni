class Sprites{
    constructor([path, h, v, sFrames]){
        this.reconstruct([path, h, v, sFrames]);
    }

    reconstruct([path, h, v, sFrames]){
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
                this.spriteArray.push([(i * (this.wSprites)), j * (this.aSprites)]);
            }
        }

        this.animationEnded = false;
        this.path = path
    }

    clockVal(){
        this.clock += 1;
        if(this.clock > this.fps){
            this.clock = 0;
            this.atual += 1;
        }

        if(this.atual >= this.spriteArray.length){
            this.atual = 0;
            this.animationEnded = true;
        }
    }

    moving(entidade){
        let animacoes = new ListaAnimacoes
        if(entidade.player){
            let newPath = animacoes.animations.player[1][0]
            if(this.path != newPath){
                let newH = animacoes.animations.player[1][1]
                let newV = animacoes.animations.player[1][2]
                let newSFrames = animacoes.animations.player[1][3]
                this.reconstruct(newPath, newH, newV, newSFrames)
            }
        }

        else{
            let newPath = animacoes.animations.player[1][0]
            if(this.path != newPath){
                let newH = animacoes.animations.player[1][1]
                let newV = animacoes.animations.player[1][2]
                let newSFrames = animacoes.animations.player[1][3]
                this.reconstruct(newPath, newH, newV, newSFrames)
            }
        }
    }

    standard(entidade){
        let animacoes = new ListaAnimacoes
        if(entidade.player){
            let newPath = animacoes.animations.player[0][0]
            if(this.path != newPath){
                let newH = animacoes.animations.player[0][1]
                let newV = animacoes.animations.player[0][2]
                let newSFrames = animacoes.animations.player[0][3]
                this.reconstruct(newPath, newH, newV, newSFrames)
            }
        }
        
        else{
            let newPath = animacoes.animations.player[0][0]
            if(this.path != newPath){
                let newH = animacoes.animations.player[0][1]
                let newV = animacoes.animations.player[0][2]
                let newSFrames = animacoes.animations.player[0][3]
                this.reconstruct(newPath, newH, newV, newSFrames)
            }
        }
    }
}