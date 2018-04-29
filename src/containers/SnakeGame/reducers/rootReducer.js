import { combineReducers } from 'redux';

import gameStatus from './gameStatus';
import snake from './snake';
import apple from './apple';
import speed from './speed';

export default combineReducers({
  gameStatus,
  snake,
  apple,
  speed,
});
