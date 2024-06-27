import Ship from './ship.js';

export default function Gameboard() {
  const BOARD_LENGTH = 10;
  const SHIPS_SIZES = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];

  const ships = SHIPS_SIZES.map((size) => Ship(size));
  const board = Array(BOARD_LENGTH)
    .fill(0)
    .map(() => Array(BOARD_LENGTH).fill({ hit: false }));

  const placeShip = (x, y, orientation, ship) => {
    // orientation 0->horizontal/ 1->vertical
    let checkSpaceFree = true;
    // return true;
    if (!orientation) {
      for (let i = x; i < x + ship.length; i++) {
        if (board[i][y].ship !== undefined) {
          checkSpaceFree = false;
          break;
        }
      }
    } else {
      for (let i = y; i < y + ship.length; i++) {
        if (board[x][i].ship !== undefined) {
          checkSpaceFree = false;
          break;
        }
      }
    }

    if (checkSpaceFree) {
      if (!orientation) {
        for (let i = x; i < x + ship.length; i++) {
          board[i][y] = { ship, hit: false };
        }
      } else {
        for (let i = y; i < y + ship.length; i++) {
          board[x][i] = { ship, hit: false };
        }
      }
    }

    return checkSpaceFree;
  };
  const receiveAttack = (x, y) => {
    board[x][y].hit = true;

    if (board[x][y].ship) {
      board[x][y].ship.sunk = true;
      board[x][y].ship.hit();
      return true;
    }
    return false;
  };
  const isGameOver = () =>
    ships.reduce((check, ship) => check && ship.getSunk(), true);

  // Randomly placing ships for first execution
  ships.forEach((ship) => {
    let checkSuccess = false;
    do {
      let positionX = Math.floor(Math.random() * 10);
      let positionY = Math.floor(Math.random() * 10);
      const orientation = Math.floor(Math.random() * 2); // 0 horizontal, 1 vertical

      if (!orientation) {
        positionX = Math.ceil(Math.random() * (10 - ship.length));
      } else {
        positionY = Math.ceil(Math.random() * (10 - ship.length));
      }

      checkSuccess = placeShip(positionX, positionY, orientation, ship);
    } while (!checkSuccess);
  });
  return { ships, board, placeShip, receiveAttack, isGameOver };
}
