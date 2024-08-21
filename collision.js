class CollisionEvent{
    constructor(playerobj){
        this.collision = new CustomEvent("collisionevent", {
            player: playerobj
        });
    }
}

class Collision{
    constructor(collisonPoints){
        this.vertices = collisonPoints;

        window.addEventListener("collisionevent", this.testCollision);
    }

    testCollision(player){
        console.log(player.playerobj)
        var x = player.player.nextX;
        var y = player.player.nextY;

        console.log(x, y);

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
    }
}