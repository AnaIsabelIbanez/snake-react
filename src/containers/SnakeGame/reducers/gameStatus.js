import { GAME_OVER, STARTED_GAME, INITIAL, ADD_POINTS } from '../constants';

const incrementScore = 10;

const initialState = {
  status: INITIAL,
  score: 0,
}
export default (state = initialState, { type }) => {
  switch (type) {
    case STARTED_GAME:
      return {
        ...state,
        status: STARTED_GAME,
      };
    case GAME_OVER:
      return {
        ...state,
        status: GAME_OVER,
        score: 0,
      };
    case ADD_POINTS:
      return {
        ...state,
        score: state.score + incrementScore,
      };
    default:
      return state;
  }
};
