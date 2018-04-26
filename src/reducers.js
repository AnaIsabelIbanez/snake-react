/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';


export default function createReducer(injectedReducers) {
  return combineReducers({
    router: routerReducer,
    ...injectedReducers,
  });
}
