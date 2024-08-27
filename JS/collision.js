class Collision{
    constructor(collisonPoints, collidable, interactable){
        this.vertices = collisonPoints;
        this.collidable = collidable;
        this.interactable = interactable;
        this.interacting = false;

        if(this.interactable){
            window.addEventListener("interaction", this.isInteracting);
        }
    }

    collTest(player, posX, posY){
        let x = player.nextX;
        let y = player.nextY;

        if(this.collidable){
            if(x > (this.vertices[0][0] + posX) && x < (this.vertices[1][0] + posX)){
                if(y > (this.vertices[0][1] + posY + 10) && y < (this.vertices[1][1] + posY + 10)){
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

            if(y > (this.vertices[0][1] + posY) && y < (this.vertices[1][1] + posY)){
                if(x > (this.vertices[0][0] + posX + 10) && x < (this.vertices[1][0] + posX + 10)){
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
            if(x > this.vertices[0][0] && x < this.vertices[1][0]){
                if(y > this.vertices[0][1] && y < this.vertices[1][1]){
                    this.interacting = true;
                }
                else{
                    this.interacting = false;
                }
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

    isInteracting(){
        console.log(1);
        window.removeEventListener('interaction', this.isInteracting);
        this.interactable = false;
        if(this.interacting && this.interactable){
            this.interactable = false;
            console.log('mui pika');
        }
    }
}