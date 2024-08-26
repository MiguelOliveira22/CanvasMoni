class AudioRequest{
    constructor(path){
        this.audio = new CustomEvent("audiocall", {
            detail: path,
            faixa: trackid
        });

        this.send();
    }

    send(){
        window.dispatchEvent(this.audio);
    }
}