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
}