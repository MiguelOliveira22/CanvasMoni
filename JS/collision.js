class Collision{
    constructor(collisonPoints, collidable, interactable){
        this.vertices = collisonPoints;
        this.collidable = collidable;
        this.interactable = interactable;
        this.interacting = false;
    }

    collTest(playe, posX, posY){
        for(let i = 0; i < playe.length; i ++){
            let player = playe[0];
            let x = player.nextX;
            let y = player.nextY;

            if(this.collidable){
                if(player.vertices[1][0] + x > (this.vertices[0][0] + posX) && player.vertices[0][0] + x < (this.vertices[1][0] + posX) &&
                   player.vertices[1][1] + y > (this.vertices[0][1] + posY) && player.vertices[1][0] + y < (this.vertices[1][1] + posY)){
                    try{
                        player.personagemPos.x = this.vertices[0][0] + posX + player.personagemPos.x;
                        player.personagemPos.y = this.vertices[0][1] + posX + player.personagemPos.y;
                    }
                    catch{
                        player.enemyPos.x = this.vertices[0][0] + posX + player.enemyPos.x;
                        player.enemyPos.y = this.vertices[0][1] + posX + player.enemyPos.y;
                    }
                    player.collided = true;
                }
                else{
                    try{
                        player.personagemPos.x = x;
                        player.personagemPos.y = y;
                    }
                    catch{
                        player.enemyPos.x = x;
                        player.enemyPos.y = y;
                        
                    }
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
    }

    drawColl(ctx, posX, posY){
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillRect(this.vertices[0][0] + posX, this.vertices[0][1] + posY, this.vertices[1][0] - this.vertices[0][0], this.vertices[1][1] - this.vertices[0][1]);
    }
}