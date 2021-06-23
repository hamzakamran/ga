class Gene {
    constructor(x, y, w, h, shapeCount) {
        this.pos = createVector(x, y);
        this.size = createVector(w, h);
        this.shapes = [];
        for (let i = 0; i < shapeCount; i++) {
            this.shapes.push(new Shape(
                this.pos.x, this.pos.y,
                this.size.x, this.size.y
            ));
        }
    }

    // print gene
    print() {

    };

    // get fitness
    fitness() {
        let total = 0;

        for (let y = this.pos.y + fitnessStep; y < this.pos.y + this.size.y; y += fitnessStep) {
            for (let x = this.pos.x + fitnessStep; x < this.pos.x + this.size.x; x += fitnessStep) {
                let targetPos = createVector(x - this.pos.x, y - this.pos.y);
                let actualPos = createVector(x, y);

                let target = 4 * (targetPos.x + targetPos.y * width);
                let actual = 4 * (actualPos.x + actualPos.y * width);

                let dRed = (pixels[target + 0] - pixels[actual + 0]);
                let dGreen = (pixels[target + 1] - pixels[actual + 1]);
                let dBlue = (pixels[target + 2] - pixels[actual + 2]);

                total += (dRed * dRed) + (dGreen * dGreen) + (dBlue * dBlue);
            }
        }

        let worst = (this.size.x / fitnessStep) * (this.size.y / fitnessStep) * 195075;

        return floor(100 * (1 - total / worst));
    };

    // crossover
    crossover(a, b) {

    };

    // mutate
    mutate(i) {

    };

    // draw
    draw() {
        noStroke();
        fill(255);
        rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        for (let shape of this.shapes) {
            shape.draw();
        }
    }
};

class Shape {
    constructor(x, y, w, h) {
        this.col = color(random(255), random(255), random(255), random(255));
        this.points = [];
        for (var i = 0; i < 3; i++) {
            this.points.push(createVector(
                random(x, x + w),
                random(y, y + h)
            ));
        }
    }
    draw() {
        noStroke();
        fill(this.col);
        triangle(
            this.points[0].x, this.points[0].y,
            this.points[1].x, this.points[1].y,
            this.points[2].x, this.points[2].y
        );
    }
}