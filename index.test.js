const { Ship, Gameboard } = require('./index');

describe('Ship', () => {
    test('Should increase hit count', () => {
        const ship = new Ship(3);
        ship.hit();
        expect(ship.hits).toBe(1);
    });

    test('Should returns if ship is sunk or not', () => {
        const ship = new Ship(3);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(false);

        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
});

describe('Gameboard', () => {
    test('placed the ship inside the gameboard', () => {
        const board = new Gameboard();
        const ship = new Ship(3);

        board.placeShip(3, 5, ship);

        expect(board.board[3][5]).toBe(ship);
        expect(board.board[3][6]).toBe(ship);
        expect(board.board[3][7]).toBe(ship);
    });
});