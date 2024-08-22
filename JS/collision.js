class Collision{
    constructor(collisonPoints, collidable, interactable){
        this.vertices = collisonPoints;
        this.collidable = collidable;
        this.interactable = interactable;
    }

    testCollision(player){
        let x = player.nextX;
        let y = player.nextY;

        if(this.collidable){
            if(x > this.vertices[0][0] && x < this.vertices[1][0]){
                if(y > this.vertices[0][1] && y < this.vertices[1][1]){
                    player.personagemPos.x = player.personagemPos.x;
                    player.collided = true;
                }
                else{
                    player.personagemPos.x = x;
                    player.collided = false;
                }
            }
            else{
                player.personagemPos.x = x;
                player.collided = false;
            }

            if(y > this.vertices[0][1] && y < this.vertices[1][1]){
                if(x > this.vertices[0][0] && x < this.vertices[1][0]){
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
                    window.dispatchEvent(); // Evento de interação com id
                }
            }
        }
    }
}