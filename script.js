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
        [0, 4, 8, 3.5, 3.5, 45],
        [2, 4, 6, 26.5, 3.5, 135]
    ];

    let won = false;

    wins.forEach(e => {

        if ((
            boxText[e[0]].innerText === boxText[e[1]].innerText &&
            boxText[e[1]].innerText === boxText[e[2]].innerText &&
            boxText[e[0]].innerText !== ""
        )) {

            won = true;

            document.querySelector('.info').innerText =
                boxText[e[0]].innerText + " Won ";

            gameOver = true;
            gameover.currentTime = 0;
            gameover.play();

            document.querySelector('.imgbox img').style.width = "180px";

            let line = document.querySelector(".line");

            // The grid cell size doubles on phones (20vw vs 10vw),
            // so scale the line's width and offsets to match.
            let isMobile = window.innerWidth <= 800;
            let scale = isMobile ? 2 : 1;

            line.style.width = (30 * scale) + "vw";

            line.style.transform =
                `translate(${e[3] * scale}vw, ${e[4] * scale}vw) rotate(${e[5]}deg)`;
        }
    })

    return won;
};

// Function to check draw

const checkDraw = () => {
    let boxText = document.getElementsByClassName('boxText');

    let isDraw = Array.from(boxText).every(box => box.innerText !== "");

    if (isDraw) {
        gameOver = true;
        alert("Game Drawn");
    }

    return isDraw;
};

// Game Logic

let boxes = document.getElementsByClassName("box");

Array.from(boxes).forEach(element => {

    let boxtext = element.querySelector(".boxText");

    element.addEventListener("click", () => {

        if (!gameOver && boxtext.innerText === "") {

            boxtext.innerText = turn;

            turn = changeTurn();

            music.play();

            let won = checkWin();

            if (!won) {
                if (!checkDraw()) {
                    document.getElementsByClassName('info')[0].innerText = "Turn For " + turn;
                }
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
