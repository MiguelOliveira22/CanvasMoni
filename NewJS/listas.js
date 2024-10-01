class ListaLevel{
    constructor(){
        this.pecasLevel = [
            {}
        ];
    }
}

class ListaImgItens{
    constructor(){
        this.img = {
            1: "../Sprites/PixelArt/bau-sprite.png",
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
            inimigo: [["../Sprites/pixil-frame-0(1).png", 1, 1, 100],["../Sprites/walkingsheetbro.png", 7, 1, 100]]
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