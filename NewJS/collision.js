class Collision{
    constructor(collisonPoints, collidable, interactable){
        this.vertices = collisonPoints;
        this.collidable = collidable;
        this.interactable = interactable;
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

    drawColl(ctx, posX, posY){
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillRect(this.vertices[0][0] + posX, this.vertices[0][1] + posY, this.vertices[1][0] - this.vertices[0][0], this.vertices[1][1] - this.vertices[0][1]);
    }
}