class Inventario{
    constructor(){
        this.items = {
            0: "Mão",
            1: "Palito De Dente",
            2: "Carro"
        }

        this.usable = {
            0: true,
            1: false,
            2: false
        }
    }

    unlockById(id){
        console.log(this.items[id], this.usable[id]);
        this.usable[id] = true;
        console.log(this.items[id], this.usable[id]);
    }

    drawBoxItem(ctx){
        for(let i = 0; this.items.length; i++){
            console.log("a")
            if(this.usable[i]){
                console.log("b")
                //w: 1280 h:720
                let x = 1280 - (i * 60)
                let y = 720 - (i * 40)
                ctx.rect(x, y, 120, 80)
                ctx.stroke()
            }
        }
    }
    
}