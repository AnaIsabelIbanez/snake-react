import { CHANGE_POSITION_APPLE, GAME_OVER } from '../constants';
import { getRandomInt } from '../../../utils/utilities';
import { GAME_WIDTH, GAME_HEIGHT, CELL_SIZE } from '../gameConstants';

// const getCoord = (invalidPositions) => {
//   while()
// }

const getCoordenates = (coord, invalidPositions) => {
  const x = getRandomInt(0, GAME_WIDTH / CELL_SIZE);
  const y = getRandomInt(0, GAME_HEIGHT / CELL_SIZE);
  return { x, y };
};

const initialState = {
  coordenates: { x: GAME_WIDTH / (2 * CELL_SIZE), y: GAME_HEIGHT / (2 * CELL_SIZE) },
  color: 'red',
};

function appleReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_POSITION_APPLE:
      return {
        ...state,
        coordenates: getCoordenates(state.coordenates, payload),
      };
    case GAME_OVER:
      return initialState;
    default:
      return state;
  }
}

export default appleReducer;
