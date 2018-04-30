import { CHANGE_TOUCH_COORDINATES } from '../constants';

const initialState = null;
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_TOUCH_COORDINATES:
      return payload;
    default:
      return state;
  }
};
