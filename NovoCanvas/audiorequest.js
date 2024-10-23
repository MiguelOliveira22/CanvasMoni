class AudioRequest{
    constructor(){
        this.au = [new Audio(), new Audio(), new Audio(), new Audio(), new Audio()];
    }

    send(trackname, trackid = 0, force = true, volume = 1){
        if(!this.au[trackid].paused && force){
            this.au[trackid].pause();
        }

        if(this.au[trackid].paused){
            this.au[trackid] = new Audio("../Audio/" + trackname);
            this.au[trackid].volume = volume;
            this.au[trackid].play();
        }
    }
}