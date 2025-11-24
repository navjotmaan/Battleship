import { Ship, Gameboard } from './script.js';

const playerBoardDiv = document.getElementById("player-board");
const computerBoardDiv = document.getElementById('computer-board');

const player = new Gameboard();
const computer = new Gameboard();
let gameOver = false;
let playerTurn = true;

function createGrid(boardDiv) {
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.x = Math.floor(i / 10);
        cell.dataset.y = i % 10;
        boardDiv.appendChild(cell);
    }
}

createGrid(playerBoardDiv);
createGrid(computerBoardDiv);

placeShips(player);
placeShips(computer);

updateActiveBoard();

computerBoardDiv.addEventListener('click', (e) => {
    if (gameOver) return;
    if (!e.target.classList.contains("cell")) return;

    if (e.target.classList.contains('attacked')) return;

    let x = Number(e.target.dataset.x);
    let y = Number(e.target.dataset.y);

    playerAttack(x, y, e.target);
});

function placeShips(opponent) {
    const lengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

    lengths.forEach(len => {
        let placed = false;

        while (!placed) {
            const ship = new Ship(len);

            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            let orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';

            const result = opponent.placeShip(x, y, ship, orientation);

            if (result !== true) continue;

            if (opponent === player) {
                ship.position.forEach(([px, py]) => {
                    const c = playerBoardDiv.querySelector(`.cell[data-x='${px}'][data-y='${py}']`);
                    if (c) c.style.background = '#3c6e71';
                });
            }

            placed = true;
        }
    });
}

function playerAttack(x, y, cell) {
    if (cell.classList.contains('attacked')) return;
    if (!playerTurn) return;

    cell.classList.add('attacked');

    playerTurn = false;
    updateActiveBoard();

    const result = computer.receiveAttack(x, y);
    attackResult(result, cell, 'You win!');

    setTimeout(computerAttack, 1000);
}

function computerAttack() {
    let x, y;
    let cell;

    while (true) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);

        cell = document.querySelector(`#player-board .cell[data-x='${x}'][data-y='${y}']`);
        if (!cell.classList.contains('attacked')) break;
    }

    cell.classList.add("attacked");

    const result = player.receiveAttack(x, y);
    attackResult(result, cell, 'computer wins');

    playerTurn = true;
    updateActiveBoard();
}

function attackResult(result, cell, message) {
    if (result === 'hit') {
        cell.style.background = '#d90429';
    } else if (result === 'miss') {
        cell.style.background = '#8d99ae';
    }

    if (result.type === 'ship sunk') {
        highlightShip(result.ship, cell);
    }

    if (result.type === 'all') {
        highlightShip(result.ship, cell);
        gameOver= true;
        setTimeout(() => alert(message), 1000);
        return;
    }
}

function highlightShip(ship, cell) {
    const isComputerBoard = cell.closest('#computer-board') !== null;

    ship.position.forEach(([x, y]) => {
        const selector = isComputerBoard
            ? `#computer-board .cell[data-x='${x}'][data-y='${y}']`
            : `#player-board .cell[data-x='${x}'][data-y='${y}']`;

        document.querySelector(selector).style.background = 'rgb(40, 40, 146)';
    });
}

function updateActiveBoard() {
    if (gameOver) {
        playerBoardDiv.classList.remove('active');
        computerBoardDiv.classList.remove('active');
        return;
    }
    if (playerTurn) {
        computerBoardDiv.classList.add('active');
        playerBoardDiv.classList.remove('active');
    } else {
        playerBoardDiv.classList.add('active');
        computerBoardDiv.classList.remove('active');
    }
} 