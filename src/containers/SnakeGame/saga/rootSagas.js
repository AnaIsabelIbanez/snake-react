import { takeLatest, fork } from 'redux-saga/effects';

import { COLLISION_APPLE, GET_KEY_CODE, ITERATE } from '../constants';
import gameLoopSaga from './gameLoopSaga';
import directionSaga from './directionSaga';
import snakeSaga from './snakeSaga';
import eatAppleSaga from './eatAppleSaga';

export default function* gameSaga() {
  yield fork(gameLoopSaga);
  yield takeLatest(GET_KEY_CODE, directionSaga);
  yield takeLatest(ITERATE, snakeSaga);
  yield takeLatest(COLLISION_APPLE, eatAppleSaga);
}
