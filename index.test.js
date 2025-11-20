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

    // Tests for placeShip function

    test('places ship horizontally', () => {
        const board = new Gameboard();
        const ship = new Ship(3);

        board.placeShip(3, 5, ship);

        expect(board.board[3][5]).toBe(ship);
        expect(board.board[3][6]).toBe(ship);
        expect(board.board[3][7]).toBe(ship);

    });

    test('rejects ship placement out of bounds', () => {
        const board = new Gameboard();
        const ship = new Ship(3); 

        const result = board.placeShip(3, 8, ship);
        expect(result).toBe('invalid coordinates');
    });

    test('rejects overlapping ship placement', () => {
        const board = new Gameboard();
        const ship1 = new Ship(3);
        const ship2 = new Ship(3);

        board.placeShip(3, 5, ship1);
        const result = board.placeShip(3, 5, ship2);

        expect(result).toBe('already occupied');
    });

    test('stores ship coordinates inside ship.position', () => {
        const board = new Gameboard();
        const ship = new Ship(3);

        board.placeShip(3, 5, ship);

        expect(ship.position).toEqual([
            [3, 5],
            [3, 6],
            [3, 7]
        ]);
    });

    // Tests for receiveAttack function

    test('hits ship at given coordinate', () => {
        const board = new Gameboard();
        const ship = new Ship(3);
        
        board.placeShip(3, 5, ship);
        board.receiveAttack(3, 5);

        expect(ship.hits).toBe(1);
        expect(board.attackedShips).toEqual([[3, 5]]);
    });

    test('records missed attack when no ship present', () => {
        const board = new Gameboard();
        board.receiveAttack(4, 4);

        expect(board.missedAttacks).toEqual([[4, 4]]);
    });

    test('does not double-hit the same coordinate', () => {
        const board = new Gameboard();
        const ship = new Ship(3);
        board.placeShip(3, 5, ship);

        board.receiveAttack(3, 5);
        board.receiveAttack(3, 5);

        expect(ship.hits).toBe(1);
        expect(board.attackedShips.length).toBe(1);
    });

    test('returns "all ships sunk" when all ships are destroyed', () => {
        const board = new Gameboard();
        const ship = new Ship(2);

        board.placeShip(3, 5, ship);

        board.receiveAttack(3, 5);
        const result = board.receiveAttack(3, 6);

        expect(result).toBe('All ships sunk');
    });
});