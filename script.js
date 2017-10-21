var ctx = document.getElementById('canvas').getContext('2d');

var ballx = 100,
    bally = 250,
    barreX = 390,
    barreY = 380,
    dirX = 1,
    dirY = -1;

var vx = 0,
    speed = 4;

var nbLigne = 5,
    nbBrickLigne = 12,
    widthBrick = 48,
    heightBrick = 15,
    spaceBrick = 2,
    ligneY, ligneX;

var tabBriques;

var limiteBriques = (spaceBrick + heightBrick) * nbLigne;

var colorBrick = ["red", "orange", "yellow", "#D9C38A", "#F7DDAC"];

brick(ctx, nbLigne, nbBrickLigne, widthBrick, heightBrick, spaceBrick);
window.requestAnimationFrame(game);

function game() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < tabBriques.length; i++) {
        ctx.fillStyle = colorBrick[i];
        for (var j = 0; j < tabBriques[i].length; j++) {
            if (tabBriques[i][j] == 1) {
                ctx.fillRect((j * (widthBrick + spaceBrick)), (i * (heightBrick + spaceBrick)), widthBrick, heightBrick);
            }
        }
    }

    if ((ballx + dirX * speed) > (canvas.width - 10)) {
        dirX = -1;
    } else if ((ballx + dirX * speed) < 10) {
        dirX = 1;
    }

    if ((bally + dirY * speed) > (canvas.height - 10)) {
        console.log("perdu");
        document.location.href="pong.html"
    } else if ((bally + dirY * speed) < 10) {
        dirY = 1;
    } else if (((bally + dirY * speed) > (canvas.height - 20)) && ((ballx + dirX * speed) >= barreX) && ((ballx + dirX * speed) <= (barreX + 90))) {
        dirY = -1;
        dirX = 2 * (ballx - (barreX + 40)) / 80;
    }

    ballx += dirX * speed;
    bally += dirY * speed;

    if (barreX < 0) {
        barreX = 1;
    } else if (barreX > 520) {
        barreX = 519;
    } else {
        barreX += vx;
    }


    if (bally <= limiteBriques) {
        ligneY = Math.floor(bally / (heightBrick + spaceBrick));
        ligneX = Math.floor(ballx / (widthBrick + spaceBrick));
        if (tabBriques[ligneY][ligneX] == 1) {
            tabBriques[ligneY][ligneX] = 0;
            dirY = 1;
        }
    }

    ctx.fillStyle = "#f3b233";
    ctx.beginPath();
    ctx.arc(ballx, bally, 8, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    ctx.save();

    ctx.fillStyle = "#1d5780";
    ctx.beginPath();
    ctx.fillRect(barreX, barreY, 80, 10);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    requestAnimationFrame(game);

}

function brick(ctx, nbrLignes, nbrParLigne, largeur, hauteur, espace) {

    tabBriques = new Array(nbrLignes);

    for (var i = 0; i < nbrLignes; i++) {

        tabBriques[i] = new Array(nbrParLigne);

        ctx.fillStyle = colorBrick[i];

        for (var j = 0; j < nbrParLigne; j++) {

            ctx.fillRect((j * (largeur + espace)), (i * (hauteur + espace)), largeur, hauteur);

            tabBriques[i][j] = 1;

        }
    }

}


document.onkeydown = function(e) {
    switch (e.key) {
        case "ArrowRight":
            vx = 5;
            break;
        case "ArrowLeft":
            vx = -5;
            break;
        default:
            break;
    }
}
document.onkeyup = function(e) {
    switch (e.key) {
        case "ArrowRight":
            vx = 0;
            break;
        case "ArrowLeft":
            vx = 0;
            break;
        default:
            break;
    }
}
