import Gameboard from './gameboard';

export default function Player(type) {
  let score = 0;
  const gameboard = Gameboard();

  return { type, gameboard };
}
