const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

const isGameFinished = false;

class Field {
    constructor(field) {
        this._field = field;
        this._x = 0;
        this._y = 0;
    }

    get field() {
        return this._field;
    }

    get y() {
        return this._y;
    }

    get x() {
        return this._x;
    }

    set y(value) {
        this._y += value;
    }

    set x(value) {
        this._x += value;
    }

    print() {
        console.log(this.field.join());
    }
}


const myField = new Field([
    [pathCharacter, fieldCharacter, hole],
    [fieldCharacter, hole, fieldCharacter],
    [fieldCharacter, hat, fieldCharacter]
]);

myField.print();
// let theField = myField.field.join();
// console.log(theField);
// console.log(myField.field[0][0]);

while (!isGameFinished) {
    const direction = prompt('Which direction? u, d, l, or r: ');
    switch (direction) {
        case "u":
            console.log("up!");
            // move pathCharater
            myField.print();
            break;
        case "d":
            console.log("down!");
            // move pathCharater
            // how to I call a setter and use it????????????
            myField.y(1);
            myField.field[myField.y][myField.x] = pathCharacter;
            myField.print();
            break;
        case "l":
            console.log("left!");
            // move pathCharater
            myField.print();
            break;
        case "r":
            console.log("right!");
            // move pathCharater
            myField.field[0][1] = pathCharacter;
            myField.print();
            break;
        default:
            prompt("Enter a valid direction: ");
            // Need to run through switch statement again with this direction
            break;
    }
}

function winGame() {
    isGameFinished = true;
    console.log("Congratulations! You found your hat!");
}

function loseGame(reason) {
    isGameFinished = true;
    console.log("You lost!");
    if (reason == "hole") {
        console.log("You fell in a hole!");
    } else {
        console.log("You stepped out of bounds!");
    }
}