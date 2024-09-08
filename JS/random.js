class RandomUse{
    constructor(seed){
        this.mod = 40960;
        this.a = 21;
        this.c = 3;
        this.seed = seed % this.mod; // get rtc
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
        this.random = new RandomUse(seed + 10).randomInt;

        this.width = 30 * 2;
        this.height = 30 * 2;
        this.physicalCells = 20;
        this.logicalCells = 0;

        this.turnBias = 0.13;
        this.upBias = 0.68;
        this.downBias = 0.68;
        this.leftBias = 1;
        this.rightBias = 1;
    }

    genMap(){
        this.path = new Array(this.physicalCells);

        this.path[this.logicalCells] = new Room(this.logicalCells, true);
        this.logicalCells ++;

        this.lastRandRound = this.lastRandGenerated + this.lastRandGenerated % 2;
        while(this.logicalCells < this.physicalCells){
            this.cycled = false;
            if(Math.floor(this.lastRandRound / 10240) == 0){
                this.path[this.logicalCells] = new Room(this.logicalCells);
                this.path[this.logicalCells].setSides(null, null, this.logicalCells - 1);
                this.path[this.logicalCells - 1].setSides(this.logicalCells);
            }
            else if(Math.floor(this.lastRandRound / 10240) == 1){
                this.path[this.logicalCells] = new Room(this.logicalCells);
                this.path[this.logicalCells].setSides(null, null, null, this.logicalCells - 1);
                this.path[this.logicalCells - 1].setSides(null, this.logicalCells);
            }
            else if(Math.floor(this.lastRandRound / 10240) == 2){
                this.path[this.logicalCells] = new Room(this.logicalCells);
                this.path[this.logicalCells].setSides(this.logicalCells - 1);
                this.path[this.logicalCells - 1].setSides(null, null, this.logicalCells);
            }
            else if(Math.floor(this.lastRandRound / 10240) == 3){
                this.path[this.logicalCells] = new Room(this.logicalCells);
                this.path[this.logicalCells].setSides(null, this.logicalCells - 1);
                this.path[this.logicalCells - 1].setSides(null, null, null, this.logicalCells);
            }

            this.randomInt();
            this.lastRandRound = this.lastRandGenerated + this.lastRandGenerated % 2;
            if(this.cycled){
                this.logicalCells ++;
            }
        }
        if(Math.floor(this.lastRandRound / 10240) == 0){
            this.path[this.logicalCells] = new Room(this.logicalCells);
            this.path[this.logicalCells].setSides(null, null, this.logicalCells - 1);
            this.path[this.logicalCells - 1].setSides(this.logicalCells);
        }
        else if(Math.floor(this.lastRandRound / 10240) == 1){
            this.path[this.logicalCells] = new Room(this.logicalCells);
            this.path[this.logicalCells].setSides(null, null, null, this.logicalCells - 1);
            this.path[this.logicalCells - 1].setSides(null, this.logicalCells);
        }
        else if(Math.floor(this.lastRandRound / 10240) == 2){
            this.path[this.logicalCells] = new Room(this.logicalCells);
            this.path[this.logicalCells].setSides(this.logicalCells - 1);
            this.path[this.logicalCells - 1].setSides(null, null, this.logicalCells);
        }
        else if(Math.floor(this.lastRandRound / 10240) == 3){
            this.path[this.logicalCells] = new Room(this.logicalCells);
            this.path[this.logicalCells].setSides(null, this.logicalCells - 1);
            this.path[this.logicalCells - 1].setSides(null, null, null, this.logicalCells);
        }

        for(let i = 0; i <= this.physicalCells; i ++){
            console.log(this.path[i]);
        }
    }
}

class Room{
    constructor(id, spawn = false, exit = false){
        this.spawn = spawn;
        this.exit = exit;
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

    setExit(){
        this.exit = true;
    }
}

let mapper = new MapGen(40960);
mapper.genMap();