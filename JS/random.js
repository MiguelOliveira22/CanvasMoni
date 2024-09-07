class MapGen{
    constructor(seed){
        this.randInt = RandomUse(seed);
        this.ends = [];
        this.path = [];

        this.width = 30 * 2;
        this.height = 30 * 2;
        this.logicalCells = 0;
        this.physicalCells = 40;

        this.forkBias = 0.1;
        this.turnBias = 0.13;
        this.upBias = 0.68;
        this.downBias = 0.68;
        this.leftBias = 1;
        this.rightBias = 1;
    }

    genMap(){
        this.ends = [];
        this.path = [];

        this.logicalCells = 0;
        while(logicalCells < physicalCells){
            if(){
                
            }
        }
    }
}

class RandomUse{
    constructor(seed){
        this.mod = 40960;
        this.a = 21;
        this.c = 3;
        this.seed = seed % mod; // get rtc
        this.lastRandGenerated = seed;
    }

    randomInt(){
        let randInt = (lastRandGenerated * a + c) % mod;
        this.lastRandGenerated = randInt;
        return randInt;
    }
}