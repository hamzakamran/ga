class GeneticAlgorithm {
    constructor(rows, cols, w, h, mc, sc = 1) {
        this.rows = rows;
        this.cols = cols;
        this.size = createVector(w, h);
        this.shapeCount = sc;
        this.mutationChance = mc;
        this.population = [];
        this.selectionPool = [];
        this.generation = 1;
        this.targetImg = loadImage('../imgs/kk.jpg');
    }

    // init
    init() {
        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.cols; i++) {
                if (j === 0 && i === 0) {
                    // target img
                } else {
                    this.population.push(new Gene(
                        i * this.size.x,
                        j * this.size.y,
                        this.size.x,
                        this.size.y,
                        this.shapeCount
                    ));
                }
            }
        }
    };

    // fitness & selection
    select() {
        this.selectionPool = [];

        loadPixels();
        for (let i = 0; i < this.population.length; i++) {
            for (let n = 0; n < this.population[i].fitness(); n++) {
                this.selectionPool.push(this.population[i]);
            }
        }
    };

    // crossover
    crossMutate() {
        let newPopulation = [];
        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.cols; i++) {
                if (j === 0 && i === 0) {
                    // target img
                } else {
                    let parentA = this.selectionPool[floor(random(this.selectionPool.length))];
                    let parentB = this.selectionPool[floor(random(this.selectionPool.length))];
                    let child = new Gene(
                        i * this.size.x,
                        j * this.size.y,
                        this.size.x,
                        this.size.y,
                        this.shapeCount
                    );
                    child.crossover(parentA, parentB);
                }
            }
        }
    };

    // best
    best() {

    };

    // display population
    print() {

    };

    // draw
    draw() {
        for (let gene of this.population) {
            gene.draw();
        }
    }
};