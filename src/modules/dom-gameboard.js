export default function createDomBoard(gameboard) {
  const SIZE = 10;

  const boardContainer = document.createElement('div');
  boardContainer.className = 'board';

  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      const square = document.createElement('button');
      square.className = 'square';
      square.addEventListener('click', () => {
        const shipHit = gameboard.receiveAttack(i, j);
        square.classList.add('hit');
        square.setAttribute('disabled', '');

        if (shipHit) square.textContent = 'X';
      });

      boardContainer.appendChild(square);
    }
  }

  return boardContainer;
}
