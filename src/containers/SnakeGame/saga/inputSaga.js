export default function* inputSaga() {
  while (true) {
    const type = yield input();
    switch (type) {
      case 'MOUSE_CLICK':
        yield put(play());
        break;
      case 37:
        yield put(changeDirection(LEFT));
        break;
      case 38:
        yield put(changeDirection(UP));
        break;
      case 39:
        yield put(changeDirection(RIGHT));
        break;
      case 40:
        yield put(changeDirection(DOWN));
        break;
    }
  }
}