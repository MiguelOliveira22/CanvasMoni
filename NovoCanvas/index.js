addEventListener("DOMContentLoaded", () => {
    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");
    var objeto = new Entidade([0, 0], [10, 100, 0.8], true);
    var newObj = new Entidade([0, 700], [30, 30, 1]);

    canvas.width = 1200;
    canvas.height = 720;

    function loop(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        objeto.update(ctx, [newObj]);

        newObj.update(ctx, [objeto]);

        requestAnimationFrame(loop);
    }

    loop();

    addEventListener("keydown", (ev) => { objeto.keys[ev.key.toLowerCase()] = true; })
    addEventListener("keyup", (ev) => { objeto.keys[ev.key.toLowerCase()] = false; })
});