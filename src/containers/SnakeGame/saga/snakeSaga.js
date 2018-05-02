import { put, select, call } from 'redux-saga/effects';
import { CELL_SIZE, GAME_HEIGHT, GAME_WIDTH } from '../gameConstants';
import {getApple, getBoard, getSnake} from '../selectors';
import { finishGame, incrementPosition, collisionApple } from '../actions';
import { checkCollision, getNextCoords, checkCollisionSetCoords } from '../../../utils/utilities';

const isGameOver = (nextHeadSnake, snakeCoords, board) => {
  const isSnakeCollision = checkCollisionSetCoords(snakeCoords, nextHeadSnake);
  const { x, y } = nextHeadSnake;
  const isOut = x < 0 || x >= board.width / board.cellSize || y < 0 || y >= board.height / board.cellSize;
  return isSnakeCollision || isOut;
};

export default function* snakeSaga() {
  const snake = yield select(getSnake());
  const { coordinates, direction } = snake;
  const nextHeadSnake = yield call(getNextCoords, coordinates[0], direction);
  const board = yield select(getBoard());
  const gameOver = yield call(isGameOver, nextHeadSnake, snake.coordinates, board);
  if (gameOver === true) {
    yield put(finishGame());
  } else {
    const apple = yield select(getApple());
    const isCollisionWithApple = yield call(checkCollision, nextHeadSnake, apple.coordinates);
    if (isCollisionWithApple) {
      yield put(collisionApple(apple));
    } else {
      yield put(incrementPosition(nextHeadSnake));
    }
  }
}
