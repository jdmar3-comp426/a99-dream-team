/*
    The puzzle is represented by an number array containing some permutation of numbers 0-23
    number n represents the block in the original picture at coordinate (row=Math.floor(n/6), col=n%6) where the top-left is defined to be (0,0)
    block n=23 is the bottom-right block that is changed to empty
*/

function isSolvable(){
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
    */
}

function makePuzzle(){
    // Generate a random permutation of 0-23
    // check against isSolvable() return puzzle : generate another one and repeat
}

function click(n){
    // n is the block that is clicked
    // check if n is next to the empty block  swap place check success return : do nothing return false
}
