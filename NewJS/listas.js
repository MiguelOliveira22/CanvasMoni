class ListaLevel{
    constructor(){
        this.pecasTrue = {
            u: [new Objeto(["", 1, 1, 60], [0, 0], [[0, 0], [2000, 50]], true, false, false, 10, 0), new Objeto(["", 1, 1, 60], [0, 625], [[0, 0], [2000, 100]], false, false, false, 10, 0), new Objeto(["", 1, 1, 60], [0, 625], [[0, 0], [2000, 100]], false, false, false, 10, 0)],
            d: [new Objeto(["", 1, 1, 60], [0, 625], [[0, 0], [2000, 100]], true, false, false, 10, 0), new Objeto(["", 1, 1, 60], [0, 625], [[0, 0], [2000, 100]], false, false, false, 10, 0), new Objeto(["", 1, 1, 60], [0, 625], [[0, 0], [2000, 100]], false, false, false, 10, 0)],
            l: [new Objeto(["", 1, 1, 60], [0, 0], [[-10, 0], [0, 700]], true, false, false, 10, 0), new Objeto(["", 1, 1, 60], [0, 625], [[0, 0], [2000, 100]], false, false, false, 10, 0)],
            r: [new Objeto(["", 1, 1, 60], [1200, 0], [[-10, 0], [0, 100]], true, false, false, 10, 0), new Objeto(["", 1, 1, 60], [1200, 500], [[0, 0], [2000, 100]], false, false, false, 10, 0)]
        };

        this.pecasFalse = {
            u: [new Objeto(["", 1, 1, 60], [0, 0], [[0, 0], [2000, 50]], true, false, false, 10, 0)],
            d: [new Objeto(["", 1, 1, 60], [0, 625], [[0, 0], [2000, 100]], true, false, false, 10, 0)],
            l: [new Objeto(["", 1, 1, 60], [0, 0], [[-10, 0], [0, 700]], true, false, false, 10, 0)],
            r: [new Objeto(["", 1, 1, 60], [1200, 0], [[-10, 0], [0, 100]], true, false, false, 10, 0)]
        };
    }
}

class ListaImgItens{
    constructor(){
        this.img = {
            1: "../Sprites/PixelArt/walkingsheetbro.png",
            2: "../Sprites/PixelArt/bau-sprite.png",
            3: "../Sprites/PixelArt/bau-sprite.png",
            4: "../Sprites/PixelArt/bau-sprite.png"
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