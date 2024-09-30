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

    var teclaexe = "";
    function tecla(ev){
        teclaexe = ev.key.toLowerCase();
        if(teclaexe === "w"){
            KeyPresses.w = true;
        }
        if(teclaexe === "s"){
            KeyPresses.s = true;
        }
        if(teclaexe === "d"){
            KeyPresses.d = true;
        }
        if(teclaexe === "a"){
            KeyPresses.a = true;
        }
        if(teclaexe === "e"){
            KeyPresses.e = true;
        }
        if(teclaexe === "q"){
            KeyPresses.q = true;
        }
        if(teclaexe === "1"){
            KeyPresses[1] = true;
        }
        if(teclaexe === "2"){
            KeyPresses[2] = true;
        }
    }
    
    function teclaMenos(ev){
        var tecla = ev.key.toLowerCase();
        if(tecla === "w"){
            KeyPresses.w = false;
        }
        if(tecla === "s"){
            KeyPresses.s = false;
        }
        if(tecla === "d"){
            KeyPresses.d = false;
        }
        if(tecla === "a"){
            KeyPresses.a = false;
        }
        if(tecla === "e"){
            KeyPresses.e = false;
        }
        if(tecla === "q"){
            KeyPresses.q = false;
        }
        if(tecla === "1"){
            KeyPresses[1] = false;
        }
        if(tecla === "2"){
            KeyPresses[2] = false;
        }
    }

    function canvasUpdate(){
        canvas.setAttribute("width", 1280);
        canvas.setAttribute("height", 720);
    }

    const now = new Date();
    const time = now.getTime() / 1000;

    let mapper = new MapGen(time);
    let map = mapper.genMap();

    let enter, exit;

    for(let i = 0; i < map.length; i ++){
        if(map[i].spawn){
            enter = map[i];
        }

        if(map[i].exit){
            exit = map[i];
        }
    }
    console.log(exit, enter);

    const level = new Group();
    level.addElement();

    const entidades = new Group();
    entidades.addElement(new Entidade(["../Sprites/walkingsheetbro.png", 7, 1, 100], [[10, 0], [125, 130]], 5, 2, true));
    entidades.addElement(new Entidade(["../Sprites/walkingsheetbro.png", 7, 1, 100], [[10, 0], [125, 130]], 5, 3));
    
    const objetos = new Group();
    objetos.addElement(new Objeto(["../Sprites/PixelArt/pixilart-drawing.png", 1, 1, 60], [0, 0], [[0, 0], [0, 0]], false, false, true, 10, 0));
    objetos.addElement(new Objeto(["", 1, 1, 60], [0, 625], [[0, 0], [2000, 100]], true, false, false, 10, 0));

    const projeteis = new Group(["../Sprites/walkingsheetbro.png", 7, 1, 100], 100);

    entidades.objAddToGroup(projeteis);

    const particles = new Group();

    const items = new Group();

    const bau = new Group();

    bau.addElement(new Objeto(["../Sprites/PixelArt/bau-sprite.png", 8, 1, 1000], [500, 500], [[-20, -20], [200, 150]], false, true, false, 0, 0));

    bau.objAddToGroup(items);

    function playerRoutine(){
        objetos.update(ctx, canvas, entidades, KeyPresses);

        let hitPosDirectionAndPosMorto = projeteis.updateProjetil(ctx, canvas, entidades, KeyPresses);

        particles.addParticle(KeyPresses, hitPosDirectionAndPosMorto, entidades);

        particles.updateParticles(ctx);
        
        bau.updateBau(ctx, canvas, entidades, KeyPresses);

        items.updateItems(ctx, canvas, entidades, KeyPresses);

        entidades.update(ctx, canvas, entidades, KeyPresses);

        ctx.fillStyle = "#1305FF";
        ctx.font = '12px SMW';
        ctx.fillText("Pressione Q Para Atirar, Olhe O Console Para Ver O Dano", 50, 50);
        
        objetos.testCollision(entidades, KeyPresses);
        entidades.testCollision(entidades, KeyPresses);
    }

    let cutscenebg = new Objeto(["./Sprites/PixelArt/cutscene1.png", 54, 1, 60], [0, 0], [[0, 0], [0, 0]], false, false, true, 0, -1);
    function cutscene(){
        ctx.fillStyle = "#ffe4e1";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        cutscenebg.update(ctx, canvas, entidades, KeyPresses);

        ctx.fillStyle = "black";
        ctx.font = '12px SMW';
        ctx.fillText("Pressione [SPACE] para continuar", 15, 15);

        if(cutscenebg.sprites.animationEnded || teclaexe == " "){
            whichScreen = 0;
        }
    }

    function main(){} // TODO

    let whichScreen = 2;

    function loop(){
        canvasUpdate();
        clear();

        if(whichScreen == 0){
            playerRoutine();
        }

        if(whichScreen == 1){
            menu();
        }

        if(whichScreen == 2){
            cutscene();
        }

        requestAnimationFrame(loop);
    }

    loop();

    window.addEventListener("keydown", tecla);
    window.addEventListener("keyup", teclaMenos);
});