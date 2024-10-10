const boxes = document.querySelectorAll(".box");
const reset = document.querySelector("#reset-btn");
const newGame = document.querySelector("#new-btn");
const msg = document.querySelector("#msg");
const msgContainer = document.querySelector(".msg-container");

let turn0 = true;
let count= 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];


const resetGame = () => {
    count=0;
    turn0 = true;
    enableBtns();
    msgContainer.classList.add("hide")
    
}


boxes.forEach ( (box) => {
    box.addEventListener ("click", () => {
        if(turn0){
            box.innerText = "O";
            box.classList.add("o-color"); 
            turn0 = false;
        }
        else{
            box.innerText = "X";
            box.classList.add("x-color");
            turn0 = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            drawGame();
        }
    })
})


const disableBtns = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBtns = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x-color", "o-color");
    }
}

const drawGame = () => {
    msg.innerText = `OOps! It's a Draw`;
    msgContainer.classList.remove("hide");
    disableBtns();
}

const displayMsg = ( (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBtns();
})


const checkWinner = (() => {
    for(let p of winPatterns){
        // console.log(p[0],p[1], p[2])
        let pos1 = boxes[p[0]].innerText;
        let pos2 = boxes[p[1]].innerText;
        let pos3 = boxes[p[2]].innerText;
        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1 === pos2 && pos2 === pos3){
                displayMsg(pos1);
                return true;
            }
        }
    }
    
})

reset.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);