import { CREATE_APPLE, GAME_OVER, INITILIZE_APPLE } from '../constants';
import { getRandomInt, checkCollisionSetCoords } from '../../../utils/utilities';
import { GAME_WIDTH, GAME_HEIGHT, CELL_SIZE, APPLE_COLOR } from '../gameConstants';

const getCoordinates = (state, invalidPositions) => {
  let newCoords = {};
  do {
    const x = getRandomInt(0, state.boardWidth / state.cellSize);
    const y = getRandomInt(0, state.boardHeight / state.cellSize);
    newCoords = { x, y };
  } while (checkCollisionSetCoords(invalidPositions, newCoords));

  return newCoords;
};

const initialState = {
  coordinates: {},
  color: APPLE_COLOR,
  boardWidth: 0,
  boardHeight: 0,
  cellSize: 0,
};

function appleReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_APPLE:
      return {
        ...state,
        coordinates: getCoordinates(state, payload),
      };
    case INITILIZE_APPLE:
      return {
        ...state,
        coordinates: payload.coords,
        boardHeight: payload.height,
        boardWidth: payload.width,
        cellSize: payload.cellSize,
      };
    case GAME_OVER:
      return initialState;
    default:
      return state;
  }
}

export default appleReducer;
