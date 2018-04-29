import {
  CHANGE_DIRECTION, INCREMENT_POSITION, RIGHT, LEFT, UP, DOWN, EAT_APPLE,
  GAME_OVER,
} from '../constants';
import { GAME_HEIGHT, CELL_SIZE } from '../gameConstants';
import { checkColision, getNextCoords } from '../../../utils/utilities';

const directions = {
  [RIGHT]: { x: 1, y: 0 },
  [LEFT]: { x: -1, y: 0 },
  [UP]: { x: 0, y: -1 },
  [DOWN]: { x: 0, y: 1 },
};

const isGoingBack = (coordenates, newDirection) => {
  const nextHead = getNextCoords(coordenates[0], newDirection);
  return checkColision(nextHead, coordenates[1]);
};

const getDirection = (state, newDirection) => {
  if (!isGoingBack(state.coordenates, newDirection)) {
    return newDirection;
  }
  return state.direction;
};

const getCoordenates = (coords, newHeadCoords) => {
  const coordenates = [...coords];
  coordenates.unshift({ x: newHeadCoords.x, y: newHeadCoords.y });
  coordenates.pop();
  return coordenates;
};

const eatApple = (coords, appleCoords) => {
  const coordenates = [...coords];
  coordenates.unshift({ x: appleCoords.x, y: appleCoords.y });
  return coordenates;
};

const initialY = GAME_HEIGHT / (2 * CELL_SIZE);

const initialState = {
  coordenates: [
    { x: 9, y: initialY },
    { x: 8, y: initialY },
    { x: 7, y: initialY },
    { x: 6, y: initialY },
  ],
  color: '#f1ea92fc',
  direction: {
    x: 1,
    y: 0,
  },
};

function snakeDirectionReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_DIRECTION:
      return {
        ...state,
        direction: getDirection(state, directions[payload]),
      };
    case INCREMENT_POSITION:
      return {
        ...state,
        coordenates: getCoordenates(state.coordenates, payload),
      };
    case EAT_APPLE:
      return {
        ...state,
        coordenates: eatApple(state.coordenates, payload),
      };
    case GAME_OVER:
      return initialState;
    default:
      return state;
  }
}

export default snakeDirectionReducer;
