export default function updateScoreBoard(players) {
  document.querySelector('.player1-score').textContent = players[0].getScore();
  document.querySelector('.player2-score').textContent = players[1].getScore();
}
