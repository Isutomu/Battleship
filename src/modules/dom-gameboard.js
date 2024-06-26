export default function createDomBoard(gameboard) {
  const SIZE = 2;

  const boardContainer = document.createElement('div');
  boardContainer.className = 'board';

  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      const square = document.createElement('button');
      square.className = 'square';
      square.addEventListener('click', () => {
        gameboard.receiveAttack(i, j);
        square.classList.add('hit');
        square.setAttribute('disabled', '');

        if (gameboard.isGameOver()) alert('on dom-gameboard.js, end!');
      });

      boardContainer.appendChild(square);
    }
  }

  return boardContainer;
}
