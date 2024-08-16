class CollisionEvent{
    constructor(){
        this.collision = new CustomEvent("collisionevent");
    }
}

class Collision{
    constructor(collisonPoints){
        // this.vertices = collisonPoints;
        // this.addEventListener("collisionevent", this);
    }

    testCollision(){
        console.log(0);
    }
}