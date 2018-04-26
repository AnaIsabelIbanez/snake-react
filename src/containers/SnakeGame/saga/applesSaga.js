export default function* applesSaga() {
  while (true) {
    yield take([PLAY, EAT_APPLE]);
    const { x, y } = randomPosition();
    yield put(spawnApple(x, y));
  }
}