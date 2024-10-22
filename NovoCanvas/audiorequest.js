class AudioRequest{
    constructor(){
        this.au = [new Audio(), new Audio(), new Audio(), new Audio(), new Audio()];
    }

    send(trackname, trackid = 0, force = true){
        if(!this.au[trackid].paused && force){
            this.au[trackid].pause();
        }

        if(this.au[trackid].paused){
            this.au[trackid] = new Audio("../Audio/" + trackname);
            this.au[trackid].volume = 1;
            this.au[trackid].play();
        }
    }
}