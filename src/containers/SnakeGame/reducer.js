import { PLAY, EAT_APPLE, GAME_OVER, RESET } from './constants';

const state = (state = 'MENU', action) => {
  switch (action.type) {
    case PLAY:
      return 'PLAYING';
    case GAME_OVER:
      return 'GAME_OVER';
    default:
      return state;
  }
};
// reducer for tick speed (ms per tick)
const speed = (state = INITIAL_SPEED, action) => {
  switch (action.type) {
    case EAT_APPLE:
      return Math.max(Math.floor(0.9 * state), MAX_SPEED);
    case RESET:
      return INITIAL_SPEED;
    default:
      return state;
  }
};
// reducer for game score
const score = (state = 0, action) => {
  switch (action.type) {
    case EAT_APPLE:
      return state + 10;
    case RESET:
      return 0;
    default:
      return state;
  }
};

export const game = combineReducers({
  state,
  speed,
  score
});