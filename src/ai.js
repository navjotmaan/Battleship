export function getComputerTarget(lastHit, playerBoardDiv, playerBoard) {
    
    if (lastHit) {
        const [hx, hy] = lastHit;
        const neighbors = [
            [hx - 1, hy],
            [hx + 1, hy],
            [hx, hy - 1],
            [hx, hy + 1],
        ];

        for (let [nx, ny] of neighbors) {
            if (nx < 0 || nx > 9 || ny < 0 || ny > 9) continue;

            const cell = playerBoardDiv.querySelector(`.cell[data-x='${nx}'][data-y='${ny}']`);
            if (!cell) continue;

            const alreadyHit = playerBoard.attackedShips.some(a => a[0] === nx && a[1] === ny);
            const alreadyMiss = playerBoard.missedAttacks.some(a => a[0] === nx && a[1] === ny);

            if (!alreadyHit && !alreadyMiss) {
                return { x: nx, y: ny, cell };
            }
        }
    }

    while (true) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);

        const cell = playerBoardDiv.querySelector(`.cell[data-x='${x}'][data-y='${y}']`);

        const alreadyHit = playerBoard.attackedShips.some(a => a[0] === x && a[1] === y);
        const alreadyMiss = playerBoard.missedAttacks.some(a => a[0] === x && a[1] === y);

        if (!alreadyHit && !alreadyMiss) {
            return { x, y, cell };
        }
    }
}