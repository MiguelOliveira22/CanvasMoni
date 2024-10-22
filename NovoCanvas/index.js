addEventListener("DOMContentLoaded", () => {
    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");
    var objeto;
    var newObj;
    var keys = {
        w: false,
        a: false,
        s: false,
        d: false,
        e: false,
        q: false,
        " ": false
    };

    canvas.width = 1200;
    canvas.height = 720;

    setComponents();

    function setComponents(/*ComponentID from a random gerenator*/){
        objeto = new Entidade(["../Sprites/walkingsheetbro.png", 7, 1, 60], [0, 0], [10, 100, 0.8], true);
        newObj = new Objeto(["../Sprites/walkingsheetbro.png", 7, 1, 60], [0, 700], [700, 200, 1], [true, false]);
    }

    function clearComponents(){
        objeto = null;
        newObj = null;
    }

    function playerRoutine(){
        objeto.update(ctx, [newObj]);
        newObj.update(ctx, [objeto]);
    }

    let cutscenebg = new Objeto(["../Sprites/PixelArt/cutscene1.png", 54, 1, 60], [150, 40], [canvas.width, canvas.height, 0.9, true], [false, false]);
    function cutscene(){
        ctx.fillStyle = "bisque";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        cutscenebg.update(ctx, []);

        ctx.fillStyle = "black";
        ctx.font = '12px SMW';
        ctx.fillText("Pressione [SPACE] para continuar", 160, 60);

        if(cutscenebg.animationEnded || keys[" "] == true){
            whichScreen = 1;
        }
    }

    let borda = 150;
    let currentState = 0;
    let selected = 0;

    let backgroundImage = new Image();
    backgroundImage.src = '../Sprites/controles.png';

    let bg = new Objeto(["../Sprites/PixelArt/pixilart-drawing.png", 1, 1, 60], [100, 0], [canvas.width, canvas.height, 1, true], [false, false]);
    function main(){
        if(currentState == 1){
            ctx.drawImage(backgroundImage, 70, 70, canvas.width - 70, canvas.height - 70);
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.font = '30px SMW';
            ctx.fillText('Pressione Q Para Voltar', 425, 50);
        }

        if(currentState == 0){
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            bg.update(ctx, []);

            ctx.fillStyle = 'rgb(46, 139, 87)';
            ctx.font = '30px SMW';
            ctx.textAlign = 'center';
            ctx.fillText('Bro Collins: Down In The Hole', canvas.width / 2, 100);

            // opções do menu 
            ctx.fillStyle = 'rgb(46, 139, 87)';
            ctx.fillRect(canvas.width / 2 - 150, 150, 250, 50); // jogar
            ctx.fillRect(canvas.width / 2 - 150, 250, 250, 50); // controles

            // texto que vai ficar dentro das opções do menu Jogar e Controles
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.font = '26px SMW';
            ctx.fillText('Jogar', canvas.width / 2 - 25, 185);
            ctx.fillText('Controles', canvas.width / 2 - 25, 285);

            // borda que vai ficar ao redor da região selecionada
            ctx.strokeStyle = 'rgb(255, 255, 255)';
            ctx.lineWidth = 2;
            ctx.strokeRect(canvas.width / 2 - 150, borda, 250, 50);
        }

        if(keys.w == true){
            selected = 0;
            borda = 150;
        }

        if(keys.s == true){
            selected = 1;
            borda = 250;
        }

        if(currentState === 0){
            if(keys.e == true){
                if(selected == 0){
                    whichScreen = 0;
                }
                if(selected == 1){
                    currentState = 1;
                }
            }
        }
        if(currentState === 1) {
            if(keys.q == true){
                currentState = 0;
            }
        }
    }

    let whichScreen = 2;
    function loop(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if(whichScreen == 0){
            playerRoutine();
        }

        if(whichScreen == 1){
            main();
        }

        if(whichScreen == 2){
            cutscene();
        }

        requestAnimationFrame(loop);
    }

    loop();

    addEventListener("keydown", (ev) => { keys[ev.key.toLowerCase()] = true; if(objeto != undefined) objeto.keys[ev.key.toLowerCase()] = true; })
    addEventListener("keyup", (ev) => { keys[ev.key.toLowerCase()] = false; if(objeto != undefined) objeto.keys[ev.key.toLowerCase()] = false; })
});