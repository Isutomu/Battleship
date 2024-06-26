import Player from './player';
import createDomBoard from './dom-gameboard';

export function initializeGame() {
  const player1 = Player('user');
  const player2 = Player('pc');

  //  FOR TEST
  player1.gameboard.addShip(0, 0, 1);
  console.log(player1.gameboard.ships);
  player2.gameboard.addShip(0, 0, 1);
  //

  const gameArea = document.querySelector('.game');
  gameArea.appendChild(createDomBoard(player1.gameboard));
  gameArea.appendChild(createDomBoard(player2.gameboard));
}
