import {
  STARTED_GAME,
  INCREMENT_POSITION,
  CHANGE_DIRECTION,
  GET_KEY_CODE,
  EAT_APPLE,
  GAME_OVER,
  CREATE_APPLE,
  ADD_POINTS,
  ITERATE,
  COLLISION_APPLE,
  INCREMENT_SPEED,
  CHANGE_TOUCH_COORDINATES,
  CREATE_SNAKE,
  INITILIZE_APPLE,
  CALCUALTE_BOARD,
} from './constants';

export const startGame = () => ({
  type: STARTED_GAME,
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

export const createApple = (snakeCoords) => ({
  type: CREATE_APPLE,
  payload: snakeCoords,
});

export const collisionApple = (apple) => ({
  type: COLLISION_APPLE,
  apple,
});

export const eatApple = (appleCoords, snakeCoords) => ({
  type: EAT_APPLE,
  payload: appleCoords,
  snakeCoords,
});

export const finishGame = () => ({
  type: GAME_OVER,
});

export const addPoints = () => ({
  type: ADD_POINTS,
});

export const iterate = () => ({
  type: ITERATE,
});

export const incrementSpeed = () => ({
  type: INCREMENT_SPEED,
});

export const changeTouchCoordinates = (touchCoordinates) => ({
  type: CHANGE_TOUCH_COORDINATES,
  payload: touchCoordinates,
});

export const calculateBoard = (wrapperDimensions) => ({
  type: CALCUALTE_BOARD,
  payload: wrapperDimensions,
});

export const createSnake = (coordinates) => ({
  type: CREATE_SNAKE,
  payload: coordinates,
});

export const initializeApple = (payload) => ({
  type: INITILIZE_APPLE,
  payload,
});
