addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvasMain");
    const ctx = canvas.getContext("2d");

    const jogador = new Player(["../Sprites/walkingsheetbro.png", 7, 1, 100], [[10, 0], [125, 150]], 5);
    const background = new Object(["../Sprites/OIP.jpg", 1, 1, 60], [0, 0], [[0, 0], [0, 0]], false, false, true, 10, 0);
    const ground = new Object(["", 1, 1, 60], [0, 500], [[0, 0], [2000, 100]], true, false, false, 10, 0);

    const baupika = new Object(["../Sprites/pixilart-drawing(2).png", 1, 1, 60], [0, 0], [[0, 0], [200, 150]], false, true, false, 0, 0);

    const ma = new AudioRequest();

    let KeyPresses = {
        w: false,
        s: false,
        d: false,
        a: false,
        e: false,
        1: false,
        2: false
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
            ma.send('main.webm', 0);
            ma.send('Course_590_00.wav', 1);
            ma.send('Course_590_01.wav', 2);
            ma.send('Course_590_01_01.wav', 3);
        }
        if(ev.key === "1"){
            KeyPresses[1] = true;
        }
        if(ev.key === "2"){
            KeyPresses[2] = true;
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
        if(ev.key === "1"){
            KeyPresses[1] = false;
        }
        if(ev.key === "2"){
            KeyPresses[2] = false;
        }
    }

    function canvasUpdate(){
        canvas.setAttribute("width", 1280);
        canvas.setAttribute("height", 720);
    }

    function playerRoutine(){
        jogador.update();

        background.update(ctx, canvas, jogador, false);
        baupika.update(ctx, canvas, jogador, KeyPresses, false, () => {
            baupika.createItem(baupika);
        });
        
        ground.collisionTest(jogador);

        jogador.inventario.drawBoxItem(ctx);
        jogador.inventario.changeItem(KeyPresses)

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
});