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

    const entidades = new Group();
    entidades.addElement(new Entidade(["../Sprites/walkingsheetbro.png", 7, 1, 100], [[10, 0], [125, 130]], 5, 2, true));
    entidades.addElement(new Entidade(["../Sprites/walkingsheetbro.png", 7, 1, 100], [[10, 0], [125, 130]], 5, 3));

    //const inimigos = new Group();
    //inimigos.addElement(entidades.elementos[1]);
    
    const objetos = new Group();
    objetos.addElement(new Objeto(["../Sprites/PixelArt/pixilart-drawing.png", 1, 1, 60], [0, 0], [[0, 0], [0, 0]], false, false, true, 10, 0));
    objetos.addElement(new Objeto(["", 1, 1, 60], [0, 625], [[0, 0], [2000, 100]], true, false, false, 10, 0));
    objetos.addElement(new Objeto(["../Sprites/PixelArt/bau-sprite.png", 8, 1, 1000], [500, 500], [[-20, -20], [200, 150]], false, true, false, 0, 0));

    const projeteis = new Group();

    entidades.objAddToGroup(projeteis);

    const items = new Group();

    objetos.objAddToGroup(items);

    function playerRoutine(){
        objetos.update(ctx, canvas, entidades, KeyPresses);
        projeteis.update(ctx, canvas, entidades, KeyPresses);

        entidades.update(ctx, canvas, entidades, KeyPresses);

        items.update(ctx, canvas, entidades, KeyPresses);
        
        objetos.testCollision(entidades, KeyPresses);
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