class Group{
    constructor(){
        this.elementos = [];
        this.quantos = 0;
    }

    update(ctx, canvas, jogador, KeyPresses, flags, particula){
        if(flags == "entidade"){
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
        if(flags == "objeto"){
            this.elementos.forEach((valor, i) => {
                if(this.notNone(valor)){
                    valor.update(ctx, canvas, jogador, KeyPresses);
                    valor.collisionTest(jogador.elementos, KeyPresses, () => {
                        valor.createItem();
                    });
                }
            });
        }
        if(flags == "container"){
            this.elementos.forEach((valor) => {
                if(this.notNone(valor)){
                    valor.update(ctx, canvas, entidades, KeyPresses);
                    valor.collisionTest(entidades.elementos, KeyPresses, () => {
                        valor.addInventory(entidades.elementos);
                    });
                }
            });
        }
        if(flags == "projetil"){
            let informations = []
            this.elementos.forEach((valor, index) => {
                if(this.notNone(valor)){
                    console.log(valor)
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
            particula.addParticle(KeyPresses, jogador, informations);
        }
        if(flags == "particula"){
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
            });
        }
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

    addParticle(KeyPresses, entidades, hitPosDirectionAndPosMorto){
        if(hitPosDirectionAndPosMorto[0]){
            this.addElement(new particle(["../Sprites/Boom.png", 3, 1, 500], 100, hitPosDirectionAndPosMorto[1], hitPosDirectionAndPosMorto[2], "hit"))
        }
        if(entidades.elementos[0].collided && ((KeyPresses.a && !KeyPresses.d) || (!KeyPresses.a && KeyPresses.d))){
            this.addElement(new particle(["../Sprites/dirt.png", 6, 1, 500], 100, [entidades.elementos[0].entidadePos.x, entidades.elementos[0].entidadePos.y + 100], entidades.elementos[0].direction, "walk"))
        }
        
        entidades.elementos.forEach(entidade => {
            if(entidade.hp == 0){
                //this.addElement(new particle(["../Sprites/Boom.png", 3, 1, 500], 100, [hitPosDirectionAndPosMorto[3][0] + (entidade.vertices[1][0]/2), hitPosDirectionAndPosMorto[3][1] + (entidade.vertices[1][1]/2)], entidades.elementos[0].direction, "death"))
                this.addElement(new particle(["../Sprites/Boom.png", 3, 1, 500], 100, [entidade.entidadePos.x, entidade.entidadePos.y], entidades.elementos[0].direction, "death"))
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

    clearElements(){
        this.elementos = [];
        this.quantos = 0;
    }
}

class GroupLevel{
    constructor(){
        this.grupos = [];
        this.flags = ["objeto", "projetil", "entidade", "container", "particula"];

        this.map = undefined;
        this.enter = undefined;
        this.exit = undefined;

        this.atual = undefined;

        this.generateLevel();
    }

    clearElements(){
        this.grupos = [];
    }

    notNone(valor){
        if(valor != undefined){
            return true;
        }
        return false;
    }

    generateLevel(){
        while(!this.notNone(this.enter) || !this.notNone(this.exit)){
            this.enter = undefined;
            this.exit = undefined;

            let time = new Date().getTime() / 1000;

            this.gen = new MapGen(time);
            this.map = this.gen.genMap();
        
            for(let i = 0; i < this.map.length; i ++){
                if(this.map[i] != undefined){
                    if(this.map[i].spawn){
                        this.enter = this.map[i];
                    }
            
                    if(this.map[i].exit){
                        this.exit = this.map[i];
                    }
                }
            }
            console.log(this.exit, this.enter);
        }

        this.atual = this.enter;
        this.generateElements();
    }

    generateElements(){
        for(let i = 0; i < this.flags.length; i ++){
            this.grupos[i] = new Group();
            if(this.flags[i] == "entidade"){
                this.entidades = this.grupos[i];
            }
            if(this.flags[i] == "objeto"){
                this.objetos = this.grupos[i];
            }
            if(this.flags[i] == "projetil"){
                this.projeteis = this.grupos[i];
            }
            if(this.flags[i] == "container"){
                this.baus = this.grupos[i];
            }
            if(this.flags[i] == "particula"){
                this.particulas = this.grupos[i];
            }
        }

        let valuesLevel = new ListaLevel();
        this.atual.sides.forEach((valor, i) => {
            if(valor){
                valuesLevel.pecasTrue[i].forEach((para) => {
                    this.objetos.addElement(para);
                });
            }
            else{
                this.objetos.addElement(valuesLevel.pecasFalse[i][0]);
            }
        });

        this.objetos.addElement(new Objeto(["../Sprites/PixelArt/pixilart-drawing.png", 1, 1, 60], [0, 0], [[0, 0], [0, 0]], false, false, true, 0, 0));

        this.entidades.addElement(new Entidade(["/Sprites/walkingsheetbro.png", 7, 1, 100], [[10, 0], [125, 130]], 5, 2, true));
        this.entidades.addElement(new Entidade(["/Sprites/walkingsheetbro.png", 7, 1, 100], [[10, 0], [125, 130]], 5, 3));
        this.entidades.addElement(new Entidade(["/Sprites/walkingsheetbro.png", 7, 1, 100], [[10, 0], [125, 130]], 5, 3))
    }

    routineUpdate(ctx, canvas, KeyPresses){
        this.grupos.forEach((valor, i) => {
            if(this.grupos[i] == this.entidades){
                valor.objAddToGroup(this.projeteis);
            }
            valor.update(ctx, canvas, this.entidades, KeyPresses, this.flags[i], this.particulas);
        });
    }

    routineCollision(KeyPresses){
        this.grupos.forEach((valor, i) => {
            valor.testCollision(this.entidades, KeyPresses, this.flags[i]);
        });
    }
}