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

  return { type, score, gameboard, observer, observerConfig };
}
