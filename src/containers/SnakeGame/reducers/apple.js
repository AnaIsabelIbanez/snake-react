import { CHANGE_POSITION_APPLE } from '../constants';
import { getRandomInt } from '../../../utils/utilities';

// const getCoord = (invalidPositions) => {
//   while()
// }

const getCoordenates = (coord, invalidPositions) => {
  const coordenates = [...coord];
  const x = getRandomInt(0, 180) * 10;
  const y = getRandomInt(0, 60) * 10;
  return coordenates;
};

const initialState = {
  coordenates: [
    { x: 50, y: 20 },
  ],
  color: 'red',
};

function appleReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_POSITION_APPLE:
      return {
        ...state,
        coordenates: getCoordenates(state.coordenates, payload),
      };
    default:
      return state;
  }
}

export default appleReducer;
