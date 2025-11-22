import { Ship, Gameboard } from './script.js';

const playerBoardDiv = document.getElementById("player-board");

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

const game = new Gameboard();
let mode = 'placing';

const shipsToPlace = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
let currentShipIndex = 0;

playerBoardDiv.addEventListener("click", (e) => {
    if (!e.target.classList.contains("cell")) return;
    
    let x = Number(e.target.dataset.x);
    let y = Number(e.target.dataset.y);
    
    if (mode === 'placing') {
        handleShipPlacement(x, y, e.target);
    } else if (mode === 'attacking') {
        handleAttack(x, y, e.target);
    }
});

function handleShipPlacement(x, y, cell) {
    if (currentShipIndex >= shipsToPlace.length) return;

    const shipLength = shipsToPlace[currentShipIndex];
    const ship = new Ship(shipLength);

    const status = game.placeShip(x, y, ship);

    if (status === 'already occupied' || status === 'invalid coordinates') {
        console.log(status);
        return;
    } 

    ship.position.forEach(([px, py]) => {
        const c = document.querySelector(`.cell[data-x='${px}'][data-y='${py}']`);
        if (c) c.style.background = 'gray';
    });

    currentShipIndex++;

    if (currentShipIndex >= shipsToPlace.length) {
        mode = 'attacking';
    }
} 

function handleAttack(x, y, cell) {
    const result = game.receiveAttack(x, y);

    if (result === 'hit') {
        cell.style.background = 'red';
    } else if (result === 'miss') {
        cell.style.background = 'white';
    }
    if (result === 'All ships sunk') {
        cell.style.background = 'red';
        console.log('All ships sunks');
    }
}