// export default (state = RIGHT, action) => {
//   switch (action.type) {
//     case CHANGE_DIRECTION:
//       return action.direction;
//     case RESET:
//       return RIGHT;
//     default:
//       return state;
//   }
// };

import { CHANGE_DIRECTION, INCREMENT_POSITION, RIGHT, LEFT, UP, DOWN } from '../constants';

const directions = {
  [RIGHT]: { x: 1, y: 0 },
  [LEFT]: { x: -1, y: 0 },
  [UP]: { x: 0, y: -1 },
  [DOWN]: { x: 0, y: 1 }
}

// tablero[x1 + INC_X][y1 + INC_Y] = 1;

const initialState = {
  speed: 50,
  currentPosition: {
    x: 0,
    y: 0,
  },
  direction: {
    x: 1,
    y: 0
  },
};

function snakeDirectionReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_DIRECTION:
      console.log('payload', directions[payload]);
      return {
        ...state,
        direction: directions[payload],
      };
    case INCREMENT_POSITION:
      console.log('state', state);
      return {
        ...state,
        currentPosition: {
          x: state.currentPosition.x + (state.speed * state.direction.x),
          y: state.currentPosition.y + (state.speed * state.direction.y)
        }
      }
    default:
      return state;
  }
}

export default snakeDirectionReducer;
