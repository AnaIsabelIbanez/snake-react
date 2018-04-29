import { createSelector } from 'reselect';

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

export {
  getApple,
  getSnake,
  getGame,
};
