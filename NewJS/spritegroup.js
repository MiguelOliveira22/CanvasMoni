class Group{
    constructor(){
        this.elementos = [];
        this.quantos = 0;
    }

    update(ctx, canvas, jogador, KeyPresses){
        this.elementos.forEach((valor) => {
            valor.update(ctx, canvas, jogador, KeyPresses);
        });
    }

    testCollision(player, KeyPresses){
        this.elementos.forEach((valor) => {
            valor.collisionTest(player.elementos, KeyPresses);
        });
    }

    addElement(element){
        this.elementos[this.quantos] = element;
        this.quantos ++;
    }

    objAddToGroup(grupo){
        this.elementos.forEach((valor) => {
            valor.grupo = grupo;
        });
    }
}