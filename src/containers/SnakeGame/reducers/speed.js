import { GAME_OVER, INCREMENT_SPEED } from '../constants';
import { INITIAL_GAME_SPEED, MAX_GAME_SPEED } from '../gameConstants';

export default (state = INITIAL_GAME_SPEED, action) => {
  switch (action.type) {
    case INCREMENT_SPEED:
      return Math.max(Math.floor(0.8 * state), MAX_GAME_SPEED);
    case GAME_OVER:
      return INITIAL_GAME_SPEED;
    default:
      return state;
  }
};
