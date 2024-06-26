import createDomBoard from './dom-gameboard';

function setBoard(player1, player2) {
  document.querySelector('.player1-area').innerHTML = '';
  document.querySelector('.player2-area').innerHTML = '';

  //  FOR TEST
  player1.gameboard.addShip(0, 0, 1);
  player2.gameboard.addShip(0, 0, 1);
  //

  document
    .querySelector('.player1-area')
    .appendChild(createDomBoard(player1.gameboard));
  document
    .querySelector('.player2-area')
    .appendChild(createDomBoard(player2.gameboard));
}

function changeActivePlayer(playerNumber) {
  document
    .querySelector(`.player${playerNumber}-area`)
    .setAttribute('disabled', '');
  document
    .querySelector(`.player${playerNumber === 1 ? 2 : 1}-area`)
    .removeAttribute('disabled');
}

function endGame(players, losingPlayer) {
  players.forEach((player) => player.observer.disconnect());
  document.querySelector('.game').setAttribute('disabled', '');

  alert(`game-driver.js endGame, player${losingPlayer === 1 ? 2 : 1} won!`);
}

function setObservers(players) {
  const boards = document.querySelectorAll('.board');

  for (let i = 0; i < 2; i++) {
    players[i].observer = new MutationObserver((mutations, observer) => {
      changeActivePlayer(i + 1);
      if (players[i].gameboard.isGameOver()) endGame(players, i + 1);
    });
    players[i].observer.observe(boards[i], players[i].observerConfig);
  }
}

export default function initializeGame(player1, player2) {
  document.querySelector('.game').removeAttribute('disabled', '');

  setBoard(player1, player2);
  document.querySelector('.player2-area').setAttribute('disabled', '');
  setObservers([player1, player2]);
  gameSession();
}
