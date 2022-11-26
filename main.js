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

    static generateField(height, width, percentage = 0.3) {
        let field = new Array(height).fill(0).map(el => new Array(width).fill(fieldCharacter));
        const random = length => {
            return Math.floor(Math.random() * length);
        }

        // Set hole locations
        let numberOfHoles = height * width * percentage;
        for (let i = 1; i <= numberOfHoles; i++) {
            let y;
            let x;
            do {
                y = random(height);
                x = random(width);
                field[y][x] = hole;
            } while (y === 0 && x === 0);
        }

        // Set hat location
        let hatY;
        let hatX;
        do {
            hatY = random(height);
            hatX = random(width);
            field[hatY][hatX] = hat;
        } while (hatY === 0 && hatX === 0);

        // Set path starting point
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
    console.log("Choose a direction to move!");
    console.table({
        up: "u",
        down: "d",
        left: "l",
        right: "r",
        "diagonally up-left": "ul",
        "diagonally up-right": "ur",
        "diagonally down-left": "dl",
        "diagonally down-right": "dr"
    });
    myField.print();
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
    let direction = prompt('Which direction? ');
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
            case "ul":
                myField.y = -1;
                myField.x = -1;
                input = "valid";
                break;
            case "ur":
                myField.y = -1;
                myField.x = 1;
                input = "valid";
                break;
            case "dl":
                myField.y = 1;
                myField.x = -1;
                input = "valid";
                break;
            case "dr":
                myField.y = 1;
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

runGame();