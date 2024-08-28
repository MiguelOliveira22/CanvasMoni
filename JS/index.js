addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvasMain");
    const ctx = canvas.getContext("2d");

    const jogador = new Player(["../Sprites/walkingsheetbro.png", 7, 1, 100], [[10, 0], [125, 150]], 5);
    const background = new Object(["../Sprites/OIP.jpg", 1, 1, 60], [0, 0], [[0, 0], [0, 0]], false, false, true, 10, 0);
    const ground = new Object(["", 1, 1, 60], [0, 500], [[0, 0], [2000, 100]], true, false, false, 10, 0);

    const baupika = new Object(["../Sprites/pixilart-drawing(2).png", 1, 1, 60], [0, 0], [[0, 0], [200, 150]], false, true, false, 0, 0);
    const mani = new Item(["../Sprites/walkingsheetbro.png", 7, 1, 100], [110, 110], [[0,0], [100, 100]], 2);

    const ma = new AudioRequest('main.webm', 4);
    ma.send();
    const man = new AudioRequest('main.webm', 2);
    const manc = new AudioRequest('main.webm', 3);
    const manco = new AudioRequest('main.webm', 1);
    const mancos = new AudioRequest('main.webm', 0);

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

    var au = [new Audio()] * 5;
    function sound(trackname){
        /*if(!au[trackname.faixa].paused){
            au[trackname.faixa].pause();
        }*/
        au[trackname.faixa] = new Audio("../Audio/" + trackname.detail);
        au[trackname.faixa].volume = 0.1;
        au[trackname.faixa].play();
    }

    function canvasUpdate(){
        canvas.setAttribute("width", 1280);
        canvas.setAttribute("height", 720);
    }

    function playerRoutine(){
        background.draw(ctx, canvas);
        mani.draw(ctx);
        baupika.draw(ctx, canvas);
        
        jogador.update();

        background.collisionTest(jogador);
        ground.collisionTest(jogador);
        baupika.collisionTest(jogador, KeyPresses);
        mani.collisionTest(jogador, KeyPresses);

        jogador.mov(KeyPresses);
        jogador.draw(ctx);
        jogador.drawCollision(ctx);
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