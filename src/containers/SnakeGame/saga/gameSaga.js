import gameLoop from './gameLoop';

function* gameSaga(getState) {
  while (true) {
    yield take(PLAY);
    yield put(reset());
    const running = yield fork(gameLoop, getState);
    yield take(GAME_OVER);
    yield cancel(running);
  }
}