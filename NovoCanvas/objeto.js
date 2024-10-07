class Objeto extends Sprites{
    constructor([objx, objy] = [0, 0], [width, height, scale] = [0, 0, 1], player = false){
        super("./walkingsheetbro.png", [0, 0], 7, 1, 60);

        this.objPos = {
            x: objx,
            y: objy,
        };

        this.size = {
            w: width,
            h: height,
            scale: scale
        }

        this.functionInteract = new Function();
    }

    update(ctx = CanvasRenderingContext2D){
        ctx.fillRect(this.objPos.x, this.objPos.y, this.size.w, this.size.h)
        ctx.drawImage(this.sheet, this.spriteArray[this.atual][0], this.spriteArray[this.atual][1], this.wSprites, this.aSprites, this.objPos.x + this.posImage.x, this.objPos.y + this.posImage.y, this.wSprites * this.size.scale, this.aSprites * this.size.scale)
        this.clockVal();
    }
}