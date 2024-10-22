addEventListener("DOMContentLoaded", () => {
    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");
    var objeto;
    var newObj;

    canvas.width = 1200;
    canvas.height = 720;

    function setComponents(/*ComponentID from a random gerenator*/){
        objeto = new Entidade([0, 0], [10, 100, 0.8], true);
        newObj = new Entidade([0, 700], [30, 30, 1]);
    }

    function clearComponents(){
        objeto = null;
        newObj = null;
    }

    function playerRoutine(){
        objeto.update(ctx, [newObj]);
        newObj.update(ctx, [objeto]);
    }

    let cutscenebg = new Objeto(["./Sprites/PixelArt/cutscene1.png", 54, 1, 60], [0, 0], [[0, 0], [0, 0]], false, false, true, 0, -1);
    function cutscene(){
        ctx.fillStyle = "#ffe4e1";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        cutscenebg.update(ctx, canvas, [], KeyPresses);

        ctx.fillStyle = "black";
        ctx.font = '12px SMW';
        ctx.fillText("Pressione [SPACE] para continuar", 15, 15);

        if(cutscenebg.sprites.animationEnded || teclaexe == " "){
            whichScreen = 1;
        }
    }

    function main(){
        let borda = 150;
        let currentState = "menu";
        let selected = 0;

        let backgroundImage = new Image();
        backgroundImage.src = './Sprites/controles.png'; // local onde se coloca o caminho para achar a imagem
        //não sei se deu certo pois não consigo testar o código 😭
        //fui fazendo no p5 e depois só traduzi o código pra ca

        // função principal, vai desenhar o menu
        // tentativa para que desenha a imagem do fundo (espero que esteja certo)
        if(currentState == "controles"){
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        }

        // faz um título para o menu
        if(currentState == "menu"){
            ctx.fillStyle = 'rgb(46, 139, 87)';
            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Menu', canvas.width / 2, 100);

            // opções do menu 
            ctx.fillStyle = 'rgb(46, 139, 87)';
            ctx.fillRect(canvas.width / 2 - 100, 150, 200, 50); // jogar
            ctx.fillRect(canvas.width / 2 - 100, 250, 200, 50); // controles

            // texto que vai ficar dentro das opções do menu Jogar e Controles
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.font = '26px Arial';
            ctx.fillText('Jogar', canvas.width / 2, 180);
            ctx.fillText('Controles', canvas.width / 2, 280);

            // borda que vai ficar ao redor da região selecionada
            ctx.strokeStyle = 'rgb(0, 0, 0)';
            ctx.lineWidth = 2;
            ctx.strokeRect(canvas.width / 2 - 100, borda, 200, 50);
        }

        if(KeyPresses.w == true){
            selected = 0;
            borda = 150;
        }
        if(KeyPresses.s == true){
            selected = 1;
            borda = 250;
        }

        // Verifica se clicou no botão "Controles"
        if(currentState === "menu"){
            if(KeyPresses.e == true){
                if(selected == 0){
                    whichScreen = 0
                }
                if(selected == 1){
                    currentState = 'controles'; // Muda o estado para a tela de controles
                }
            }
        }
        if(currentState === 'controles') {
            // verica se o click que o usuario der está dentro do imagem 
            if (KeyPresses.q == true){
                currentState = 'menu'; // se não estiver ele fecha a imagem controles e volta para o menu
            }
        }
    } // TODO

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

    addEventListener("keydown", (ev) => { objeto.keys[ev.key.toLowerCase()] = true; })
    addEventListener("keyup", (ev) => { objeto.keys[ev.key.toLowerCase()] = false; })
});