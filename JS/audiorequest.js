class AudioRequest{
    constructor(path, trackid){
        console.log(1)
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