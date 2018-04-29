import {
  CHANGE_DIRECTION, INCREMENT_POSITION, RIGHT, LEFT, UP, DOWN, EAT_APPLE,
  GAME_OVER,
} from '../constants';
import { GAME_WIDTH, GAME_HEIGHT, CELL_SIZE } from '../gameConstants';

const directions = {
  [RIGHT]: { x: 1, y: 0 },
  [LEFT]: { x: -1, y: 0 },
  [UP]: { x: 0, y: -1 },
  [DOWN]: { x: 0, y: 1 },
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
    { x: 4, y: initialY },
    { x: 3, y: initialY },
    { x: 2, y: initialY },
    { x: 1, y: initialY },
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
        direction: directions[payload],
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
