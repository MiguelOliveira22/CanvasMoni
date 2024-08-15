class AudioRequest{
    constructor(path){
        this.audio = new CustomEvent("audiocall", {
            detail: path
        });
    }

    send(){
        window.dispatchEvent(this.audio);
    }
}