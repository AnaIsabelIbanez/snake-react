import { put, select } from 'redux-saga/effects';

import { addPoints, createApple, eatApple, incrementPosition, incrementSpeed } from '../actions';
import { getSnake } from '../selectors';

export default function* eatAppleSaga({ apple }) {
  const { coordinates } = apple;
  yield put(eatApple(coordinates));
  yield put(incrementPosition(coordinates));
  const newSnake = yield select(getSnake());
  yield put(createApple(newSnake.coordinates));
  yield put(addPoints());
  yield put(incrementSpeed());
}
