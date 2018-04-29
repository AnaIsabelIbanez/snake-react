import { actionChannel, call, take, put, race, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { iterate } from '../actions';
import { STARTED_GAME, GAME_OVER } from '../constants';
import { getSpeed } from '../selectors';

export default function* gameLoop() {
  const channel = yield actionChannel(STARTED_GAME);

  while (yield take(channel)) {
    while (true) {
      const winner = yield race({
        stopped: take(GAME_OVER),
        running: call(delay, yield select(getSpeed())),
      });

      if (!winner.stopped) {
        yield put(iterate());
      } else {
        break;
      }
    }
  }
}
