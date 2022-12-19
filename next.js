const boxsize = 500;
const rez = 100;
let cols, rows;
let field = [];


function setup() {
    createCanvas(boxsize + 20, boxsize + 20);
    //colorMode(HSB);
    cols = width / rez;
    rows = height / rez;
    for (let x = 0; x < cols + 1; x++) {
        field[x] = []; // create nested array
        for (let y = 0; y < rows + 1; y++) {

            field[x][y] = floor(random(2));
        }
    }
    //console.log(field)

}


function draw() {

    //console.log(field)
    strokeWeight(5);

    for (let x = 0; x < cols - 1; x++) {
        for (let y = 0; y < rows - 1; y++) {
            stroke(field[x][y] * 255);
            //console.log(field[i][j])
            point(x * rez, y * rez);
            drawAt(x, y)
        }
    }


}

// f0 f1
// f3 f2
function drawAt(x, y) {
    let result =
        1 * field[x][y] +
        2 * field[x + 1][y] +
        4 * field[x + 1][y + 1] +
        8 * field[x][y + 1];
    //console.log(result);

    switch (result) {
        case 1, 14:
            drawA(x, y);
            break;
        case 2, 13:
            drawB(x, y);
            break;
        case 3, 12:
            drawE(x, y);
            break;
        case 4, 11:
            drawD(x, y);
            break;
        case 5:
            drawA(x, y);
            drawD(x, y);
            break;
        case 6, 9:
            drawF(x, y);
            break;
        case 7, 8:
            drawD(x, y);
            break;
        case 10:
            drawB(x, y);
            drawC(x, y);
            break;


    }

}


function drawA(i, j) {
    x1 = (i) * rez;
    y1 = (j + 0.5) * rez;
    x2 = (i + 0.5) * rez;
    y2 = (j) * rez;
    stroke(255, 0, 0);
    line(x1, y1, x2, y2);

}

function drawB(i, j) {
    x1 = (i + 0.5) * rez;
    y1 = (j) * rez;
    x2 = (i + 1) * rez;
    y2 = (j + 0.5) * rez;
    stroke(255, 0, 0);
    line(x1, y1, x2, y2);

}
function drawC(i, j) {
    x1 = (i) * rez;
    y1 = (j + 0.5) * rez;
    x2 = (i + 0.5) * rez;
    y2 = (j + 1) * rez;
    stroke(255, 0, 0);
    line(x1, y1, x2, y2);

}
function drawD(i, j) {
    x1 = (i + 0.5) * rez;
    y1 = (j + 1) * rez;
    x2 = (i + 1) * rez;
    y2 = (j + 0.5) * rez;
    stroke(255, 0, 0);
    line(x1, y1, x2, y2);

}
function drawE(i, j) {
    x1 = (i) * rez;
    y1 = (j + 0.5) * rez;
    x2 = (i + 1) * rez;
    y2 = (j + 0.5) * rez;
    stroke(255, 0, 0);
    line(x1, y1, x2, y2);

}
function drawF(i, j) {
    x1 = (i + 0.5) * rez;
    y1 = (j) * rez;
    x2 = (i + 0.5) * rez;
    y2 = (j + 1) * rez;
    stroke(255, 0, 0);
    line(x1, y1, x2, y2);

}
