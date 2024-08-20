addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvasMain");
    const ctx = canvas.getContext("2d");

    const jogador = new Player(["./Sprites/pixil-frame-0(1).png", 1, 1], 5, [[0, 0], [140, 140]], 1);
    const collisor = new CollisionEvent().collision;

    let KeyPresses = {
        w: false,
        s: false,
        d: false,
        a: false,
    };

    function clear(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function tecla(ev){
        if(ev.key === "w"){
            KeyPresses.w = true;
        }
        if(ev.key === "s"){
            KeyPresses.s = true;
        }
        if(ev.key === "d"){
            KeyPresses.d = true;
        }
        if(ev.key === "a"){
            KeyPresses.a = true;
        }
    }
    
    function teclaMenos(ev){
        if(ev.key === "w"){
            KeyPresses.w = false;
        }
        if(ev.key === "s"){
            KeyPresses.s = false;
        }
        if(ev.key === "d"){
            KeyPresses.d = false;
        }
        if(ev.key === "a"){
            KeyPresses.a = false;
        }
    }

    function sound(trackname){
        let au = new Audio("./" + trackname.detail);
        au.volume = 0.1;
        au.play();
    }

    function loop(){
        canvas.setAttribute("width", document.documentElement.clientWidth);
        canvas.setAttribute("height", document.documentElement.clientHeight - 5);

        clear();

        jogador.update();
        jogador.mov(KeyPresses);
        jogador.draw(ctx, canvas.width);

        window.dispatchEvent(collisor);

        requestAnimationFrame(loop);
    }

    loop();

    window.addEventListener("keydown", tecla);
    window.addEventListener("keyup", teclaMenos);
    window.addEventListener("audiocall", sound);
});