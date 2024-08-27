addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvasMain");
    const ctx = canvas.getContext("2d");

    const jogador = new Player(["../Sprites/walkingsheetbro.png", 7, 1, 100], 5);
    const background = new Object(["../Sprites/OIP.jpg", 1, 1, 60], [0, 0], [[0, 0], [0, 0]], false, false, true, 10, 0);
    const ground = new Object(["", 1, 1, 60], [100, 500], [[0, 0], [2000, 100]], true, true, false, 10, 0);

    const baupika = new Object(["../Sprites/pixilart-drawing(2).png", 1, 1, 60], [300, 300], [[0, 0], [200, 150]], false, true, false, 0, 0);

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

    var au = [new Audio()];
    function sound(trackname){
        if(!au[trackname.trackid].paused){
            au[trackname.trackid].pause();
        }
        au[trackname.trackid] = new Audio("../Audio/" + trackname.detail);
        au[trackname.trackid].volume = 0.1;
        au[trackname.trackid].play();
    }

    function canvasUpdate(){
        canvas.setAttribute("width", 1280);
        canvas.setAttribute("height", 720);
    }

    function playerRoutine(){
        background.draw(ctx, canvas);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        baupika.draw(ctx, canvas);
        
        jogador.update();

        background.testCollision(jogador);
        background.drawCollision(ctx);
        ground.drawCollision(ctx);
        ground.testCollision(jogador);
        baupika.drawCollision(ctx);
        baupika.testCollision(jogador);

        jogador.mov(KeyPresses);
        jogador.draw(ctx);

        ctx.font = '24px SMW';
        ctx.fillText("Como Assim Joey? O Que Tu fez?", 100, 100);
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