import './style/reset.css';
import './style/common.css';
import './style/gameboard.css';

import initializeMatch from './modules/game-driver';
import Player from './modules/player';

const player1 = Player('user');
const player2 = Player('pc');

document
  .querySelector('.start-game')
  .addEventListener('click', () => initializeMatch(player1, player2));
