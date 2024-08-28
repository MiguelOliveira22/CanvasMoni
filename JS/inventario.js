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
        let quantItems = 0
        for(var i in this.items){
            quantItems += 1
        }
        
        for(var i = 0; i < quantItems; i++){
            if(this.usable[i]){
                let y = 600 - (i * 100)
                ctx.fillRect(1150, y, 60, 60)
                ctx.stroke()
            }
        }
    }
    
}