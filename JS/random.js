class RandomUse{
    // gerador congruencial misto - em acordo com o teorema de Hull-Dobell
    constructor(seed){
        this.mod = 40960;
        this.a = 21;
        this.c = 3;
        this.seed = seed % this.mod;
        this.lastRandGenerated = this.seed;
    }

    randomInt(){
        let gen = (this.lastRandGenerated * this.a + this.c) % this.mod;
        this.lastRandGenerated = gen;
        return gen;
    }

    randomIntRange(range = 1){
        this.randomInt()
        return this.lastRandGenerated % range;
    }
}

class MapGen extends RandomUse{
    constructor(seed){
        super(seed);

        this.width = 30;
        this.height = 30;
        this.physicalCells = 20;
        this.logicalCells = 0;
    }

    genMap(){
        this.path = new Array(this.physicalCells);
        this.tiles = new Array(this.width);
        for(let i = 0; i < this.width; i ++){
            this.tiles[i] = new Array(this.height);
            for(let j = 0; j < this.height; j ++){
                this.tiles[i][j] = false;
            }
        }

        this.ends = new Array(2);
        this.endsWhich = false;

        this.x = this.width / 2;
        this.y = this.height / 2;

        this.path[this.logicalCells] = new Room(this.logicalCells, [this.x, this.y]);
        this.ends[this.endsWhich] = this.path[this.logicalCells];
        this.ends[!this.endsWhich] = this.ends[this.endsWhich];
        this.endsWhich = !this.endsWhich;
        this.logicalCells ++;

        this.tiles[this.x][this.y] = true;
        
        while(this.logicalCells < this.physicalCells){
            this.cycled = false;
            this.x = this.path[this.ends[this.endsWhich].id].pos.x;
            this.y = this.path[this.ends[this.endsWhich].id].pos.y;
            if(this.y + 1 < this.height){
                if(Math.floor((this.lastRandGenerated / (this.mod / 4))) == 0 && !this.tiles[this.x][this.y + 1]){
                    this.cycled = true;
                    this.y ++;
                    this.tiles[this.x][this.y] = true;
                    this.path[this.logicalCells] = new Room(this.logicalCells, [this.x, this.y]);
                    this.path[this.logicalCells].setSides(null, null, this.ends[this.endsWhich].id);
                    this.path[this.ends[this.endsWhich].id].setSides(this.logicalCells);
                    this.ends[this.endsWhich] = this.path[this.logicalCells];
                }
            }
            if(this.x + 1 < this.width){
                if(Math.floor((this.lastRandGenerated / (this.mod / 4))) == 1 && !this.tiles[this.x + 1][this.y]){
                    this.cycled = true;
                    this.x ++;
                    this.tiles[this.x][this.y] = true;
                    this.path[this.logicalCells] = new Room(this.logicalCells, [this.x, this.y]);
                    this.path[this.logicalCells].setSides(null, null, null, this.ends[this.endsWhich].id);
                    this.path[this.ends[this.endsWhich].id].setSides(null, this.logicalCells);
                    this.ends[this.endsWhich] = this.path[this.logicalCells];
                }
            }
            if(this.y - 1 >= 0){
                if(Math.floor((this.lastRandGenerated / (this.mod / 4))) == 2 && !this.tiles[this.x][this.y - 1]){
                    this.cycled = true;
                    this.y --;
                    this.tiles[this.x][this.y] = true;
                    this.path[this.logicalCells] = new Room(this.logicalCells, [this.x, this.y]);
                    this.path[this.logicalCells].setSides(this.ends[this.endsWhich].id);
                    this.path[this.ends[this.endsWhich].id].setSides(null, null, this.logicalCells);
                    this.ends[this.endsWhich] = this.path[this.logicalCells];
                }
            }
            if(this.x - 1 >= 0){
                if(Math.floor((this.lastRandGenerated / (this.mod / 4))) == 3 && !this.tiles[this.x - 1][this.y]){
                    this.cycled = true;
                    this.x --;
                    this.tiles[this.x][this.y] = true;
                    this.path[this.logicalCells] = new Room(this.logicalCells, [this.x, this.y]);
                    this.path[this.logicalCells].setSides(null, this.ends[this.endsWhich].id);
                    this.path[this.ends[this.endsWhich].id].setSides(null, null, null, this.logicalCells);
                    this.ends[this.endsWhich] = this.path[this.logicalCells];
                }
            }

            this.randomInt();

            if(this.cycled){
                this.cycles = 0;
                this.logicalCells ++;
            }
            else{
                this.cycles ++;
                this.endsWhich = !this.endsWhich;
            }

            if(this.cycles >= 5){ // Se ciclar dá um break!
                break;
            }
        }
        this.path[this.ends[this.endsWhich].id].setSpawn();
        this.path[this.ends[!this.endsWhich].id].setExit();

        for(let i = 0; i < this.physicalCells; i ++){
            console.log(this.path[i]);
        }
    }
}

class Room{
    constructor(id, [x, y], spawn = false, exit = false){
        this.spawn = spawn;
        this.exit = exit;
        this.pos = {
            x: x,
            y: y
        }
        this.sides = [null, null, null, null];
        this.id = id;
    }

    setSides(u = null, r = null, d = null, l = null){
        if(u == null){
            u = this.sides[0];
        }
        if(r == null){
            r = this.sides[1];
        }
        if(d == null){
            d = this.sides[2];
        }
        if(l == null){
            l = this.sides[3];
        }
        this.sides = [u, r, d, l]
    }

    setSpawn(){
        this.spawn = true;
    }

    setExit(){
        this.exit = true;
    }
}

/*
const now = new Date();
const time = now.getTime() / 1000;

let mapper = new MapGen(time);
mapper.genMap();
*/