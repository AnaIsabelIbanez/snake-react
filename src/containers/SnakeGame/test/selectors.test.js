import {
  selectSnakeGame,
} from '../selectors';

describe('getSnake', () => {
  it('should select the snake game state', () => {
    const snakeState = {
      snake: {},
    };
    const mockedState = {
      snakeGame: snakeState,
    };
    expect(selectSnakeGame(mockedState)).toEqual(snakeState);
  });
});
