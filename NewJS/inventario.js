class Inventario{
    constructor(iteminicial = 0){
        this.items = {
            0: "Mão",
            1: "Palito De Dente",
            2: "Carro",
            3: "James"
        };

        this.usable = {
            0: true,
            1: false,
            2: false,
            3: false
        };
        
        this.quantItems = Object.keys(this.items).length;

        this.currentItem = iteminicial;

        this.unlockById(iteminicial);
    }

    unlockById(id){
        this.usable[id] = true;
    }

    drawBoxItem(ctx){
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        for(let i = 0; i < this.quantItems; i++){
            if(this.usable[i]){
                ctx.beginPath()
                let y = 600 - (i * 100)
                ctx.fillStyle = "white"
                ctx.fillRect(1150, y, 60, 60)
            }
        }
    }
    
    changeItem(keyPresses){
        if(keyPresses[1] == true){
            if(this.currentItem != 0){
                this.currentItem -= 1
                console.log(this.currentItem)
            }
        }
        
        if(keyPresses[2] == true){
            if(this.currentItem != this.quantItems - 1 && this.usable[this.currentItem + 1] == true){
                this.currentItem += 1
                console.log(this.currentItem)
            }
        }
    }

    setItem(enter){
        if(this.currentItem <= this.quantItems && this.currentItem >= 0){
            this.currentItem = enter;
        }
    }

    updateAll(ctx, keyPresses){
        this.changeItem(keyPresses);
        this.drawBoxItem(ctx);
    }
}