import { createSelector } from 'reselect';

export const selectSnakeGame = (state) => state.snakeGame;

const getDirection = () => createSelector(
  selectSnakeGame,
  (state) => state.direction
);

const getSpeed = () => createSelector(
  selectSnakeGame,
  (state) => state.speed
);

const getPosition = () => createSelector(
  selectSnakeGame,
  (state) => state.snake.currentPosition
);

const getBoard = () => createSelector(
  selectSnakeGame,
  (state) => state.snake.board
);

export {
  getDirection,
  getSpeed,
  getPosition,
  getBoard,
};
