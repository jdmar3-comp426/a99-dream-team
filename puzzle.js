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
    var puzzle=[];
    var pool=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    while (puzzle.length<24){
        var idx = Math.floor(Math.random()*puzzle.length);
        puzzle.push(pool.idx);
        pool.splice(idx,1);
    }
}

function click(n){
    // n is the block that is clicked
    // check if n is next to the empty block  swap place check success return : do nothing return false
    // neighbor in 4*6 matrix means index is +-1 or +-6
}
