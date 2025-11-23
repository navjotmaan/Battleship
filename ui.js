import { Ship, Gameboard } from './script.js';

const playerBoardDiv = document.getElementById("player-board");
const computerBoardDiv = document.getElementById('computer-board');

const player = new Gameboard();
const computer = new Gameboard();
let gameOver = false;

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

function handleAttack(x, y, cell) {
    if (cell.classList.contains('attacked')) return;
    cell.classList.add('attacked');

    const result = computer.receiveAttack(x, y);

    if (result === 'hit') {
        cell.style.background = 'red';
    } else if (result === 'miss') {
        cell.style.background = 'white';
    }

    if (result === 'All ships sunk') {
        cell.style.background = 'red';
        gameOver = true;
        alert('You win!');
        return;
    }

    setTimeout(computerAttack, 1000);
}

computerBoardDiv.addEventListener('click', (e) => {
    if (gameOver) return;
    if (!e.target.classList.contains("cell")) return;

    if (e.target.classList.contains('attacked')) return;

    let x = Number(e.target.dataset.x);
    let y = Number(e.target.dataset.y);

    handleAttack(x, y, e.target);
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
                    if (c) c.style.background = 'gray';
                });
            }
            placed = true;
        }
    });
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

    if (result === 'hit') {
        cell.style.background = 'red';
    } else if (result === 'miss') {
        cell.style.background = 'white';
    }

    if (result === 'All ships sunk') {
        cell.style.background = 'red';
        gameOver= true;
        alert("Computer wins");
        return;
    }
}
