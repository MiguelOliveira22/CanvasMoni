class CollisionEvent{
    constructor(){
        this.collision = new CustomEvent("collisionevent");
    }
}

class Collision{
    constructor(collisonPoints, gravity){
        this.vertices = collisonPoints;
        this.gravity = gravity;

        window.addEventListener("collisionevent", this.checkCollision);
    }

    testCollision(){
        console.log(0);
    }
}