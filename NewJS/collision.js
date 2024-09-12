class Collision{
    constructor(collisonPoints, collidable, interactable){
        this.vertices = collisonPoints;
        this.collidable = collidable;
        this.interactable = interactable;
        this.cooldown = 100;
        this.interacting = false;
    }

    collTest(playe = [], posX, posY){
        this.interacting = false;
        playe.forEach((player) => {
            let x = player.nextX;
            let y = player.nextY;

            if(this.collidable && player.vertices != undefined){
                if(player.vertices[1][0] + x > (this.vertices[0][0] + posX) && player.vertices[0][0] + x < (this.vertices[1][0] + posX) &&
                   player.vertices[1][1] + y > (this.vertices[0][1] + posY) && player.vertices[1][0] + y < (this.vertices[1][1] + posY)){
                    player.entidadePos.x = this.vertices[0][0] + posX + player.entidadePos.x;
                    player.entidadePos.y = this.vertices[0][1] + posX + player.entidadePos.y;
                    player.collided = true;
                }
                else{
                    player.entidadePos.x = x;
                    player.entidadePos.y = y;
                }
            }

            if(this.interactable && player.vertices != undefined){
                if(player.vertices[1][0] + x > (this.vertices[0][0] + posX) && player.vertices[0][0] + x < (this.vertices[1][0] + posX) &&
                   player.vertices[1][1] + y > (this.vertices[0][1] + posY) && player.vertices[1][0] + y < (this.vertices[1][1] + posY)){
                    this.interacting = true;
                }
            }
        });
    }

    collDamage(entidades){
        //Errado, mas a aula começou
        let player = null;
        entidades.forEach((valor) => {
            if(valor.player){
                player = valor;
            }
        });
        if(player != null){
            entidades.forEach((valor) => {
                if(valor != player && valor.vertices != undefined && player.vertices != undefined){
                    if(player.vertices[1][0] + player.entidadePos.x >= valor.vertices[0][0] + valor.entidadePos.x &&
                       player.vertices[0][0] + player.entidadePos.x <= valor.vertices[1][0] + valor.entidadePos.x &&
                       player.vertices[1][1] + player.entidadePos.y >= valor.vertices[0][1] + valor.entidadePos.y &&
                       player.vertices[0][1] + player.entidadePos.y <= valor.vertices[1][1] + valor.entidadePos.y &&
                       this.cooldown == 0){
                        console.log("tomou dano player , hp: " + player.hp);
                        player.hp -= 10;
                        this.cooldown = 100;
                    }
                    else if(this.cooldown > 0){
                        this.cooldown -= 2
                    }
                }
            });
        }
    }

    projetilDamage(entidades, objeto){
        entidades.forEach((valor) => {
            if(valor.id != objeto.spawnerId && valor.vertices != undefined){
                if(valor.vertices[1][0] + valor.entidadePos.x >= objeto.vertices[0][0] + objeto.objPos.x &&
                   valor.vertices[0][0] + valor.entidadePos.x <= objeto.vertices[1][0] + objeto.objPos.x &&
                   valor.vertices[1][1] + valor.entidadePos.y >= objeto.vertices[0][1] + objeto.objPos.y &&
                   valor.vertices[0][1] + valor.entidadePos.y <= objeto.vertices[1][1] + objeto.objPos.y){
                    valor.hp -= 10;
                    console.log("tomou dano, hp: " + valor.hp);
                    objeto = undefined;
                    console.log(objeto)
                }
            }
        });
    }

    drawColl(ctx, posX, posY){
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillRect(this.vertices[0][0] + posX, this.vertices[0][1] + posY, this.vertices[1][0] - this.vertices[0][0], this.vertices[1][1] - this.vertices[0][1]);
    }
}