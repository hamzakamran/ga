let targetImg;
let imgSize;
let initialShapeCount = 1;
let fitnessStep = 3;
let showFitness = false;
let loop = false;

let ga;

function preload() {
    targetImg = loadImage('../imgs/kk.jpg');
}

function setup() {
    pixelDensity(1);

    if (!loop)
        noLoop();

    // create canvas
    createCanvas(displayWidth, displayHeight);

    // init vars
    imgSize = createVector(300, 300);
    ga = new GeneticAlgorithm(3, 3, imgSize.x, imgSize.y, 0.01, initialShapeCount);

    // initialize ga
    ga.init();
}

function draw() {
    // background
    background(42);

    // target image
    // image(targetImg, 0, 0, imgSize.x, imgSize.y);
    demoImg();
    if (showFitness) {
        stroke(255, 0, 0);
        strokeWeight(1);
        for (let y = fitnessStep; y < imgSize.y; y += fitnessStep) {
            for (let x = fitnessStep; x < imgSize.x; x += fitnessStep) {
                point(x, y);
            }
        }
    }

    // GA loop 
    ga.draw();
    ga.select();
    ga.crossMutate();
};

function windowResized() {
    createCanvas(displayWidth, displayHeight);
}

function demoImg() {
    noStroke();
    fill(255);
    rect(0, 0, imgSize.x, imgSize.y);
    fill(0, 0, 255);
    triangle(
        imgSize.x / 2, 0,
        0, imgSize.y,
        imgSize.x, imgSize.y
    );
}