class Dog {
    constructor(name) {
        this.name = name
        console.log(`new dog[${name}]`)
    }
    move() {
        console.log(`Dog[${this.name}] move`)
    }
}

module.exports = Dog
