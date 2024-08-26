class Inventario{
    constructor(){
        this.items = {
            1: "Banana",
            2: "Carro"
        }

        this.usable = {
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