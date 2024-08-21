addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvasMain");
    const ctx = canvas.getContext("2d");

    const jogador = new Player(["./Sprites/pixil-frame-0(1).png", 1, 1], 5, [0, 10, 0, 10], 2);
    const collisor = new CollisionEvent(jogador).collision;
    // const background = new Object(["./Sprites/OIP.jpg", 1, 1], [0, 10, 0, 10]);

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

    function canvasUpdate(){
        canvas.setAttribute("width", 1280);
        canvas.setAttribute("height", 720);

        // background.draw(ctx);
    }

    function playerRoutine(){
        jogador.update();
        jogador.mov(KeyPresses);
        jogador.draw(ctx, canvas.width);
    }

    function loop(){
        canvasUpdate();
        clear();

        playerRoutine()

        window.dispatchEvent(collisor);
        requestAnimationFrame(loop);
    }

    loop();

    window.addEventListener("keydown", tecla);
    window.addEventListener("keyup", teclaMenos);
    window.addEventListener("audiocall", sound);
});