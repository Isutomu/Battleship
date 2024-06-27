const BOARD_LENGTH = 10;

export default function* pcPlays() {
  const availablePlays = [];
  for (let i = 0; i < BOARD_LENGTH; i++) {
    for (let j = 0; j < BOARD_LENGTH; j++) {
      availablePlays.push([i, j]);
    }
  }

  while (availablePlays.length) {
    yield availablePlays.splice(
      Math.floor(Math.random() * availablePlays.length),
      1,
    );
  }
}
