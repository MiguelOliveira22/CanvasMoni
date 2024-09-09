addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvasMain");
    const ctx = canvas.getContext("2d");

    let KeyPresses = {
        w: false,
        s: false,
        d: false,
        a: false,
        e: false,
        q: false,
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
        if(ev.key === "q"){
            KeyPresses.q = true;
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
        if(ev.key === "q"){
            KeyPresses.q = false;
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
        entidades[0].update(ctx);
        entidades[1].update();

        background.update(ctx, canvas, entidades, KeyPresses);
        bauteste.update(ctx, canvas, entidades, KeyPresses, () => {
            bauteste.createItem();
            bauteste.talk(ctx);
        });
        
        ground.collisionTest(entidades);

        entidades[1].mov()
        entidades[1].draw(ctx)

        entidades[0].mov(KeyPresses);
        entidades[0].draw(ctx);
        
        entidades[0].inventario.drawBoxItem(ctx);
        entidades[0].inventario.changeItem(KeyPresses);
    }

    function loop(){
        canvasUpdate();
        clear();

        playerRoutine()

        requestAnimationFrame(loop);
    }

    const entidades = [new Player(["../Sprites/walkingsheetbro.png", 7, 1, 100], [[10, 0], [125, 130]], 5, 2), new Inimigo(["../Sprites/walkingsheetbro.png", 7, 1, 100], [[10, 0], [125, 130]], 5)];
    const background = new Object(["../Sprites/PixelArt/pixilart-drawing.png", 1, 1, 60], [0, 0], [[0, 0], [0, 0]], false, false, true, 10, 0);
    const ground = new Object(["", 1, 1, 60], [0, 625], [[0, 0], [2000, 100]], true, false, false, 10, 0);

    const bauteste = new Object(["../Sprites/PixelArt/bau-sprite.png", 8, 1, 1000], [500, 500], [[-20, -20], [200, 150]], false, true, false, 0, 0);

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