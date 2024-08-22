addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvasMain");
    const ctx = canvas.getContext("2d");

    const jogador = new Player(["../Sprites/walkingsheetbro.png", 7, 1, 100], 5);
    const background = new Object(["../Sprites/OIP.jpg", 1, 1, 60], [0, 0], [[-10, 1000], [200, 1200]], true, false, true, 10, 0);

    let KeyPresses = {
        w: false,
        s: false,
        d: false,
        a: false,
        e: false,
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
        if(ev.key === "e"){
            KeyPresses.e = true;
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
        if(ev.key === "e"){
            KeyPresses.e = false;
        }
    }

    function sound(trackname){
        let au = new Audio("../Audio/" + trackname.detail);
        au.volume = 0.1;
        au.play();
    }

    function canvasUpdate(){
        canvas.setAttribute("width", 1280);
        canvas.setAttribute("height", 720);
    }

    function playerRoutine(){
        background.draw(ctx, canvas);
        
        jogador.update();

        background.testCollision(jogador);

        jogador.mov(KeyPresses);
        jogador.draw(ctx);
    }

    function loop(){
        canvasUpdate();
        clear();

        playerRoutine()

        requestAnimationFrame(loop);
    }

    loop();

    window.addEventListener("keydown", tecla);
    window.addEventListener("keyup", teclaMenos);
    window.addEventListener("audiocall", sound);
});