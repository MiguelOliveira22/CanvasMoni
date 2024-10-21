class ListaLevel{
    constructor(){
        this.pecasTrue = {
            0: [new Objeto(["", 1, 1, 60], [0, 0], [[0, 0], [2000, 50]], true, false, false, 10, 0), new Objeto(["", 1, 1, 60], [0, 625], [[0, 0], [2000, 100]], false, false, false, 10, 0), new Objeto(["", 1, 1, 60], [0, 625], [[0, 0], [2000, 100]], false, false, false, 10, 0)],
            1: [new Objeto(["", 1, 1, 60], [0, 625], [[0, 0], [2000, 100]], true, false, false, 10, 0), new Objeto(["", 1, 1, 60], [0, 625], [[0, 0], [2000, 100]], false, false, false, 10, 0), new Objeto(["", 1, 1, 60], [0, 625], [[0, 0], [2000, 100]], false, false, false, 10, 0)],
            2: [new Objeto(["", 1, 1, 60], [-10, 0], [[0, 0], [10, 700]], true, false, false, 10, 0), new Objeto(["", 1, 1, 60], [0, 625], [[0, 0], [2000, 100]], false, false, false, 10, 0)],
            3: [new Objeto(["", 1, 1, 60], [1200, 0], [[-10, 0], [0, 100]], true, false, false, 10, 0), new Objeto(["", 1, 1, 60], [1200, 500], [[0, 0], [2000, 100]], false, false, false, 10, 0)]
        };

        this.pecasFalse = {
            0: [new Objeto(["", 1, 1, 60], [0, 0], [[0, 0], [2000, 50]], true, false, false, 10, 0), new Objeto(["../Sprites/PixelArt/bau-sprite.png", 8, 1, 1000], [500, 500], [[-20, -20], [200, 150]], false, true, false, 0, 0)],
            1: [new Objeto(["", 1, 1, 60], [0, 625], [[0, 0], [2000, 100]], true, false, false, 10, 0)],
            2: [new Objeto(["", 1, 1, 60], [-10, 0], [[0, 0], [10, 800]], true, false, false, 10, 0)],
            3: [new Objeto(["", 1, 1, 60], [1200, 0], [[-10, 0], [0, 100]], true, false, false, 10, 0)]
        };
    }
}

class ListaImgItens{
    constructor(){
        this.img = {
            1: "../Sprites/Projetil.png",
            2: "../Sprites/PixelArt/bau-sprite.png",
            3: "../Sprites/PixelArt/bau-sprite.png",
            4: "../Sprites/PixelArt/bau-sprite.png"
        }
    }
}

class ListaAnimacoes{
    constructor(){
        this.animations = {
            player:  [["../Sprites/pixil-frame-0(1).png", 1, 1, 100], ["../Sprites/walkingsheetbro.png", 7, 1, 100]],
            inimigo: [["../Sprites/pixil-frame-0(1).png", 1, 1, 100], ["../Sprites/walkingsheetbro.png", 7, 1, 100]]
        }
    }
}

class ListaProjetil{
    constructor(){
        this.projetilProperty = [
            {
                id: 0,
                nome: new Inventario().itens[id],
            }
        ]
    }
}