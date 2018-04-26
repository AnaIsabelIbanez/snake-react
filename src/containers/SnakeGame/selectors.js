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
  (state) => {
    return state.snake.currentPosition;
  }
);

export {
  getDirection,
  getSpeed,
  getPosition,
};
