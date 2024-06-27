import createDomBoard from './dom-gameboard';
import pcPlays from './pc-ai';

let PC_AI;

function setBoard(player1, player2) {
  document.querySelector('.player1-area').innerHTML = '';
  document.querySelector('.player2-area').innerHTML = '';

  document
    .querySelector('.player1-area')
    .appendChild(createDomBoard(player1.gameboard));
  document
    .querySelector('.player2-area')
    .appendChild(createDomBoard(player2.gameboard));
}

function makePcPlay() {
  const [x, y] = PC_AI.next().value[0];
  const player1Squares = document.querySelectorAll(
    '.player1-area .board .square',
  );

  player1Squares[10 * x + y].click();
}

function changeActivePlayer(currentPlayer) {
  document
    .querySelector(`.player${currentPlayer + 1 === 1 ? 2 : 1}-area`)
    .setAttribute('disabled', '');
  document
    .querySelector(`.player${currentPlayer + 1}-area`)
    .removeAttribute('disabled');
}

function endGame(players, winningPlayer) {
  players.forEach((player) => player.observer.disconnect());
  document.querySelector('.game').setAttribute('disabled', '');

  alert(`game-driver.js endGame, player${players[winningPlayer].type} won!`);
}

function gameTurn(players, playerIndex, hitShip) {
  const currentPlayer = Math.abs(playerIndex - 1);

  if (players[playerIndex].gameboard.isGameOver()) {
    endGame(players, currentPlayer);
  }

  if (hitShip) {
    if (players[currentPlayer].type === 'pc') {
      makePcPlay();
    }
  } else {
    changeActivePlayer(currentPlayer);
    if (players[playerIndex].type === 'pc') {
      makePcPlay();
    }
  }
}

function setObservers(players) {
  const boards = document.querySelectorAll('.board');

  for (let i = 0; i < 2; i++) {
    players[i].observer = new MutationObserver((mutations, observer) => {
      const hitShip = !!mutations[0].target.textContent;
      gameTurn(players, i, hitShip);
    });
    players[i].observer.observe(boards[i], players[i].observerConfig);
  }
}

export default function initializeGame(player1, player2) {
  document.querySelector('.game').removeAttribute('disabled', '');

  setBoard(player1, player2);
  document.querySelector('.player2-area').setAttribute('disabled', '');
  setObservers([player1, player2]);

  if (player2.type === 'pc') {
    PC_AI = pcPlays();
    makePcPlay();
  }
}
