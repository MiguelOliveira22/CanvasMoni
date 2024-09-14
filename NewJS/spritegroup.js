class Group{
    constructor(){
        this.elementos = [];
        this.quantos = 0;
    }

    update(ctx, canvas, jogador, KeyPresses){
        this.elementos.forEach((valor) => {
            if(this.notNone(valor)){
                valor.update(ctx, canvas, jogador, KeyPresses)
            };
        });
    }

    updateBau(ctx, canvas, entidades, KeyPresses){
        this.elementos.forEach((valor) => {
            if(this.notNone(valor)){
                valor.update(ctx, canvas, entidades, KeyPresses);
                valor.collisionTest(entidades.elementos, KeyPresses, () => {
                    valor.createItem();
                });
            }
        });
    }

    updateItems(ctx, canvas, entidades, KeyPresses){
        this.elementos.forEach((valor) => {
            if(this.notNone(valor)){
                valor.update(ctx, canvas, entidades, KeyPresses);
                valor.collisionTest(entidades.elementos, KeyPresses, () => {
                    valor.addInventory(entidades.elementos);
                });
            }
        });
    }

    updateProjetil(ctx, canvas, jogador, KeyPresses){

        this.elementos.forEach((valor, index) => {
            if(this.notNone(valor)){
                valor.update(ctx, canvas, jogador, KeyPresses);
                let hit = valor.collProjetil(jogador.elementos, valor);
                if(hit == true){
                    this.elementos[index] = undefined
                }
                else{
                    if(valor.id != 5){
                        valor.objPos.x -= 10;
                    }
                    else{
                        valor.objPos.x += 10;
                    }
                }
            }
        });
    }

    testCollision(player, KeyPresses){
        this.elementos.forEach((valor) => {
            valor.collisionTest(player.elementos, KeyPresses);
        });
        this.elementos[1].collDamage(player.elementos);
    }

    addElement(element){
        this.elementos[this.quantos] = element;
        this.quantos ++;
    }

    objAddToGroup(grupo){
        this.elementos.forEach((valor) => {
            valor.grupo = grupo;
            console.log(valor.grupo)
        });
    }

    notNone(valor){
        if(valor != undefined){
            return true;
        }
        return false;
    }
}