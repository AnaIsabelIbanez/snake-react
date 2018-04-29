import { put } from 'redux-saga/effects';

import { changeDirection } from '../actions';
import { LEFT, RIGHT, UP, DOWN } from '../constants';

const directions = {
  37: LEFT,
  38: UP,
  39: RIGHT,
  40: DOWN,
};

export default function* directionSaga({ keyCode }) {
  console.log('keycodeeeee', keyCode);
  const newDirection = directions[keyCode];
  if (newDirection) {
    yield put(changeDirection(directions[keyCode]));
  }
}
