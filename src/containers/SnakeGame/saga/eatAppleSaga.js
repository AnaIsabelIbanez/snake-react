import { put, select } from 'redux-saga/effects';

import { addPoints, createApple, eatApple, incrementPosition, incrementSpeed } from '../actions';
import { getSnake } from '../selectors';

export default function* eatAppleSaga({ apple, nextHeadSnake }) {
  yield put(eatApple(apple.coordenates));
  yield put(incrementPosition(nextHeadSnake));
  const newSnake = yield select(getSnake());
  yield put(createApple(newSnake.coordenates));
  yield put(addPoints());
  yield put(incrementSpeed());
}
