const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

const isGameFinished = false;

class Field {
    constructor(field) {
        this._field = field;
    }

    get field() {
        return this._field;
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

while (!isGameFinished) {
    myField.print();
    const direction = prompt('Which direction? u, d, l, or r: ');
    switch (direction) {
        case "u":
            console.log("up!");
            break;
        case "d":
            console.log("down!");
            break;
        case "l":
            console.log("left!");
            break;
        case "r":
            console.log("right!");
            break;
        default:
            prompt("Enter a valid direction: ");
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