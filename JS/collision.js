class Collision{
    constructor(collisonPoints, collidable){
        this.vertices = collisonPoints;
        this.collidable = collidable;
    }

    testCollision(player){
        let x = player.nextX;
        let y = player.nextY;

        console.log(x, (this.vertices[0][0] < x && this.vertices[1][0] > x));
        console.log(y, (this.vertices[0][1] < y && this.vertices[1][1] > y));

        if(this.collidable){
            if(x > this.vertices[0][0] && x < this.vertices[1][0]){
                if(y > this.vertices[0][1] && y < this.vertices[1][1]){
                    player.personagemPos.x = this.vertices[0][0];
                }
                else{
                    player.personagemPos.x = x;
                }
            }
            else{
                player.personagemPos.x = x;
            }

            if(y > this.vertices[0][1] && y < this.vertices[1][1]){
                if(x > this.vertices[0][0] && x < this.vertices[1][0]){
                    player.personagemPos.y = this.vertices[0][1];
                }
                else{
                    player.personagemPos.y = y;
                }
            }
            else{
                player.personagemPos.y = y;
            }
        }
    }
}