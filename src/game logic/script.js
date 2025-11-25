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

    placeShip(x, y, ship, orientation = 'horizontal') {
        let temp = [];

        for (let i = 0; i < ship.length; i++) {
            let nx = x + (orientation === 'vertical' ? i : 0);
            let ny = y + (orientation === 'horizontal' ? i : 0);

            if (nx < 0 || nx > 9 || ny < 0 || ny > 9) return 'invalid coordinates';
            if (this.board[nx][ny] !== null) return 'already occupied';

            temp.push([nx, ny]);
        }

        for (const [nx, ny] of temp) {
            this.board[nx][ny] = ship;
            ship.position.push([nx, ny]);
        }

        this.ships.push(ship);
        return true;
    }

    receiveAttack(x, y) {
        const target = this.board[x][y];

        if (target !== null) {
            const alreadyHit = this.attackedShips.some(pos => pos[0] === x && pos[1] === y);

            if (!alreadyHit) {
                target.hit();
                this.attackedShips.push([x, y]);

                if (target.isSunk()) {

                    if (this.ships.every(ship => ship.isSunk())) {
                        return { type: 'all', ship: target };
                    }

                    return { type: 'ship sunk', ship: target };
                }

                return { type: 'hit' };
            }
            return { type: 'duplicate' };
            
        } else {
            const alreadyMissed = this.missedAttacks.some(pos => pos[0] === x && pos[1] === y);
            if (!alreadyMissed) {
                this.missedAttacks.push([x, y]);
                return { type: 'miss' };
            }
            return { type: 'duplicate' };
        } 
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.board = new Gameboard();
    }
}

export { Ship, Gameboard, Player };