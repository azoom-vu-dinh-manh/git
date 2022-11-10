var Shape = require('./Shape')

class Circle extends Shape {
    constructor(radius) {
        super()
        this.radius = radius
    }
    area() {
        return Math.PI * this.radius**2
    }
}

module.exports = Circle
