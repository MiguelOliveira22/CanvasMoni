let borda = 150;
const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Função para desenhar o menu
function drawMenu() {
    // Fundo do menu
    ctx.fillStyle = 'rgb(0, 250, 154)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Título do menu
    ctx.fillStyle = 'rgb(46, 139, 87)';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Menu', 200, 100);

    // Opções de menu
    ctx.fillStyle = 'rgb(46, 139, 87)';
    ctx.fillRect(100, 150, 200, 50); // Opção "Jogar"
    ctx.fillRect(100, 250, 200, 50); // Opção "Controles"

    // Texto dentro das opções
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.font = '26px Arial';
    ctx.fillText('Jogar', 200, 180);
    ctx.fillText('Controles', 200, 280);

    // Borda ao redor da opção selecionada
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.lineWidth = 2;
    ctx.strokeRect(100, borda, 200, 50);
}

// Função para detectar cliques do mouse
canvas.addEventListener('mousedown', function(event) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    if(mouseX >= 100 && mouseX <= 300 && mouseY >= 150 && mouseY <= 200){
        borda = 150; // Seleciona "Jogar"
    } else if(mouseX >= 100 && mouseX <= 300 && mouseY >= 250 && mouseY <= 300){
        borda = 250; // Seleciona "Controles"
    }
    drawMenu(); // Redesenha o menu com a nova borda
});

// Inicializa o menu
drawMenu();