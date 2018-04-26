export default function* snakeSaga(getState) {
  while (true) {
    yield take(TICK);
    const {
      snake: {
        direction
      }
    } = getState();
    yield put(move(direction));
    const {
      snake: {
        parts: [ head, ...tail ]
      },
      apples
    } = getState();
    // collision with tail
    for (let i = 0; i < tail.length; i++) {
      const { x, y } = tail[i];
      if (x === head.x && y === head.y) {
        yield put(gameOver());
      }
    }
    // collision with apples
    for (let i = 0; i < apples.length; i++) {
      const { x, y } = apples[i];
      if (x === head.x && y === head.y) {
        yield put(eatApple(x, y));
      }
    }
  }
}