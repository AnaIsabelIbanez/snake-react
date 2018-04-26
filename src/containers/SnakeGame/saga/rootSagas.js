import { takeLatest, fork } from 'redux-saga/effects';

import { GET_KEY_CODE } from '../constants';
import gameLoopSaga from './gameLoopSaga';
import directionSaga from './directionSaga';

export default function* gameSaga() {
  yield fork(gameLoopSaga);
  yield takeLatest(GET_KEY_CODE, directionSaga);
}
