class Collision{
    constructor(collisonPoints, collidable, interactable){
        this.vertices = collisonPoints;
        this.collidable = collidable;
        this.interactable = interactable;
        this.interacting = false;
    }

    collTest(player, KeyPresses, posX, posY){
        let x = player.nextX;
        let y = player.nextY;

        console.log();

        if(this.collidable){
            if(player.vertices[1][0] + x > (this.vertices[0][0] + posX) && player.vertices[0][0] + x < (this.vertices[1][0] + posX) &&
               player.vertices[1][1] + y > (this.vertices[0][1] + posY) && player.vertices[1][0] + y < (this.vertices[1][1] + posY)){
                player.personagemPos.x = this.vertices[0][0] + posX + player.personagemPos.x;
                player.personagemPos.y = this.vertices[0][1] + posX + player.personagemPos.y;
                player.collided = true;
            }
            else{
                player.personagemPos.x = x;
                player.personagemPos.y = y;
                player.collided = false;
            }
        }

        if(this.interactable){
            if(player.vertices[1][0] + x > (this.vertices[0][0] + posX) && player.vertices[0][0] + x < (this.vertices[1][0] + posX) &&
               player.vertices[1][1] + y > (this.vertices[0][1] + posY) && player.vertices[1][0] + y < (this.vertices[1][1] + posY)){
                this.interacting = true;
            }
            else{
                this.interacting = false;
            }
        }
    }

    drawColl(ctx, posX, posY){
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillRect(this.vertices[0][0] + posX, this.vertices[0][1] + posY, this.vertices[1][0] - this.vertices[0][0], this.vertices[1][1] - this.vertices[0][1]);
    }
}