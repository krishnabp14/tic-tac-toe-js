const boxes = document.querySelectorAll('.box');
const currentMove = document.getElementById("current-move");
const winnerMsg = document.getElementById("winner-msg");
const resetGame = document.querySelector(".reset-game");

let XMove = true;
let moveCount = 0;
let winnerFound = false;

currentMove.innerHTML = `Current Move : ${XMove ? 'X' : 'O'}`;

const winningPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

function checkWinner() {
    for(let i = 0; i < winningPatterns.length; i++) {
        const pattern = winningPatterns[i];
        if(boxes[pattern[0]].innerHTML !== '' && 
           boxes[pattern[0]].innerHTML === boxes[pattern[1]].innerHTML && 
           boxes[pattern[1]].innerHTML === boxes[pattern[2]].innerHTML) {
            
            boxes[pattern[0]].classList.add('winner');
            boxes[pattern[1]].classList.add('winner');
            boxes[pattern[2]].classList.add('winner');

            console.log("Winner is " + boxes[pattern[0]].innerHTML);
            winnerMsg.innerHTML = `Winner is ${boxes[pattern[0]].innerHTML}`;
            winnerFound = true;
            return true;
        }
    }

    if(moveCount === 9) {
        winnerMsg.innerHTML = 'Draw !!! START a new Game ';
        currentMove.innerHTML = '';
        winnerFound = false;
    }
    return false;
}

const handleBoxClick = (boxIndex) => {
    boxes[boxIndex].innerHTML = XMove === true ? 'X' : 'O';
    boxes[boxIndex].classList.add('disabled');
    XMove = !XMove;
    moveCount++;
    console.log(moveCount);

    if(!checkWinner() && !winnerFound && moveCount < 9) {
        currentMove.innerHTML = `Current Move : ${XMove ? 'X' : 'O'}`;
    } else {
        currentMove.innerHTML = ''
    }
}

resetGame.addEventListener('click', () => {
    XMove = true;
    currentMove.innerHTML = `Current Move : ${XMove ? 'X' : 'O'}`;
    for(let i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML = '';
        boxes[i].classList.remove('disabled');
        boxes[i].classList.remove('winner');
    }

    winnerMsg.innerHTML = '';
    winnerFound = false;
    moveCount = 0;
})

for(let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', () => handleBoxClick(i))
}