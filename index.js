class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.position = [];
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        return this.hits >= this.length;
    }
}

class Gameboard {
    constructor () {
        this.board = Array.from({length: 10}, () => Array(10).fill(null));
        this.attackedShips = [];
        this.missedAttacks = [];
        this.ships = [];
    }

    placeShip(x, y, ship) {
        let tempPositions = [];

        for (let i = 0; i < ship.length; i++) {
            let nx = x;
            let ny = y + i;

            if (nx < 0 || nx > 9 || ny < 0 || ny > 9) return 'invalid coordinates';
            if (this.board[nx][ny] !== null) return 'already occupied';

            tempPositions.push([nx, ny]);
        }

        for (let j = 0; j < tempPositions.length; j++) {
            let [nx, ny] = tempPositions[j];
            this.board[nx][ny] = ship;
            ship.position.push([nx, ny]);
        }

        this.ships.push(ship);
    }

    receiveAttack(x, y) {
        const target = this.board[x][y];

        if (target !== null) {
                target.hit();
                this.attackedShips.push([x, y]);
        } else {
            this.missedAttacks.push([x, y]);
        }

        const allSunk = this.ships.every(ship => ship.isSunk());
        if (allSunk) return 'All ships sunk';
    }
}

module.exports = { Ship, Gameboard };