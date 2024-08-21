class Collision{
    constructor(collisonPoints, collidable){
        this.vertices = collisonPoints;
        this.collidable = collidable;
    }

    testCollision(player){
        let x = player.nextX;
        let y = player.nextY;

        if(this.collidable){
            if(y > 650){
                player.personagemPos.y = 650;
            }
            else{
                player.personagemPos.y = y;
            }

            if(x > 850){
                player.personagemPos.x = 850;
            }
            else{
                player.personagemPos.x = x;
            }
        }
    }
}