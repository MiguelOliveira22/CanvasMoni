/* class CollisionEvent{
    constructor(playerobj){
        this.collision = new CustomEvent("collisionevent", {
            player: playerobj
        });
    }
} */

class Collision{
    constructor(collisonPoints, collidable){
        this.vertices = collisonPoints;
        this.collidable = collidable;

        // window.addEventListener("collisionevent", this.testCollision);
    }

    testCollision(){
        console.log(1);
        /*
        if(this.collidable){
            if(y > 650){
                player.personagemPos.y = 650;
            }
            else{
                player.personagemPos.y = y;
            }

            if(x > 650){
                player.personagemPos.x = 650;
            }
            else{
                player.personagemPos.x = x;
            }
        } */
    }
}