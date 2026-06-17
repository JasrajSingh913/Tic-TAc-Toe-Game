console.log("Welcome to Tic Tac Toe");

let music = new Audio("cling-sound.mp3");
let gameover = new Audio("game-over sound.mp3");

let turn = "X";
let gameOver = false;

// Function to change turn

const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

// Function to check win

const checkWin = () => {
    let boxText = document.getElementsByClassName('boxText')
let wins = [
    // Rows
    [0, 1, 2, 0, 5, 0],
    [3, 4, 5, 0, 15, 0],
    [6, 7, 8, 0, 25, 0],

    // Columns
    [0, 3, 6, 5, 0, 90],
    [1, 4, 7, 15, 0, 90],
    [2, 5, 8, 25, 0, 90],

    // Diagonals
    [0, 4, 8, 3.75, 3.75, 45],
    [2, 4, 6, 28.5, 1.5, 135]
];
    wins.forEach(e => {

        if ((
            boxText[e[0]].innerText === boxText[e[1]].innerText &&
            boxText[e[1]].innerText === boxText[e[2]].innerText &&
            boxText[e[0]].innerText !== ""
        )) {

            document.querySelector('.info').innerText =
                boxText[e[0]].innerText + " Won ";

            gameOver = true;
            gameover.currentTime = 0;
            gameover.play();

            document.querySelector('.imgbox img').style.width = "180px";

            let line = document.querySelector(".line");

            line.style.width = "30vw";

            line.style.transform =
                `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
        }
    })
};

// Game Logic

let boxes = document.getElementsByClassName("box");

Array.from(boxes).forEach(element => {

    let boxtext = element.querySelector(".boxText");

    element.addEventListener("click", () => {

        if (boxtext.innerText === "") {

            boxtext.innerText = turn;

            turn = changeTurn();

            music.play();

            checkWin();
            if (!gameOver) {
                document.getElementsByClassName('info')[0].innerText = "Turn For " + turn;
            }
        }
    });
});

reset.addEventListener('click', () => {
    let boxText = document.querySelectorAll('.boxText');

    Array.from(boxText).forEach(element => {
        element.innerText = "";
    });

    turn = "X";
    gameOver = false;

    document.querySelector('.info').innerText =
        "Turn For " + turn;

    document.querySelector('.imgbox img').style.width = "0";

    document.querySelector(".line").style.width = "0";
});