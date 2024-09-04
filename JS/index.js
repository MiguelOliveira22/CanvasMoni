addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvasMain");
    const ctx = canvas.getContext("2d");

    const jogador = new Player(["../Sprites/walkingsheetbro.png", 7, 1, 100], [[10, 0], [125, 130]], 5);
    const background = new Object(["../Sprites/PixelArt/pixilart-drawing.png", 1, 1, 60], [0, 0], [[0, 0], [0, 0]], false, false, true, 10, 0);
    const ground = new Object(["", 1, 1, 60], [0, 625], [[0, 0], [2000, 100]], true, false, false, 10, 0);

    const inimigo = new Inimigo(["../Sprites/walkingsheetbro.png", 7, 1, 100], [[10, 0], [125, 130]], 5);

    const baupika = new Object(["../Sprites/PixelArt/bau-sprite.png", 8, 1, 1000], [500, 500], [[-20, -20], [200, 150]], false, true, false, 0, 0);

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
        inimigo.update();

        background.update(ctx, canvas, jogador, false);
        baupika.update(ctx, canvas, jogador, KeyPresses, false, () => {
            baupika.createItem(baupika);
        });
        
        ground.collisionTest(jogador);
        ground.collisionTest(inimigo);

        inimigo.mov()
        inimigo.draw(ctx)

        jogador.mov(KeyPresses);
        jogador.draw(ctx);
        
        jogador.inventario.drawBoxItem(ctx);
        jogador.inventario.changeItem(KeyPresses);
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

    /*
        ma.send('main.webm', 0);
        ma.send('Course_590_00.wav', 1);
        ma.send('Course_590_01.wav', 2);
        ma.send('Course_590_01_01.wav', 3);
    */
});