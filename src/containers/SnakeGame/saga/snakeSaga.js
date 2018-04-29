import { put, select } from 'redux-saga/effects';
import { CELL_SIZE, GAME_HEIGHT, GAME_WIDTH } from '../gameConstants';
import { getApple, getSnake } from '../selectors';
import { finishGame, incrementPosition, collisionApple } from '../actions';
import { checkColision, getNextCoords, checkColisionSetCoords } from '../../../utils/utilities';

const isGameOver = (nextHeadSnake, snakeCoords) => {
  const isSnakeCollision = checkColisionSetCoords(snakeCoords, nextHeadSnake);
  const { x, y } = nextHeadSnake;
  const isOut = x < 0 || x > GAME_WIDTH / CELL_SIZE || y < 0 || y > GAME_HEIGHT / CELL_SIZE;
  return isSnakeCollision || isOut;
};

export default function* snakeSaga() {
  const snake = yield select(getSnake());
  const { coordenates, direction } = snake;
  const nextHeadSnake = getNextCoords(coordenates[0], direction);
  const gameOver = isGameOver(nextHeadSnake, snake.coordenates);
  if (gameOver === true) {
    yield put(finishGame());
  } else {
    const apple = yield select(getApple());
    const isColisionWithApple = checkColision(nextHeadSnake, apple.coordenates);
    if (isColisionWithApple) {
      yield put(collisionApple(apple, nextHeadSnake));
    } else {
      yield put(incrementPosition(nextHeadSnake));
    }
  }
}
