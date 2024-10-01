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

    let level = new GroupLevel();
    function playerRoutine(){
        level.routineUpdate(ctx, canvas, KeyPresses);
        level.routineCollision(KeyPresses);
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
            whichScreen = 1;
        }
    }

    function main(){} // TODO

    let whichScreen = 0;

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