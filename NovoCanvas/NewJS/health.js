class Health{
    drawLifePlayer(ctx, hp){
        ctx.fillStyle = "red";
        ctx.fillRect(10, 10, 5 * hp, 20)
    }

    drawLifeEnemy(ctx, hp, x, y){
        ctx.fillStyle = "red";
        ctx.fillRect(x, y - 40, 1.5 * hp, 20)
    }
}