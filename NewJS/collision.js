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

            if(this.collidable){
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

            if(this.interactable){
                if(player.vertices[1][0] + x > (this.vertices[0][0] + posX) && player.vertices[0][0] + x < (this.vertices[1][0] + posX) &&
                   player.vertices[1][1] + y > (this.vertices[0][1] + posY) && player.vertices[1][0] + y < (this.vertices[1][1] + posY)){
                    this.interacting = true;
                }
            }
        });
    }

    collDamage(entidades){
        //Errado, mas a aula começou
        if(entidades[0].vertices[1][0] + entidades[0].entidadePos.x >= entidades[1].vertices[0][0] + entidades[1].entidadePos.x &&
           entidades[0].vertices[0][0] + entidades[0].entidadePos.x <= entidades[1].vertices[1][0] + entidades[1].entidadePos.x &&
           entidades[0].vertices[1][1] + entidades[0].entidadePos.y >= entidades[1].vertices[0][1] + entidades[1].entidadePos.y &&
           entidades[0].vertices[0][1] + entidades[0].entidadePos.y <= entidades[1].vertices[1][1] + entidades[1].entidadePos.y &&
           this.cooldown == 0){
            console.log("tomou dano player , hp: " + entidades[0].hp);
            entidades[0].hp -= 10;
            this.cooldown = 100;
        }
        else if(this.cooldown > 0){
            this.cooldown -= 2
        }
    }

    projetilDamage(entidades, objeto){
        entidades.forEach((valor) => {
            if(valor.id != objeto.spawnerId){
                if(valor.vertices[1][0] + valor.entidadePos.x >= objeto.vertices[0][0] + objeto.objPos.x &&
                   valor.vertices[0][0] + valor.entidadePos.x <= objeto.vertices[1][0] + objeto.objPos.x &&
                   valor.vertices[1][1] + valor.entidadePos.y >= objeto.vertices[0][1] + objeto.objPos.y &&
                   valor.vertices[0][1] + valor.entidadePos.y <= objeto.vertices[1][1] + objeto.objPos.y){
                    console.log("tomou dano, hp: " + valor.hp);
                    valor.hp -= 10;
                    //objeto.delete();
                }
            }
        });
    }

    drawColl(ctx, posX, posY){
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillRect(this.vertices[0][0] + posX, this.vertices[0][1] + posY, this.vertices[1][0] - this.vertices[0][0], this.vertices[1][1] - this.vertices[0][1]);
    }
}