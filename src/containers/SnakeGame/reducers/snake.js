import {
  CHANGE_DIRECTION, INCREMENT_POSITION, RIGHT, LEFT, UP, DOWN, EAT_APPLE,
  GAME_OVER,
} from '../constants';
import { GAME_HEIGHT, CELL_SIZE } from '../gameConstants';
import { checkCollision, getNextCoords } from '../../../utils/utilities';

const directions = {
  [RIGHT]: { x: 1, y: 0 },
  [LEFT]: { x: -1, y: 0 },
  [UP]: { x: 0, y: -1 },
  [DOWN]: { x: 0, y: 1 },
};

const isGoingBack = (coordinates, newDirection) => {
  const nextHead = getNextCoords(coordinates[0], newDirection);
  return checkCollision(nextHead, coordinates[1]);
};

const getDirection = (state, newDirection) => {
  if (!isGoingBack(state.coordinates, newDirection)) {
    return newDirection;
  }
  return state.direction;
};

const getCoordinates = (coords, newHeadCoords) => {
  const coordinates = [...coords];
  coordinates.unshift({ x: newHeadCoords.x, y: newHeadCoords.y });
  coordinates.pop();
  return coordinates;
};

const eatApple = (coords, appleCoords) => {
  const coordinates = [...coords];
  coordinates.unshift({ x: appleCoords.x, y: appleCoords.y });
  return coordinates;
};

const initialY = GAME_HEIGHT / (2 * CELL_SIZE);

const initialState = {
  coordinates: [
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

function snakeReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_DIRECTION:
      return {
        ...state,
        direction: getDirection(state, directions[payload]),
      };
    case INCREMENT_POSITION:
      return {
        ...state,
        coordinates: getCoordinates(state.coordinates, payload),
      };
    case EAT_APPLE:
      return {
        ...state,
        coordinates: eatApple(state.coordinates, payload),
      };
    case GAME_OVER:
      return initialState;
    default:
      return state;
  }
}

export default snakeReducer;
