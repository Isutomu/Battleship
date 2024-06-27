import Gameboard from './gameboard';

export default function Player(type) {
  let score = 0;
  const gameboard = Gameboard();
  let observer;
  const observerConfig = {
    subtree: true,
    attributes: true,
    attributeFilter: ['disabled'],
  };

  const getScore = () => score;
  const increaseScore = () => {
    score += 1;
  };

  return { type, gameboard, observer, observerConfig, getScore, increaseScore };
}
