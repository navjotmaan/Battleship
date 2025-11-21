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

playerBoardDiv.addEventListener("click", (e) => {
    if (!e.target.classList.contains("cell")) return;
    
    let x = Number(e.target.dataset.x);
    let y = Number(e.target.dataset.y);
    
    console.log(`Clicked: ${x}, ${y}`);

    const clickedCell = e.target;
    
    const ship = new Ship(3);
    const placingShip = game.placeShip(x, y, ship);

    if (placingShip === 'already occupied' || placingShip === 'invalid coordinates') {
        console.log(placingShip);
    } else {
        ship.position.forEach(([x, y]) => {
            const cell = document.querySelector(`.cell[data-x='${x}'][data-y='${y}']`);
            if (cell) cell.style.background = 'gray';
        });
    }
});


