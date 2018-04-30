import { createSelector } from 'reselect';
import touchCoordinates from './reducers/touchCoordinates'

export const selectSnakeGame = (state) => state.snakeGame;


const getSnake = () => createSelector(
  selectSnakeGame,
  (state) => state.snake
);

const getApple = () => createSelector(
  selectSnakeGame,
  (state) => state.apple
);

const getGame = () => createSelector(
  selectSnakeGame,
  (state) => state.gameStatus
);

const getSpeed = () => createSelector(
  selectSnakeGame,
  (state) => state.speed
);

const getTouchCoordinates = () => createSelector(
  selectSnakeGame,
  (state) => state.touchCoordinates
);

export {
  getApple,
  getSnake,
  getGame,
  getSpeed,
  getTouchCoordinates,
};
