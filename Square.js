var Shape = require('./Shape')

class Square extends Shape {
    constructor(w, h) {
        super()
        this.width = w
        this.height = h
    }

    area() {
        return this.width * this.height
    }
}

module.exports = Square
