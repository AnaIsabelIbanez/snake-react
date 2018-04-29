import { actionChannel, call, take, put, race, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { getSnake, getApple } from '../selectors';
import { incrementPosition, changePositionApple, eatApple, finishGame, addPoints } from '../actions';
import { START_GAME, GAME_OVER } from '../constants';
import { GAME_WIDTH, GAME_HEIGHT, CELL_SIZE, GAME_SPEED } from '../gameConstants';

const checkColision = (snakeHeadCoords, appleCoords) => snakeHeadCoords.x === appleCoords.x && snakeHeadCoords.y === appleCoords.y;

const getNewSnakeCoords = ({ coordenates, direction }) => {
  console.log('coordenates', coordenates);
  console.log('direction', direction);
  const newHeadX = coordenates[0].x + direction.x;
  const newHeadY = coordenates[0].y + direction.y;

  return { x: newHeadX, y: newHeadY };
};

const isGameOver = (nextHeadSnake, snakeCoords) => {
  const colisionCoords = snakeCoords.filter((snakeCoord) => snakeCoord.x === nextHeadSnake.x && snakeCoord.y === nextHeadSnake.y);
  const isSnakeColision = colisionCoords.length > 0;
  const { x, y } = nextHeadSnake;
  const isOut = x < 0 || x > GAME_WIDTH / CELL_SIZE || y < 0 || y > GAME_HEIGHT / CELL_SIZE;
  return isSnakeColision || isOut;
};

export default function* gameLoop() {
  const channel = yield actionChannel(START_GAME);

  while (yield take(channel)) {
    while (true) {
      const winner = yield race({
        stopped: take(GAME_OVER),
        running: call(delay, GAME_SPEED),
      });

      if (!winner.stopped) {
        const snake = yield select(getSnake());
        const nextHeadSnake = yield getNewSnakeCoords(snake);
        const gameOver = yield isGameOver(nextHeadSnake, snake.coordenates);
        if (gameOver === true) {
          yield put(finishGame());
          break;
        } else {
          const apple = yield select(getApple());
          const isColisionWithApple = yield checkColision(nextHeadSnake, apple.coordenates);
          if (isColisionWithApple) {
            yield put(addPoints());
            yield put(eatApple(apple.coordenates));
            yield put(changePositionApple());
          }
          yield put(incrementPosition(nextHeadSnake));
        }
      } else {
        break;
      }
    }
  }
}
