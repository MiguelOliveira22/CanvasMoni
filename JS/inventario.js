class Inventario{
    constructor(){
        this.items = {
            1: "Banana"
        }

        this.usable = {
            1: false
        }
    }

    unlockById(id){
        console.log(this.items[id], this.usable[id]);
        this.usable[id] = true;
        console.log(this.items[id], this.usable[id]);
    }
}