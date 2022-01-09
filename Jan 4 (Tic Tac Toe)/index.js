const cells = document.getElementsByClassName("cell");
const round = document.getElementsByClassName("round")[0];
const resetBtn = document.getElementsByClassName("reset--btn")[0];
const gameGrid = document.getElementsByClassName("game__grid")[0];

let count = 0;
let xround = true;
let isGameComplete = false;

const checkGameStatus = (arr, X_round) => {
    const winner = X_round ? "O win" : "X win";
    // console.log("winner", winner);
    const arr0Class = arr[0].classList[1];
    const arr1Class = arr[1].classList[1];
    const arr2Class = arr[2].classList[1];
    const arr3Class = arr[3].classList[1];
    const arr4Class = arr[4].classList[1];
    const arr5Class = arr[5].classList[1];
    const arr6Class = arr[6].classList[1];
    const arr7Class = arr[7].classList[1];
    const arr8Class = arr[8].classList[1];

    if (
        arr0Class &&
        ((arr0Class === arr1Class && arr1Class === arr2Class) ||
            (arr0Class === arr4Class && arr4Class === arr8Class) ||
            (arr0Class === arr3Class && arr3Class === arr6Class))
    ) {
        console.log("1");
        return winner;
    }

    if (arr1Class && arr1Class === arr4Class && arr4Class === arr7Class) {
        console.log("2");
        return winner;
    }

    if (
        arr2Class &&
        ((arr2Class === arr5Class && arr5Class === arr8Class) ||
            (arr2Class === arr4Class && arr4Class === arr6Class))
    ) {
        console.log("3");
        return winner;
    }

    if (arr3Class && arr3Class === arr4Class && arr4Class === arr5Class) {
        console.log("4");
        return winner;
    }
    if (arr6Class && arr6Class === arr7Class && arr7Class === arr8Class) {
        console.log("5");
        return winner;
    }
};

const cellInput = (event) => {
    let currentCell = event.target;
    if (currentCell.classList.length == 2 || isGameComplete) {
        return;
    }
    if (xround) {
        currentCell.classList.add("x");
        round.textContent = "O Round";
        xround = false;
    } else {
        currentCell.classList.add("o");
        round.textContent = "X Round";
        xround = true;
    }

    count += 1;
    if (count >= 5) {
        const winner = checkGameStatus(cells, xround);
        console.log(winner);
        if (winner) {
            alert(winner);
            isGameComplete = true;
        }
        if (!window && count === 9) {
            alert("draw");
            isGameComplete = true;
        }
    }
};

for (cell of cells) {
    cell.addEventListener("click", cellInput);
}

resetBtn.addEventListener("click", function () {
    window.location.reload();
});
