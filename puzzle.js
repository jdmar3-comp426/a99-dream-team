/*
    The puzzle is represented by an number array containing some permutation of numbers 0-23
    number n represents the block in the original picture at coordinate (row=Math.floor(n/6), col=n%6) where the top-left is defined to be (0,0)
    block n=23 is the bottom-right block that is changed to empty
*/
// TODO: please remove all reference to puzzleArr once all database interactions are completed
var puzzleArr;
var highScore;
var stepCount;
//var db = require('./database.js');
const startbtn = document.querySelector('#start');

function isSolvable(puzzle) {
    /*
    Checks the number of "inversions". If this is odd then the puzzle configuration is not solvable.

    An inversion is when two tiles are in the wrong order.

    For example, the sequence 1, 3, 4, 7, 0, 2, 5, 8, 6 has six inversions:

    3 > 2
    4 > 2
    7 > 2
    7 > 5
    7 > 6
    8 > 6

    The empty tile is ignored.
    Theory credit to: https://datawookie.dev/blog/2019/04/sliding-puzzle-solvable/
    */
    var numInv = 0;
    for (let i = 0; i < 24; i++) {
        for (let j = i; j < 24; j++) {
            if (puzzle[i] != 0 && puzzle[j] != 0) {
                if (puzzle[i] > puzzle[j]) {
                    numInv += 1;
                }
            }
        }
    }
    return numInv % 2 == 0;
}

function genPuzzle() {
    // Generate a random permutation of 0-23
    var puzzle = [];
    var pool = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    while (puzzle.length < 24) {
        var idx = Math.floor(Math.random() * pool.length);
        puzzle.push(pool[idx]);
        pool.splice(idx, 1);
    }
    return puzzle;
}

function makePuzzle() {
    // check against isSolvable() return puzzle : generate another one and repeat
    var puzzle = genPuzzle();
    while (isSolvable(puzzle) == false) {
        puzzle = genPuzzle();
    }
    for (let i = 0; i < 24; i++) {
        document.getElementById(i).src = "src/images/unc" + puzzle[i] + ".jpg";
    }
    // TODO: store array in database and set step=0
    // db.prepare().run()
    puzzleArr = puzzle;

    // Initalizes step counter
    stepCount = 0;
    document.getElementById("stepCount").innerHTML = stepCount;

    return puzzle;
}

function myclick(n) { // - caleb
    // n is the block that is clicked
    // check if n is next to the empty block  swap place check success return : do nothing return false
    // neighbor in 4*6 matrix means index is +-1 or +-6 watch out for edge cases

    // if place is swapped and puzzle is not solved, return -1
    // TODO: pull array from database
    // var arr=db.prepare().get()
    arr = puzzleArr;
    if (arr[n] == 23) {
        // if clicking on white space do nothing
        return false
    } else if (n == 0) {
        // for top-left corner
        if (arr[1] == 23 | arr[6] == 23) {
            swap(n, arr)
        }
    } else if (n == 5) {
        // for top-right corner
        if (arr[4] == 23 | arr[11] == 23) {
            swap(n, arr)
        }
    } else if (n == 18) {
        // for bot-left corner
        if (arr[12] == 23 | arr[19] == 23) {
            swap(n, arr)
        }
    } else if (n == 23) {
        // for bot-right corner
        if (arr[22] == 23 | arr[17] == 23) {
            swap(n, arr)
        }
    } else if (n < 6) {
        // for first row
        if (arr[n + 1] == 23 | arr[n - 1] == 23 | arr[n + 6] == 23) {
            swap(n, arr)
        }
    } else if (n > 19) {
        // for last row
        if (arr[n + 1] == 23 | arr[n - 1] == 23 | arr[n - 6] == 23) {
            swap(n, arr)
        }
    } else if (n % 6 == 0) {
        // for first col
        if (arr[n - 6] == 23 | arr[n + 6] == 23 | arr[n + 1] == 23) {
            swap(n, arr)
        }
    } else if (n % 6 == 0) {
        // for last col
        if (arr[n - 6] == 23 | arr[n + 6] == 23 | arr[n - 1] == 23) {
            swap(n, arr)
        }
    } else if (arr[n + 1] == 23 | arr[n - 1] == 23 | arr[n + 6] == 23 | arr[n - 6] == 23) {
        // normal case
        swap(n, arr)
    } else {
        // returning false if no swap occurred
        // Should never meet this case
        return false
    }
    // TODO: store updated array back to database
    // db.prepare().run()
    if (checkSolved(arr)) {
        // TODO: update database if step<beststep
        // db.prepare().run()
    }

    return [checkSolved(arr), arr] // testing to see if the array is solved if a swap occurred
}

function swap(n, arr) { // this function swaps positions of n and the empty block within our puzzle array - caleb
    //TODO: increment steps in database by 1
    var indexEmpty = arr.indexOf(23)
    var temp = arr[n]
    arr[n] = 23
    arr[indexEmpty] = temp
    document.getElementById(n).src = "src/images/unc" + 23 + ".jpg";
    document.getElementById(indexEmpty).src = "src/images/unc" + temp + ".jpg";

    // Increment step count on each move
    stepCount++;
    document.getElementById("stepCount").innerHTML = stepCount;
}

function checkSolved(arr) { // this function checks if our puzzle is solved (ie, sorted in ascending order) - caleb
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i + 1] - arr[i] != 1) {
            return false
        }
    }

    // Updates high score
    highScore = Math.min(highScore, stepCount);
    document.getElementById("highScore").innerHTML = highScore;

    return true
}