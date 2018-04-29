import {
  START_GAME, INCREMENT_POSITION, CHANGE_DIRECTION, GET_KEY_CODE, EAT_APPLE, GAME_OVER, CHANGE_POSITION_APPLE, ADD_POINTS,
} from './constants';

export const startGame = () => ({
  type: START_GAME,
});

export const incrementPosition = (growing) => ({
  type: INCREMENT_POSITION,
  payload: growing,
});

export const getKeyCodeInput = (keyCode) => ({
  type: GET_KEY_CODE,
  keyCode,
});

export const changeDirection = (direction) => ({
  type: CHANGE_DIRECTION,
  payload: direction,
});

export const changePositionApple = () => ({
  type: CHANGE_POSITION_APPLE,
});

export const eatApple = (appleCoords) => ({
  type: EAT_APPLE,
  payload: appleCoords,
});

export const finishGame = () => ({
  type: GAME_OVER,
});

export const addPoints = () => ({
  type: ADD_POINTS,
});
