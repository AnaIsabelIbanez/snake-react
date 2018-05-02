import { actionChannel, call, take, put, race, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { createSnake, iterate, initializeApple } from '../actions';
import { STARTED_GAME, GAME_OVER } from '../constants';
import { getBoard, getSpeed } from '../selectors';

export default function* gameLoop() {
  const channel = yield actionChannel(STARTED_GAME);

  while (yield take(channel)) {
    const board = yield select(getBoard());
    const cellsInHeight = board.dimensions.cellsInHeight;
    const initialY = Math.floor(cellsInHeight / 2);
    const snakeCoords = [
      { x: 9, y: initialY },
      { x: 8, y: initialY },
      { x: 7, y: initialY },
      { x: 6, y: initialY },
    ];
    yield put(createSnake(snakeCoords));
    // yield put(initializeApple({ x: 9, y: initialY + 2 }));
    const { height, width, cellSize } = board.dimensions;
    yield put(initializeApple({ height, width, cellSize, coords: { x: 9, y: initialY + 2 } }));
    console.log('board...', board);
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
