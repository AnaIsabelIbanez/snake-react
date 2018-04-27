import { CHANGE_DIRECTION, INCREMENT_POSITION, RIGHT, LEFT, UP, DOWN } from '../constants';

const directions = {
  [RIGHT]: { x: 1, y: 0 },
  [LEFT]: { x: -1, y: 0 },
  [UP]: { x: 0, y: -1 },
  [DOWN]: { x: 0, y: 1 },
};

// tablero[x1 + INC_X][y1 + INC_Y] = 1;

const getCoordenates = (coord, direct) => {
  const coordenates = [...coord];
  const direction = { ...direct };

  const newHeadX = coordenates[0].x + direction.x;
  const newHeadY = coordenates[0].y + direction.y;
  coordenates.unshift({ x: newHeadX, y: newHeadY });
  coordenates.pop();
  return coordenates;
};

const initialState = {
  coordenates: [
    { x: 18, y: 20 },
    { x: 17, y: 20 },
    { x: 16, y: 20 },
    { x: 15, y: 20 },
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
        coordenates: getCoordenates(state.coordenates, state.direction),
      };
    default:
      return state;
  }
}

export default snakeDirectionReducer;
