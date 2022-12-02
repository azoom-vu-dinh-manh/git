class Dog {
    constructor(name) {
        this.name = name
        console.log(`new dog[${name}]`)
    }
    move() {
        console.log(`Dog[${this.name}] move`)
    }
    eat() {
        console.log(`Dog[${this.name}] eat`)
    }
    sleep() {
        console.log(`Dog[${this.name}] sleep`)
    }
}

module.exports = Dog
