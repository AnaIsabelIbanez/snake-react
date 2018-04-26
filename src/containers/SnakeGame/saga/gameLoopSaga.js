import { actionChannel, call, take, put, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { incrementPosition} from '../actions';
import {START_GAME, GAME_OVER} from "../constants";


export default function* runTimer() {
  const channel = yield actionChannel(START_GAME);
  
  while (yield take(channel)) {
    while (true) {
      const winner = yield race({
        stopped: take(GAME_OVER),
        running: call(delay, 250)
      });
      
      if (!winner.stopped) {
        yield put(incrementPosition());
      } else {
        // yield put(reset());
        window.removeEventListener('keyup', null);
        break;
      }
    }
  }
};
