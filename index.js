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
        this.hitShip = [];
        this.missedAttack = [];
        this.ships = [];
    }

    placeShip(x, y, ship) {
        let tempPositions = [];

        for (let i = 0; i < ship.length; i++) {
            let nx = x;
            let ny = y + i;

            if (nx < 0 || nx > 9 || ny < 0 || ny > 9) return 'invalid coordinates';
            if (this.board[nx][ny] !== null) return 'already occupied';

            tempPositions.push([x, y+i]);
        }

        for (let j = 0; j < tempPositions.length; j++) {
            let [nx, ny] = tempPositions[j];
            this.board[nx][ny] = ship;
            ship.position.push([nx, ny]);
        }

        this.ships.push(ship);
    }

    receiveAttack(x, y) {
        const ship = this.board[x][y];
            if (!this.hitShip.includes(ship)) {
                const cut = ship.hit();

                if (ship !== null && !this.missedAttack.includes(ship)) {
                    this.hitShip.push(ship);
                }

                if (!this.missedAttack.includes(ship)) {
                    this.missedAttack.push(ship);
                }
            
            } 

        if (this.hitShip.length >= this.ships) {
            return 'All ships sink';
        }
    }
}

module.exports = { Ship, Gameboard };