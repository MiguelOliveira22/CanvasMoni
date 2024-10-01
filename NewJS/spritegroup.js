class Group{
    constructor(){
        this.elementos = [];
        this.quantos = 0;
    }

    update(ctx, canvas, jogador, KeyPresses){
        let jogadore = undefined;
        this.elementos.forEach((valor) => {
            if(valor.player){
                jogadore = valor;
            }
            else if(this.notNone(valor)){
                valor.update(ctx, canvas, jogador, KeyPresses);
            }
        });
        if(jogadore != undefined){
            jogadore.update(ctx, canvas, jogador, KeyPresses);
        }
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
        let informations = []
        this.elementos.forEach((valor, index) => {
            if(this.notNone(valor)){
                valor.update(ctx, canvas, jogador, KeyPresses);
                informations = valor.collProjetil(jogador.elementos, valor);
                if(informations[0] == true){
                    this.elementos.splice(index, 1)
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
        return informations
    }

    testCollision(player, KeyPresses){
        this.elementos.forEach((valor) => {
            if(valor.player != undefined){ // Arrumar isso aqui
                if(!valor.player){
                    valor.collDamage(player.elementos);
                }
            }
            else if(valor.bg != undefined){ // Arrumar isso aqui
                valor.collisionTest(player.elementos, KeyPresses);
            }
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

    notNone(valor){
        if(valor != undefined){
            return true;
        }
        return false;
    }

    addParticle(KeyPresses, hitPosDirectionAndPosMorto, entidades){
        if(hitPosDirectionAndPosMorto[0]){
            this.addElement(new particle(["../Sprites/Boom.png", 3, 1, 500], 100, hitPosDirectionAndPosMorto[1], hitPosDirectionAndPosMorto[2], "hit"))
        }
        
        if(entidades.elementos[0].collided && ((KeyPresses.a && !KeyPresses.d) || (!KeyPresses.a && KeyPresses.d))){
            this.addElement(new particle(["../Sprites/dirt.png", 6, 1, 500], 100, [entidades.elementos[0].entidadePos.x, entidades.elementos[0].entidadePos.y + 100], entidades.elementos[0].direction, "walk"))
        }

        entidades.elementos.forEach(entidade => {
            if(entidade.hp == 0){
                this.addElement(new particle(["../Sprites/Boom.png", 3, 1, 500], 100, [entidade.entidadePos.x, entidade.entidadePos.y], entidades.elementos[0].direction, "death"))
            }
        });
    }

    updateParticles(ctx){
        this.elementos.forEach((oneParticle, index) => {
            if(oneParticle.type == "hit"){
                let durationTime = oneParticle.particleHit(ctx, oneParticle);
                if(durationTime <= 0){
                    this.elementos.splice(index, 1);
                }
            }

            else if(oneParticle.type == "walk"){
                let durationTime = oneParticle.particleWalk(ctx, oneParticle);
                if(durationTime <= 0){
                    this.elementos.splice(index, 1);
                }
            }

            else if(oneParticle.type == "death"){
                let durationTime = oneParticle.particleDeath(ctx, oneParticle);
                console.log(oneParticle.particlePos)
                if(durationTime <= 0){
                    this.elementos.splice(index, 1);
                }
            }
        })
    }
}