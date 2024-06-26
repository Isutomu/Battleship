import Ship from './ship.js';

export default function Gameboard() {
  const BOARD_LENGTH = 2;

  const ships = [];
  const board = Array(BOARD_LENGTH)
    .fill(0)
    .map(() => Array(BOARD_LENGTH).fill({ hit: false }));

  const addShip = (x, y, length) => {
    const ship = Ship(length);

    ships.push(ship);
    board[x][y] = { ship, hit: false };
  };
  const receiveAttack = (x, y) => {
    board[x][y].hit = true;

    if (board[x][y].ship) {
      board[x][y].ship.sunk = true;
      board[x][y].ship.hit();
    }
  };
  const isGameOver = () =>
    ships.reduce((check, ship) => check && ship.getSunk(), true);

  return { ships, board, addShip, receiveAttack, isGameOver };
}
