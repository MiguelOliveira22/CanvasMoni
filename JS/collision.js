class Collision{
    constructor(collisonPoints, collidable, interactable){
        this.vertices = collisonPoints;
        this.collidable = collidable;
        this.interactable = interactable;
        this.interacting = false;
    }

    collTest(player, posX, posY){
        let x = player.nextX;
        let y = player.nextY;

        if(this.collidable){
            if(x >= (this.vertices[0][0] - posX) && x <= (this.vertices[1][0] - posX)){
                if(y >= (this.vertices[0][1] + posY + 10) && y <= (this.vertices[1][1] + posY + 10)){
                    player.personagemPos.x = player.personagemPos.x;
                }
                else{
                    player.personagemPos.x = x;
                }
                player.collided = false;
            }
            else{
                player.personagemPos.x = x;
                player.collided = false;
            }

            if(y >= (this.vertices[0][1] + posY) && y <= (this.vertices[1][1] + posY)){
                if(x >= (this.vertices[0][0] + posX + 10) && x <= (this.vertices[1][0] + posX + 10)){
                    player.personagemPos.y = player.personagemPos.y;
                    player.collided = true;
                }
                else{
                    player.personagemPos.y = y;
                    player.collided = false;
                }
            }
            else{
                player.personagemPos.y = y;
                player.collided = false;
            }
        }

        if(this.interactable){
            console.log(x, this.vertices[0][0] + posX)
            if(x >= this.vertices[0][0] + posX && x <= this.vertices[1][0] + posX){
                if(y >= this.vertices[0][1] + posY && y <= this.vertices[1][1] + posY){
                    if(true){
                        this.interactable = false;
                        console.log('mui pika');
                    }
                }
            }
        }
    }

    drawColl(ctx, posX, posY){
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        console.log(12)
        ctx.fillRect(this.vertices[0][0] + posX, this.vertices[0][1] + posY, this.vertices[1][0] - this.vertices[0][0], this.vertices[1][1] - this.vertices[0][1]);
    }
}