const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let isGameFinished = false;

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

    static generateField(height, width) {
        let field = new Array(height).fill(0).map(el => new Array(width).fill(fieldCharacter));
        const random = length => {
            return Math.floor(Math.random() * length);
        }

        for (let i = 0; i < 5; i++) {
            let x = random(width);
            let y = random(height);
            field[y][x] = hole;
        }

        field[random(height)][random(width)] = hat;
        field[0][0] = pathCharacter;
        return field;
    }

    print() {
        const displayField = this.field.map(row => {
            return row.join("");
        }).join("\n");
        console.log(displayField);
    }
}

function runGame() {
    while (!isGameFinished) {
        inputPromptLoop();
        if ( !myField.field[myField.y] || !myField.field[myField.y][myField.x]) {
            loseGame("out of bounds");
        } else if (myField.field[myField.y][myField.x] === hole) {
            loseGame("hole");
        } else if (myField.field[myField.y][myField.x] === hat) {
            winGame();
        } else {   
            myField.field[myField.y][myField.x] = pathCharacter;
            myField.print();
        }
    }
}

function inputPromptLoop() {
    let direction = prompt('Which direction? u, d, l, or r: ');
    let input = "invalid";
    while (input === "invalid") {
        switch (direction) {
            case "u":
                myField.y = -1;
                input = "valid";
                break;
            case "d":
                myField.y = 1;
                input = "valid";
                break;
            case "l":
                myField.x = -1;
                input = "valid";
                break;
            case "r":
                myField.x = 1;
                input = "valid";
                break;
            default:
                direction = prompt("Enter a valid direction: ");
                break;
        }
    }
}

function winGame() {
    isGameFinished = true;
    console.log("Congratulations! You found your hat!");
}

function loseGame(reason) {
    isGameFinished = true;
    if (reason == "hole") {
        console.log("You lost by falling in a hole!");
    } else {
        console.log("You lost by stepping out of bounds!");
    }
}

const myField = new Field(Field.generateField(10, 10));

myField.print();
runGame();