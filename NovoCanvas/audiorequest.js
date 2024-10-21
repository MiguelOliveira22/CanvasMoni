class AudioRequest{
    constructor(){
        this.au = [new Audio(), new Audio(), new Audio(), new Audio(), new Audio()];
    }

    send(trackname, trackid){
        if(!this.au[trackid].paused){
            this.au[trackid].pause();
        }
        this.au[trackid] = new Audio("../Audio/" + trackname);
        this.au[trackid].volume = 1;
        this.au[trackid].play();
    }
}