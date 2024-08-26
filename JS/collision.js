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

    testCollision(player){
        let x = player.nextX;
        let y = player.nextY;

        if(this.collidable){
            if(x > this.vertices[0][0] && x < this.vertices[1][0]){
                if(y > this.vertices[0][1] + 10 && y < this.vertices[1][1] + 10){
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

            if(y > this.vertices[0][1] && y < this.vertices[1][1]){
                if(x > this.vertices[0][0] + 10 && x < this.vertices[1][0] + 10){
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