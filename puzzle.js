/*
    The puzzle is represented by an number array containing some permutation of numbers 0-23
    number n represents the block in the original picture at coordinate (row=Math.floor(n/6), col=n%6) where the top-left is defined to be (0,0)
    block n=23 is the bottom-right block that is changed to empty
*/
var db = require('./database.js');
const startbtn = document.querySelector('#start')
startbtn.onclick = function(){
    var puzzle = makePuzzle();
    //TODO: STORE THIS PUZZLE IN DATABASE
    //db.prepare("")
}
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
   var numInv=0;
   for (let i=0;i<24;i++){
    for (let j=i;j<24;j++){
        if(puzzle[i]!=0 && puzzle[j]!=0){
            if(puzzle[i]>puzzle[j]){
                numInv+=1;
            }
        }
    }
   }
   return numInv%2==0;
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
    console.log(1)
    // check against isSolvable() return puzzle : generate another one and repeat
    var puzzle = genPuzzle();
    while (isSolvable(puzzle) == false) {
        puzzle = genPuzzle();
    }
    for (let i=0;i<23;i++){
        document.getElementById(i).src  = "unc"+i+".jpg";
    }
    return puzzle;
}

function click(n, arr) {  // - caleb
    // n is the block that is clicked
    // check if n is next to the empty block  swap place check success return : do nothing return false
    // neighbor in 4*6 matrix means index is +-1 or +-6 watch out for edge cases

    // if place is swapped and puzzle is not solved, return -1

    if (arr[n] == 23) { 
        return false
    } else if (n == 0) {
        if (arr[1] == 23 | arr[6] == 23) {
            swap(n, arr) 
        }
    } else if (n < 6 | n > 17) {
        if (arr[n + 1] == 23 | arr[n - 1] == 23) {
            swap(n, arr)
        }
    } else if (arr[n + 1] == 23 | arr[n - 1] == 23 | arr[n + 6] == 23 | arr[n - 6] == 23) {
        swap(n, arr)
    } else { // returning false if no swap occurred
        return false
    }
    return [checkSolved(arr),arr] // testing to see if the array is solved if a swap occurred
}

function swap(n, arr) { // this function swaps positions of n and the empty block within our puzzle array - caleb
    var indexEmpty = arr.indexOf(23)
    var temp = arr[n]
    arr[n] = 23
    arr[indexEmpty] = temp
}

function checkSolved(arr) { // this function checks if our puzzle is solved (ie, sorted in ascending order) - caleb
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i + 1] - arr[i] != 1) {
            return false
        }
    }
    return true
}