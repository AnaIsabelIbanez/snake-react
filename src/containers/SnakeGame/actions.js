import { START_GAME, INCREMENT_POSITION, CHANGE_DIRECTION, GET_KEY_CODE, EAT_APPLE, GAME_OVER, MOVE, RESET, SPAWN_APPLE, TICK } from './constants';

export const startGame = () => {
  return {
    type: START_GAME,
  }
};

export const incrementPosition = () => ({
  type: INCREMENT_POSITION
});

export const getKeyCodeInput = (keyCode) => ({
  type: GET_KEY_CODE,
  keyCode,
});

export const changeDirection = (direction) => {
  console.log('directionAction...', direction);
  return {
    type: CHANGE_DIRECTION,
    payload: direction,
  };
}

export const reset = () => ({
  type: RESET,
});

export const tick = () => ({
  type: TICK,
});

export const gameOver = () => ({
  type: GAME_OVER,
});

export const move = (direction) => ({
  type: MOVE,
  direction,
});

// export const changeDirection = (direction) => ({
//   type: CHANGE_DIRECTION,
//   direction,
// });

export const spawnApple = (x, y) => ({
  type: SPAWN_APPLE,
  x,
  y,
});

export const eatApple = (x, y) => ({
  type: EAT_APPLE,
  x,
  y,
});
