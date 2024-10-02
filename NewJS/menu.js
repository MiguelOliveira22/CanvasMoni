let borda = 150;
const canvas = document.createElement('canvas');    
canvas.width = 400;
canvas.height = 400;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let backgroundImage = new Image();
backgroundImage.src = 'NewJs/Sprites/PixelArt/controles.png'; // local onde se coloca o caminho para achar a imagem
//não sei se deu certo pois não consigo testar o código 😭
//fui fazendo no p5 e depois só traduzi o código pra ca

// função principal, vai desenhar o menu
function drawMenu() {
    // tentativa para que desenha a imagem do fundo (espero que esteja certo)
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    
    // faz um título para o menu
    ctx.fillStyle = 'rgb(46, 139, 87)';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Menu', 200, 100);

    // opções do menu 
    ctx.fillStyle = 'rgb(46, 139, 87)';
    ctx.fillRect(100, 150, 200, 50); // jogar
    ctx.fillRect(100, 250, 200, 50); // controles

    // texto que vai ficar dentro das opções do menu Jogar e Controles
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = '26px Arial';
    ctx.fillText('Jogar', 200, 180);
    ctx.fillText('Controles', 200, 280);

    // borda que vai ficar ao redor da região selecionada
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.lineWidth = 2;
    ctx.strokeRect(100, borda, 200, 50);
}

    // função que detecta clicks do mouse
    canvas.addEventListener('mousedown', function(event) {//quando o botão do mouse for pressionado, a função event vai ser chamada
    const mouseX = event.offsetX;//mede o deslocamento horizontoal
    const mouseY = event.offsetY;//mede de cima para baixo

    if(mouseX >= 100 && mouseX <= 300 && mouseY >= 150 && mouseY <= 200){
        borda = 150; // cria uma borda ao redor da opção controles do menu
    } else if(mouseX >= 100 && mouseX <= 300 && mouseY >= 250 && mouseY <= 300){
        borda = 250; // cria uma borda ao redor da opção controles do menu
            backgroundImage.src = 'NewJs/Sprites/PixelArt/controles.png';
    }
    // Verifica se clicou no botão "Controles"
    else if (mouseX >= 100 && mouseX <= 300 && mouseY >= 250 && mouseY <= 300) {
        borda = 250; // Seleciona "Controles"
        currentState = 'controles'; // Muda o estado para a tela de controles
    }
    else if (currentState === 'controles') {
    // verica se o click que o usuario der está dentro do imagem 
    if (mouseX < 50 || mouseX > 350 || mouseY < 50 || mouseY > 350) {
        currentState = 'menu'; // se não estiver ele fecha a imagem controles e volta para o menu
    }
}

    drawMenu(); // desenha o menu denovo com outra borda
});

// chama a função drawMenu que inicializa o menu
backgroundImage.onload = function() {// o menu só sera carregado após a imagem ser carregada
    drawMenu(); 
};