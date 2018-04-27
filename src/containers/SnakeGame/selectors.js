import { createSelector } from 'reselect';

export const selectSnakeGame = (state) => state.snakeGame;


const getSnakeCoords = () => createSelector(
  selectSnakeGame,
  (state) => state.snake.coordenates
);

const getSnakeColor = () => createSelector(
  selectSnakeGame,
  (state) => state.snake.color
);

export {
  getSnakeColor,
  getSnakeCoords,
};
