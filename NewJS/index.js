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

    const entidades = [new Entidade(["../Sprites/walkingsheetbro.png", 7, 1, 100], [[10, 0], [125, 130]], 5, 2),
                       new Entidade(["../Sprites/walkingsheetbro.png", 7, 1, 100], [[10, 0], [125, 130]], 5)];
    
    const objetos = [new Objeto(["../Sprites/PixelArt/pixilart-drawing.png", 1, 1, 60], [0, 0], [[0, 0], [0, 0]], false, false, true, 10, 0),
                     new Objeto(["", 1, 1, 60], [0, 625], [[0, 0], [2000, 100]], true, false, false, 10, 0),
                     new Objeto(["../Sprites/PixelArt/bau-sprite.png", 8, 1, 1000], [500, 500], [[-20, -20], [200, 150]], false, true, false, 0, 0)];

    function playerRoutine(){
        background.update(ctx, canvas, entidades, KeyPresses);
        bauteste.update(ctx, canvas, entidades, KeyPresses);

        entidades[0].update(ctx, entidades[0].mov(KeyPresses));
        entidades[1].update(ctx, entidades[1].mov(KeyPresses));
        
        ground.collisionTest(entidades);
    }

    function loop(){
        canvasUpdate();
        clear();

        // Execução Interna!
        playerRoutine();

        requestAnimationFrame(loop);
    }

    loop();

    window.addEventListener("keydown", tecla);
    window.addEventListener("keyup", teclaMenos);
});