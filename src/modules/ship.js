export default function Ship(length) {
  let timesHit = 0;
  let sunk = false;

  const getSunk = () => sunk;
  const isSunk = () => {
    sunk = timesHit === length;
  };
  const hit = () => {
    timesHit += 1;
    isSunk();
  };

  return { length, timesHit, sunk, getSunk, hit, isSunk };
}
